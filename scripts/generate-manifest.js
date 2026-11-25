import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Chemins source et destination
const serverDir = path.resolve('..', 'minecraft-server');
const modpackDir = path.resolve('modpack');
const outputManifest = path.resolve('manifest.json');

// URL de base GitHub Raw pour le téléchargement automatique par le launcher
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/jivrane/le-havre-launcher/main/modpack';

function getSha1(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha1').update(fileBuffer).digest('hex');
}

function copyFilteredDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    // Ignorer les backups (.bak, .backup), fichiers désactivés (.disabled), logs, fichiers temporaires
    if (entry.name.endsWith('.bak') || entry.name.endsWith('.backup') || entry.name.endsWith('.disabled') || entry.name.endsWith('.tmp') || entry.name.endsWith('.log') || entry.name.startsWith('.')) {
      continue;
    }

    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyFilteredDir(srcPath, destPath);
    } else {
      // Copier uniquement si absent ou taille différente pour gagner du temps
      if (!fs.existsSync(destPath) || fs.statSync(srcPath).size !== fs.statSync(destPath).size) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

function scanModpack(baseDir, currentRelDir = '') {
  const fullDir = path.join(baseDir, currentRelDir);
  if (!fs.existsSync(fullDir)) return [];

  let results = [];
  const entries = fs.readdirSync(fullDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.endsWith('.bak') || entry.name.endsWith('.backup') || entry.name.endsWith('.disabled') || entry.name.endsWith('.tmp') || entry.name.endsWith('.log') || entry.name.startsWith('.')) {
      continue;
    }
    const relPath = path.join(currentRelDir, entry.name).replace(/\\/g, '/');
    const fullPath = path.join(baseDir, relPath);

    if (entry.isDirectory()) {
      results = results.concat(scanModpack(baseDir, relPath));
    } else {
      const size = fs.statSync(fullPath).size;
      const sha1 = getSha1(fullPath);

      // Encoder les segments d'URL (espaces, caractères spéciaux)
      const encodedRelPath = relPath.split('/').map(encodeURIComponent).join('/');

      results.push({
        path: relPath,
        size,
        sha1,
        url: `${GITHUB_RAW_BASE}/${encodedRelPath}`
      });
    }
  }

  return results;
}

console.log('--- PRÉPARATION DU MODPACK & MANIFESTE // LE HAVRE ---');

// 1. Copier les dossiers du serveur vers modpack/
console.log('Copie de mods/ ...');
copyFilteredDir(path.join(serverDir, 'mods'), path.join(modpackDir, 'mods'));

console.log('Fusion de mods_client_only/ dans modpack/mods/ ...');
copyFilteredDir(path.join(serverDir, 'mods_client_only'), path.join(modpackDir, 'mods'));

console.log('Copie de config/ ...');
copyFilteredDir(path.join(serverDir, 'config'), path.join(modpackDir, 'config'));

console.log('Copie de tacz/ ...');
copyFilteredDir(path.join(serverDir, 'tacz'), path.join(modpackDir, 'tacz'));

// 2. Générer le manifest.json avec les URLs GitHub Raw
console.log('Calcul des empreintes SHA-1 et génération de manifest.json...');
const files = scanModpack(modpackDir);

const manifest = {
  serverName: 'Le Havre',
  version: '1.0.0',
  forgeVersion: '47.4.28',
  minecraftVersion: '1.20.1',
  generatedAt: new Date().toISOString(),
  files
};

fs.writeFileSync(outputManifest, JSON.stringify(manifest, null, 2), 'utf-8');
console.log(`\nSuccès ! ${manifest.files.length} fichiers prêts dans modpack/ et indexés dans manifest.json.`);
