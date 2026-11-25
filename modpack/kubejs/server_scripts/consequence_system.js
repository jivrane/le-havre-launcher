// ========================================================
// SYSTÈME DE CONSÉQUENCES & SÉQUELLES ROLEPLAY (ETERNALZ)
// Forge 1.20.1 - KubeJS
// Gestion individuelle, par liste ou par groupe RP
// ========================================================

const GROUPS_FILE_PATH = 'kubejs/data/rp_groups.json';

// ========================================================
// 1. TYPES DE CONSÉQUENCES PRÉDÉFINIES & EFFETS
// ========================================================
const PRESET_CONSEQUENCES = {
    'fracture': {
        id: 'fracture',
        name: 'Fracture Osseuse',
        desc: 'Fracture importante d\'un membre réduisant drastiquement la mobilité.',
        color: '§c',
        effects: [
            { id: 'minecraft:slowness', amp: 2 },        // Lenteur III
            { id: 'minecraft:mining_fatigue', amp: 0 }
        ]
    },
    'hemorragie': {
        id: 'hemorragie',
        name: 'Hémorragie Active',
        desc: 'Plaie ouverte avec écoulement sanguin continu et affaiblissement vital.',
        color: '§4',
        effects: [
            { id: 'minecraft:weakness', amp: 1 },        // Faiblesse II
            { id: 'minecraft:slowness', amp: 0 }         // Lenteur I
        ]
    },
    'infection': {
        id: 'infection',
        name: 'Infection Bactérienne',
        desc: 'Contamination microbienne provoquant fièvre, sueurs et fatigue.',
        color: '§5',
        effects: [
            { id: 'minecraft:hunger', amp: 1 },          // Faim accrue
            { id: 'minecraft:weakness', amp: 0 }
        ]
    },
    'inconscient': {
        id: 'inconscient',
        name: 'Perte de Connaissance',
        desc: 'État comateux ou évanouissement suite à un traumatisme sévère.',
        color: '§8',
        effects: [
            { id: 'minecraft:blindness', amp: 0 },       // Cécité
            { id: 'minecraft:slowness', amp: 4 },        // Immobilisation
            { id: 'minecraft:weakness', amp: 3 }
        ]
    },
    'traumatisme': {
        id: 'traumatisme',
        name: 'Commotion Cérébrale',
        desc: 'Choc violent à la boîte crânienne entraînant vertiges et désorientation.',
        color: '§6',
        effects: [
            { id: 'minecraft:nausea', amp: 0 },          // Nausée
            { id: 'minecraft:slowness', amp: 0 }
        ]
    },
    'brulure': {
        id: 'brulure',
        name: 'Brûlures Sévères',
        desc: 'Destruction des tissus cutanés provoquant une douleur insoutenable.',
        color: '§e',
        effects: [
            { id: 'minecraft:weakness', amp: 0 },
            { id: 'minecraft:mining_fatigue', amp: 1 }
        ]
    },
    'irradie': {
        id: 'irradie',
        name: 'Irradiation Aiguë',
        desc: 'Exposition à une dose critique de radiations ionisantes.',
        color: '§2',
        effects: [
            { id: 'minecraft:nausea', amp: 0 },
            { id: 'minecraft:hunger', amp: 1 },
            { id: 'minecraft:weakness', amp: 1 }
        ]
    },
    'epuisement': {
        id: 'epuisement',
        name: 'Épuisement Physique',
        desc: 'Asthénie majeure et incapacité physique à soutenir un effort prolongé.',
        color: '§7',
        effects: [
            { id: 'minecraft:slowness', amp: 1 },
            { id: 'minecraft:mining_fatigue', amp: 1 }
        ]
    },
    'amputation': {
        id: 'amputation',
        name: 'Membre Invalide / Amputé',
        desc: 'Perte d\'intégrité physique motrice définitive ou lourde séquelle.',
        color: '§4',
        effects: [
            { id: 'minecraft:slowness', amp: 1 },
            { id: 'minecraft:weakness', amp: 1 }
        ]
    },
    'poison': {
        id: 'poison',
        name: 'Intoxication Toxique',
        desc: 'Absorption d\'une substance chimique ou biologique dangereuse.',
        color: '§2',
        effects: [
            { id: 'minecraft:poison', amp: 0 },
            { id: 'minecraft:hunger', amp: 0 }
        ]
    },
    'douleur': {
        id: 'douleur',
        name: 'Douleur Aiguë',
        desc: 'Souffrance physique vive entravant les mouvements et la concentration.',
        color: '§d',
        effects: [
            { id: 'minecraft:weakness', amp: 0 },
            { id: 'minecraft:slowness', amp: 0 }
        ]
    }
};

