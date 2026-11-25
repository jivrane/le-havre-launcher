// ========================================================
// KubeJS Script : Recettes personnalisées pour eternalZ
// ========================================================

ServerEvents.recipes(event => {
    // 1. Recette avec disposition (Shaped)
    // Exemple : 1 Diamant au-dessus d'une Poudre de Blaze sur un Bâton = Épée Magique
    event.shaped('minecraft:diamond_sword', [
        ' D ',
        ' B ',
        ' S '
    ], {
        D: 'minecraft:diamond',
        B: 'minecraft:blaze_powder',
        S: 'minecraft:stick'
    })

    // 2. Recette sans disposition (Shapeless)
    // Exemple : 1 Lingot de Fer + 1 Poudre de Blaze = 1 Bâton de Blaze
    event.shapeless('minecraft:blaze_rod', [
        'minecraft:iron_ingot',
        'minecraft:blaze_powder'
    ])

    // Exemple de craft munitions / survie : 1 Pépite de Fer + 1 Poudre à canon = 4 Munitions
    event.shapeless('minecraft:iron_ingot', [
        '9x minecraft:iron_nugget'
    ])
})

// Détection de clic sur la table (smithing table)
BlockEvents.rightClicked('minecraft:smithing_table', event => {
    if (event.player.isShiftKeyDown()) {
        event.player.tell("§6[Table Spéciale] §fCombine 1 Fer et 1 Poudre de Blaze dans l'établi pour fabriquer un Bâton de Blaze !")
    }
})
