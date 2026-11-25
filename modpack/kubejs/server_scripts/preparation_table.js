// ========================================================
// TABLE DU LABORATOIRE DE PRÉPARATION (SECONDE TABLE)
// Serveur EternalZ (Forge 1.20.1 / KubeJS)
// ========================================================
// Table séparée de la Table de Soins.
// Transforme les matériaux bruts (sable, blé, fer, charbon, etc.)
// en composants médicaux intermédiaires utilisés pour fabriquer
// les soins avancés et seringues.
// Accessible à tous via /labo ou sur les établis / tables de forge.
// ========================================================

// ========================================================
// 1. DÉFINITION DES RECETTES DE TRANSFORMATION DU LABO
// ========================================================
const PREPARATION_PAGES = [
    // ----------------------------------------------------
    // PAGE 1 : Matériaux & Synthèse Industrielle (7 objets)
    // ----------------------------------------------------
    {
        title: '§6§lLaboratoire §8(1/3) - §eMatériaux & Synthèse',
        items: [
            {
                id: 'prep_cloth',
                slot: 10,
                item: 'zombie_extreme:cloth',
                nbt: null,
                count: 4,
                name: '§fTissu Médical Stérile (x4)',
                desc: '§7Toile de gaze absorbante pour pansements et compresses.',
                costs: [
                    { id: 'minecraft:string', count: 4, name: 'Fils & fibres de coton' },
                    { id: 'minecraft:paper', count: 2, name: 'Papier de cellulose' }
                ]
            },
            {
                id: 'prep_rubber',
                slot: 11,
                item: 'zombie_extreme:rubber',
                nbt: null,
                count: 2,
                name: '§8Caoutchouc Élastomère (x2)',
                desc: '§7Latex vulcanisé souple et étanche pour garrots et tubulures.',
                costs: [
                    { id: 'minecraft:honeycomb', count: 3, name: 'Rayons de cire et résine' },
                    { id: 'minecraft:charcoal', count: 2, name: 'Charbon de vulcanisation' },
                    { id: 'minecraft:clay_ball', count: 1, name: 'Argile de moulage' }
                ]
            },
            {
                id: 'prep_plastic',
                slot: 12,
                item: 'zombie_extreme:plastic',
                nbt: null,
                count: 2,
                name: '§6Polymère Plastique (x2)',
                desc: '§7Plastique renforcé pour piluliers et boîtiers étanches.',
                costs: [
                    { id: 'minecraft:charcoal', count: 4, name: 'Hydrocarbures de synthèse' },
                    { id: 'minecraft:clay_ball', count: 2, name: 'Argile kaolin' },
                    { id: 'minecraft:glass_bottle', count: 1, name: 'Fiole en verre de fusion' }
                ]
            },
            {
                id: 'prep_steel_plate',
                slot: 13,
                item: 'zombie_extreme:steel_plate',
                nbt: null,
                count: 2,
                name: '§7Plaques d\'Acier Chirurgical (x2)',
                desc: '§7Acier trempé inoxydable pour boîtiers et matériel opératoire.',
                costs: [
                    { id: 'minecraft:iron_ingot', count: 4, name: 'Lingots de fer pur' },
                    { id: 'minecraft:charcoal', count: 4, name: 'Combustible de forge' },
                    { id: 'minecraft:copper_ingot', count: 1, name: 'Lingot de cuivre' }
                ]
            },
            {
                id: 'prep_ignotsteel',
                slot: 14,
                item: 'zombie_extreme:ignotsteel',
                nbt: null,
                count: 2,
                name: '§7Lingots d\'Acier Trempé (x2)',
                desc: '§7Métal forgé ultra-résistant pour instruments lourds.',
                costs: [
                    { id: 'minecraft:iron_ingot', count: 3, name: 'Lingots de fer brut' },
                    { id: 'minecraft:copper_ingot', count: 2, name: 'Lingots de cuivre' },
                    { id: 'minecraft:charcoal', count: 6, name: 'Charbon de trempe' }
                ]
            },
            {
                id: 'prep_filter',
                slot: 15,
                item: 'zombie_extreme:filter',
                nbt: null,
                count: 1,
                name: '§3Cartouche Filtrante Décontaminante',
                desc: '§7Filtre multicouche de stérilisation et élimination bactérienne.',
                costs: [
                    { id: 'minecraft:charcoal', count: 8, name: 'Charbon actif microporeux' },
                    { id: 'minecraft:paper', count: 4, name: 'Feuilles de papier stérile' },
                    { id: 'minecraft:string', count: 2, name: 'Fils de maintien' },
                    { id: 'minecraft:clay_ball', count: 1, name: 'Cadre céramique' }
                ]
            },
            {
                id: 'prep_batteries',
                slot: 16,
                item: 'zombie_extreme:batteries',
                nbt: null,
                count: 1,
                name: '§eMicro-Batterie Thermique',
                desc: '§7Cellule énergétique pour conservation sous vide et cryogénie.',
                costs: [
                    { id: 'minecraft:copper_ingot', count: 4, name: 'Plaques de cuivre' },
                    { id: 'minecraft:iron_nugget', count: 4, name: 'Pépites de fer' },
                    { id: 'minecraft:charcoal', count: 3, name: 'Électrolyte de charbon' },
                    { id: 'minecraft:clay_ball', count: 1, name: 'Isolant en argile' }
                ]
            }
        ]
    },

    // ----------------------------------------------------
    // PAGE 2 : Chimie, Verrerie & Distillation (7 objets)
    // ----------------------------------------------------
    {
        title: '§6§lLaboratoire §8(2/3) - §bChimie & Verrerie',
        items: [
            {
                id: 'prep_glass_bottle',
                slot: 10,
                item: 'minecraft:glass_bottle',
                nbt: null,
                count: 4,
                name: '§bFioles en Verre Soufflé (x4)',
                desc: '§7Flacons borosilicatés pour solutés et alcools.',
                costs: [
                    { id: 'minecraft:sand', count: 4, name: 'Sable de silice' },
                    { id: 'minecraft:charcoal', count: 2, name: 'Charbon de verrerie' }
                ]
            },
            {
                id: 'prep_vodka',
                slot: 11,
                item: 'zombie_extreme:vodka',
                nbt: null,
                count: 2,
                name: '§fAlcool Distillé 70° (x2)',
                desc: '§7Éthanol pur pour désinfection et solvant d\'extraction.',
                costs: [
                    { id: 'minecraft:wheat', count: 4, name: 'Blé de fermentation' },
                    { id: 'minecraft:sugar', count: 3, name: 'Sucre réactif' },
                    { id: 'minecraft:glass_bottle', count: 2, name: 'Fioles en verre' }
                ]
            },
            {
                id: 'prep_whiskey',
                slot: 12,
                item: 'zombie_extreme:whiskey',
                nbt: null,
                count: 2,
                name: '§6Whiskey Chirurgical Fort (x2)',
                desc: '§7Désinfectant lourd de campagne pour instruments opératoires.',
                costs: [
                    { id: 'minecraft:wheat', count: 6, name: 'Moût de blé vieilli' },
                    { id: 'minecraft:charcoal', count: 3, name: 'Charbon de distillation' },
                    { id: 'minecraft:glass_bottle', count: 2, name: 'Fioles en verre' },
                    { id: 'minecraft:sugar', count: 1, name: 'Sucre' }
                ]
            },
            {
                id: 'prep_acid',
                slot: 13,
                item: 'zombie_extreme:acid_bottle',
                nbt: null,
                count: 1,
                name: '§aFlacon d\'Acide de Synthèse',
                desc: '§7Composé chimique concentré pour catalyse d\'alcaloïdes.',
                costs: [
                    { id: 'minecraft:glass_bottle', count: 3, name: 'Fioles en verre résistant' },
                    { id: 'minecraft:charcoal', count: 4, name: 'Charbon actif' },
                    { id: 'minecraft:iron_nugget', count: 2, name: 'Pépites de fer' },
                    { id: 'minecraft:gunpowder', count: 1, name: 'Poudre réactive' }
                ]
            },
            {
                id: 'prep_clean_water',
                slot: 14,
                item: 'medicalmod:clean_water',
                nbt: null,
                count: 2,
                name: '§9Eau Distillée Stérile (x2)',
                desc: '§7Eau apyrogène déminéralisée pour solutés injectables.',
                costs: [
                    { id: 'minecraft:glass_bottle', count: 2, name: 'Fioles en verre' },
                    { id: 'minecraft:charcoal', count: 3, name: 'Charbon filtrant' },
                    { id: 'minecraft:paper', count: 1, name: 'Papier de microfiltration' }
                ]
            },
            {
                id: 'prep_cotton_swab',
                slot: 15,
                item: 'medicalmod:cotton_swab',
                nbt: null,
                count: 4,
                name: '§fÉcouvillons Applicateurs (x4)',
                desc: '§7Tampons de coton stérile pour prélèvements et antiseptiques.',
                costs: [
                    { id: 'minecraft:string', count: 3, name: 'Fils de coton' },
                    { id: 'minecraft:stick', count: 2, name: 'Tiges en bois' }
                ]
            },
            {
                id: 'prep_syringe',
                slot: 16,
                item: 'medicalmod:syringe',
                nbt: null,
                count: 2,
                name: '§bSeringues Hypodermiques (x2)',
                desc: '§7Seringues stériles à aiguille creuse en acier et piston.',
                costs: [
                    { id: 'minecraft:glass_bottle', count: 2, name: 'Corps en verre' },
                    { id: 'minecraft:iron_nugget', count: 4, name: 'Pépites de fer (aiguilles)' },
                    { id: 'minecraft:string', count: 1, name: 'Joint du piston' }
                ]
            }
        ]
    },

    // ----------------------------------------------------
    // PAGE 3 : Dispositifs Médicaux & Pharmacie (7 objets)
    // ----------------------------------------------------
    {
        title: '§6§lLaboratoire §8(3/3) - §dDispositifs & Pharmacie',
        items: [
            {
                id: 'prep_iv_bag',
                slot: 10,
                item: 'medicalmod:iv_bag',
                nbt: null,
                count: 2,
                name: '§bPoches de Perfusion IV (x2)',
                desc: '§7Poches étanches pour solutés d\'hydratation et transfusion.',
                costs: [
                    { id: 'minecraft:leather', count: 2, name: 'Cuir souple étanche' },
                    { id: 'minecraft:string', count: 3, name: 'Tubulures flexibles' },
                    { id: 'minecraft:glass_bottle', count: 2, name: 'Valves en verre' },
                    { id: 'minecraft:iron_nugget', count: 1, name: 'Connecteur en fer' }
                ]
            },
            {
                id: 'prep_mask',
                slot: 11,
                item: 'medicalmod:mask',
                nbt: null,
                count: 3,
                name: '§fMasques Chirurgicaux FFP3 (x3)',
                desc: '§7Protection respiratoire stérile haute filtration.',
                costs: [
                    { id: 'minecraft:paper', count: 4, name: 'Papier filtrant multicouche' },
                    { id: 'minecraft:string', count: 3, name: 'Élastiques de maintien' }
                ]
            },
            {
                id: 'prep_surgery_tools',
                slot: 12,
                item: 'medicalmod:surgery_tools',
                nbt: null,
                count: 1,
                name: '§cInstruments Chirurgicaux',
                desc: '§7Bistouris, pinces hémostatiques et matériel opératoire.',
                costs: [
                    { id: 'minecraft:iron_ingot', count: 4, name: 'Lingots de fer' },
                    { id: 'minecraft:iron_nugget', count: 3, name: 'Pépites de fer' },
                    { id: 'minecraft:shears', count: 1, name: 'Ciseaux de découpe' },
                    { id: 'minecraft:string', count: 2, name: 'Fils de maintien' },
                    { id: 'minecraft:leather', count: 1, name: 'Étui en cuir' }
                ]
            },
            {
                id: 'prep_bint',
                slot: 13,
                item: 'zmodfood:bint',
                nbt: null,
                count: 2,
                name: '§fBandage Médical Bint (x2)',
                desc: '§7Rouleau de gaze purifiée stérile haute densité.',
                costs: [
                    { id: 'zombie_extreme:cloth', count: 2, name: 'Tissu stérile' },
                    { id: 'minecraft:string', count: 2, name: 'Fils de ligature' }
                ]
            },
            {
                id: 'prep_aspirin',
                slot: 14,
                item: 'zmodfood:aspirin',
                nbt: null,
                count: 2,
                name: '§aBoîte d\'Aspirine (x2)',
                desc: '§7Comprimés analgésiques préparés à partir d\'extraits de pavot.',
                costs: [
                    { id: 'minecraft:poppy', count: 4, name: 'Coquelicots frais' },
                    { id: 'minecraft:sugar', count: 2, name: 'Sucre liant' },
                    { id: 'minecraft:paper', count: 1, name: 'Boîtier en papier' }
                ]
            },
            {
                id: 'prep_tabletki',
                slot: 15,
                item: 'zmodfood:tabletki',
                nbt: null,
                count: 2,
                name: '§fFlacon de Tabletki (x2)',
                desc: '§7Pilules antibactériennes et antipyrétiques à large spectre.',
                costs: [
                    { id: 'minecraft:dandelion', count: 4, name: 'Pissenlits thérapeutiques' },
                    { id: 'minecraft:charcoal', count: 2, name: 'Charbon actif purifiant' },
                    { id: 'minecraft:glass_bottle', count: 1, name: 'Fiole en verre' }
                ]
            },
            {
                id: 'prep_antiradin',
                slot: 16,
                item: 'zmodfood:antiradin',
                nbt: null,
                count: 1,
                name: '§bPlaquette Antiradin',
                desc: '§7Comprimés chélateurs pour éliminer les doses d\'irradiation.',
                costs: [
                    { id: 'minecraft:charcoal', count: 4, name: 'Charbon microporeux' },
                    { id: 'minecraft:copper_ingot', count: 1, name: 'Lingot de cuivre' },
                    { id: 'minecraft:paper', count: 1, name: 'Plaquette en papier' }
                ]
            }
        ]
    }
];