// ========================================================
// 2. GESTION DES GROUPES ROLEPLAY (PERSISTANCE JSON)
// ========================================================

function loadGroups() {
    try {
        let data = JsonIO.read(GROUPS_FILE_PATH);
        if (data) return data;
    } catch (e) {}
    return {};
}

function saveGroups(groups) {
    try {
        JsonIO.write(GROUPS_FILE_PATH, groups);
    } catch (e) {
        console.error('[Conséquences] Erreur écriture groupes : ' + e);
    }
}

// ========================================================
// 3. FONCTIONS UTILITAIRES & CIBLAGE
// ========================================================

/**
 * Recherche un joueur par pseudo en ligne
 */
function findOnlinePlayer(server, name) {
    if (!name || !server) return null;
    let players = server.playerList.players;
    let lower = name.toLowerCase();
    for (let i = 0; i < players.size(); i++) {
        let p = players.get(i);
        if (p.username.toLowerCase() === lower || (p.name && p.name.string.toLowerCase() === lower)) {
            return p;
        }
        if (global.rpPseudos && global.rpPseudos[p.username.toLowerCase()] && global.rpPseudos[p.username.toLowerCase()].toLowerCase() === lower) {
            return p;
        }
    }
    return null;
}

/**
 * Résout une cible :
 * - Joueur unique : "Steve"
 * - Liste de joueurs : "Steve,Alex,Bob"
 * - Groupe RP : "Alpha" ou "group:Alpha"
 * - Tous les joueurs : "@a", "all", "tous"
 */
function resolveConsequenceTargets(server, targetArg) {
    if (!targetArg || !server) return [];
    targetArg = targetArg.trim();

    // 1. Tous les joueurs en ligne
    if (targetArg === '@a' || targetArg.equalsIgnoreCase('all') || targetArg.equalsIgnoreCase('tous')) {
        let list = [];
        let players = server.playerList.players;
        for (let i = 0; i < players.size(); i++) {
            list.push(players.get(i));
        }
        return list;
    }

    // 2. Groupe RP
    let groupKey = targetArg.toLowerCase();
    if (groupKey.startsWith('group:') || groupKey.startsWith('@group:')) {
        groupKey = groupKey.replace(/^@?group:/, '');
    }
    let groups = loadGroups();
    if (groups[groupKey]) {
        let memberNames = groups[groupKey];
        let list = [];
        for (let mName of memberNames) {
            let p = findOnlinePlayer(server, mName);
            if (p) list.push(p);
        }
        return list;
    }

    // 3. Liste de joueurs séparés par des virgules
    if (targetArg.includes(',')) {
        let names = targetArg.split(',');
        let list = [];
        for (let name of names) {
            let p = findOnlinePlayer(server, name.trim());
            if (p && !list.includes(p)) list.push(p);
        }
        return list;
    }

    // 4. Joueur unique
    let single = findOnlinePlayer(server, targetArg);
    if (single) return [single];

    return [];
}

/**
 * Formate une durée en texte lisible (ex: "5m 30s" ou "Permanent")
 */
function formatConsequenceDuration(seconds) {
    if (!seconds || seconds <= 0) return '§cPermanent (jusqu\'à soins)';
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    if (m > 0 && s > 0) return `§e${m}m ${s}s`;
    if (m > 0) return `§e${m}m`;
    return `§e${s}s`;
}

// ========================================================
// 4. APPLICATION & GESTION DES CONSÉQUENCES SUR JOUEUR
// ========================================================

/**
 * Applique une conséquence à un joueur
 */
