// ========================================================
// SYSTÈME ROLEPLAY : /roll (8 catégories uniques) & /me
// Format sobre & épuré - Portée locale (10 blocs max)
// Mode Staff (/staff, /modestaff, /staffmode) pour visionner les actions & rolls
// Serveur EternalZ (Forge 1.20.1 - KubeJS)
// ========================================================

const RP_MAX_DISTANCE = 10; // Portée maximale normale en blocs (10 blocs max)

// Les 8 catégories uniques officielles de roll
const ROLL_CONFIG = {
    'classique':  { name: 'Classique',  color: '§6', isBlessure: false },
    'blessure':   { name: 'Blessure',   color: '§4', isBlessure: true  },
    'medecin':    { name: 'Médecin',    color: '§b', isBlessure: false },
    'creations':  { name: 'Créations',  color: '§a', isBlessure: false },
    'infections': { name: 'Infections', color: '§5', isBlessure: false },
    'artisana':   { name: 'Artisana',   color: '§e', isBlessure: false },
    'survie':     { name: 'Survie',     color: '§2', isBlessure: false },
    'combat':     { name: 'Combat',     color: '§c', isBlessure: false }
};

/**
 * Récupère le nom / pseudo RP du joueur de façon ultra-robuste
 */
function getRPName(player, source) {
    if (!player) {
        return (source && source.textName) ? source.textName : 'Serveur';
    }

    // 1. Fonction globale de pseudo_system.js
    try {
        if (typeof global.getPlayerDisplayName === 'function') {
            let name = global.getPlayerDisplayName(player);
            if (name && name !== 'Inconnu') return name;
        }
    } catch (e) {}

    // 2. Dictionnaire global rpPseudos
    try {
        let username = player.username || (player.name ? player.name.string : null);
        if (username) {
            let lower = username.toLowerCase();
            if (global.rpPseudos && global.rpPseudos[lower]) {
                return global.rpPseudos[lower];
            }
        }
    } catch (e) {}

    // 3. PersistentData NBT
    try {
        if (player.persistentData && player.persistentData.contains('pseudo')) {
            let nick = player.persistentData.getString('pseudo');
            if (nick && nick.length > 0) return nick;
        }
    } catch (e) {}

    return player.username || (player.name ? player.name.string : 'Joueur');
}

/**
 * Active ou désactive le Mode Staff pour un joueur
 */
function togglePlayerStaffMode(player, forceState) {
    let current = player.persistentData.getBoolean('staff_mode');
    let newState = (typeof forceState === 'boolean') ? forceState : !current;
    player.persistentData.putBoolean('staff_mode', newState);

    if (newState) {
        player.tell(Text.of('§8[§bStaff§8] §aMode Staff activé §8(§aON§8) §7- Vous recevez désormais §etous les rolls & actions RP §7du serveur à n\'importe quelle distance.'));
        try {
            player.playSound('minecraft:block.beacon.activate', 0.8, 1.5);
        } catch (e) {}
    } else {
        player.tell(Text.of('§8[§bStaff§8] §cMode Staff désactivé §8(§cOFF§8) §7- Portée normale de 10 blocs rétablie.'));
        try {
            player.playSound('minecraft:block.beacon.deactivate', 0.8, 1.2);
        } catch (e) {}
    }
    return 1;
}

/**
 * Diffuse un message aux joueurs :
 * - Dans un rayon de maxDistance blocs pour tout le monde
 * - Sur tout le serveur pour les membres du staff avec Mode Staff ou Vanish activé (si allowStaffSpy = true)
 */
