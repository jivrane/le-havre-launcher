import React, { useState, useEffect } from 'react';
import TitleBar from './components/TitleBar';
import BackgroundParticles from './components/BackgroundParticles';
import ServerStatusCard from './components/ServerStatusCard';
import SurvivorProfileCard from './components/SurvivorProfileCard';
import RamSlider from './components/RamSlider';
import LaunchDeck from './components/LaunchDeck';
import NewsTransmissions from './components/NewsTransmissions';
import SettingsModal from './components/SettingsModal';
import { Terminal, Shield, Crosshair, Settings as SettingsIcon, MessageSquare } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [settings, setSettings] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [serverStatus, setServerStatus] = useState({ online: true, ping: 24, players: { online: 8, max: 50 } });
  const [isLaunching, setIsLaunching] = useState(false);
  const [syncProgress, setSyncProgress] = useState(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('console'); // 'console' | 'survival-guide'

  // Charger profil et paramètres au démarrage
  useEffect(() => {
    async function init() {
      if (window.electronAPI) {
        const storedUser = await window.electronAPI.getUserProfile();
        if (storedUser) setUser(storedUser);

        const loadedSettings = await window.electronAPI.getSettings();
        if (loadedSettings) setSettings(loadedSettings);

        // Ping initial du serveur
        refreshServer(loadedSettings);

        // Écoute de la progression de synchronisation
        window.electronAPI.onSyncProgress((data) => {
          setSyncProgress(data);
          if (data.stage === 'ERROR') {
            setIsLaunching(false);
          }
        });

        // Écoute de l'état du jeu
        window.electronAPI.onGameStatus((status) => {
          if (status === 'RUNNING') {
            setIsLaunching(false);
            setGameRunning(true);
          } else if (status === 'STOPPED') {
            setIsLaunching(false);
            setGameRunning(false);
            setSyncProgress(null);
          }
        });
      } else {
        // Mode développement navigateur (mock)
        setSettings({ ram: 6, serverIp: '127.0.0.1', serverPort: 25565 });
      }
    }

    init();
  }, []);

  const refreshServer = async (currentSettings = settings) => {
    if (!window.electronAPI) return;
    const res = await window.electronAPI.checkServerStatus(
      currentSettings?.serverIp || '127.0.0.1',
      currentSettings?.serverPort || 25565
    );
    if (res) setServerStatus(res);
  };

  const handleLogin = async () => {
    setAuthLoading(true);
    if (window.electronAPI) {
      const res = await window.electronAPI.loginMicrosoft();
      if (res.success && res.profile) {
        setUser(res.profile);
      } else if (res.error) {
        console.warn('Erreur ou annulation auth:', res.error);
      }
    } else {
      // Mock pour test web
      setUser({
        username: 'Survivant_LeHavre',
        uuid: '00000000-0000-0000-0000-000000000000',
        isOfficial: true
      });
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    if (window.electronAPI) {
      await window.electronAPI.logout();
    }
    setUser(null);
  };

  const handleRamChange = (newRam) => {
    const updated = { ...settings, ram: newRam };
    setSettings(updated);
    if (window.electronAPI) {
      window.electronAPI.saveSettings(updated);
    }
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    if (window.electronAPI) {
      window.electronAPI.saveSettings(newSettings);
    }
    refreshServer(newSettings);
  };

  const handleOpenFolder = () => {
    if (window.electronAPI) {
      window.electronAPI.openGameDir();
    }
  };

  const handleLaunch = async () => {
    if (!user || isLaunching || gameRunning) return;
    setIsLaunching(true);
    setSyncProgress({ stage: 'INIT', progress: 5, message: 'Initialisation du protocole de déploiement...' });

    if (window.electronAPI) {
      await window.electronAPI.launchGame({ ram: settings?.ram || 6, user });
    } else {
      // Simulation browser
      setTimeout(() => setSyncProgress({ stage: 'SYNC', progress: 50, message: 'Synchronisation TACZ...' }), 1000);
      setTimeout(() => {
        setIsLaunching(false);
        setGameRunning(true);
      }, 2500);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#080b0f] text-gray-200 select-none relative overflow-hidden">
      {/* Particules de cendres et radiations */}
      <BackgroundParticles />

      {/* Barre de titre personnalisée */}
      <TitleBar serverOnline={serverStatus.online} />

      {/* Barre de navigation / onglets post-apo */}
      <div className="h-11 bg-[#0d121a]/95 border-b border-gray-800/80 px-4 flex items-center justify-between z-20 relative backdrop-blur-md">
        <div className="flex items-center space-x-2 font-stencil text-xs">
          <button
            onClick={() => setActiveTab('console')}
            className={`px-3 py-1.5 rounded flex items-center space-x-1.5 transition-all ${
              activeTab === 'console'
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CONSOLE OPÉRATIONNELLE</span>
          </button>

          <button
            onClick={() => setActiveTab('survival-guide')}
            className={`px-3 py-1.5 rounded flex items-center space-x-1.5 transition-all ${
              activeTab === 'survival-guide'
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/50'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>GUIDE ARMEMENT & TACZ</span>
          </button>
        </div>

        {/* Boutons d'action droite */}
        <div className="flex items-center space-x-2 text-xs font-mono-tech">
          <a
            href="https://discord.gg" 
            target="_blank" 
            rel="noreferrer"
            className="px-2.5 py-1 text-gray-400 hover:text-indigo-400 hover:bg-indigo-950/30 border border-gray-800 hover:border-indigo-800/50 rounded flex items-center space-x-1.5 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>DISCORD DU HAVRE</span>
          </a>

          <button
            onClick={() => setShowSettings(true)}
            className="px-2.5 py-1 text-gray-400 hover:text-amber-400 hover:bg-amber-950/30 border border-gray-800 hover:border-amber-800/50 rounded flex items-center space-x-1.5 transition-all"
            title="Paramètres de lancement"
          >
            <SettingsIcon className="w-3.5 h-3.5" />
            <span>CONFIG</span>
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-5 overflow-hidden z-20 relative">
        {activeTab === 'console' ? (
          <div className="grid grid-cols-12 gap-5 h-full">
            {/* Colonne gauche (7 cols) : Statut Serveur & Transmissions */}
            <div className="col-span-7 flex flex-col space-y-4 h-full">
              <ServerStatusCard 
                serverStatus={serverStatus} 
                onRefresh={() => refreshServer()} 
              />
              <div className="flex-1 overflow-hidden">
                <NewsTransmissions />
              </div>
            </div>

            {/* Colonne droite (5 cols) : Profil, RAM, Lancement */}
            <div className="col-span-5 flex flex-col justify-between space-y-4 h-full">
              <SurvivorProfileCard 
                user={user} 
                onLogin={handleLogin} 
                onLogout={handleLogout} 
                loading={authLoading} 
              />

              <RamSlider 
                ram={settings?.ram || 6} 
                onChange={handleRamChange} 
              />

              <LaunchDeck 
                user={user}
                onLaunch={handleLaunch}
                isLaunching={isLaunching}
                syncProgress={syncProgress}
                gameRunning={gameRunning}
                onOpenFolder={handleOpenFolder}
              />
            </div>
          </div>
        ) : (
          /* Onglet Guide de survie & TACZ */
          <div className="panel-metal rounded-lg p-6 h-full overflow-y-auto">
            <h3 className="font-stencil font-bold text-base text-amber-500 mb-2 flex items-center space-x-2">
              <Crosshair className="w-5 h-5 text-amber-500" />
              <span>PROTOCOLE TACTIQUE TACZ // GUIDE DU SURVIVANT</span>
            </h3>
            <p className="text-xs text-gray-400 font-mono-tech mb-6">
              Rappels des commandes de survie et du système balistique sur le serveur Le Havre.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono-tech">
              <div className="p-3 bg-black/40 border border-gray-800 rounded">
                <span className="text-amber-400 font-bold block mb-1">R - Recharger</span>
                <p className="text-gray-400 text-[11px]">Recharge l'arme active avec un chargeur plein compatible dans l'inventaire.</p>
              </div>

              <div className="p-3 bg-black/40 border border-gray-800 rounded">
                <span className="text-amber-400 font-bold block mb-1">Z - Viser (ADS)</span>
                <p className="text-gray-400 text-[11px]">Active la visée de précision ou la lunette tactique (peut être modifié dans les options).</p>
              </div>

              <div className="p-3 bg-black/40 border border-gray-800 rounded">
                <span className="text-amber-400 font-bold block mb-1">B - Sélecteur de tir</span>
                <p className="text-gray-400 text-[11px]">Bascule entre coup par coup (Semi-auto), rafale (Burst), et automatique.</p>
              </div>

              <div className="p-3 bg-black/40 border border-gray-800 rounded">
                <span className="text-amber-400 font-bold block mb-1">V - Accessoires tactiques</span>
                <p className="text-gray-400 text-[11px]">Ouvre l'interface de personnalisation d'accessoires (silencieux, poignées, lasers).</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-950/20 border border-amber-600/40 rounded flex items-center space-x-3">
              <Shield className="w-6 h-6 text-amber-400 shrink-0" />
              <p className="text-xs text-amber-200/90 font-mono-tech">
                Rappel important : Le Havre est une zone impitoyable. Les munitions sont rares et précieuses. Rangez toujours vos armes dans vos coffres sécurisés avant de vous déconnecter.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal des Paramètres */}
      {showSettings && (
        <SettingsModal 
          settings={settings} 
          onSave={handleSaveSettings} 
          onClose={() => setShowSettings(false)} 
          onOpenFolder={handleOpenFolder} 
        />
      )}
    </div>
  );
}
