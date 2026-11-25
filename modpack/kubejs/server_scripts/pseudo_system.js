// ========================================================
// SYSTÈME DE PSEUDO / SURNOM RP
// Serveur EternalZ (Forge 1.20.1 - KubeJS)
// Commande : /rename rp <surnom>
// ========================================================

const PSEUDO_FILE = 'kubejs/data/rp_pseudos.json';

// Dictionnaire global en mémoire (clé = nom d'utilisateur en minuscules, valeur = surnom RP)
global.rpPseudos = global.rpPseudos || {};

// Charger les pseudos existants depuis le fichier JSON
try {
    let saved = JsonIO.read(PSEUDO_FILE);
    if (saved) {
        for (let k in saved) {
            if (saved[k]) {
                global.rpPseudos[k.toLowerCase()] = String(saved[k]);
            }
        }
        console.log('[Rename RP] ' + Object.keys(global.rpPseudos).length + ' nom(s) RP charge(s) depuis ' + PSEUDO_FILE);
    }
} catch (e) {
    console.error('[Rename RP] Erreur chargement JSON: ' + e);
}

// Fonction de sauvegarde persistante
function savePseudos() {
    try {
        JsonIO.write(PSEUDO_FILE, global.rpPseudos);
    } catch (e) {
        console.error('[Rename RP] Erreur sauvegarde JSON: ' + e);
    }
}

// ========================================================
// EXPORT GLOBAL : getPlayerDisplayName(target)
// Accepte un joueur (ServerPlayer, CommandSource) ou un string (pseudo Minecraft)
// ========================================================
global.getPlayerDisplayName = function(target) {
    if (!target) return 'Inconnu';
    
    let rawName = null;
    if (typeof target === 'string') {
        rawName = target;
    } else {
        rawName = target.username || (target.name ? target.name.string : null) || (target.getName ? target.getName().getString() : null);
    }
    
    if (!rawName) return 'Inconnu';

    // 1. Recherche dans le dictionnaire en mémoire
    let lower = rawName.toLowerCase();
    if (global.rpPseudos && global.rpPseudos[lower]) {
        return global.rpPseudos[lower];
    }

    // 2. Repli éventuel sur persistentData NBT
    try {
        if (target.persistentData && target.persistentData.contains('pseudo')) {
            let nick = target.persistentData.getString('pseudo');
            if (nick && nick.length > 0) return nick;
        }
    } catch (e) {}

    return rawName;
};

// ========================================================
// RAFRAÎCHISSEMENT DU TAB LIST VIA PAQUET RÉSEAU
// Note: L'écouteur ForgeEvents TabListNameFormat est dans startup_scripts/tab_rename.js
// ========================================================
function refreshPlayerTab(player) {
    if (!player) return;
    try {
        let PacketClass = Java.loadClass('net.minecraft.network.protocol.game.ClientboundPlayerInfoUpdatePacket');
        let ActionClass = Java.loadClass('net.minecraft.network.protocol.game.ClientboundPlayerInfoUpdatePacket$Action');
        let action = ActionClass.UPDATE_DISPLAY_NAME || ActionClass.valueOf('UPDATE_DISPLAY_NAME');
        let packet = new PacketClass(action, player);
        let pList = player.server.playerList || player.server.getPlayerList();
        if (pList && typeof pList.broadcastAll === 'function') {
            pList.broadcastAll(packet);
        }
    } catch (e) {
        console.error('[Rename RP] Erreur refreshPlayerTab: ' + e);
    }
}

// ========================================================
// APPLICATION VISUELLE DU PSEUDO (Tab list + Scoreboard Team)
// ========================================================
function applyDisplayName(player, pseudo) {
    if (!player) return;
    let srv = player.server;

    // 1. Mise à jour instantanée du TAB LIST pour tous les joueurs
    refreshPlayerTab(player);

    // 2. NAMETAG AU-DESSUS DE LA TÊTE (Team scoreboard)
    try {
        let safe = player.username.replace(/[^a-zA-Z0-9_]/g, '');
        if (safe.length > 12) safe = safe.substring(0, 12);
        if (safe.length === 0) safe = 'p' + Math.floor(Math.random() * 10000);
        let teamName = 'rp_' + safe;

        if (pseudo && pseudo.length > 0) {
            srv.runCommandSilent('team add ' + teamName);
            let jsonPrefix = JSON.stringify('\u00a7b' + pseudo + ' \u00a77\u00bb ');
            srv.runCommandSilent('team modify ' + teamName + ' prefix ' + jsonPrefix);
            srv.runCommandSilent('team modify ' + teamName + ' color aqua');
            srv.runCommandSilent('team join ' + teamName + ' ' + player.username);
        } else {
            srv.runCommandSilent('team leave ' + player.username);
            srv.runCommandSilent('team remove ' + teamName);
        }
    } catch (e) {
        console.error('[Rename RP] Erreur nametag team: ' + e);
    }
}