function applyConsequence(player, consKey, durationSec, severity, senderName) {
    if (!player || !player.persistentData) return null;

    let pData = player.persistentData;
    let root = pData.getCompound('rp_consequences');

    let cleanKey = consKey.toLowerCase().trim().replace(/[^a-z0-9_]/g, '_');
    let preset = PRESET_CONSEQUENCES[consKey.toLowerCase().trim()];

    let consId = preset ? preset.id : cleanKey;
    let name = preset ? preset.name : consKey;
    let desc = preset ? preset.desc : 'Conséquence médicale spécifique appliquée en Roleplay.';
    let color = preset ? preset.color : '§c';

    let dur = (durationSec !== undefined && durationSec !== null && durationSec > 0) ? durationSec : -1;
    let sev = (severity && severity >= 1 && severity <= 3) ? severity : 1;

    let entry = root.getCompound(consId);
    entry.putString('id', consId);
    entry.putString('name', name);
    entry.putString('desc', desc);
    entry.putString('color', color);
    entry.putInt('duration', dur);
    entry.putInt('severity', sev);
    entry.putString('appliedBy', senderName || 'Serveur');

    root.put(consId, entry);
    pData.put('rp_consequences', root);

    // Son d'impact médical et notification
    let durText = formatConsequenceDuration(dur);
    let sevLabels = { 1: '§aLégère', 2: '§eModérée', 3: '§4§lCritique' };

    player.tell(Text.of(`§8====================================================`));
    player.tell(Text.of(`§c§l[CONSÉQUENCE MÉDICALE RP]`));
    player.tell(Text.of(`§fVous subissez : ${color}§l${name}`));
    player.tell(Text.of(`§7Description : §f${desc}`));
    player.tell(Text.of(`§7Durée : ${durText} §8| §7Sévérité : ${sevLabels[sev] || sev}`));
    player.tell(Text.of(`§8====================================================`));

    // Message Title immersif
    player.server.runCommandSilent(`title ${player.username} subtitle {"text":"${name} (${durText})","color":"gold"}`);
    player.server.runCommandSilent(`title ${player.username} title {"text":"ATTENTION SÉQUELLE","color":"red","bold":true}`);
    player.server.runCommandSilent(`playsound minecraft:entity.elder_guardian.curse player ${player.username} ${player.x} ${player.y} ${player.z} 0.7 1.0`);

    return {
        id: consId,
        name: name,
        duration: dur,
        severity: sev,
        durText: durText
    };
}

/**
 * Retire une conséquence spécifique d'un joueur
 */
function removeConsequence(player, consId) {
    if (!player || !player.persistentData) return false;
    let pData = player.persistentData;
    if (!pData.contains('rp_consequences')) return false;

    let root = pData.getCompound('rp_consequences');
    consId = consId.toLowerCase().trim();

    if (root.contains(consId)) {
        let entry = root.getCompound(consId);
        let name = entry.getString('name');
        root.remove(consId);
        pData.put('rp_consequences', root);

        player.tell(Text.of(`§a[Santé RP] §fLa conséquence §e${name} §fa été retirée / soignée.`));
        player.server.runCommandSilent(`playsound minecraft:entity.player.levelup player ${player.username} ${player.x} ${player.y} ${player.z} 1.0 1.2`);
        return true;
    }
    return false;
}

/**
 * Retire toutes les conséquences d'un joueur
 */
function clearAllConsequences(player) {
    if (!player || !player.persistentData) return 0;
    let pData = player.persistentData;
    if (!pData.contains('rp_consequences')) return 0;

    let root = pData.getCompound('rp_consequences');
    let count = root.getAllKeys().size();
    pData.remove('rp_consequences');

    player.tell(Text.of(`§a[Santé RP] §fToutes vos séquelles et conséquences ont été §aentièrement soignées §f!`));
    player.server.runCommandSilent(`playsound minecraft:entity.player.levelup player ${player.username} ${player.x} ${player.y} ${player.z} 1.0 1.2`);
    return count;
}

/**
 * Liste les conséquences actives d'un joueur sous forme d'objets JS
 */
function getPlayerConsequencesList(player) {
    if (!player || !player.persistentData) return [];
    let pData = player.persistentData;
    if (!pData.contains('rp_consequences')) return [];

    let root = pData.getCompound('rp_consequences');
    let keys = root.getAllKeys();
    if (!keys || keys.isEmpty()) return [];

    let list = [];
    let it = keys.iterator();
    while (it.hasNext()) {
        let key = String(it.next());
        let entry = root.getCompound(key);
        if (entry) {
            let dur = entry.getInt('duration');
            list.push({
                id: entry.getString('id'),
                name: entry.getString('name'),
                desc: entry.getString('desc'),
                color: entry.getString('color') || '§c',
                duration: dur,
                durationText: formatConsequenceDuration(dur),
                severity: entry.contains('severity') ? entry.getInt('severity') : 1,
                appliedBy: entry.getString('appliedBy') || 'Inconnu'
            });
        }
    }
    return list;
}