// Répertoire rapide de toutes les recettes du labo
const ALL_LAB_CRAFTS = [];
PREPARATION_PAGES.forEach(page => {
    page.items.forEach(it => {
        ALL_LAB_CRAFTS.push(it);
    });
});

// ========================================================
// 2. FONCTIONS DE GESTION DE L'INVENTAIRE (LABORATOIRE)
// ========================================================

function labGetSlot(player, slot) {
    if (global.getPlayerInventorySlot) return global.getPlayerInventorySlot(player, slot);
    if (!player || !player.inventory) return null;
    try {
        if (typeof player.inventory.getItem === 'function') return player.inventory.getItem(slot);
        if (player.inventory.items && typeof player.inventory.items.get === 'function') return player.inventory.items.get(slot);
        if (typeof player.inventory.get === 'function') return player.inventory.get(slot);
    } catch (e) {}
    return null;
}

function labCountItem(player, itemId) {
    if (global.countInPlayerInventory) return global.countInPlayerInventory(player, itemId);
    if (!player || !player.inventory) return 0;
    let count = 0;
    for (let i = 0; i < 36; i++) {
        let stack = labGetSlot(player, i);
        if (stack && !stack.isEmpty()) {
            let sId = stack.id || (stack.item ? stack.item.id : null) || (stack.getItem ? String(stack.getItem()) : '');
            if (sId === itemId) {
                let sCount = typeof stack.count !== 'undefined' ? stack.count : (stack.getCount ? stack.getCount() : 1);
                count += sCount;
            }
        }
    }
    return count;
}

