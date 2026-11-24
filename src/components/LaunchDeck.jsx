import React from 'react';
import { Play, Loader2, FolderOpen, RefreshCw, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function LaunchDeck({ 
  user, 
  onLaunch, 
  isLaunching, 
  syncProgress, 
  gameRunning, 
  onOpenFolder 
}) {
  return (
    <div className="panel-metal-glow rounded-lg p-5 relative overflow-hidden">
      {/* Texture d'arrière-plan avec grille subtile */}
      <div className="absolute inset-0 bg-radar-grid opacity-20 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col space-y-4">
        {/* Affichage de la progression si synchronisation ou lancement */}
        {isLaunching && syncProgress && (
          <div className="bg-black/60 border border-amber-500/30 rounded p-3">
            <div className="flex items-center justify-between text-xs font-mono-tech mb-1.5">
              <span className="text-amber-400 flex items-center space-x-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
                <span>{syncProgress.message || 'Préparation du sas...'}</span>
              </span>
              <span className="text-gray-300 font-bold">{syncProgress.progress}%</span>
            </div>

            {/* Barre de progression avec style post-apocalyptique */}
            <div className="w-full h-2.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800 p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                style={{ width: `${syncProgress.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Bouton Principal d'action */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onLaunch}
            disabled={!user || isLaunching || gameRunning}
            className={`flex-1 py-4 px-6 rounded font-stencil font-bold tracking-widest text-base uppercase transition-all flex items-center justify-center space-x-3 ${
              !user 
                ? 'bg-gray-800/80 text-gray-500 border border-gray-700/60 cursor-not-allowed'
                : gameRunning
                ? 'bg-emerald-950/80 border border-emerald-600 text-emerald-400 cursor-default shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : isLaunching
                ? 'bg-amber-950/80 border border-amber-600 text-amber-300 cursor-wait'
                : 'btn-launch text-black'
            }`}
          >
            {!user ? (
              <>
                <AlertOctagon className="w-5 h-5 text-gray-500" />
                <span>IDENTIFICATION REQUISE POUR DÉPLOYER</span>
              </>
            ) : gameRunning ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-pulse" />
                <span>SURVIVANT DÉPLOYÉ SUR LE HAVRE</span>
              </>
            ) : isLaunching ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-amber-400" />
                <span>SYNCHRONISATION EN COURS...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-black" />
                <span>INITIALISER LE DÉPLOIEMENT</span>
              </>
            )}
          </button>

          {/* Bouton d'accès rapide au dossier .le-havre */}
          <button
            onClick={onOpenFolder}
            className="p-4 bg-black/50 hover:bg-black/80 text-gray-400 hover:text-amber-400 border border-gray-800 hover:border-amber-500/40 rounded transition-all"
            title="Ouvrir le répertoire des mods (.le-havre)"
          >
            <FolderOpen className="w-5 h-5" />
          </button>
        </div>

        {/* Statut sous le bouton */}
        <div className="flex items-center justify-between text-[11px] font-mono-tech text-gray-500 pt-1">
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>FORGE 1.20.1 (47.4.28) • TACZ MODPACK INCLUS</span>
          </span>
          <span className="text-gray-400 hover:text-amber-400 transition-colors cursor-pointer" onClick={onOpenFolder}>
            Dossier: %APPDATA%/.le-havre
          </span>
        </div>
      </div>
    </div>
  );
}
