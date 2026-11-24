import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { Client } = require('minecraft-launcher-core');

const FORGE_VERSION = '1.20.1-47.4.28';
const FORGE_INSTALLER_URL = `https://maven.minecraftforge.net/net/minecraftforge/forge/${FORGE_VERSION}/forge-${FORGE_VERSION}-installer.jar`;
const JAVA17_ZIP_URL = 'https://api.adoptium.net/v3/binary/latest/17/ga/windows/x64/jre/hotspot/normal/eclipse';

function isJava17Compatible(javaExePath) {
  try {
    if (!fs.existsSync(javaExePath)) return false;
    const output = execSync(`"${javaExePath}" -version 2>&1`, { encoding: 'utf-8', timeout: 5000 });
    const match = output.match(/version "(\d+)/);
    if (match) {
      const major = parseInt(match[1], 10);
      return major >= 17 && major <= 21;
    }
  } catch {
    return false;
  }
  return false;
}

export async function ensureJava17(gameDir, customJavaPath, onProgress) {
  // 1. Chemin personnalisé configuré
  if (customJavaPath && isJava17Compatible(customJavaPath)) {
    return customJavaPath;
  }

  // 2. Runtime embarqué dans le dossier du jeu (.le-havre/runtime/java17)
  const localJavaExe = path.join(gameDir, 'runtime', 'java17', 'bin', 'java.exe');
  if (isJava17Compatible(localJavaExe)) {
    return localJavaExe;
  }

  // 3. Recherche sur le système (JAVA_HOME, Adoptium, Java, etc.)
  const candidates = [];
  if (process.env.JAVA_HOME) {
    candidates.push(path.join(process.env.JAVA_HOME, 'bin', 'java.exe'));
  }
  for (const base of ['C:\\Program Files\\Eclipse Adoptium', 'C:\\Program Files\\Java', 'C:\\Program Files\\Microsoft']) {
    if (fs.existsSync(base)) {
      try {
        for (const dir of fs.readdirSync(base)) {
          candidates.push(path.join(base, dir, 'bin', 'java.exe'));
        }
      } catch {}
    }
  }

  for (const candidate of candidates) {
    if (isJava17Compatible(candidate)) {
      return candidate;
    }
  }

  // 4. Téléchargement automatique de Java 17 (Adoptium Temurin JRE)
  onProgress({
    stage: 'JAVA',
    progress: 10,
    message: 'Téléchargement automatique de Java 17 (requis pour Forge 1.20.1)...'
  });

  const runtimeDir = path.join(gameDir, 'runtime');
  const extractTempDir = path.join(runtimeDir, '_temp_java');
  const zipPath = path.join(runtimeDir, 'java17.zip');
  const targetJavaDir = path.join(runtimeDir, 'java17');

  fs.mkdirSync(runtimeDir, { recursive: true });

  const res = await fetch(JAVA17_ZIP_URL, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`Impossible de télécharger Java 17 (${res.status})`);
  }

  const buffer = await res.arrayBuffer();
  fs.writeFileSync(zipPath, Buffer.from(buffer));

  onProgress({
    stage: 'JAVA',
    progress: 20,
    message: 'Extraction de Java 17...'
  });

  if (fs.existsSync(extractTempDir)) fs.rmSync(extractTempDir, { recursive: true, force: true });
  fs.mkdirSync(extractTempDir, { recursive: true });

  execSync(`powershell -NoProfile -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${extractTempDir}' -Force"`, {
    timeout: 60000
  });

  const innerFolders = fs.readdirSync(extractTempDir);
  if (innerFolders.length > 0) {
    if (fs.existsSync(targetJavaDir)) fs.rmSync(targetJavaDir, { recursive: true, force: true });
    fs.renameSync(path.join(extractTempDir, innerFolders[0]), targetJavaDir);
  }

  fs.rmSync(extractTempDir, { recursive: true, force: true });
  fs.rmSync(zipPath, { force: true });

  if (!fs.existsSync(localJavaExe)) {
    throw new Error('Java 17 introuvable après extraction.');
  }

  return localJavaExe;
}

export async function ensureForgeInstaller(gameDir, onProgress) {
  const forgeJarPath = path.join(gameDir, `forge-${FORGE_VERSION}-installer.jar`);
  if (fs.existsSync(forgeJarPath) && fs.statSync(forgeJarPath).size > 1000000) {
    return forgeJarPath;
  }

  onProgress({
    stage: 'FORGE',
    progress: 25,
    message: `Téléchargement de Forge ${FORGE_VERSION}...`
  });

  const res = await fetch(FORGE_INSTALLER_URL, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`Impossible de télécharger Forge (${res.status})`);
  }

  const buffer = await res.arrayBuffer();
  fs.writeFileSync(forgeJarPath, Buffer.from(buffer));
  return forgeJarPath;
}

export async function launchMinecraft(options, onProgress, onClose) {
  const { gameDir, ram, jvmArgs, mclcAuth, serverIp, serverPort, autoConnect, javaPath } = options;

  const resolvedJava = await ensureJava17(gameDir, javaPath, onProgress);
  const forgeInstaller = await ensureForgeInstaller(gameDir, onProgress);

  const launcher = new Client();

  const customArgs = jvmArgs
    ? jvmArgs.split(/\s+/).filter(Boolean)
    : ['-XX:+UseG1GC', '-XX:+ParallelRefProcEnabled', '-XX:MaxGCPauseMillis=200'];

  const launchOpts = {
    authorization: mclcAuth,
    root: gameDir,
    version: {
      number: '1.20.1',
      type: 'release'
    },
    forge: forgeInstaller,
    javaPath: resolvedJava,
    memory: {
      max: `${ram || 6}G`,
      min: '2G'
    },
    customArgs,
    overrides: {
      detached: false
    }
  };

  // Connexion directe au serveur si activée et IP configurée (hors localhost par défaut ou si souhaité)
  if (autoConnect && serverIp) {
    launchOpts.quickPlay = {
      type: 'multiplayer',
      identifier: `${serverIp}:${serverPort || 25565}`
    };
  }

  launcher.on('debug', (e) => console.log('[MCLC DEBUG]', e));
  launcher.on('data', (e) => console.log('[MC]', e));

  launcher.on('progress', (e) => {
    if (e.total > 0) {
      const pct = Math.min(99, Math.round((e.task / e.total) * 100));
      onProgress({
        stage: 'MINECRAFT',
        progress: pct,
        message: `Installation ${e.type || 'ressources'} (${e.task}/${e.total})...`
      });
    }
  });

  launcher.on('download-status', (e) => {
    if (e.total > 0) {
      const pct = Math.min(99, Math.round((e.current / e.total) * 100));
      onProgress({
        stage: 'MINECRAFT',
        progress: pct,
        message: `Téléchargement : ${e.name} (${pct}%)`
      });
    }
  });

  launcher.on('close', (code) => {
    console.log('[MC] Jeu fermé avec code:', code);
    if (onClose) onClose(code);
  });

  onProgress({
    stage: 'LAUNCHING',
    progress: 95,
    message: 'Démarrage de Minecraft Forge 1.20.1...'
  });

  await launcher.launch(launchOpts);
}