// Exports globaux pour être utilisés par le système médical (/soin)
global.getPlayerConsequencesList = getPlayerConsequencesList;
global.removeConsequence = removeConsequence;
global.clearAllConsequences = clearAllConsequences;
global.applyConsequence = applyConsequence;
global.PRESET_CONSEQUENCES = PRESET_CONSEQUENCES;

// ========================================================
// 5. BOUCLE TICK D'APPLICATION DES EFFETS & DÉCOMPTE
// ========================================================
PlayerEvents.tick(event => {
    let p = event.player;
    if (!p) return;

    // Exécution toutes les 20 ticks (exactement 1 seconde)
    if (p.age % 20 === 0) {
        try {
            let pData = p.persistentData;
            if (!pData.contains('rp_consequences')) return;

            let root = pData.getCompound('rp_consequences');
            let keys = root.getAllKeys();
            if (!keys || keys.isEmpty()) return;

            let toRemove = [];
            let it = keys.iterator();

            while (it.hasNext()) {
                let key = String(it.next());
                let entry = root.getCompound(key);
                if (!entry) continue;

                let id = entry.getString('id');
                let dur = entry.getInt('duration');
                let sev = entry.contains('severity') ? entry.getInt('severity') : 1;

                // 1. Appliquer les effets de potion en continu
                let preset = PRESET_CONSEQUENCES[id];
                if (preset && preset.effects) {
                    for (let eff of preset.effects) {
                        let amp = Math.max(0, eff.amp + (sev - 1));
                        p.server.runCommandSilent(`effect give ${p.username} ${eff.id} 3 ${amp} true`);
                    }
                }

                // 2. Décrémentation de la durée
                if (dur > 0) {
                    dur--;
                    if (dur <= 0) {
                        toRemove.push({ id: id, name: entry.getString('name') });
                    } else {
                        entry.putInt('duration', dur);
                    }
                }
            }

            // Nettoyage des conséquences terminées
            if (toRemove.length > 0) {
                for (let item of toRemove) {
                    root.remove(item.id);
                    p.tell(Text.of(`§a[Santé RP] §fLa séquelle §e${item.name} §fest maintenant guérie !`));
                    p.server.runCommandSilent(`playsound minecraft:entity.player.levelup player ${p.username} ${p.x} ${p.y} ${p.z} 1.0 1.2`);
                }
                pData.put('rp_consequences', root);
            }
        } catch (err) {
            console.error('[Conséquences] Erreur tick loop : ' + err);
        }
    }
});

// ========================================================
// 6. PERSISTANCE DES CONSÉQUENCES SUR RESPAWN (MORT RP)
// ========================================================
PlayerEvents.respawned(event => {
    try {
        let oldPlayer = event.oldPlayer;
        let newPlayer = event.player;
        if (oldPlayer && newPlayer && !event.keepData) {
            let oldNBT = oldPlayer.persistentData;
            let newNBT = newPlayer.persistentData;
            if (oldNBT.contains('rp_consequences')) {
                newNBT.put('rp_consequences', oldNBT.get('rp_consequences'));
            }
        }
    } catch (e) {
        console.error('[Conséquences] Erreur transfert persistentData sur respawn: ' + e);
    }
});