function broadcastLocal(server, senderPlayer, message, maxDistance, playSound, allowStaffSpy) {
    if (!senderPlayer) {
        // Exécuté depuis la console ou sans joueur
        server.tell(Text.of(message));
        return;
    }

    let maxDistSq = maxDistance * maxDistance;
    let senderDim = (senderPlayer.level && senderPlayer.level.dimension) ? String(senderPlayer.level.dimension) : null;
    let sx = senderPlayer.x;
    let sy = senderPlayer.y;
    let sz = senderPlayer.z;

    let players = server.playerList.players;
    let sentToSender = false;

    for (let i = 0; i < players.size(); i++) {
        let p = players.get(i);
        if (!p) continue;

        let isSender = (p === senderPlayer || (p.uuid && senderPlayer.uuid && p.uuid.equals(senderPlayer.uuid)));
        let isSameDim = (!senderDim || !p.level || !p.level.dimension || String(p.level.dimension) === senderDim);

        let inRange = false;
        if (isSameDim) {
            let dx = p.x - sx;
            let dy = p.y - sy;
            let dz = p.z - sz;
            let distSq = dx * dx + dy * dy + dz * dz;
            if (distSq <= maxDistSq) {
                inRange = true;
            }
        }

        if (inRange) {
            // Joueur à portée normale (<= 10 blocs)
            p.tell(Text.of(message));
            if (playSound) {
                try {
                    p.playSound('minecraft:block.note_block.pling', 0.8, 1.2);
                } catch (e) {}
            }
            if (isSender) {
                sentToSender = true;
            }
        } else if (allowStaffSpy) {
            // Joueur hors de portée : vérifier s'il est staff avec Mode Staff ou Vanish activé
            let hasStaffPerm = false;
            try {
                hasStaffPerm = p.hasPermission(2);
            } catch (e) {}

            let isStaffActive = false;
            try {
                isStaffActive = p.persistentData.getBoolean('staff_mode') || p.persistentData.getBoolean('vanished');
            } catch (e) {}

            if (hasStaffPerm && isStaffActive) {
                p.tell(Text.of(`§8[§bStaff§8] ${message}`));
                if (playSound) {
                    try {
                        p.playSound('minecraft:block.note_block.pling', 0.6, 1.2);
                    } catch (e) {}
                }
            }
        }
    }

    // Assure que l'émetteur voit toujours son propre message
    if (!sentToSender) {
        senderPlayer.tell(Text.of(message));
        if (playSound) {
            try {
                senderPlayer.playSound('minecraft:block.note_block.pling', 0.8, 1.2);
            } catch (e) {}
        }
    }

    // Log console pour la modération et l'historique serveur
    try {
        console.log(`[RP 10m] ${message.replace(/§[0-9a-fk-or]/gi, '')}`);
    } catch (e) {}
}

/**
 * Exécute et diffuse un roll
 */
