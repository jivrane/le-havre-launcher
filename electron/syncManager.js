import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getSha1(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('sha1').update(fileBuffer).digest('hex');
  } catch {
    return null;
  }
}

export async function synchronizeGameFiles(gameDir, manifestSource, onProgress) {
  if (!fs.existsSync(gameDir)) {
    fs.mkdirSync(gameDir, { recursive: true });
  }

  onProgress({
    stage: 'MANIFEST',
    progress: 5,
    message: 'Recherche de la dernière fréquence et du manifeste...'
  });

  let manifest = null;

  // Si manifestSource est une URL web (GitHub ou VPS)
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

  // Fallback local pour les tests ou si le dépôt n'est pas encore en ligne
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
      message: 'Fichiers locaux prêts (aucun nouveau manifeste détecté).'
    });
    return { success: true, updated: 0 };
  }

  const files = manifest.files;
  const totalFiles = files.length;
  let updatedCount = 0;

  onProgress({
    stage: 'VERIFYING',
    progress: 15,
    message: `Vérification de l'intégrité de ${totalFiles} fichiers...`
  });

  for (let i = 0; i < totalFiles; i++) {
    const item = files[i];
    const targetPath = path.join(gameDir, item.path);
    const targetDir = path.dirname(targetPath);

    let needsUpdate = false;

    if (!fs.existsSync(targetPath)) {
      needsUpdate = true;
    } else {
      // Vérification rapide par taille d'abord, puis SHA1 si différent
      const stat = fs.statSync(targetPath);
      if (stat.size !== item.size) {
        needsUpdate = true;
      } else {
        const localHash = getSha1(targetPath);
        if (localHash !== item.sha1) {
          needsUpdate = true;
        }
      }
    }

    if (needsUpdate) {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Si URL fournie, télécharger depuis GitHub / VPS
      if (item.url) {
        try {
          const res = await fetch(item.url);
          const buffer = await res.arrayBuffer();
          fs.writeFileSync(targetPath, Buffer.from(buffer));
          updatedCount++;
        } catch (e) {
          console.error(`Erreur téléchargement ${item.path}:`, e);
        }
      } else {
        // En local : copier directement depuis le dossier serveur si dispo
        const localServerSource = path.resolve(__dirname, '../../minecraft-server', item.path);
        if (fs.existsSync(localServerSource)) {
          fs.copyFileSync(localServerSource, targetPath);
          updatedCount++;
        }
      }
    }

    // Mettre à jour la barre de progression périodiquement
    if (i % 20 === 0 || i === totalFiles - 1) {
      const progressPercent = Math.min(95, Math.round(15 + (i / totalFiles) * 80));
      onProgress({
        stage: 'DOWNLOADING',
        progress: progressPercent,
        message: `Contrôle : ${item.path.split('/').pop()} (${i + 1}/${totalFiles})`
      });
    }
  }

  onProgress({
    stage: 'FINALIZING',
    progress: 100,
    message: 'Synchronisation achevée avec succès. Démarrage du moteur Forge...'
  });

  return { success: true, updated: updatedCount };
}