// ========================================================
// INTERCEPTION DU CHAT
// ========================================================
PlayerEvents.chat(event => {
    try {
        let player = event.player;
        if (!player) return;
        let displayName = global.getPlayerDisplayName(player);
        if (displayName && displayName !== player.username) {
            let msgStr = '';
            if (typeof event.message === 'string') {
                msgStr = event.message;
            } else if (event.message && event.message.string) {
                msgStr = event.message.string;
            } else if (event.message && event.message.getString) {
                msgStr = event.message.getString();
            } else {
                msgStr = String(event.message);
            }
            event.cancel();
            event.server.tell(Text.of('\u00a77<\u00a7f' + displayName + '\u00a77> \u00a7r' + msgStr));
        }
    } catch (e) {
        console.error('[Rename RP] Erreur chat: ' + e);
    }
});

// ========================================================
// RESTAURATION À LA CONNEXION & RESPAWN
// ========================================================
PlayerEvents.loggedIn(event => {
    try {
        let player = event.player;
        let nick = global.getPlayerDisplayName(player);
        if (nick && nick !== player.username) {
            applyDisplayName(player, nick);
        }
    } catch (e) {}
});

PlayerEvents.respawned(event => {
    try {
        let player = event.player;
        let nick = global.getPlayerDisplayName(player);
        if (nick && nick !== player.username) {
            applyDisplayName(player, nick);
        }
    } catch (e) {}
});

