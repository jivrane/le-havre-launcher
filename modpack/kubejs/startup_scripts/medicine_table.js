// Enregistrement du bloc Table de Médecine
StartupEvents.registry('block', event => {
    event.create('medicine_table')
        .displayName('Table de Médecine')
        .soundType('wood')
        .hardness(2.5)
        .resistance(3.0)
        .tagBlock('minecraft:mineable/axe')
})