// ========================================================
// 7. REGISTRE DES COMMANDES (/consequence, /sequelle, etc.)
// ========================================================
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    function hasAdminPerm(source) {
        if (!source) return false;
        if (!source.player) return true; // Console toujours autorisée
        return source.hasPermission(2);
    }

    function showHelp(source) {
        source.sendSuccess(Text.of('§8============== §c§lAIDE CONSÉQUENCES RP §8=============='), false);
        source.sendSuccess(Text.of('§6Application rapide :'), false);
        source.sendSuccess(Text.of('  §e/consequence <cible> <type|texte> [durée] [sévérité 1-3]'), false);
        source.sendSuccess(Text.of('  §7<cible> : Steve  OU  Steve,Alex,John  OU  Alpha (groupe)  OU  @a (tous)'), false);
        source.sendSuccess(Text.of('§6Gestion des conséquences :'), false);
        source.sendSuccess(Text.of('  §e/consequence list [cible] §8: Liste les séquelles actives.'), false);
        source.sendSuccess(Text.of('  §e/consequence remove <cible> <id> §8: Retire une séquelle.'), false);
        source.sendSuccess(Text.of('  §e/consequence clear <cible> §8: Soigne toutes les séquelles.'), false);
        source.sendSuccess(Text.of('  §e/consequence types §8: Affiche les types de conséquences prédéfinies.'), false);
        source.sendSuccess(Text.of('§6Gestion des groupes RP :'), false);
        source.sendSuccess(Text.of('  §e/consequence group create <nom> §8: Crée un groupe RP.'), false);
        source.sendSuccess(Text.of('  §e/consequence group delete <nom> §8: Supprime un groupe.'), false);
        source.sendSuccess(Text.of('  §e/consequence group add <nom> <joueur> §8: Ajoute un membre.'), false);
        source.sendSuccess(Text.of('  §e/consequence group remove <nom> <joueur> §8: Retire un membre.'), false);
        source.sendSuccess(Text.of('  §e/consequence group list §8: Liste les groupes existants.'), false);
        source.sendSuccess(Text.of('  §e/consequence group members <nom> §8: Affiche les membres.'), false);
        source.sendSuccess(Text.of('§8========================================================='), false);
    }

    function showTypes(source) {
        source.sendSuccess(Text.of('§8============== §c§lTYPES DE CONSÉQUENCES RP §8=============='), false);
        for (let key in PRESET_CONSEQUENCES) {
            let p = PRESET_CONSEQUENCES[key];
            source.sendSuccess(Text.of(`${p.color}§l${p.name} §8(id: §e${p.id}§8) : §7${p.desc}`), false);
        }
        source.sendSuccess(Text.of('§7(Vous pouvez aussi entrer n\'importe quel texte personnalisé libre !)'), false);
        source.sendSuccess(Text.of('§8============================================================='), false);
    }

    function handleApply(source, targetArg, consText, duration, severity) {
        let targets = resolveConsequenceTargets(source.server, targetArg);
        if (targets.length === 0) {
            source.sendFailure(Text.of(`§c[Conséquence] Aucune cible trouvée pour : "${targetArg}". (Joueur hors ligne, groupe inexistant ou liste vide)`));
            return 0;
        }

        let senderName = source.player ? (source.player.username || source.player.name.string) : 'Serveur';
        let appliedResults = [];

        for (let target of targets) {
            let res = applyConsequence(target, consText, duration, severity, senderName);
            if (res) appliedResults.push(target.username);
        }

        let durText = formatConsequenceDuration(duration);
        source.sendSuccess(Text.of(`§a[Conséquence] §fConséquence appliquée avec succès à §e${appliedResults.length} joueur(s) §8(${appliedResults.join(', ')}) §f: §c${consText} §8[${durText}]§f.`), true);
        return 1;
    }

    function handleRemove(source, targetArg, consId) {
        let targets = resolveConsequenceTargets(source.server, targetArg);
        if (targets.length === 0) {
            source.sendFailure(Text.of(`§c[Conséquence] Aucune cible trouvée pour : "${targetArg}".`));
            return 0;
        }

        let count = 0;
        for (let target of targets) {
            if (removeConsequence(target, consId)) count++;
        }

        source.sendSuccess(Text.of(`§a[Conséquence] §fSéquelle §e${consId} §fretirée chez §e${count} / ${targets.length} §fjoueur(s).`), true);
        return 1;
    }

    function handleClear(source, targetArg) {
        let targets = resolveConsequenceTargets(source.server, targetArg);
        if (targets.length === 0) {
            source.sendFailure(Text.of(`§c[Conséquence] Aucune cible trouvée pour : "${targetArg}".`));
            return 0;
        }

        let total = 0;
        for (let target of targets) {
            total += clearAllConsequences(target);
        }

        source.sendSuccess(Text.of(`§a[Conséquence] §fToutes les conséquences ont été retirées chez §e${targets.length} joueur(s) §8(${total} séquelles soignées au total)§f.`), true);
        return 1;
    }

    function handleList(source, targetArg) {
        let target = null;
        if (targetArg) {
            target = findOnlinePlayer(source.server, targetArg);
            if (!target) {
                source.sendFailure(Text.of(`§c[Conséquence] Joueur introuvable en ligne : "${targetArg}".`));
                return 0;
            }
        } else if (source.entity && source.entity.isPlayer()) {
            target = source.entity;
        } else {
            source.sendFailure(Text.of('§cPrécisez un joueur : /consequence list <joueur>'));
            return 0;
        }

        let list = getPlayerConsequencesList(target);
        source.sendSuccess(Text.of(`§8============== §c§lSÉQUELLES : §e${target.username} §8==============`), false);
        if (list.length === 0) {
            source.sendSuccess(Text.of('§a✔ État de santé sain : Aucune séquelle active.'), false);
        } else {
            source.sendSuccess(Text.of(`§7Total : §e${list.length} conséquence(s) active(s) :`), false);
            for (let c of list) {
                source.sendSuccess(Text.of(`  ${c.color}§l- ${c.name} §8(id: §e${c.id}§8)`), false);
                source.sendSuccess(Text.of(`    §7Durée : ${c.durationText} §8| §7Sévérité : §e${c.severity} §8| §7Par : §f${c.appliedBy}`), false);
                source.sendSuccess(Text.of(`    §8${c.desc}`), false);
            }
        }
        source.sendSuccess(Text.of(`§8===================================================`), false);
        return 1;
    }

    // Gestion des groupes
    function handleGroupCommand(source, subAction, groupName, extra) {
        let groups = loadGroups();
        groupName = groupName ? groupName.toLowerCase().trim() : '';

        if (subAction === 'create') {
            if (!groupName) {
                source.sendFailure(Text.of('§cUtilisation : /consequence group create <nom_du_groupe>'));
                return 0;
            }
            if (groups[groupName]) {
                source.sendFailure(Text.of(`§cLe groupe "${groupName}" existe déjà !`));
                return 0;
            }
            groups[groupName] = [];
            saveGroups(groups);
            source.sendSuccess(Text.of(`§a[Groupe RP] §fLe groupe §b${groupName} §fa été créé avec succès.`), true);
            return 1;
        }

        if (subAction === 'delete') {
            if (!groupName || !groups[groupName]) {
                source.sendFailure(Text.of(`§cLe groupe "${groupName}" n'existe pas.`));
                return 0;
            }
            delete groups[groupName];
            saveGroups(groups);
            source.sendSuccess(Text.of(`§a[Groupe RP] §fLe groupe §b${groupName} §fa été supprimé.`), true);
            return 1;
        }

        if (subAction === 'add') {
            if (!groupName || !extra) {
                source.sendFailure(Text.of('§cUtilisation : /consequence group add <groupe> <joueur>'));
                return 0;
            }
            if (!groups[groupName]) {
                groups[groupName] = [];
            }
            let playerClean = extra.trim();
            if (!groups[groupName].includes(playerClean)) {
                groups[groupName].push(playerClean);
                saveGroups(groups);
                source.sendSuccess(Text.of(`§a[Groupe RP] §fJoueur §e${playerClean} §fajouté au groupe §b${groupName}§f.`), true);
            } else {
                source.sendFailure(Text.of(`§cLe joueur ${playerClean} est déjà dans le groupe ${groupName}.`));
            }
            return 1;
        }

        if (subAction === 'remove') {
            if (!groupName || !extra) {
                source.sendFailure(Text.of('§cUtilisation : /consequence group remove <groupe> <joueur>'));
                return 0;
            }
            if (!groups[groupName]) {
                source.sendFailure(Text.of(`§cLe groupe "${groupName}" n'existe pas.`));
                return 0;
            }
            let playerClean = extra.trim();
            let idx = groups[groupName].indexOf(playerClean);
            if (idx !== -1) {
                groups[groupName].splice(idx, 1);
                saveGroups(groups);
                source.sendSuccess(Text.of(`§a[Groupe RP] §fJoueur §e${playerClean} §fretiré du groupe §b${groupName}§f.`), true);
            } else {
                source.sendFailure(Text.of(`§cLe joueur ${playerClean} ne fait pas partie du groupe ${groupName}.`));
            }
            return 1;
        }

        if (subAction === 'list') {
            let gNames = Object.keys(groups);
            source.sendSuccess(Text.of('§8============== §b§lGROUPES ROLEPLAY §8=============='), false);
            if (gNames.length === 0) {
                source.sendSuccess(Text.of('§7Aucun groupe créé. Utilisez §e/consequence group create <nom>§7.'), false);
            } else {
                for (let gn of gNames) {
                    source.sendSuccess(Text.of(`§8- §b${gn} §7(${groups[gn].length} membres) : §f${groups[gn].join(', ')}`), false);
                }
            }
            source.sendSuccess(Text.of('§8==================================================='), false);
            return 1;
        }

        if (subAction === 'members') {
            if (!groupName || !groups[groupName]) {
                source.sendFailure(Text.of(`§cLe groupe "${groupName}" n'existe pas.`));
                return 0;
            }
            let members = groups[groupName];
            source.sendSuccess(Text.of(`§8============== §b§lMEMBRES : §e${groupName} §8==============`), false);
            if (members.length === 0) {
                source.sendSuccess(Text.of('§7Ce groupe est vide.'), false);
            } else {
                for (let m of members) {
                    let onlineP = findOnlinePlayer(source.server, m);
                    source.sendSuccess(Text.of(`  §8- §f${m} ${onlineP ? '§a[En ligne]' : '§7[Hors ligne]'}`), false);
                }
            }
            source.sendSuccess(Text.of('§8==================================================='), false);
            return 1;
        }

        return 0;
    }

    // ========================================================
    // CRÉATION DE L'ARBORESCENCE /consequence
    // ========================================================
    function buildConsequenceCommand(cmdName) {
        let cmd = Commands.literal(cmdName)
            .requires(s => hasAdminPerm(s))
            .executes(c => {
                showHelp(c.source);
                return 1;
            })
            .then(Commands.literal('help').executes(c => {
                showHelp(c.source);
                return 1;
            }))
            .then(Commands.literal('types').executes(c => {
                showTypes(c.source);
                return 1;
            }))
            .then(
                Commands.literal('list')
                    .executes(c => handleList(c.source, null))
                    .then(
                        Commands.argument('cible', Arguments.STRING.create(event))
                            .executes(c => {
                                let targetName = Arguments.STRING.getResult(c, 'cible');
                                return handleList(c.source, targetName);
                            })
                    )
            )
            .then(
                Commands.literal('apply')
                    .requires(s => hasAdminPerm(s))
                    .then(
                        Commands.argument('cible', Arguments.STRING.create(event))
                            .then(
                                Commands.argument('type_ou_texte', Arguments.STRING.create(event))
                                    .executes(c => {
                                        let target = Arguments.STRING.getResult(c, 'cible');
                                        let type = Arguments.STRING.getResult(c, 'type_ou_texte');
                                        return handleApply(c.source, target, type, -1, 1);
                                    })
                                    .then(
                                        Commands.argument('duree', Arguments.INTEGER.create(event))
                                            .executes(c => {
                                                let target = Arguments.STRING.getResult(c, 'cible');
                                                let type = Arguments.STRING.getResult(c, 'type_ou_texte');
                                                let dur = Arguments.INTEGER.getResult(c, 'duree');
                                                return handleApply(c.source, target, type, dur, 1);
                                            })
                                            .then(
                                                Commands.argument('severite', Arguments.INTEGER.create(event))
                                                    .executes(c => {
                                                        let target = Arguments.STRING.getResult(c, 'cible');
                                                        let type = Arguments.STRING.getResult(c, 'type_ou_texte');
                                                        let dur = Arguments.INTEGER.getResult(c, 'duree');
                                                        let sev = Arguments.INTEGER.getResult(c, 'severite');
                                                        return handleApply(c.source, target, type, dur, sev);
                                                    })
                                            )
                                    )
                            )
                    )
            )
            .then(
                Commands.literal('remove')
                    .requires(s => hasAdminPerm(s))
                    .then(
                        Commands.argument('cible', Arguments.STRING.create(event))
                            .then(
                                Commands.argument('id', Arguments.STRING.create(event))
                                    .executes(c => {
                                        let target = Arguments.STRING.getResult(c, 'cible');
                                        let id = Arguments.STRING.getResult(c, 'id');
                                        return handleRemove(c.source, target, id);
                                    })
                            )
                    )
            )
            .then(
                Commands.literal('clear')
                    .requires(s => hasAdminPerm(s))
                    .then(
                        Commands.argument('cible', Arguments.STRING.create(event))
                            .executes(c => {
                                let target = Arguments.STRING.getResult(c, 'cible');
                                return handleClear(c.source, target);
                            })
                    )
            )
            .then(
                Commands.literal('group')
                    .requires(s => hasAdminPerm(s))
                    .then(
                        Commands.literal('list').executes(c => handleGroupCommand(c.source, 'list', null, null))
                    )
                    .then(
                        Commands.literal('create')
                            .then(
                                Commands.argument('nom', Arguments.STRING.create(event))
                                    .executes(c => {
                                        let name = Arguments.STRING.getResult(c, 'nom');
                                        return handleGroupCommand(c.source, 'create', name, null);
                                    })
                            )
                    )
                    .then(
                        Commands.literal('delete')
                            .then(
                                Commands.argument('nom', Arguments.STRING.create(event))
                                    .executes(c => {
                                        let name = Arguments.STRING.getResult(c, 'nom');
                                        return handleGroupCommand(c.source, 'delete', name, null);
                                    })
                            )
                    )
                    .then(
                        Commands.literal('add')
                            .then(
                                Commands.argument('nom', Arguments.STRING.create(event))
                                    .then(
                                        Commands.argument('joueur', Arguments.STRING.create(event))
                                            .executes(c => {
                                                let name = Arguments.STRING.getResult(c, 'nom');
                                                let pName = Arguments.STRING.getResult(c, 'joueur');
                                                return handleGroupCommand(c.source, 'add', name, pName);
                                            })
                                    )
                            )
                    )
                    .then(
                        Commands.literal('remove')
                            .then(
                                Commands.argument('nom', Arguments.STRING.create(event))
                                    .then(
                                        Commands.argument('joueur', Arguments.STRING.create(event))
                                            .executes(c => {
                                                let name = Arguments.STRING.getResult(c, 'nom');
                                                let pName = Arguments.STRING.getResult(c, 'joueur');
                                                return handleGroupCommand(c.source, 'remove', name, pName);
                                            })
                                    )
                            )
                    )
                    .then(
                        Commands.literal('members')
                            .then(
                                Commands.argument('nom', Arguments.STRING.create(event))
                                    .executes(c => {
                                        let name = Arguments.STRING.getResult(c, 'nom');
                                        return handleGroupCommand(c.source, 'members', name, null);
                                    })
                            )
                    )
            )
            // SYNTAXE DIRECTE : /consequence <cible> <type|texte> [duree] [severite]
            .then(
                Commands.argument('cible', Arguments.STRING.create(event))
                    .requires(s => hasAdminPerm(s))
                    .then(
                        Commands.argument('type_ou_texte', Arguments.STRING.create(event))
                            .executes(c => {
                                let target = Arguments.STRING.getResult(c, 'cible');
                                let type = Arguments.STRING.getResult(c, 'type_ou_texte');
                                return handleApply(c.source, target, type, -1, 1);
                            })
                            .then(
                                Commands.argument('duree', Arguments.INTEGER.create(event))
                                    .executes(c => {
                                        let target = Arguments.STRING.getResult(c, 'cible');
                                        let type = Arguments.STRING.getResult(c, 'type_ou_texte');
                                        let dur = Arguments.INTEGER.getResult(c, 'duree');
                                        return handleApply(c.source, target, type, dur, 1);
                                    })
                                    .then(
                                        Commands.argument('severite', Arguments.INTEGER.create(event))
                                            .executes(c => {
                                                let target = Arguments.STRING.getResult(c, 'cible');
                                                let type = Arguments.STRING.getResult(c, 'type_ou_texte');
                                                let dur = Arguments.INTEGER.getResult(c, 'duree');
                                                let sev = Arguments.INTEGER.getResult(c, 'severite');
                                                return handleApply(c.source, target, type, dur, sev);
                                            })
                                    )
                            )
                    )
            );

        event.register(cmd);
    }

    // COMMANDE UNIQUE : /consequence (Gestion complète des conséquences RP)
    buildConsequenceCommand('consequence');

    console.log('[KubeJS] Système de Conséquences Roleplay initialisé (Commande unique : /consequence) !');
});
