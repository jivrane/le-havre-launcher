import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONCURRENCY = 16;

function getSha1(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('sha1').update(fileBuffer).digest('hex');
  } catch {
    return null;
  }
}

async function downloadFileWithRetry(url, targetPath, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(targetPath, Buffer.from(buffer));
      return true;
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
    }
  }
  return false;
}

export async function synchronizeGameFiles(gameDir, manifestSource, onProgress) {
  if (!fs.existsSync(gameDir)) {
    fs.mkdirSync(gameDir, { recursive: true });
  }

  onProgress({
    stage: 'MANIFEST',
    progress: 5,
    message: 'Récupération du manifeste des mods...'
  });

  let manifest = null;

  if (manifestSource.startsWith('http://') || manifestSource.startsWith('https://')) {
    try {
      const response = await fetch(manifestSource);
      if (response.ok) {
        manifest = await response.json();
      } else {
        console.warn(`Manifeste distant non joignable (${response.status}), tentative locale...`);
      }
    } catch (err) {
      console.warn('Impossible de joindre le manifeste distant:', err.message);
    }
  }

  if (!manifest) {
    const localManifestPath = path.resolve(__dirname, '../manifest.json');
    if (fs.existsSync(localManifestPath)) {
      try {
        manifest = JSON.parse(fs.readFileSync(localManifestPath, 'utf-8'));
      } catch (e) {
        console.error('Erreur lecture manifeste local:', e);
      }
    }
  }

  if (!manifest || !manifest.files) {
    onProgress({
      stage: 'READY',
      progress: 100,
      message: 'Fichiers locaux prêts (aucun manifeste détecté).'
    });
    return { success: true, updated: 0 };
  }

  const files = manifest.files;
  const totalFiles = files.length;

  // Cache local des empreintes pour éviter de relire 815 Mo à chaque lancement
  const cachePath = path.join(gameDir, '.lehavre-sync-cache.json');
  let cache = {};
  try {
    if (fs.existsSync(cachePath)) {
      cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
    }
  } catch {
    cache = {};
  }

  onProgress({
    stage: 'VERIFYING',
    progress: 10,
    message: `Analyse rapide de ${totalFiles} fichiers...`
  });

  const filesToDownload = [];
  const newCache = {};

  for (let i = 0; i < totalFiles; i++) {
    const item = files[i];
    const targetPath = path.join(gameDir, item.path);

    let isValid = false;
    if (fs.existsSync(targetPath)) {
      const stat = fs.statSync(targetPath);
      if (stat.size === item.size) {
        const cached = cache[item.path];
        if (cached && cached.size === stat.size && cached.mtimeMs === stat.mtimeMs && cached.sha1 === item.sha1) {
          isValid = true;
          newCache[item.path] = cached;
        } else {
          const localHash = getSha1(targetPath);
          if (localHash === item.sha1) {
            isValid = true;
            newCache[item.path] = { size: stat.size, mtimeMs: stat.mtimeMs, sha1: localHash };
          }
        }
      }
    }

    if (!isValid) {
      filesToDownload.push(item);
    }
  }

  if (filesToDownload.length === 0) {
    try {
      fs.writeFileSync(cachePath, JSON.stringify(newCache), 'utf-8');
    } catch {}

    onProgress({
      stage: 'FINALIZING',
      progress: 100,
      message: 'Tous les fichiers sont déjà à jour !'
    });
    return { success: true, updated: 0 };
  }

  // Téléchargement en parallèle (CONCURRENCY = 16)
  const totalToDownload = filesToDownload.length;
  let completed = 0;
  let updatedCount = 0;
  let queueIndex = 0;

  onProgress({
    stage: 'DOWNLOADING',
    progress: 15,
    message: `Téléchargement de ${totalToDownload} fichiers (mode rapide x${CONCURRENCY})...`
  });

  async function worker() {
    while (queueIndex < totalToDownload) {
      const idx = queueIndex++;
      const item = filesToDownload[idx];
      const targetPath = path.join(gameDir, item.path);
      const targetDir = path.dirname(targetPath);

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      if (item.url) {
        try {
          await downloadFileWithRetry(item.url, targetPath);
          updatedCount++;
          const stat = fs.statSync(targetPath);
          newCache[item.path] = { size: stat.size, mtimeMs: stat.mtimeMs, sha1: item.sha1 };
        } catch (e) {
          console.error(`Erreur téléchargement ${item.path}:`, e);
        }
      } else {
        const localServerSource = path.resolve(__dirname, '../../minecraft-server', item.path);
        if (fs.existsSync(localServerSource)) {
          fs.copyFileSync(localServerSource, targetPath);
          updatedCount++;
          const stat = fs.statSync(targetPath);
          newCache[item.path] = { size: stat.size, mtimeMs: stat.mtimeMs, sha1: item.sha1 };
        }
      }

      completed++;
      if (completed % 10 === 0 || completed === totalToDownload) {
        const progressPercent = Math.min(94, Math.round(15 + (completed / totalToDownload) * 79));
        onProgress({
          stage: 'DOWNLOADING',
          progress: progressPercent,
          message: `Téléchargement (${completed}/${totalToDownload}) : ${item.path.split('/').pop()}`
        });
      }
    }
  }

  const workers = Array.from({ length: Math.min(CONCURRENCY, totalToDownload) }, () => worker());
  await Promise.all(workers);

  try {
    fs.writeFileSync(cachePath, JSON.stringify(newCache), 'utf-8');
  } catch {}

  onProgress({
    stage: 'FINALIZING',
    progress: 95,
    message: `Synchronisation terminée (${updatedCount} fichiers mis à jour).`
  });

  return { success: true, updated: updatedCount };
}
