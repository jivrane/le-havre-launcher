import React from 'react';
import { Minus, Square, X, ShieldAlert, Radio } from 'lucide-react';

export default function TitleBar({ serverOnline }) {
  const handleMinimize = () => window.electronAPI?.minimizeWindow();
  const handleMaximize = () => window.electronAPI?.maximizeWindow();
  const handleClose = () => window.electronAPI?.closeWindow();

  return (
    <div className="h-10 bg-[#0c1017] border-b border-[#1f2937] flex items-center justify-between px-3 select-none z-50 relative" style={{ WebkitAppRegion: 'drag' }}>
      {/* Côté Gauche : Identité & Statut de sécurité */}
      <div className="flex items-center space-x-3 text-xs">
        <div className="flex items-center space-x-1.5 font-stencil font-bold tracking-wider text-amber-500">
          <ShieldAlert className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>LE HAVRE</span>
          <span className="text-gray-500 text-[10px] font-mono-tech tracking-normal">B.A.S.E. v1.0.0</span>
        </div>

        <div className="h-3 w-px bg-gray-800"></div>

        <div className="flex items-center space-x-1.5 font-mono-tech text-[11px] text-gray-400">
          <Radio className="w-3 h-3 text-emerald-400 animate-ping" />
          <span>FRÉQ: 142.85 MHz</span>
          <span className="text-gray-600">|</span>
          <span className="text-amber-400/90">ZONE: RETRANCHEMENT</span>
        </div>
      </div>

      {/* Côté Droit : Contrôles de la fenêtre */}
      <div className="flex items-center space-x-1" style={{ WebkitAppRegion: 'no-drag' }}>
        <button 
          onClick={handleMinimize}
          className="w-8 h-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800/80 rounded transition-colors"
          title="Minimiser"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button 
          onClick={handleMaximize}
          className="w-8 h-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800/80 rounded transition-colors"
          title="Agrandir"
        >
          <Square className="w-3 h-3" />
        </button>
        <button 
          onClick={handleClose}
          className="w-8 h-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/90 rounded transition-colors"
          title="Quitter"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
