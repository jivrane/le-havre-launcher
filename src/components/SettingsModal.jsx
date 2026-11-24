import React, { useState } from 'react';
import { X, Settings, Folder, Save, Sliders, Server, GitBranch } from 'lucide-react';

export default function SettingsModal({ settings, onSave, onClose, onOpenFolder }) {
  const [formData, setFormData] = useState(settings || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="panel-metal-glow w-full max-w-lg rounded-xl overflow-hidden shadow-2xl border border-amber-500/40">
        {/* Header */}
        <div className="h-12 bg-[#0d121a] px-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-2 font-stencil text-sm font-bold text-amber-500">
            <Settings className="w-4 h-4 text-amber-500" />
            <span>PARAMÈTRES SYSTÈME // LE HAVRE</span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corps des réglages */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 font-mono-tech text-xs">
          {/* Dossier du jeu */}
          <div>
            <label className="block text-gray-400 mb-1 flex items-center justify-between">
              <span>RÉPERTOIRE D'INSTALLATION CLIENT</span>
              <button 
                type="button" 
                onClick={onOpenFolder}
                className="text-amber-400 hover:underline flex items-center text-[10px]"
              >
                <Folder className="w-3 h-3 mr-1" />
                Ouvrir le dossier
              </button>
            </label>
            <input 
              type="text" 
              value={formData.gameDir || ''} 
              onChange={(e) => setFormData({ ...formData, gameDir: e.target.value })}
              className="w-full bg-black/60 border border-gray-800 focus:border-amber-500 rounded p-2 text-gray-200 outline-none"
            />
          </div>

          {/* URL de synchronisation GitHub */}
          <div>
            <label className="block text-gray-400 mb-1 flex items-center space-x-1.5">
              <GitBranch className="w-3.5 h-3.5 text-amber-400" />
              <span>SOURCE DE SYNCHRONISATION (MANIFESTE GITHUB / VPS)</span>
            </label>
            <input 
              type="text" 
              value={formData.gitManifestUrl || ''} 
              onChange={(e) => setFormData({ ...formData, gitManifestUrl: e.target.value })}
              placeholder="https://raw.githubusercontent.com/.../manifest.json"
              className="w-full bg-black/60 border border-gray-800 focus:border-amber-500 rounded p-2 text-gray-200 outline-none text-[11px]"
            />
            <span className="text-[10px] text-gray-500 mt-1 block">
              Quand tu auras ton VPS, tu pourras changer cette adresse ici en 1 clic.
            </span>
          </div>

          {/* IP du Serveur */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-gray-400 mb-1 flex items-center space-x-1">
                <Server className="w-3 h-3 text-amber-400" />
                <span>ADRESSE IP DU SERVEUR</span>
              </label>
              <input 
                type="text" 
                value={formData.serverIp || '127.0.0.1'} 
                onChange={(e) => setFormData({ ...formData, serverIp: e.target.value })}
                className="w-full bg-black/60 border border-gray-800 focus:border-amber-500 rounded p-2 text-gray-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">PORT</label>
              <input 
                type="number" 
                value={formData.serverPort || 25565} 
                onChange={(e) => setFormData({ ...formData, serverPort: parseInt(e.target.value) || 25565 })}
                className="w-full bg-black/60 border border-gray-800 focus:border-amber-500 rounded p-2 text-gray-200 outline-none"
              />
            </div>
          </div>

          {/* Arguments JVM */}
          <div>
            <label className="block text-gray-400 mb-1 flex items-center space-x-1">
              <Sliders className="w-3 h-3 text-amber-400" />
              <span>ARGUMENTS JVM JAVA 17 OPTIMISÉS</span>
            </label>
            <input 
              type="text" 
              value={formData.jvmArgs || ''} 
              onChange={(e) => setFormData({ ...formData, jvmArgs: e.target.value })}
              className="w-full bg-black/60 border border-gray-800 focus:border-amber-500 rounded p-2 text-gray-200 outline-none text-[11px]"
            />
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 font-stencil"
            >
              ANNULER
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black font-stencil font-bold flex items-center space-x-1.5 shadow-[0_0_12px_rgba(245,158,11,0.4)]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>ENREGISTRER</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