function labCheckCosts(player, costs) {
    if (global.checkPlayerHasCosts) return global.checkPlayerHasCosts(player, costs);
    if (!player || !player.inventory) return { ok: false, missing: [] };
    let missing = [];
    for (let c of costs) {
        let countInInv = labCountItem(player, c.id);
        if (countInInv < c.count) {
            missing.push(`${c.count - countInInv}x ${c.name}`);
        }
    }
    return { ok: missing.length === 0, missing: missing };
}

function labConsumeCosts(player, costs) {
    if (global.consumeCostsFromPlayer) {
        global.consumeCostsFromPlayer(player, costs);
        return;
    }
    if (!player || !player.inventory) return;
    for (let c of costs) {
        let needed = c.count;
        for (let i = 0; i < 36 && needed > 0; i++) {
            let stack = labGetSlot(player, i);
            if (stack && !stack.isEmpty()) {
                let sId = stack.id || (stack.item ? stack.item.id : null) || (stack.getItem ? String(stack.getItem()) : '');
                if (sId === c.id) {
                    let currentCount = typeof stack.count !== 'undefined' ? stack.count : (stack.getCount ? stack.getCount() : 1);
                    let take = Math.min(currentCount, needed);
                    if (typeof stack.shrink === 'function') {
                        stack.shrink(take);
                    } else if (typeof stack.setCount === 'function') {
                        stack.setCount(currentCount - take);
                    }
                    needed -= take;
                    let remaining = typeof stack.count !== 'undefined' ? stack.count : (stack.getCount ? stack.getCount() : 0);
                    if (remaining <= 0) {
                        try {
                            if (typeof player.inventory.setItem === 'function') player.inventory.setItem(i, Item.of('minecraft:air'));
                            else if (player.inventory.items) player.inventory.items.set(i, Item.of('minecraft:air'));
                        } catch (e) {}
                    }
                }
            }
        }
    }
    try {
        if (player.inventoryMenu) player.inventoryMenu.broadcastChanges();
        if (player.containerMenu) player.containerMenu.broadcastChanges();
    } catch (e) {}
}