function performRoll(source, key) {
    try {
        let cfg = ROLL_CONFIG[key] || ROLL_CONFIG['classique'];

        // Tirage aléatoire entre 1 et 100
        let score = Math.floor(Math.random() * 100) + 1;
        let resultText = '';
        let scoreColor = '§f';

        if (cfg.isBlessure) {
            // Roll Blessure : 1 à 2 = RPK
            if (score <= 2) {
                resultText = '§4§lRPK';
                scoreColor = '§4§l';
            } else if (score <= 10) {
                resultText = '§c§lÉchec Critique';
                scoreColor = '§c§l';
            } else if (score <= 49) {
                resultText = '§cÉchec';
                scoreColor = '§c';
            } else if (score <= 89) {
                resultText = '§aRéussite Simple';
                scoreColor = '§a';
            } else {
                resultText = '§6§lRéussite Critique';
                scoreColor = '§6§l';
            }
        } else {
            // Paliers standards (1 à 100)
            if (score <= 10) {
                resultText = '§c§lÉchec Critique';
                scoreColor = '§c§l';
            } else if (score <= 49) {
                resultText = '§cÉchec';
                scoreColor = '§c';
            } else if (score <= 89) {
                resultText = '§aRéussite Simple';
                scoreColor = '§a';
            } else {
                resultText = '§6§lRéussite Critique';
                scoreColor = '§6§l';
            }
        }

        // Récupération sécurisée du Nom / Pseudo RP
        let playerName = getRPName(source.player, source);

        // Formatage sobre et élégant du roll
        let msg = `§7[${cfg.color}Roll ${cfg.name}§7] §f${playerName} §8» ${scoreColor}${score}§7/100 §8| ${resultText}`;

        // Diffusion locale (10 blocs) + vision globale pour les staffs en Mode Staff
        broadcastLocal(source.server, source.player, msg, RP_MAX_DISTANCE, true, true);
    } catch (e) {
        console.log('Erreur roll: ' + e);
    }

    return 1;
}

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    // ==========================================
    // COMMANDE /roll (Exactement 8 catégories)
    // ==========================================
    let rollCommand = Commands.literal('roll')
        .executes(c => performRoll(c.source, 'classique'))
        .then(Commands.literal('classique').executes(c => performRoll(c.source, 'classique')))
        .then(Commands.literal('blessure').executes(c => performRoll(c.source, 'blessure')))
        .then(Commands.literal('medecin').executes(c => performRoll(c.source, 'medecin')))
        .then(Commands.literal('creations').executes(c => performRoll(c.source, 'creations')))
        .then(Commands.literal('infections').executes(c => performRoll(c.source, 'infections')))
        .then(Commands.literal('artisana').executes(c => performRoll(c.source, 'artisana')))
        .then(Commands.literal('survie').executes(c => performRoll(c.source, 'survie')))
        .then(Commands.literal('combat').executes(c => performRoll(c.source, 'combat')));

    event.register(rollCommand);

    // ==========================================
    // COMMANDE /me (Esthétique RP soignée avec Nom RP)
    // ==========================================
    let meCommand = Commands.literal('me')
        .executes(c => {
            c.source.sendFailure(Text.of('§cUtilisation : /me <action roleplay>'));
            return 0;
        })
        .then(
            Commands.argument('action', Arguments.GREEDY_STRING.create(event))
                .executes(c => {
                    let action = '';
                    if (c.input) {
                        let firstSpace = c.input.indexOf(' ');
                        if (firstSpace !== -1) {
                            action = c.input.substring(firstSpace + 1).trim();
                        }
                    }
                    if (!action) {
                        try {
                            action = Arguments.GREEDY_STRING.getResult(c, 'action');
                        } catch (e1) {
                            try {
                                let msgObj = Arguments.MESSAGE.getResult(c, 'action');
                                action = msgObj.string || msgObj.getString();
                            } catch (e2) {}
                        }
                    }

                    if (!action) {
                        c.source.sendFailure(Text.of('§cUtilisation : /me <action roleplay>'));
                        return 0;
                    }

                    // Récupération garantie du Nom / Surnom RP
                    let playerName = getRPName(c.source.player, c.source);

                    // Esthétique soignée & immersive : [Action] NomRP » action en italique
                    let meMessage = `§7[§dAction§7] §f${playerName} §8» §d§o${action}`;

                    // Diffusion locale (10 blocs max) + réception staff en mode modération
                    broadcastLocal(c.source.server, c.source.player, meMessage, RP_MAX_DISTANCE, false, true);
                    return 1;
                })
        );

    event.register(meCommand);

    // ==========================================
    // COMMANDES /staff, /modestaff, /staffmode
    // ==========================================
    function registerStaffCommand(cmdName) {
        let cmd = Commands.literal(cmdName)
            .requires(s => s.hasPermission(2))
            .executes(c => {
                let p = c.source.player;
                if (!p) {
                    c.source.sendFailure(Text.of('§cCette commande doit être exécutée par un joueur.'));
                    return 0;
                }
                return togglePlayerStaffMode(p);
            })
            .then(Commands.literal('on').executes(c => {
                let p = c.source.player;
                if (!p) return 0;
                return togglePlayerStaffMode(p, true);
            }))
            .then(Commands.literal('off').executes(c => {
                let p = c.source.player;
                if (!p) return 0;
                return togglePlayerStaffMode(p, false);
            }))
            .then(Commands.literal('status').executes(c => {
                let p = c.source.player;
                if (!p) return 0;
                let active = p.persistentData.getBoolean('staff_mode');
                p.tell(Text.of(`§8[§bStaff§8] §7Statut du Mode Staff : ${active ? '§aActif (ON)' : '§cDésactivé (OFF)'}`));
                return 1;
            }));

        event.register(cmd);
    }

    registerStaffCommand('staff');
    registerStaffCommand('modestaff');
    registerStaffCommand('staffmode');

    console.log('[KubeJS] Système RP sobre (portée locale 10 blocs + Mode Staff + Esthétique /me) initialisé avec succès !');
});

// Rappel discret à la connexion si le mode staff est encore actif
PlayerEvents.loggedIn(event => {
    try {
        let p = event.player;
        if (p && p.hasPermission(2) && p.persistentData.getBoolean('staff_mode')) {
            p.tell(Text.of('§8[§bStaff§8] §eRappel : Ton Mode Staff est toujours §aactivé §7(actions & rolls visibles à distance). Tape §6/staff §7pour le désactiver.'));
        }
    } catch (e) {}
});
