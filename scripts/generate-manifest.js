import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Chemin du serveur Minecraft local
const serverDir = path.resolve('..', 'minecraft-server');
const outputManifest = path.resolve('manifest.json');

// Dossiers à inclure dans le modpack client
const targetFolders = ['mods', 'config', 'defaultconfigs', 'patchouli_books', 'tacz'];

// Mods exclus (mods purement serveur si nécessaire)
const excludedMods = ['dynmap', 'spark', 'worldedit'];

function getSha1(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha1');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

function scanDir(baseDir, currentRelDir = '') {
  const fullDir = path.join(baseDir, currentRelDir);
  if (!fs.existsSync(fullDir)) return [];

  let results = [];
  const entries = fs.readdirSync(fullDir, { withFileTypes: true });

  for (const entry of entries) {
    const relPath = path.join(currentRelDir, entry.name).replace(/\\/g, '/');
    const fullPath = path.join(baseDir, relPath);

    if (entry.isDirectory()) {
      results = results.concat(scanDir(baseDir, relPath));
    } else {
      // Ignorer les fichiers temporaires ou cachés
      if (entry.name.startsWith('.') || entry.name.endsWith('.tmp') || entry.name.endsWith('.log')) continue;

      const size = fs.statSync(fullPath).size;
      const sha1 = getSha1(fullPath);

      results.push({
        path: relPath,
        size,
        sha1
      });
    }
  }

  return results;
}

console.log('--- GÉNÉRATEUR DE MANIFESTE // LE HAVRE ---');
console.log(`Scan du serveur depuis : ${serverDir}`);

const manifest = {
  serverName: 'Le Havre',
  version: '1.0.0',
  forgeVersion: '47.4.28',
  minecraftVersion: '1.20.1',
  generatedAt: new Date().toISOString(),
  files: []
};

for (const folder of targetFolders) {
  const folderPath = path.join(serverDir, folder);
  if (fs.existsSync(folderPath)) {
    console.log(`Analyse du dossier : ${folder}...`);
    const files = scanDir(serverDir, folder);
    manifest.files.push(...files);
  }
}

// Écriture du manifest.json
fs.writeFileSync(outputManifest, JSON.stringify(manifest, null, 2), 'utf-8');
console.log(`\nSuccès ! ${manifest.files.length} fichiers répertoriés dans manifest.json`);
console.log(`Fichier généré : ${outputManifest}`);