function labGiveItem(player, itemId, count, nbt) {
    if (global.givePlayerItem) {
        global.givePlayerItem(player, itemId, count, nbt);
        return;
    }
    if (!player) return;
    count = count || 1;
    let stack = nbt ? Item.of(itemId, count).withNBT(nbt) : Item.of(itemId, count);
    try {
        player.give(stack.copy());
    } catch (e) {
        try { player.inventory.add(stack.copy()); } catch (e2) {}
    }
    try {
        if (player.containerMenu) player.containerMenu.broadcastChanges();
        if (player.inventoryMenu) player.inventoryMenu.broadcastChanges();
    } catch (e3) {}
}

// ========================================================
// 3. INTERFACE GRAPHIQUE (GUI) DU LABORATOIRE
// ========================================================
function openPreparationPage(player, pageIndex) {
    if (!player) return;
    pageIndex = pageIndex || 0;
    if (pageIndex < 0) pageIndex = 0;
    if (pageIndex >= PREPARATION_PAGES.length) pageIndex = PREPARATION_PAGES.length - 1;

    let pageData = PREPARATION_PAGES[pageIndex];

    player.openChestGUI(Text.of(pageData.title), 3, gui => {
        gui.playerSlots = true;

        // Remplissage du fond
        for (let i = 0; i < 27; i++) {
            let x = i % 9;
            let y = Math.floor(i / 9);
            gui.slot(x, y, slot => {
                slot.item = Item.of('minecraft:brown_stained_glass_pane').withName(Text.of(' '));
            });
        }

        // ==========================================
        // LIGNE 0 : ACTIONS & NAVIGATION RAPIDE
        // ==========================================

        // (0, 0) : Bouton Table de Soins
        gui.button(0, 0, Item.of('minecraft:brewing_stand').withName(Text.of('§a§l« Table de Soins')), Text.of('§a§l« Table de Soins'), event => {
            if (global.openMedicinePage) {
                global.openMedicinePage(event.slot.gui.player, 0);
            } else {
                event.slot.gui.player.tell(Text.of('§c[Médecine] Table de soins non disponible.'));
            }
        });

        // (1, 0) : Bouton Armoire des Ingrédients
        gui.button(1, 0, Item.of('minecraft:chest').withName(Text.of('§6§l📦 Armoire des Ingrédients')), Text.of('§6§l📦 Armoire des Ingrédients'), event => {
            if (global.openMedicalSuppliesGUI) {
                global.openMedicalSuppliesGUI(event.slot.gui.player, 0);
            } else {
                event.slot.gui.player.tell(Text.of('§c[Armoire] Armoire non disponible.'));
            }
        });

        // (4, 0) : Indicateur de Page
        gui.slot(4, 0, slot => {
            slot.item = Item.of('minecraft:compass')
                .withName(Text.of(`§6§lLaboratoire §8(Page ${pageIndex + 1} / ${PREPARATION_PAGES.length})`))
                .withLore([
                    Text.of('§7Transforme les matériaux bruts en composants'),
                    Text.of('§7médicaux utilisés pour les crafts de soins.'),
                    Text.of('§8--------------------------------'),
                    Text.of(`§e${ALL_LAB_CRAFTS.length} fabrications disponibles au total`),
                    Text.of('§7Cliquez sur les flèches du bas pour changer de page.')
                ]);
        });

        // (7, 0) : Bouton Pack Ingrédients de cette page
        gui.button(7, 0, Item.of('minecraft:bundle').withName(Text.of('§e§l🎁 Obtenir les matériaux de cette page')), Text.of('§e§l🎁 Matériaux'), event => {
            let p = event.slot.gui.player;
            let given = {};
            for (let it of pageData.items) {
                for (let c of it.costs) {
                    if (!given[c.id]) {
                        given[c.id] = true;
                        labGiveItem(p, c.id, Math.max(c.count * 2, 8));
                    }
                }
            }
            p.tell(Text.of(`§a🎁 Vous avez reçu les matériaux requis pour la page ${pageIndex + 1} !`));
            p.server.runCommandSilent(`playsound minecraft:entity.player.levelup player ${p.username} ${p.x} ${p.y} ${p.z} 1.0 1.0`);
            openPreparationPage(p, pageIndex);
        });

        // (8, 0) : Bouton Fermer
        gui.button(8, 0, Item.of('minecraft:barrier').withName(Text.of('§c§lFermer')), Text.of('§c§lFermer'), event => {
            event.slot.gui.player.closeMenu();
        });

        // ==========================================
        // LIGNE 1 : OBJETS FABRICABLES (Slots 10 à 16)
        // ==========================================
        pageData.items.forEach(prep => {
            let x = prep.slot % 9;
            let y = Math.floor(prep.slot / 9);

            let check = labCheckCosts(player, prep.costs);

            let lore = [
                Text.of(prep.desc),
                Text.of('§8--------------------------------'),
                Text.of('§7Matériaux requis :')
            ];

            for (let c of prep.costs) {
                let countInInv = labCountItem(player, c.id);
                let ok = countInInv >= c.count;
                lore.push(Text.of(` ${ok ? '§a✔' : '§c✖'} §f${c.count}x ${c.name} §8(${ok ? '§a' : '§c'}${countInInv}/${c.count}§8)`));
            }

            lore.push(Text.of('§8--------------------------------'));
            lore.push(Text.of(check.ok ? '§a▶ Cliquez pour fabriquer' : '§c✖ Ingrédients manquants (Cliquez pour voir)'));

            let displayStack = Item.of(prep.item, prep.count)
                .withName(Text.of(prep.name))
                .withLore(lore);

            gui.button(x, y, displayStack, Text.of(prep.name), event => {
                let p = event.slot.gui.player;

                let cCheck = labCheckCosts(p, prep.costs);
                if (!cCheck.ok) {
                    p.tell(Text.of('§c[Laboratoire] §7Il vous manque : §e' + cCheck.missing.join('§7, §e')));
                    p.tell(Text.of('§7(Besoin d\'ingrédients ? Utilisez le bouton §6🎁 Matériaux §7en haut à droite ou §e/labo armoire§7)'));
                    p.server.runCommandSilent(`playsound minecraft:entity.villager.no player ${p.username} ${p.x} ${p.y} ${p.z} 1.0 1.0`);
                    return;
                }

                // Consommation des coûts
                labConsumeCosts(p, prep.costs);

                // Don de l'objet
                labGiveItem(p, prep.item, prep.count, prep.nbt);

                // Son et notification
                p.server.runCommandSilent(`playsound minecraft:block.anvil.use player ${p.username} ${p.x} ${p.y} ${p.z} 0.8 1.2`);
                p.tell(Text.of(`§a[Laboratoire] §fFabrication réussie : §e${prep.count}x ${prep.name} §f!`));

                // Rafraîchir l'affichage
                openPreparationPage(p, pageIndex);
            });
        });

        // ==========================================
        // LIGNE 2 : NAVIGATION BAS
        // ==========================================

        // (0, 2) : Page Précédente
        if (pageIndex > 0) {
            gui.button(0, 2, Item.of('minecraft:arrow').withName(Text.of(`§e◀ Page ${pageIndex}`)), Text.of('§e◀ Page Précédente'), event => {
                openPreparationPage(event.slot.gui.player, pageIndex - 1);
            });
        } else {
            gui.slot(0, 2, slot => {
                slot.item = Item.of('minecraft:black_stained_glass_pane').withName(Text.of('§8(Début)'));
            });
        }

        // (8, 2) : Page Suivante
        if (pageIndex < PREPARATION_PAGES.length - 1) {
            gui.button(8, 2, Item.of('minecraft:arrow').withName(Text.of(`§ePage ${pageIndex + 2} ▶`)), Text.of('§ePage Suivante ▶'), event => {
                openPreparationPage(event.slot.gui.player, pageIndex + 1);
            });
        } else {
            gui.slot(8, 2, slot => {
                slot.item = Item.of('minecraft:black_stained_glass_pane').withName(Text.of('§8(Fin)'));
            });
        }
    });
}
global.openPreparationPage = openPreparationPage;

