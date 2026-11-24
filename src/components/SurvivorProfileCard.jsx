import React from 'react';
import { UserCheck, LogIn, LogOut, ShieldCheck, Skull, KeyRound } from 'lucide-react';

export default function SurvivorProfileCard({ user, onLogin, onLogout, loading }) {
  return (
    <div className="panel-metal rounded-lg p-4 relative overflow-hidden">
      {/* Liseré haut de sécurité */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20"></div>

      <div className="flex items-center justify-between mb-3">
        <span className="font-stencil text-xs text-gray-400 tracking-wider flex items-center space-x-1.5">
          <KeyRound className="w-3.5 h-3.5 text-amber-500" />
          <span>MATRICULE DU SURVIVANT</span>
        </span>
        {user ? (
          <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 mr-1" />
            VÉRIFIÉ
          </span>
        ) : (
          <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-700/60 flex items-center space-x-1">
            <Skull className="w-3 h-3 mr-1" />
            NON IDENTIFIÉ
          </span>
        )}
      </div>

      {user ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Tête de Skin Minecraft avec cadre post-apo */}
            <div className="relative">
              <div className="w-12 h-12 rounded border-2 border-amber-500/60 overflow-hidden bg-black/60 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                <img 
                  src={`https://mc-heads.net/avatar/${user.username}/100`} 
                  alt={user.username}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://mc-heads.net/avatar/MHF_Steve/100';
                  }}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#11151c]" title="En ligne"></div>
            </div>

            <div>
              <div className="font-stencil font-bold text-base text-gray-100 flex items-center space-x-1.5">
                <span>{user.username}</span>
              </div>
              <div className="text-[11px] font-mono-tech text-gray-400 flex items-center space-x-1">
                <span>ID: {user.uuid ? user.uuid.slice(0, 8) + '...' : 'OFFICIEL'}</span>
                <span className="text-gray-600">•</span>
                <span className="text-amber-400/90">CLASSE: COMBAT</span>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-800/50 rounded transition-all"
            title="Déconnecter le profil"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="text-center py-2">
          <p className="text-xs text-gray-400 mb-3 font-mono-tech">
            Accès restreint. Authentification Microsoft requise pour franchir le sas du Havre.
          </p>
          <button
            onClick={onLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-stencil font-bold text-xs tracking-wider rounded transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center space-x-2"
          >
            <LogIn className="w-4 h-4 text-black" />
            <span>{loading ? 'LIAISON MICROSOFT EN COURS...' : 'CONNEXION MICROSOFT (OFFICIEL)'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
