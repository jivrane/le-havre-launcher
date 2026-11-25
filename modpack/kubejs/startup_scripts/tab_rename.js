// ========================================================
// FORMAT DU TAB LIST & DISPLAY NAME RP (ForgeEvents)
// Ce script doit être dans startup_scripts car ForgeEvents
// n'est disponible que lors de l'initialisation de Forge.
// ========================================================

ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerEvent$TabListNameFormat', event => {
    try {
        let player = event.entity;
        if (!player) return;
        let nick = global.getPlayerDisplayName ? global.getPlayerDisplayName(player) : null;
        if (nick && nick !== player.username) {
            event.setDisplayName(Component.literal('\u00a7b' + nick));
        } else {
            event.setDisplayName(null);
        }
    } catch (e) {}
});

ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerEvent$NameFormat', event => {
    try {
        let player = event.entity;
        if (!player) return;
        let nick = global.getPlayerDisplayName ? global.getPlayerDisplayName(player) : null;
        if (nick && nick !== player.username) {
            event.setDisplayname(Component.literal('\u00a7b' + nick));
        }
    } catch (e) {}
});

console.log('[KubeJS Startup] Listeners Forge TabListNameFormat & NameFormat charges !');
