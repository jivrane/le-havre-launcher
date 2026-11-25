// ========================================================
// SYSTÈME DE VANISH SURVIE SILENCIEUX (/vanish & /v)
// Hôte invisible, blocs et armures en main masqués
// Serveur EternalZ (Forge 1.20.1 - KubeJS)
// ========================================================

const EquipmentSlot = Java.loadClass('net.minecraft.world.entity.EquipmentSlot');
const ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack');
const ClientboundSetEquipmentPacket = Java.loadClass('net.minecraft.network.protocol.game.ClientboundSetEquipmentPacket');
const Pair = Java.loadClass('com.mojang.datafixers.util.Pair');
const ArrayList = Java.loadClass('java.util.ArrayList');

/**
 * Envoie un paquet à tous les autres joueurs indiquant que le joueur vanish
 * n'a aucun bloc en main, aucune arme et aucune armure (mains et corps 100% invisibles).
 */
function broadcastEmptyEquipment(vanishedPlayer) {
    try {
        let list = new ArrayList();
        list.add(Pair.of(EquipmentSlot.MAINHAND, ItemStack.EMPTY));
        list.add(Pair.of(EquipmentSlot.OFFHAND, ItemStack.EMPTY));
        list.add(Pair.of(EquipmentSlot.HEAD, ItemStack.EMPTY));
        list.add(Pair.of(EquipmentSlot.CHEST, ItemStack.EMPTY));
        list.add(Pair.of(EquipmentSlot.LEGS, ItemStack.EMPTY));
        list.add(Pair.of(EquipmentSlot.FEET, ItemStack.EMPTY));

        let packet = new ClientboundSetEquipmentPacket(vanishedPlayer.id, list);

        let players = vanishedPlayer.server.playerList.players;
        for (let i = 0; i < players.size(); i++) {
            let other = players.get(i);
            if (other.id !== vanishedPlayer.id) {
                other.connection.send(packet);
            }
        }
    } catch (e) {
        console.log('[Vanish] Erreur broadcastEmptyEquipment : ' + e);
    }
}

/**
 * Restaure l'affichage normal de l'armure et des blocs/armes en main
 * pour les autres joueurs quand le joueur désactive le vanish.
 */
function restoreEquipmentToOthers(player) {
    try {
        let list = new ArrayList();
        list.add(Pair.of(EquipmentSlot.MAINHAND, player.mainHandItem));
        list.add(Pair.of(EquipmentSlot.OFFHAND, player.offHandItem));
        list.add(Pair.of(EquipmentSlot.HEAD, player.getItemBySlot(EquipmentSlot.HEAD)));
        list.add(Pair.of(EquipmentSlot.CHEST, player.getItemBySlot(EquipmentSlot.CHEST)));
        list.add(Pair.of(EquipmentSlot.LEGS, player.getItemBySlot(EquipmentSlot.LEGS)));
        list.add(Pair.of(EquipmentSlot.FEET, player.getItemBySlot(EquipmentSlot.FEET)));

        let packet = new ClientboundSetEquipmentPacket(player.id, list);

        let players = player.server.playerList.players;
        for (let i = 0; i < players.size(); i++) {
            let other = players.get(i);
            if (other.id !== player.id) {
                other.connection.send(packet);
            }
        }
    } catch (e) {
        console.log('[Vanish] Erreur restoreEquipmentToOthers : ' + e);
    }
}

ServerEvents.commandRegistry(event => {
    const { commands: Commands } = event;

    function toggleVanish(player) {
        let pData = player.persistentData;
        let isVanished = pData.getBoolean('vanished');

        if (!isVanished) {
            // === ACTIVATION ===
            pData.putBoolean('vanished', true);

            // Effets d'invisibilité et vision nocturne (infinis, sans particules)
            player.potionEffects.add('minecraft:invisibility', 2147483647, 0, false, false);
            player.potionEffects.add('minecraft:night_vision', 2147483647, 0, false, false);

            // Invulnérabilité
            player.setInvulnerable(true);

            // Vol activé en survie
            player.abilities.mayfly = true;
            player.abilities.flying = true;
            player.onUpdateAbilities();

            // Masque immédiatement tous les blocs, armes et armures tenus aux yeux des autres
            broadcastEmptyEquipment(player);

            // Message privé
            player.tell(Text.of('§7[§cVanish§7] §aVanish activé §8(Survie invisible, blocs/mains masqués).'));

            try {
                player.playSound('minecraft:block.beacon.deactivate', 0.8, 1.5);
            } catch (e) {}
        } else {
            // === DÉSACTIVATION ===
            pData.putBoolean('vanished', false);

            // Retrait des effets
            player.potionEffects.remove('minecraft:invisibility');
            player.potionEffects.remove('minecraft:night_vision');

            // Retrait de l'invulnérabilité
            player.setInvulnerable(false);

            // Rétablissement du vol normal si pas en créatif
            if (!player.isCreative()) {
                player.abilities.mayfly = false;
                player.abilities.flying = false;
                player.onUpdateAbilities();
            }

            // Réaffichage normal des blocs, armes et armures aux yeux des autres
            restoreEquipmentToOthers(player);

            // Message privé
            player.tell(Text.of('§7[§cVanish§7] §cVanish désactivé §8(Tu es de nouveau visible).'));

            try {
                player.playSound('minecraft:block.beacon.activate', 0.8, 1.5);
            } catch (e) {}
        }
        return 1;
    }

    const registerVanish = (cmdName) => {
        event.register(
            Commands.literal(cmdName)
                .requires(s => s.hasPermission(2)) // Réservé OP / Staff
                .executes(c => {
                    let p = c.source.player;
                    if (!p) {
                        c.source.sendFailure(Text.of('§cCette commande doit être exécutée par un joueur en jeu.'));
                        return 0;
                    }
                    return toggleVanish(p);
                })
        );
    };

    registerVanish('vanish');
    registerVanish('v');

    console.log('[KubeJS] Vanish avec masquage des blocs en main initialisé !');
});

// Masquage continu des blocs/objets en main pour les joueurs en vanish
PlayerEvents.tick(event => {
    let p = event.player;
    if (p && p.persistentData.getBoolean('vanished')) {
        // Envoie le paquet toutes les 4 ticks pour maintenir les blocs/armes 100% invisibles
        if (p.age % 4 === 0) {
            broadcastEmptyEquipment(p);
        }
    }
});

// Annulation totale des dégâts subis en vanish
EntityEvents.hurt(event => {
    try {
        if (event.entity && event.entity.isPlayer() && event.entity.persistentData.getBoolean('vanished')) {
            event.setCanceled(true);
        }
    } catch (e) {}
});

// Rappel discret à la connexion si toujours en vanish
PlayerEvents.loggedIn(event => {
    try {
        let p = event.player;
        if (p && p.persistentData.getBoolean('vanished')) {
            p.tell(Text.of('§7[§cVanish§7] §eRappel : Tu es toujours en mode Vanish. Tape §6/vanish §epour le désactiver.'));
            broadcastEmptyEquipment(p);
        }
    } catch (e) {}
});
