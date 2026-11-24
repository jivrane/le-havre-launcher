import React from 'react';
import { Activity, Wifi, WifiOff, Users, RadioTower } from 'lucide-react';

export default function ServerStatusCard({ serverStatus, onRefresh }) {
  const isOnline = serverStatus?.online;

  return (
    <div className="panel-metal rounded-lg p-4 relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="font-stencil text-xs text-gray-400 tracking-wider flex items-center space-x-1.5">
          <RadioTower className="w-3.5 h-3.5 text-amber-500" />
          <span>LIAISON DU REFUGE // LE HAVRE</span>
        </span>
        <button 
          onClick={onRefresh}
          className="text-[10px] font-mono-tech text-gray-400 hover:text-amber-400 transition-colors"
          title="Actualiser la fréquence"
        >
          [SYNC]
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* État de la liaison */}
        <div className="bg-black/40 border border-gray-800/80 rounded p-2.5 flex items-center space-x-3">
          <div className={`p-2 rounded-full ${isOnline ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-600/50' : 'bg-red-950/80 text-red-400 border border-red-600/50'}`}>
            {isOnline ? <Wifi className="w-4 h-4 animate-pulse" /> : <WifiOff className="w-4 h-4" />}
          </div>
          <div>
            <div className="text-[10px] font-mono-tech text-gray-500 uppercase">SIGNAL RÉSEAU</div>
            <div className="font-stencil font-bold text-xs">
              {isOnline ? (
                <span className="text-emerald-400 flex items-center">
                  EN LIGNE <span className="text-[10px] ml-1.5 font-mono-tech text-gray-400">({serverStatus.ping} ms)</span>
                </span>
              ) : (
                <span className="text-red-400">SIGNAL PERDU</span>
              )}
            </div>
          </div>
        </div>

        {/* Survivants dans le secteur */}
        <div className="bg-black/40 border border-gray-800/80 rounded p-2.5 flex items-center space-x-3">
          <div className="p-2 rounded-full bg-amber-950/80 text-amber-400 border border-amber-600/50">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono-tech text-gray-500 uppercase">POPULATION DU HAVRE</div>
            <div className="font-stencil font-bold text-xs text-gray-200">
              {isOnline ? (
                <span>
                  <strong className="text-amber-400 font-mono-tech">{serverStatus.players?.online ?? 0}</strong>
                  <span className="text-gray-500 font-mono-tech"> / {serverStatus.players?.max ?? 50}</span>
                </span>
              ) : (
                <span className="text-gray-500 font-mono-tech">---</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Message de transmission d'urgence (MOTD) */}
      <div className="mt-3 pt-2.5 border-t border-gray-800/60 flex items-center justify-between text-[11px] font-mono-tech">
        <span className="text-gray-500">FRÉQUENCE: <span className="text-gray-300">play.lehavre-mc.fr</span></span>
        <span className="text-amber-500/90 flex items-center">
          <Activity className="w-3 h-3 mr-1 animate-pulse" />
          FORGE 1.20.1
        </span>
      </div>
    </div>
  );
}
