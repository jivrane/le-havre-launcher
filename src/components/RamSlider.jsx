import React from 'react';
import { Cpu, AlertTriangle } from 'lucide-react';

export default function RamSlider({ ram, onChange }) {
  const ramOptions = [4, 6, 8, 10, 12, 16];

  return (
    <div className="panel-metal rounded-lg p-3.5 relative">
      <div className="flex items-center justify-between mb-2">
        <span className="font-stencil text-xs text-gray-400 tracking-wider flex items-center space-x-1.5">
          <Cpu className="w-3.5 h-3.5 text-amber-500" />
          <span>ALLOCATION MÉMOIRE (RAM)</span>
        </span>
        <span className="font-mono-tech text-xs text-amber-400 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
          {ram} GO ALLOUÉS
        </span>
      </div>

      <div className="grid grid-cols-6 gap-1.5 mt-2">
        {ramOptions.map((value) => {
          const isSelected = ram === value;
          return (
            <button
              key={value}
              onClick={() => onChange(value)}
              className={`py-1.5 text-xs font-mono-tech font-bold rounded border transition-all ${
                isSelected
                  ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                  : 'bg-black/50 text-gray-400 border-gray-800 hover:border-gray-700 hover:text-gray-200'
              }`}
            >
              {value}G
            </button>
          );
        })}
      </div>

      {ram < 6 && (
        <div className="mt-2.5 flex items-center space-x-1.5 text-[10px] font-mono-tech text-amber-400/80">
          <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
          <span>Conseil : TACZ et les mods d'armes recommandent 6 Go minimum.</span>
        </div>
      )}
    </div>
  );
}
