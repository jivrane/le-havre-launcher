import React from 'react';
import { Newspaper, BellRing, Crosshair, Sparkles } from 'lucide-react';

export default function NewsTransmissions() {
  const news = [
    {
      id: 1,
      badge: 'URGENT',
      badgeColor: 'bg-red-950 text-red-400 border-red-800',
      title: 'Transmission #104 : Cargaison TACZ reçue',
      date: '24 NOV 2026',
      content: 'De nouveaux fusils et accessoires tactiques ont été découverts dans les décombres du secteur portuaire. Pensez à calibrer vos optiques.'
    },
    {
      id: 2,
      badge: 'DIRECTIVE',
      badgeColor: 'bg-amber-950 text-amber-400 border-amber-800',
      title: 'Protocole d\'évacuation des zones contaminées',
      date: '21 NOV 2026',
      content: 'Des pics de radiations ont été détectés en périphérie. Munissez-vous impérativement de filtres et de kits médicaux avant toute expédition.'
    },
    {
      id: 3,
      badge: 'SYSTÈME',
      badgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-800',
      title: 'Mise à niveau du SAS de synchronisation',
      date: '18 NOV 2026',
      content: 'Le launcher vérifie désormais vos configurations et textures d\'armes sans aucun temps mort. Bon déploiement à tous les survivants.'
    }
  ];

  return (
    <div className="panel-metal rounded-lg p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-800/80">
        <span className="font-stencil text-xs text-gray-300 tracking-wider flex items-center space-x-1.5">
          <Newspaper className="w-3.5 h-3.5 text-amber-500" />
          <span>JOURNAL DU REFUGE // TRANSMISSIONS</span>
        </span>
        <span className="text-[10px] font-mono-tech text-gray-500 flex items-center">
          <BellRing className="w-3 h-3 text-amber-400 mr-1" />
          3 FLUX
        </span>
      </div>

      <div className="space-y-3 overflow-y-auto pr-1 flex-1">
        {news.map((item) => (
          <div 
            key={item.id} 
            className="p-3 bg-black/40 hover:bg-black/60 border border-gray-800/70 hover:border-amber-500/30 rounded transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[9px] font-mono-tech px-1.5 py-0.2 rounded border ${item.badgeColor}`}>
                {item.badge}
              </span>
              <span className="text-[10px] font-mono-tech text-gray-500">{item.date}</span>
            </div>
            <h4 className="font-stencil font-bold text-xs text-gray-200 mt-1 mb-1">
              {item.title}
            </h4>
            <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