// ========================================================
// 4. COMMANDES EN JEU (/labo, /laboratoire, /preparation)
// ========================================================
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    function registerLabCommand(name) {
        return Commands.literal(name)
            .executes(c => {
                let entity = c.source.entity;
                if (entity && entity.isPlayer()) {
                    openPreparationPage(entity, 0);
                } else {
                    c.source.sendSuccess(Text.of('§c[Laboratoire] Cette commande doit être exécutée par un joueur.'), false);
                }
                return 1;
            })
            .then(Commands.literal('armoire').executes(c => {
                let entity = c.source.entity;
                if (entity && entity.isPlayer()) {
                    if (global.openMedicalSuppliesGUI) {
                        global.openMedicalSuppliesGUI(entity, 0);
                    }
                }
                return 1;
            }))
            .then(Commands.literal('kit').executes(c => {
                let entity = c.source.entity;
                if (entity && entity.isPlayer()) {
                    // Donne un stack de toutes les matières premières du labo
                    let allRaw = [
                        'minecraft:sand', 'minecraft:wheat', 'minecraft:sugar', 'minecraft:leather',
                        'minecraft:stick', 'minecraft:string', 'minecraft:paper', 'minecraft:charcoal',
                        'minecraft:clay_ball', 'minecraft:glass_bottle', 'minecraft:honeycomb',
                        'minecraft:poppy', 'minecraft:dandelion', 'minecraft:iron_ingot',
                        'minecraft:iron_nugget', 'minecraft:copper_ingot', 'minecraft:gunpowder',
                        'minecraft:shears', 'zombie_extreme:cloth'
                    ];
                    for (let r of allRaw) {
                        labGiveItem(entity, r, 16);
                    }
                    c.source.sendSuccess(Text.of('§a[Laboratoire] 📦 Vous avez reçu le kit complet des matériaux bruts de préparation !'), false);
                    entity.server.runCommandSilent(`playsound minecraft:entity.player.levelup player ${entity.username} ${entity.x} ${entity.y} ${entity.z} 1.0 1.0`);
                }
                return 1;
            }))
            .then(Commands.literal('list').executes(c => {
                c.source.sendSuccess(Text.of('§8============== §6§lRECETTES DU LABORATOIRE §8=============='), false);
                for (let pi = 0; pi < PREPARATION_PAGES.length; pi++) {
                    let page = PREPARATION_PAGES[pi];
                    c.source.sendSuccess(Text.of(`§6--- Page ${pi + 1} : ${page.title.replace(/§./g, '')} ---`), false);
                    for (let it of page.items) {
                        let costText = it.costs.map(co => `${co.count}x ${co.name}`).join(', ');
                        c.source.sendSuccess(Text.of(`  §e${it.count}x ${it.name.replace(/§./g, '')} §8← §7${costText}`), false);
                    }
                }
                c.source.sendSuccess(Text.of('§8========================================================'), false);
                return 1;
            }))
            .then(Commands.literal('help').executes(c => {
                c.source.sendSuccess(Text.of('§8============== §6§lAIDE LABORATOIRE §8=============='), false);
                c.source.sendSuccess(Text.of('§e/labo §8: Ouvre la table de préparation.'), false);
                c.source.sendSuccess(Text.of('§e/labo armoire §8: Ouvre l\'armoire de fournitures.'), false);
                c.source.sendSuccess(Text.of('§e/labo kit §8: Donne toutes les matières premières brutes.'), false);
                c.source.sendSuccess(Text.of('§e/labo list §8: Affiche toutes les recettes.'), false);
                c.source.sendSuccess(Text.of('§8=============================================='), false);
                return 1;
            }));
    }

    event.register(registerLabCommand('labo'));
    event.register(registerLabCommand('laboratoire'));
    event.register(registerLabCommand('preparation'));

    console.log('[KubeJS] Laboratoire de Préparation réinitialisé (Commandes : /labo, /laboratoire, /preparation) !');
});

// ========================================================
// 5. INTERACTIONS EN JEU (BLOCS)
// ========================================================

// Clic droit sur Table de Forge (Smithing Table)
BlockEvents.rightClicked('minecraft:smithing_table', event => {
    if (event.hand.name() !== 'MAIN_HAND') return;
    openPreparationPage(event.player, 0);
    event.success();
});

// Clic droit accroupi (Shift) sur Établi (Crafting Table)
BlockEvents.rightClicked('minecraft:crafting_table', event => {
    if (event.hand.name() !== 'MAIN_HAND') return;
    if (event.player.isShiftKeyDown()) {
        openPreparationPage(event.player, 0);
        event.success();
    }
});

// Clic droit accroupi (Shift) sur Enclume
BlockEvents.rightClicked('minecraft:anvil', event => {
    if (event.hand.name() !== 'MAIN_HAND') return;
    if (event.player.isShiftKeyDown()) {
        openPreparationPage(event.player, 0);
        event.success();
    }
});