// ========================================================
// COMMANDES /rename
// ========================================================
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    function hasAdminPerm(source) {
        if (!source) return false;
        if (!source.player) return true;
        return source.hasPermission(2);
    }

    function findPlayer(server, name) {
        if (!name || !server) return null;
        let players = server.playerList.players;
        let lower = name.toLowerCase();
        for (let i = 0; i < players.size(); i++) {
            let p = players.get(i);
            if (p.username.toLowerCase() === lower) {
                return p;
            }
            let rp = global.rpPseudos[p.username.toLowerCase()];
            if (rp && rp.toLowerCase() === lower) {
                return p;
            }
        }
        return null;
    }

    function doSetPseudo(source, target, pseudo) {
        pseudo = pseudo ? pseudo.trim() : '';
        if (pseudo.length === 0) {
            source.sendFailure(Text.of('\u00a7c[Rename RP] Le surnom ne peut pas \u00eatre vide.'));
            return 0;
        }
        if (pseudo.length > 24) {
            source.sendFailure(Text.of('\u00a7c[Rename RP] Max 24 caract\u00e8res (actuel : ' + pseudo.length + ').'));
            return 0;
        }

        let uKey = target.username.toLowerCase();
        global.rpPseudos[uKey] = pseudo;
        savePseudos();

        try {
            if (target.persistentData) {
                target.persistentData.putString('pseudo', pseudo);
            }
        } catch (e) {}

        applyDisplayName(target, pseudo);

        let isSelf = source.player && source.player.username.equalsIgnoreCase(target.username);
        if (isSelf) {
            source.sendSuccess(Text.of('\u00a7a[Rename RP] \u00a7fVotre nom RP est maintenant : \u00a7b' + pseudo), false);
        } else {
            source.sendSuccess(Text.of('\u00a7a[Rename RP] \u00a7fNom RP de \u00a7e' + target.username + ' \u00a7f\u2192 \u00a7b' + pseudo), true);
            target.tell(Text.of('\u00a7a[Rename RP] \u00a7fVotre nom RP : \u00a7b' + pseudo + ' \u00a78(vrai : \u00a77' + target.username + '\u00a78)'));
        }

        try {
            target.playSound('minecraft:entity.player.levelup', 0.5, 1.4);
        } catch (e) {}

        return 1;
    }

    function doRemovePseudo(source, target) {
        let uKey = target.username.toLowerCase();
        let oldPseudo = global.rpPseudos[uKey];

        if (!oldPseudo) {
            source.sendFailure(Text.of('\u00a7c[Rename RP] Ce joueur n\'a aucun nom RP actif.'));
            return 0;
        }

        delete global.rpPseudos[uKey];
        savePseudos();

        try {
            if (target.persistentData) {
                target.persistentData.remove('pseudo');
            }
        } catch (e) {}

        applyDisplayName(target, null);

        let isSelf = source.player && source.player.username.equalsIgnoreCase(target.username);
        if (isSelf) {
            source.sendSuccess(Text.of('\u00a7c[Rename RP] \u00a7fNom RP \u00a7b' + oldPseudo + ' \u00a7fsupprim\u00e9. Vrai nom : \u00a7e' + target.username), false);
        } else {
            source.sendSuccess(Text.of('\u00a7c[Rename RP] \u00a7fNom RP \u00a7b' + oldPseudo + ' \u00a7fde \u00a7e' + target.username + ' \u00a7fsupprim\u00e9.'), true);
            target.tell(Text.of('\u00a7c[Rename RP] \u00a7fVotre nom RP \u00a7b' + oldPseudo + ' \u00a7fa \u00e9t\u00e9 supprim\u00e9. Vrai nom : \u00a7e' + target.username));
        }
        return 1;
    }

    let renameCmd = Commands.literal('rename')

        // -----------------------------------------------
        // /rename rp [surnom|reset]  — tout le monde
        // -----------------------------------------------
        .then(
            Commands.literal('rp')
                // /rename rp  → affiche son propre pseudo
                .executes(c => {
                    let player = c.source.player;
                    if (!player) {
                        c.source.sendSuccess(Text.of('\u00a77Usage : \u00a7e/rename rp <surnom> \u00a77ou \u00a7e/rename rp reset'), false);
                        return 1;
                    }
                    let nick = global.rpPseudos[player.username.toLowerCase()];
                    if (nick) {
                        c.source.sendSuccess(Text.of('\u00a77Nom RP actuel : \u00a7b' + nick + ' \u00a78(vrai : \u00a77' + player.username + '\u00a78)'), false);
                    } else {
                        c.source.sendSuccess(Text.of('\u00a77Aucun nom RP actif. Utilise \u00a7e/rename rp <surnom>'), false);
                    }
                    return 1;
                })
                // /rename rp <surnom>  (ou "reset" pour retirer)
                .then(
                    Commands.argument('surnom', Arguments.GREEDY_STRING.create(event))
                        .executes(c => {
                            let player = c.source.player;
                            if (!player) {
                                c.source.sendFailure(Text.of('\u00a7c[Rename RP] R\u00e9serv\u00e9 aux joueurs en jeu.'));
                                return 0;
                            }
                            let surnom = '';
                            try { surnom = Arguments.GREEDY_STRING.getResult(c, 'surnom'); } catch (e) {}
                            let sl = surnom.toLowerCase();
                            if (sl === 'reset' || sl === 'remove' || sl === 'off' || sl === 'clear') {
                                return doRemovePseudo(c.source, player);
                            }
                            return doSetPseudo(c.source, player, surnom);
                        })
                )
        )

        // -----------------------------------------------
        // /rename set <joueur> <surnom>  — OP
        // -----------------------------------------------
        .then(
            Commands.literal('set')
                .requires(s => hasAdminPerm(s))
                .then(
                    Commands.argument('joueur', Arguments.STRING.create(event))
                        .then(
                            Commands.argument('surnom', Arguments.GREEDY_STRING.create(event))
                                .executes(c => {
                                    let targetName = Arguments.STRING.getResult(c, 'joueur');
                                    let surnom = '';
                                    try { surnom = Arguments.GREEDY_STRING.getResult(c, 'surnom'); } catch (e) {}
                                    let target = findPlayer(c.source.server, targetName);
                                    if (!target) {
                                        c.source.sendFailure(Text.of('\u00a7c[Rename RP] Joueur introuvable : "' + targetName + '".'));
                                        return 0;
                                    }
                                    return doSetPseudo(c.source, target, surnom);
                                })
                        )
                )
        )

        // -----------------------------------------------
        // /rename remove <joueur>  — OP
        // -----------------------------------------------
        .then(
            Commands.literal('remove')
                .requires(s => hasAdminPerm(s))
                .then(
                    Commands.argument('joueur', Arguments.STRING.create(event))
                        .executes(c => {
                            let targetName = Arguments.STRING.getResult(c, 'joueur');
                            let target = findPlayer(c.source.server, targetName);
                            if (!target) {
                                c.source.sendFailure(Text.of('\u00a7c[Rename RP] Joueur introuvable : "' + targetName + '".'));
                                return 0;
                            }
                            return doRemovePseudo(c.source, target);
                        })
                )
        )

        // -----------------------------------------------
        // /rename list  — OP
        // -----------------------------------------------
        .then(
            Commands.literal('list')
                .requires(s => hasAdminPerm(s))
                .executes(c => {
                    c.source.sendSuccess(Text.of('\u00a78===== \u00a7b\u00a7lNOMS RP ENREGISTR\u00c9S \u00a78====='), false);
                    let count = 0;
                    for (let uname in global.rpPseudos) {
                        c.source.sendSuccess(Text.of('  \u00a77\u2022 \u00a7e' + uname + ' \u00a78\u2192 \u00a7b' + global.rpPseudos[uname]), false);
                        count++;
                    }
                    if (count === 0) c.source.sendSuccess(Text.of('\u00a77Aucun nom RP enregistr\u00e9.'), false);
                    c.source.sendSuccess(Text.of('\u00a78====================================='), false);
                    return 1;
                })
        );

    event.register(renameCmd);

    console.log('[KubeJS] Systeme Rename RP initialise (/rename rp) !');
});
