// ========================================================
// TABLE DE MÉDECINE OFFICIELLE - SYSTÈME DE CRAFTS & MAÎTRISE RP
// Serveur EternalZ (Forge 1.20.1 - KubeJS)
// Conforme à la Classification Médicale Officielle (Tiers 1 à 5)
// ========================================================

// ========================================================
// 1. DÉFINITION DES PALIERS DE MAÎTRISE GÉNÉRALE (DOC RP)
// ========================================================
const MEDICAL_TIERS = {
    0: {
        id: 0,
        title: 'Non Initié',
        subtitle: 'Civil / Aucune qualification médicale',
        color: '§7',
        badge: '§8[Non Formé]',
        desc: 'Aucune formation médicale. Incapable de pratiquer des soins médicaux.',
        maitrise: 'Aucune connaissance médicale.',
        complexite: 'Néant',
        risque: 'Néant'
    },
    1: {
        id: 1,
        title: 'Soins Élémentaires',
        subtitle: 'Médecine Débutante',
        color: '§a',
        badge: '§a[Tier 1 - Débutant]',
        desc: 'Traite les blessures légères et assure les besoins médicaux fondamentaux.',
        maitrise: 'Connaissances médicales fondamentales.',
        complexite: 'Faible',
        risque: 'Faible'
    },
    2: {
        id: 2,
        title: 'Soins Avancés',
        subtitle: 'Médecine Intermédiaire',
        color: '§b',
        badge: '§b[Tier 2 - Intermédiaire]',
        desc: 'Blessures profondes, sutures, fractures simples, infections et stabilisation critique.',
        maitrise: 'Techniques médicales classiques maîtrisées.',
        complexite: 'Modérée',
        risque: 'Modéré'
    },
    3: {
        id: 3,
        title: 'Chirurgie Spécialisée',
        subtitle: 'Médecine Experte',
        color: '§e',
        badge: '§e[Tier 3 - Expert]',
        desc: 'Chirurgie des tissus et organes, lésions internes, traumatismes graves et réfection.',
        maitrise: 'Expertise chirurgicale confirmée.',
        complexite: 'Élevée',
        risque: 'Important'
    },
    4: {
        id: 4,
        title: 'Chirurgie Expérimentée',
        subtitle: 'Médecine Exceptionnelle',
        color: '§6',
        badge: '§6[Tier 4 - Exceptionnel]',
        desc: 'Chirurgie multi-organes, implants cybernétiques et reconstruction anatomique majeure.',
        maitrise: 'Expertise médicale exceptionnelle.',
        complexite: 'Extrême',
        risque: 'Très élevé'
    },
    5: {
        id: 5,
        title: 'Médecine Expérimentale',
        subtitle: 'Sommet Médical',
        color: '§d',
        badge: '§d§l[Tier 5 - Sommet Médical]',
        desc: 'Chirurgie du système nerveux central, régénération cellulaire et greffes inédites.',
        maitrise: 'Perfection médicale et scientifique.',
        complexite: 'Ultime',
        risque: 'Extrême'
    }
};

// ========================================================
// 2. PAGES DE LA TABLE DE SOINS & CRAFTS ASSOCIÉS
// ========================================================
const MEDICINE_PAGES = [
    // ----------------------------------------------------
    // PAGE 1 : Tier 1 — Soins Élémentaires (7 objets)
    // ----------------------------------------------------
    {
        tier: 1,
        title: '§c§lTable Médicale §8(1/5) - §aSoins Élémentaires',
        items: [
            {
                id: 'pansement',
                slot: 10,
                tier: 1,
                item: 'apocaly_soin:pansement',
                nbt: { number_of_uses: 1.0, item_durability: 1.0, stack_size: 8.0 },
                count: 2,
                name: '§ePansement Bande Adhésive (x2)',
                desc: '§7Compresse hypoallergénique micro-aérée à fixation adhésive.',
                costs: [
                    { id: 'zombie_extreme:cloth', count: 2, name: 'Tissu stérile' },
                    { id: 'zombie_extreme:rubber', count: 1, name: 'Bande élastique adhésive' },
                    { id: 'minecraft:paper', count: 2, name: 'Papier d\'emballage stérile' },
                    { id: 'zombie_extreme:vodka', count: 1, name: 'Alcool antiseptique désinfectant' }
                ]
            },
            {
                id: 'vaseline',
                slot: 11,
                tier: 1,
                item: 'lrtactical:consumable',
                nbt: { ConsumableId: 'lrtactical:vaseline', Damage: 0 },
                count: 1,
                name: '§9Pot de Vaseline Médicale',
                desc: '§7Pommade émolliente protectrice contre les irritations et frictions.',
                costs: [
                    { id: 'minecraft:honeycomb', count: 3, name: 'Rayons de cire purifiée' },
                    { id: 'zombie_extreme:rubber', count: 2, name: 'Dérivés hydrocarbonés' },
                    { id: 'minecraft:glass_bottle', count: 2, name: 'Pots en verre étanches' },
                    { id: 'medicalmod:cotton_swab', count: 2, name: 'Écouvillons applicateurs' }
                ]
            },
            {
                id: 'golden_star',
                slot: 12,
                tier: 1,
                item: 'apocaly_soin:baume_golden_star',
                nbt: { number_of_uses: 6.0, item_durability: 4.0, stack_size: 1.0 },
                count: 1,
                name: '§6Baume "Golden Star"',
                desc: '§7Onguent camphré aux huiles essentielles apaisantes.',
                costs: [
                    { id: 'minecraft:honey_bottle', count: 2, name: 'Fioles de miel pur cicatrisant' },
                    { id: 'minecraft:dandelion', count: 6, name: 'Extraits camphrés de pissenlit' },
                    { id: 'minecraft:iron_nugget', count: 4, name: 'Pépites d\'acier (boîtier circulaire)' },
                    { id: 'zombie_extreme:vodka', count: 2, name: 'Alcool d\'extraction pure' }
                ]
            },
            {
                id: 'aspirine',
                slot: 13,
                tier: 1,
                item: 'zmodfood:aspirin',
                nbt: null,
                count: 1,
                name: '§aBoîte d\'Aspirine',
                desc: '§7Comprimés d\'acide acétylsalicylique contre maux de tête et douleurs.',
                costs: [
                    { id: 'minecraft:poppy', count: 4, name: 'Extraits d\'acide salicylique végétal' },
                    { id: 'minecraft:sugar', count: 4, name: 'Sucre liant pour comprimés' },
                    { id: 'minecraft:glass_bottle', count: 2, name: 'Flacons en verre stérile' },
                    { id: 'medicalmod:cotton_swab', count: 2, name: 'Écouvillons de prélèvement stérile' }
                ]
            },
            {
                id: 'tabletki',
                slot: 14,
                tier: 1,
                item: 'zmodfood:tabletki',
                nbt: null,
                count: 1,
                name: '§fFlacon de Pilules (Tabletki)',
                desc: '§7Comprimés antalgiques et antipyrétiques à large spectre.',
                costs: [
                    { id: 'minecraft:dandelion', count: 5, name: 'Principes actifs végétaux séchés' },
                    { id: 'minecraft:charcoal', count: 3, name: 'Charbon actif stabilisateur' },
                    { id: 'zombie_extreme:plastic', count: 2, name: 'Pilulier hermétique en plastique' },
                    { id: 'minecraft:glass_bottle', count: 2, name: 'Ampoules en verre scellé' }
                ]
            },
            {
                id: 'bandage',
                slot: 15,
                tier: 1,
                item: 'apocaly_soin:bandage',
                nbt: { number_of_uses: 1.0, item_durability: 1.0, stack_size: 4.0 },
                count: 2,
                name: '§fRouleau de Bandage (x2)',
                desc: '§7Gaze de coton stérile pour panser et comprimer les plaies.',
                costs: [
                    { id: 'zombie_extreme:cloth', count: 4, name: 'Bandes de gaze en tissu stérile' },
                    { id: 'minecraft:string', count: 6, name: 'Fils de maintien tissés' },
                    { id: 'zombie_extreme:vodka', count: 1, name: 'Alcool désinfectant chirurgical' },
                    { id: 'minecraft:paper', count: 3, name: 'Emballages de protection étanches' }
                ]
            },
            {
                id: 'bint',
                slot: 16,
                tier: 1,
                item: 'zmodfood:bint',
                nbt: null,
                count: 2,
                name: '§fBandage Médical Bint (x2)',
                desc: '§7Rouleau de gaze hydrophile pur coton haute densité.',
                costs: [
                    { id: 'zombie_extreme:cloth', count: 5, name: 'Tissu haute densité purifié' },
                    { id: 'minecraft:string', count: 8, name: 'Ligatures chirurgicales' },
                    { id: 'medicalmod:clean_water', count: 2, name: 'Fioles d\'eau purifiée distillée' },
                    { id: 'minecraft:paper', count: 4, name: 'Pochettes protectrices scellées' }
                ]
            }
        ]
    },

    // ----------------------------------------------------
    // PAGE 2 : Tier 2 — Soins Avancés (5 objets)
    // ----------------------------------------------------
    {
        tier: 2,
        title: '§c§lTable Médicale §8(2/5) - §bSoins Avancés',
        items: [
            {
                id: 'pansement_hemostatique',
                slot: 11,
                tier: 2,
                item: 'apocaly_soin:pansement_hemostatique',
                nbt: { number_of_uses: 1.0, item_durability: 1.0, stack_size: 3.0 },
                count: 1,
                name: '§2Pansement Hémostatique Militaire',
                desc: '§7Gaze imprégnée d\'agent coagulant minéral et clip de pression.',
                costs: [
                    { id: 'apocaly_soin:bandage', count: 2, name: 'Rouleaux de bandage de compression' },
                    { id: 'minecraft:clay_ball', count: 4, name: 'Argile kaolin coagulante purifiée' },
                    { id: 'zombie_extreme:rubber', count: 2, name: 'Bandes de garrot élastiques' },
                    { id: 'minecraft:iron_ingot', count: 1, name: 'Clip métallique de clampage' }
                ]
            },
            {
                id: 'ai2',
                slot: 12,
                tier: 2,
                item: 'lrtactical:consumable',
                nbt: { ConsumableId: 'lrtactical:ai2' },
                count: 1,
                name: '§6Trousse Individuelle AI-2',
                desc: '§7Boîtier d\'urgence tactique (analgésiques, antibactériens et pansement).',
                costs: [
                    { id: 'zmodfood:aspirin', count: 2, name: 'Boîtes d\'aspirine antalgique' },
                    { id: 'zmodfood:tabletki', count: 2, name: 'Flacons de pilules antibactériennes' },
                    { id: 'zmodfood:bint', count: 2, name: 'Bandages médicaux stériles' },
                    { id: 'zombie_extreme:plastic', count: 3, name: 'Boîtier plastique tactique orange' }
                ]
            },
            {
                id: 'carfak',
                slot: 13,
                tier: 2,
                item: 'lrtactical:consumable',
                nbt: { ConsumableId: 'lrtactical:carfak' },
                count: 1,
                name: '§cTrousse de Secours Carfak',
                desc: '§7Kit individuel de combat (IFAK) : hémostatique, pansement et antalgiques.',
                costs: [
                    { id: 'zombie_extreme:cloth', count: 6, name: 'Trousse renforcée en cordura' },
                    { id: 'apocaly_soin:pansement_hemostatique', count: 2, name: 'Pansements hémostatiques d\'urgence' },
                    { id: 'apocaly_soin:bandage', count: 2, name: 'Rouleaux de bandages compressifs' },
                    { id: 'zombie_extreme:vodka', count: 3, name: 'Alcool chirurgical à 90°' },
                    { id: 'minecraft:shears', count: 1, name: 'Ciseaux d\'intervention tactiques' }
                ]
            },
            {
                id: 'antiradin',
                slot: 14,
                tier: 2,
                item: 'zmodfood:antiradin',
                nbt: null,
                count: 1,
                name: '§bPlaquette Antiradin',
                desc: '§7Comprimés chélateurs et absorbants pour éliminer l\'irradiation.',
                costs: [
                    { id: 'minecraft:charcoal', count: 8, name: 'Charbon actif microporeux chélateur' },
                    { id: 'zombie_extreme:filter', count: 1, name: 'Cartouche filtrante décontaminante' },
                    { id: 'minecraft:copper_ingot', count: 3, name: 'Blindage protecteur en cuivre' },
                    { id: 'zombie_extreme:plastic', count: 3, name: 'Blister étanche en polymère scellé' }
                ]
            },
            {
                id: 'antidouleurs',
                slot: 15,
                tier: 2,
                item: 'apocaly_soin:antidouleurs',
                nbt: { number_of_uses: 1.0, item_durability: 1.0, stack_size: 1.0 },
                count: 1,
                name: '§dAntidouleurs Puissants',
                desc: '§7Analgésiques de palier II pour soulager les douleurs aiguës et traumatismes.',
                costs: [
                    { id: 'zmodfood:aspirin', count: 4, name: 'Boîtes d\'aspirine concentrée' },
                    { id: 'minecraft:poppy', count: 6, name: 'Extraits bruts d\'alcaloïdes opiacés' },
                    { id: 'zombie_extreme:vodka', count: 3, name: 'Éthanol distillé pour solvant pur' },
                    { id: 'minecraft:glass_bottle', count: 3, name: 'Fioles en verre borosilicaté' }
                ]
            }
        ]
    },

    // ----------------------------------------------------
    // PAGE 3 : Tier 3 — Chirurgie Spécialisée (3 objets)
    // ----------------------------------------------------
    {
        tier: 3,
        title: '§c§lTable Médicale §8(3/5) - §eChirurgie Spécialisée',
        items: [
            {
                id: 'cms',
                slot: 11,
                tier: 3,
                item: 'apocaly_soin:cms',
                nbt: { number_of_uses: 3.0, item_durability: 3.0, stack_size: 1.0 },
                count: 1,
                name: '§cKit Chirurgical CMS',
                desc: '§7Trousse opératoire de terrain : incision, débridement et suture.',
                costs: [
                    { id: 'medicalmod:surgery_tools', count: 1, name: 'Instruments chirurgicaux de base' },
                    { id: 'zombie_extreme:steel_plate', count: 2, name: 'Plaques d\'acier trempé chirurgical' },
                    { id: 'minecraft:shears', count: 2, name: 'Ciseaux fins de dissection' },
                    { id: 'minecraft:string', count: 8, name: 'Fils de suture monofilament stérile' },
                    { id: 'apocaly_soin:bandage', count: 3, name: 'Champs opératoires et compresses' }
                ]
            },
            {
                id: 'cms_tactical',
                slot: 13,
                tier: 3,
                item: 'lrtactical:consumable',
                nbt: { ConsumableId: 'lrtactical:cms', Damage: 0 },
                count: 1,
                name: '§4Kit Chirurgical Tactique (L.R.)',
                desc: '§7Chirurgie lourde de campagne : agrafeuse cutanée, clamps et hémostase profonde.',
                costs: [
                    { id: 'apocaly_soin:cms', count: 1, name: 'Kit chirurgical CMS opératoire' },
                    { id: 'zombie_extreme:ignotsteel', count: 3, name: 'Lingots d\'acier chirurgical forgé' },
                    { id: 'apocaly_soin:pansement_hemostatique', count: 2, name: 'Plaquettes hémostatiques artérielles' },
                    { id: 'zombie_extreme:whiskey', count: 2, name: 'Alcool fort antiseptique chirurgical' },
                    { id: 'medicalmod:mask', count: 3, name: 'Masques chirurgicaux stériles FFP3' }
                ]
            },
            {
                id: 'blood_pack',
                slot: 15,
                tier: 3,
                item: 'lrtactical:consumable',
                nbt: { ConsumableId: 'lrtactical:blood_pack' },
                count: 2,
                name: '§4Poche de Sang (x2)',
                desc: '§7Poche de transfusion de sang total avec solution anticoagulante.',
                costs: [
                    { id: 'medicalmod:iv_bag', count: 2, name: 'Poches de perfusion stériles scellées' },
                    { id: 'medicalmod:syringe', count: 2, name: 'Seringues de prélèvement avec trocart' },
                    { id: 'minecraft:beef', count: 4, name: 'Source de globules et albumine brute' },
                    { id: 'minecraft:sugar', count: 6, name: 'Dextrose stabilisateur et conservateur' },
                    { id: 'zombie_extreme:rubber', count: 3, name: 'Tubulures flexibles étanches' }
                ]
            }
        ]
    },

    // ----------------------------------------------------
    // PAGE 4 : Tier 4 — Chirurgie Expérimentée (2 objets)
    // ----------------------------------------------------
    {
        tier: 4,
        title: '§c§lTable Médicale §8(4/5) - §6Chirurgie Expérimentée',
        items: [
            {
                id: 'surv12',
                slot: 12,
                tier: 4,
                item: 'lrtactical:consumable',
                nbt: { ConsumableId: 'lrtactical:surv12', Damage: 0 },
                count: 1,
                name: '§8Kit Tactique Surv12',
                desc: '§7Valise de réfection anatomique complète : broches osseuses et micro-chirurgie.',
                costs: [
                    { id: 'apocaly_soin:cms', count: 2, name: 'Kits chirurgicaux CMS complets' },
                    { id: 'zombie_extreme:steel_plate', count: 4, name: 'Plaques d\'acier trempé médical' },
                    { id: 'minecraft:iron_ingot', count: 6, name: 'Fixateurs orthopédiques externes' },
                    { id: 'minecraft:copper_ingot', count: 4, name: 'Instruments antimicrobiens en cuivre' },
                    { id: 'zombie_extreme:vodka', count: 4, name: 'Alcool chirurgical pur désinfectant' }
                ]
            },
            {
                id: 'stimulant_regen_exp',
                slot: 14,
                tier: 4,
                item: 'apocaly_soin:stimulant_regenerant_experimental',
                nbt: { number_of_uses: 1.0, item_durability: 1.0, stack_size: 1.0 },
                count: 1,
                name: '§a§lStimulant Régénérant Expérimental',
                desc: '§7Injecteur vert : Catalyseur régénérateur de tissus vivants à haute intensité cellulaire.',
                costs: [
                    { id: 'medicalmod:syringe', count: 2, name: 'Seringues d\'injection hypodermiques' },
                    { id: 'medicalmod:clean_water', count: 3, name: 'Fioles d\'eau purifiée distillée' },
                    { id: 'minecraft:honey_bottle', count: 4, name: 'Soluté biologique cicatrisant ultra-pur' },
                    { id: 'zombie_extreme:acid_bottle', count: 1, name: 'Flacon d\'acide de synthèse réactif' },
                    { id: 'minecraft:sugar', count: 8, name: 'Glucose hypertonique concentré' }
                ]
            }
        ]
    },

    // ----------------------------------------------------
    // PAGE 5 : Tier 5 — Sommet Médical (6 injecteurs)
    // ----------------------------------------------------
    {
        tier: 5,
        title: '§c§lTable Médicale §8(5/5) - §dMédecine Expérimentale',
        items: [
            {
                id: 'morphine',
                slot: 11,
                tier: 5,
                item: 'apocaly_soin:morphine',
                nbt: { number_of_uses: 1.0, item_durability: 1.0, stack_size: 1.0 },
                count: 1,
                name: '§bSulfate de Morphine Pur',
                desc: '§7Injecteur cyan : Opioïde analgésique ultra-puissant pour les cas les plus critiques.',
                costs: [
                    { id: 'medicalmod:syringe', count: 2, name: 'Seringues stériles à injection directe' },
                    { id: 'minecraft:poppy', count: 12, name: 'Concentré pur d\'alcaloïdes opiacés' },
                    { id: 'zombie_extreme:acid_bottle', count: 1, name: 'Acide de purification biochimique' },
                    { id: 'zombie_extreme:vodka', count: 4, name: 'Solvant d\'élution alcoolique pure' },
                    { id: 'medicalmod:clean_water', count: 3, name: 'Eau distillée apyrogène injectable' }
                ]
            },
            {
                id: 'adrenaline',
                slot: 12,
                tier: 5,
                item: 'apocaly_soin:adrenaline',
                nbt: { number_of_uses: 1.0, item_durability: 1.0, stack_size: 1.0 },
                count: 1,
                name: '§cAuto-Injecteur d\'Adrénaline',
                desc: '§7Injecteur rouge : Épinéphrine concentrée d\'urgence vitale et réanimation critique.',
                costs: [
                    { id: 'medicalmod:syringe', count: 2, name: 'Auto-injecteurs à piston sous pression' },
                    { id: 'zombie_extreme:acid_bottle', count: 1, name: 'Composé synthétiseur d\'épinéphrine' },
                    { id: 'minecraft:iron_ingot', count: 3, name: 'Aiguilles en acier chirurgical renforcé' },
                    { id: 'minecraft:copper_ingot', count: 3, name: 'Composants et ressorts en cuivre' },
                    { id: 'medicalmod:clean_water', count: 3, name: 'Soluté isotonique d\'injection' }
                ]
            },
            {
                id: 'stimulant_regenerant',
                slot: 13,
                tier: 5,
                item: 'apocaly_soin:stimulant_regenerant',
                nbt: { number_of_uses: 1.0, item_durability: 1.0, stack_size: 1.0 },
                count: 1,
                name: '§6Stimulant Régénérant Purifié',
                desc: '§7Injecteur doré : Solution synthétique de régénération accélérée des tissus et organes.',
                costs: [
                    { id: 'apocaly_soin:stimulant_regenerant_experimental', count: 1, name: 'Stimulant Régénérant Expérimental (Vert)' },
                    { id: 'medicalmod:clean_water', count: 4, name: 'Eau stérile apyrogène purifiée' },
                    { id: 'zombie_extreme:filter', count: 2, name: 'Filtres de stérilisation nanométrique' },
                    { id: 'minecraft:honey_bottle', count: 4, name: 'Facteurs de croissance cellulaire purs' },
                    { id: 'zombie_extreme:vodka', count: 4, name: 'Agent alcoolique de précipitation' }
                ]
            },
            {
                id: 'serum_retablissant_exp',
                slot: 14,
                tier: 5,
                item: 'apocaly_soin:serum_retablissant_experimental',
                nbt: { number_of_uses: 1.0, item_durability: 1.0, stack_size: 1.0 },
                count: 1,
                name: '§f§lSérum Rétablissant Expérimental',
                desc: '§7Injecteur argenté : Protocole de réfection cellulaire rapide contre traumatismes mortels.',
                costs: [
                    { id: 'apocaly_soin:serum_retablissant', count: 1, name: 'Sérum Rétablissant Avancé (Rose)' },
                    { id: 'zombie_extreme:acid_bottle', count: 2, name: 'Solutions chimiques de stabilisation' },
                    { id: 'zombie_extreme:steel_plate', count: 2, name: 'Boîtier de confinement en acier' },
                    { id: 'medicalmod:syringe', count: 2, name: 'Seringues à trocart renforcé' },
                    { id: 'zombie_extreme:batteries', count: 1, name: 'Micro-cellule thermique de cryoconservation' }
                ]
            },
            {
                id: 'stimulant_combat',
                slot: 15,
                tier: 5,
                item: 'apocaly_soin:stimulant_de_combat',
                nbt: { number_of_uses: 1.0, item_durability: 1.0, stack_size: 1.0 },
                count: 1,
                name: '§5Stimulant de Combat Militaire',
                desc: '§7Injecteur violet : Neuro-stimulant lourd décuplant force, résistance et réflexes.',
                costs: [
                    { id: 'apocaly_soin:adrenaline', count: 1, name: 'Auto-Injecteur d\'Adrénaline (Rouge)' },
                    { id: 'zombie_extreme:acid_bottle', count: 1, name: 'Neuro-stimulateur d\'amphétamine synthétique' },
                    { id: 'zmodfood:aspirin', count: 6, name: 'Inhibiteurs concentrés de douleur et fatigue' },
                    { id: 'zombie_extreme:vodka', count: 3, name: 'Alcool d\'élution et catalyse' },
                    { id: 'minecraft:sugar', count: 8, name: 'Glucides purs de suractivation musculaire' }
                ]
            },
            {
                id: 'serum_retablissant',
                slot: 16,
                tier: 5,
                item: 'apocaly_soin:serum_retablissant',
                nbt: { number_of_uses: 1.0, item_durability: 1.0, stack_size: 1.0 },
                count: 1,
                name: '§dSérum Rétablissant Avancé',
                desc: '§7Injecteur rose : Composé biochimique restaurant les fonctions vitales et stabilisant les organes.',
                costs: [
                    { id: 'apocaly_soin:morphine', count: 1, name: 'Sulfate de Morphine Pur (Cyan)' },
                    { id: 'medicalmod:clean_water', count: 4, name: 'Eau déminéralisée distillée stérile' },
                    { id: 'minecraft:charcoal', count: 8, name: 'Charbon actif de purification cellulaire' },
                    { id: 'medicalmod:iv_bag', count: 2, name: 'Poches de soluté d\'hydratation' },
                    { id: 'zombie_extreme:rubber', count: 3, name: 'Bouchons d\'étanchéité en élastomère' }
                ]
            }
        ]
    }
];

// Répertoire complet de tous les crafts pour lookup rapide
const ALL_CRAFTS = [];
const ALL_CRAFTS_MAP = {};
MEDICINE_PAGES.forEach(page => {
    page.items.forEach(it => {
        ALL_CRAFTS.push(it);
        ALL_CRAFTS_MAP[it.id] = it;
    });
});

// ========================================================
// 3. FONCTIONS DE GESTION DU RÔLE, DES NIVEAUX ET CRAFTS
// ========================================================

/**
 * Vérifie si un joueur possède le Rôle Médecin
 */
function isMedic(player) {
    if (!player || !player.persistentData) return false;
    let pData = player.persistentData;
    if (pData.getBoolean('is_medic')) return true;
    if (pData.contains('med_tier') && pData.getInt('med_tier') >= 1) return true;
    return false;
}
global.isMedic = isMedic;

/**
 * Attribue ou retire le Rôle Médecin à un joueur
 */
function setPlayerMedicRole(player, isMedicVal, initialTier) {
    if (!player || !player.persistentData) return;
    let pData = player.persistentData;
    pData.putBoolean('is_medic', !!isMedicVal);
    if (isMedicVal) {
        let currentTier = pData.contains('med_tier') ? pData.getInt('med_tier') : 0;
        let targetTier = (initialTier !== undefined && initialTier !== null && initialTier >= 1 && initialTier <= 5)
            ? initialTier
            : (currentTier > 0 ? currentTier : 1);
        pData.putInt('med_tier', targetTier);
    } else {
        pData.putInt('med_tier', 0);
    }
}
global.setPlayerMedicRole = setPlayerMedicRole;

/**
 * Récupère le niveau médical général d'un joueur (0 par défaut)
 */
function getPlayerTier(player) {
    if (!player || !player.persistentData) return 0;
    let pData = player.persistentData;
    return pData.contains('med_tier') ? pData.getInt('med_tier') : 0;
}

/**
 * Définit le niveau médical général d'un joueur
 */
function setPlayerTier(player, tier) {
    if (!player || !player.persistentData) return;
    player.persistentData.putInt('med_tier', tier);
    if (tier >= 1) {
        player.persistentData.putBoolean('is_medic', true);
    }
}

/**
 * Débloque un craft individuel pour un joueur précis
 */
function unlockCraftForPlayer(player, craftId) {
    if (!player || !player.persistentData) return;
    let pData = player.persistentData;
    let unl = pData.getCompound('med_unlocked_crafts');
    unl.putBoolean(craftId, true);
    pData.put('med_unlocked_crafts', unl);

    // Supprime du verrouillage strict si présent
    if (pData.contains('med_locked_crafts')) {
        let lck = pData.getCompound('med_locked_crafts');
        if (lck.contains(craftId)) {
            lck.remove(craftId);
            pData.put('med_locked_crafts', lck);
        }
    }
}

/**
 * Verrouille un craft individuel pour un joueur précis
 */
function lockCraftForPlayer(player, craftId) {
    if (!player || !player.persistentData) return;
    let pData = player.persistentData;
    let lck = pData.getCompound('med_locked_crafts');
    lck.putBoolean(craftId, true);
    pData.put('med_locked_crafts', lck);

    // Supprime des déblocages spéciaux si présent
    if (pData.contains('med_unlocked_crafts')) {
        let unl = pData.getCompound('med_unlocked_crafts');
        if (unl.contains(craftId)) {
            unl.remove(craftId);
            pData.put('med_unlocked_crafts', unl);
        }
    }
}

/**
 * Réinitialise complètement le profil médical d'un joueur
 */
function resetPlayerMedical(player) {
    if (!player || !player.persistentData) return;
    let pData = player.persistentData;
    pData.putInt('med_tier', 0);
    pData.putBoolean('is_medic', false);
    if (pData.contains('med_unlocked_crafts')) {
        pData.remove('med_unlocked_crafts');
    }
    if (pData.contains('med_locked_crafts')) {
        pData.remove('med_locked_crafts');
    }
}

/**
 * Vérifie si un craft est débloqué pour un joueur
 */
function isCraftUnlocked(player, craft) {
    if (!player || !player.persistentData) return false;
    let pData = player.persistentData;
    let craftId = craft.id;

    // 1. Verrouillage strict individuel prioritaire
    if (pData.contains('med_locked_crafts')) {
        let lck = pData.getCompound('med_locked_crafts');
        if (lck.getBoolean(craftId)) {
            return false;
        }
    }

    // 2. Déblocage spécifique individuel prioritaire
    if (pData.contains('med_unlocked_crafts')) {
        let unl = pData.getCompound('med_unlocked_crafts');
        if (unl.getBoolean(craftId)) {
            return true;
        }
    }

    // 3. Palier de maîtrise général du joueur
    let tier = pData.contains('med_tier') ? pData.getInt('med_tier') : 0;
    return tier >= craft.tier;
}

/**
 * Indique si un craft bénéficie d'un déblocage individuel exceptionnel
 */
function isCraftIndividuallyUnlocked(player, craftId) {
    if (!player || !player.persistentData) return false;
    let pData = player.persistentData;
    if (pData.contains('med_unlocked_crafts')) {
        return pData.getCompound('med_unlocked_crafts').getBoolean(craftId);
    }
    return false;
}

/**
 * Indique si un craft est strictement verrouillé individuellement
 */
function isCraftIndividuallyLocked(player, craftId) {
    if (!player || !player.persistentData) return false;
    let pData = player.persistentData;
    if (pData.contains('med_locked_crafts')) {
        return pData.getCompound('med_locked_crafts').getBoolean(craftId);
    }
    return false;
}

/**
 * Retourne la liste des IDs de crafts débloqués spécifiquement
 */
function getUnlockedCraftsList(player) {
    if (!player || !player.persistentData) return [];
    let pData = player.persistentData;
    if (!pData.contains('med_unlocked_crafts')) return [];
    let unl = pData.getCompound('med_unlocked_crafts');
    let list = [];
    for (let c of ALL_CRAFTS) {
        if (unl.getBoolean(c.id)) {
            list.push(c.id);
        }
    }
    return list;
}

/**
 * Retourne la liste des IDs de crafts strictement verrouillés
 */
function getLockedCraftsList(player) {
    if (!player || !player.persistentData) return [];
    let pData = player.persistentData;
    if (!pData.contains('med_locked_crafts')) return [];
    let lck = pData.getCompound('med_locked_crafts');
    let list = [];
    for (let c of ALL_CRAFTS) {
        if (lck.getBoolean(c.id)) {
            list.push(c.id);
        }
    }
    return list;
}

/**
 * Recherche un joueur en ligne par pseudo (insensible à la casse)
 */
function findPlayer(server, targetName) {
    if (!targetName || !server) return null;
    let players = server.playerList.players;
    let lower = targetName.toLowerCase();
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
 * Récupère un ItemStack depuis l'inventaire du joueur (compatible Forge & KubeJS)
 */
function getPlayerInventorySlot(player, slot) {
    if (!player || !player.inventory) return null;
    try {
        if (typeof player.inventory.getItem === 'function') {
            return player.inventory.getItem(slot);
        }
        if (player.inventory.items && typeof player.inventory.items.get === 'function') {
            return player.inventory.items.get(slot);
        }
        if (typeof player.inventory.get === 'function') {
            return player.inventory.get(slot);
        }
    } catch (e) {}
    return null;
}
global.getPlayerInventorySlot = getPlayerInventorySlot;

/**
 * Définit un ItemStack dans l'inventaire du joueur
 */
function setPlayerInventorySlot(player, slot, itemStack) {
    if (!player || !player.inventory) return;
    try {
        if (typeof player.inventory.setItem === 'function') {
            player.inventory.setItem(slot, itemStack);
            return;
        }
        if (player.inventory.items && typeof player.inventory.items.set === 'function') {
            player.inventory.items.set(slot, itemStack);
            return;
        }
        if (typeof player.inventory.set === 'function') {
            player.inventory.set(slot, itemStack);
            return;
        }
    } catch (e) {}
}
global.setPlayerInventorySlot = setPlayerInventorySlot;

/**
 * Donne un item à un joueur de manière 100% fiable avec synchronisation immédiate du GUI
 */
function givePlayerItem(player, itemId, count, nbt) {
    if (!player) return;
    count = count || 1;
    let stack = nbt ? Item.of(itemId, count).withNBT(nbt) : Item.of(itemId, count);
    try {
        player.give(stack.copy());
    } catch (e) {
        try {
            player.inventory.add(stack.copy());
        } catch (e2) {}
    }
    try {
        if (player.containerMenu) player.containerMenu.broadcastChanges();
        if (player.inventoryMenu) player.inventoryMenu.broadcastChanges();
    } catch (e3) {}
}
global.givePlayerItem = givePlayerItem;

/**
 * Compte un item dans l'inventaire du joueur
 */
function countInPlayerInventory(player, itemId) {
    if (!player || !player.inventory) return 0;
    let count = 0;
    for (let i = 0; i < 36; i++) {
        let stack = getPlayerInventorySlot(player, i);
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
global.countInPlayerInventory = countInPlayerInventory;

/**
 * Vérifie si un joueur possède tous les ingrédients requis
 */
function checkPlayerHasCosts(player, costs) {
    if (!player || !player.inventory) return { ok: false, missing: [] };
    let missing = [];
    for (let c of costs) {
        let countInInv = countInPlayerInventory(player, c.id);
        if (countInInv < c.count) {
            missing.push(`${c.count - countInInv}x ${c.name}`);
        }
    }
    return {
        ok: missing.length === 0,
        missing: missing
    };
}
global.checkPlayerHasCosts = checkPlayerHasCosts;

/**
 * Consomme les ingrédients requis directement dans l'inventaire du joueur
 */
function consumeCostsFromPlayer(player, costs) {
    if (!player || !player.inventory) return;
    for (let c of costs) {
        let needed = c.count;
        for (let i = 0; i < 36 && needed > 0; i++) {
            let stack = getPlayerInventorySlot(player, i);
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
                        setPlayerInventorySlot(player, i, Item.of('minecraft:air'));
                    }
                }
            }
        }
    }
    if (player.inventoryMenu) {
        player.inventoryMenu.broadcastChanges();
    }
    if (player.containerMenu) {
        player.containerMenu.broadcastChanges();
    }
}
global.consumeCostsFromPlayer = consumeCostsFromPlayer;

// ========================================================
// 4. INTERFACE GRAPHIQUE (GUI) DE LA TABLE MÉDICALE
// ========================================================
function openMedicinePage(player, pageIndex) {
    if (pageIndex < 0) pageIndex = 0;
    if (pageIndex >= MEDICINE_PAGES.length) pageIndex = MEDICINE_PAGES.length - 1;

    let pageData = MEDICINE_PAGES[pageIndex];
    let pageTierInfo = MEDICAL_TIERS[pageData.tier];
    let playerTier = getPlayerTier(player);
    let playerTierInfo = MEDICAL_TIERS[playerTier];

    player.openChestGUI(Text.of(pageData.title), 3, gui => {
        // Active les 36 slots du joueur en bas
        gui.playerSlots = true;

        // Remplissage du fond (lignes 0, 1, 2)
        for (let i = 0; i < 27; i++) {
            let x = i % 9;
            let y = Math.floor(i / 9);
            gui.slot(x, y, slot => {
                slot.item = Item.of('minecraft:gray_stained_glass_pane').withName(' ');
            });
        }

        // ==========================================
        // OBJETS MÉDICAUX FABRICABLES (Ligne 1)
        // ==========================================
        pageData.items.forEach(med => {
            let x = med.slot % 9;
            let y = Math.floor(med.slot / 9);

            let unlocked = isCraftUnlocked(player, med);
            let special = isCraftIndividuallyUnlocked(player, med.id);
            let strictLock = isCraftIndividuallyLocked(player, med.id);
            let medTierInfo = MEDICAL_TIERS[med.tier];

            let buttonIcon;

            if (unlocked) {
                // Craft débloqué : affichage de l'objet médical avec Lore d'ingrédients
                let baseStack = med.nbt 
                    ? Item.of(med.item, med.count).withNBT(med.nbt)
                    : Item.of(med.item, med.count);

                let lore = [
                    Text.of(med.desc),
                    Text.of('§8--------------------------------'),
                    Text.of(`§7Classification : ${medTierInfo.badge} §f${medTierInfo.title}`),
                    Text.of(`§7Maîtrise : §f${medTierInfo.maitrise}`),
                    special ? Text.of('§2★ Déblocage Médical Spécial Individuel') : Text.of('§a✔ Maîtrise Validée'),
                    Text.of('§7Ingrédients requis :')
                ];

                for (let c of med.costs) {
                    let countInInv = countInPlayerInventory(player, c.id);
                    let ok = countInInv >= c.count;
                    lore.push(Text.of(` ${ok ? '§a✔' : '§c✖'} §f${c.count}x ${c.name} §8(${ok ? '§a' : '§c'}${countInInv}/${c.count}§8)`));
                }

                lore.push(Text.of('§8--------------------------------'));
                lore.push(Text.of('§e▶ Cliquez pour fabriquer'));

                buttonIcon = baseStack.copy().withName(Text.of(med.name)).withLore(lore);
            } else {
                // Craft verrouillé : nom et description masqués
                let lockLore = [
                    Text.of('§7Protocole médical confidentiel.'),
                    Text.of('§8[Données médicales classifiées]'),
                    Text.of('§8--------------------------------'),
                    strictLock ? Text.of('§c§l🔒 VERROUILLAGE ADMINISTRATIF STRICT') : Text.of('§c§l🔒 PROTOCOLE MÉDICAL NON MAÎTRISÉ'),
                    Text.of(`§cRequis : ${medTierInfo.badge} §e${medTierInfo.title}`),
                    Text.of(`§7Maîtrise exigée : §f${medTierInfo.maitrise}`),
                    Text.of(`§7Risque : §f${medTierInfo.risque} §8| §7Complexité : §f${medTierInfo.complexite}`),
                    Text.of('§8--------------------------------'),
                    Text.of(`§cVotre rang : §eTier ${playerTier} / 5 §8(${playerTierInfo.title})`),
                    Text.of('§8(Nécessite la formation requise pour révéler ce soin)')
                ];

                buttonIcon = Item.of('minecraft:iron_bars')
                    .withName(Text.of('§c§l🔒 Protocole Inconnu §8(Verrouillé)'))
                    .withLore(lockLore);
            }

            let buttonTitle = unlocked ? Text.of(med.name) : Text.of('§c§l🔒 Protocole Inconnu');
            gui.button(x, y, buttonIcon, buttonTitle, event => {
                let p = event.slot.gui.player;

                // 0. Vérification du déblocage
                if (!isCraftUnlocked(p, med)) {
                    let reqTierInfo = MEDICAL_TIERS[med.tier];
                    let currentTier = getPlayerTier(p);
                    p.tell(Text.of(`§c[Médecine] 🔒 Vous ne maîtrisez pas ce protocole médical ! Requis : ${reqTierInfo.badge} §e${reqTierInfo.title} §8(Votre niveau : Tier ${currentTier}).`));
                    p.server.runCommandSilent(`playsound minecraft:block.chest.locked player ${p.username} ${p.x} ${p.y} ${p.z} 1.0 0.8`);
                    return;
                }

                // 1. Vérification des ingrédients
                let check = checkPlayerHasCosts(p, med.costs);
                if (!check.ok) {
                    p.tell(Text.of(`§c[Médecine] §7Il vous manque : §e${check.missing.join('§7, §e')}`));
                    p.server.runCommandSilent(`playsound minecraft:entity.villager.no player ${p.username} ${p.x} ${p.y} ${p.z} 1.0 1.0`);
                    return;
                }

                // 2. Consommation des ingrédients depuis l'inventaire du joueur
                consumeCostsFromPlayer(p, med.costs);

                // 3. Création et don de l'objet fabriqué
                givePlayerItem(p, med.item, med.count, med.nbt);

                // 4. Son et notification
                p.server.runCommandSilent(`playsound minecraft:item.bottle.fill player ${p.username} ${p.x} ${p.y} ${p.z} 1.0 1.2`);
                p.tell(Text.of(`§a[Médecine] §fTu as fabriqué : §e${med.count}x ${med.name} §f!`));

                // 6. Rafraîchir l'affichage de la page
                openMedicinePage(p, pageIndex);
            });
        });

        // ==========================================
        // BARRE DE NAVIGATION (Ligne 2 : slots 18 à 26)
        // ==========================================

        // Bouton Page Précédente (Slot 18 -> (0, 2))
        if (pageIndex > 0) {
            gui.button(0, 2, Item.of('minecraft:arrow').withName(Text.of(`§e◀ Page Précédente (Tier ${pageIndex})`)), Text.of('§e◀ Page Précédente'), event => {
                openMedicinePage(event.slot.gui.player, pageIndex - 1);
            });
        } else {
            gui.slot(0, 2, slot => {
                slot.item = Item.of('minecraft:black_stained_glass_pane').withName(Text.of('§8(Début)'));
            });
        }

        // Dossier médical personnel du joueur (Slot 20 -> (2, 2))
        gui.slot(2, 2, slot => {
            let unlList = getUnlockedCraftsList(player);
            let lckList = getLockedCraftsList(player);
            let playerIsMedic = isMedic(player);

            let dossierLore = [
                Text.of(`§7Praticien : §e${player.username}`),
                Text.of(`§7Statut : ${playerIsMedic ? '§a✚ Médecin Officiel' : '§7Civil'}`),
                Text.of(`§7Niveau Général : ${playerTierInfo.badge} §f${playerTierInfo.title}`),
                Text.of(`§7Qualification : §f${playerTierInfo.subtitle}`),
                Text.of(`§7Maîtrise : §f${playerTierInfo.maitrise}`),
                Text.of('§8--------------------------------')
            ];

            if (unlList.length > 0) {
                dossierLore.push(Text.of(`§a★ Déblocages spécifiques (${unlList.length}) : §7${unlList.join(', ')}`));
            } else {
                dossierLore.push(Text.of('§7Déblocages spécifiques : §8Aucun'));
            }

            if (lckList.length > 0) {
                dossierLore.push(Text.of(`§c🔒 Verrouillages stricts (${lckList.length}) : §7${lckList.join(', ')}`));
            }

            // Affichage des séquelles / conséquences actives
            try {
                if (global.getPlayerConsequencesList) {
                    let consList = global.getPlayerConsequencesList(player);
                    if (consList.length > 0) {
                        dossierLore.push(Text.of('§8--------------------------------'));
                        dossierLore.push(Text.of(`§c⚠️ Séquelles actives (${consList.length}) :`));
                        for (let c of consList) {
                            dossierLore.push(Text.of(`  §c✖ ${c.name} §8(${c.durationText})`));
                        }
                    } else {
                        dossierLore.push(Text.of('§a✔ Santé : §fAucune séquelle active'));
                    }
                }
            } catch (e) {}

            slot.item = Item.of('minecraft:book')
                .withName(Text.of(`§b§lDossier Médical : §f${player.username}`))
                .withLore(dossierLore);
        });

        // Bouton Fermer (Slot 21 -> (3, 2))
        gui.button(3, 2, Item.of('minecraft:barrier').withName(Text.of('§c§lFermer')), Text.of('§c§lFermer'), event => {
            event.slot.gui.player.closeMenu();
        });

        // Indicateur de Page au centre (Slot 22 -> (4, 2))
        gui.slot(4, 2, slot => {
            slot.item = Item.of('minecraft:compass')
                .withName(Text.of(`§6§lPage ${pageIndex + 1} / ${MEDICINE_PAGES.length} §8- §e${pageTierInfo.title}`))
                .withLore([
                    Text.of(`§7Classification : §f${pageTierInfo.subtitle}`),
                    Text.of(`§7Compétence requise : §f${pageTierInfo.maitrise}`),
                    Text.of(`§7Complexité : §f${pageTierInfo.complexite} §8| §7Risque : §f${pageTierInfo.risque}`),
                    Text.of('§8--------------------------------'),
                    Text.of(`§7Votre statut actuel : ${playerTierInfo.badge} §f${playerTierInfo.title}`),
                    Text.of('§7Cliquez sur les flèches pour changer de palier.')
                ]);
        });

        // Bouton Armoire / Fournitures Médicales (Slot 23 -> (5, 2))
        gui.button(5, 2, Item.of('minecraft:chest').withName(Text.of('§6§l📦 Armoire des Composants')), Text.of('§6§l📦 Armoire des Composants'), event => {
            openMedicalSuppliesGUI(event.slot.gui.player);
        });

        // Bouton Page Suivante (Slot 26 -> (8, 2))
        if (pageIndex < MEDICINE_PAGES.length - 1) {
            gui.button(8, 2, Item.of('minecraft:arrow').withName(Text.of(`§ePage Suivante (Tier ${pageIndex + 2}) ▶`)), Text.of('§ePage Suivante ▶'), event => {
                openMedicinePage(event.slot.gui.player, pageIndex + 1);
            });
        } else {
            gui.slot(8, 2, slot => {
                slot.item = Item.of('minecraft:black_stained_glass_pane').withName(Text.of('§8(Fin)'));
            });
        }
    });
}

// ========================================================
// 4 bis. TABLE & ARMOIRE DES COMPOSANTS MÉDICAUX (2 PAGES)
// ========================================================
const SUPPLIES_PAGES = [
    // ----------------------------------------------------
    // PAGE 1 : Matières Premières & Ressources Brutes (20 items)
    // ----------------------------------------------------
    {
        title: '§6§lArmoire §8(1/2) - §eRessources Brutes & Végétales',
        items: [
            { slot: 10, id: 'minecraft:sand', count: 16, name: '§eSable de Silice', desc: '§7Matière première pour soufflage de verre et fioles.' },
            { slot: 11, id: 'minecraft:wheat', count: 16, name: '§6Blé Céréalier', desc: '§7Céréales pour fermentation alcoolique et moût.' },
            { slot: 12, id: 'minecraft:sugar', count: 16, name: '§fSucre / Dextrose', desc: '§7Excipient comprimé et stabilisant de perfusions.' },
            { slot: 13, id: 'minecraft:leather', count: 8, name: '§6Cuir Traité', desc: '§7Membranes souples étanches et étuis protecteurs.' },
            { slot: 14, id: 'minecraft:stick', count: 16, name: '§fTiges en Bois Poli', desc: '§7Supports rigides pour écouvillons et applicateurs.' },
            { slot: 15, id: 'minecraft:string', count: 32, name: '§fFils & Fibres de Coton', desc: '§7Fils de suture chirurgicale et maillage de gaze.' },
            { slot: 16, id: 'minecraft:paper', count: 32, name: '§fPapier Stérile', desc: '§7Cellulose de filtration et emballages étanches.' },

            { slot: 19, id: 'minecraft:charcoal', count: 32, name: '§8Charbon Actif Purifiant', desc: '§7Agent microporeux chélateur et décontaminant.' },
            { slot: 20, id: 'minecraft:clay_ball', count: 16, name: '§eArgile Kaolin Coagulante', desc: '§7Agent minéral hémostatique pour plaies graves.' },
            { slot: 21, id: 'minecraft:glass_bottle', count: 16, name: '§bFioles en Verre Vides', desc: '§7Flacons et ampoules borosilicatés pour solutés.' },
            { slot: 22, id: 'minecraft:honeycomb', count: 8, name: '§eRayons de Cire d\'Abeille', desc: '§7Base occlusive pour baumes et émulsions.' },
            { slot: 23, id: 'minecraft:honey_bottle', count: 8, name: '§6Fioles de Miel Pur', desc: '§7Soluté cicatrisant hypertonique naturel.' },
            { slot: 24, id: 'minecraft:poppy', count: 16, name: '§cCoquelicots (Pavot)', desc: '§7Fleurs pour extraction d\'alcaloïdes et antalgiques.' },
            { slot: 25, id: 'minecraft:dandelion', count: 16, name: '§ePissenlits Thérapeutiques', desc: '§7Plantes sédatives et principes actifs végétaux.' },

            { slot: 28, id: 'minecraft:beef', count: 8, name: '§cBœuf Cru (Albumine)', desc: '§7Source de protéines sériques et culots globulaires.' },
            { slot: 29, id: 'minecraft:iron_ingot', count: 16, name: '§fLingots de Fer Médical', desc: '§7Attelles, agrafes, clamps et fixateurs osseux.' },
            { slot: 30, id: 'minecraft:iron_nugget', count: 32, name: '§7Pépites de Fer (Aiguilles)', desc: '§7Aiguilles hypodermiques et clips artériels.' },
            { slot: 31, id: 'minecraft:copper_ingot', count: 16, name: '§6Lingots de Cuivre Pur', desc: '§7Métal antimicrobien et blindage anti-radiations.' },
            { slot: 32, id: 'minecraft:gunpowder', count: 8, name: '§8Poudre Réactive', desc: '§7Réactif nitraté pour synthèses chimiques acides.' },
            { slot: 33, id: 'minecraft:shears', count: 1, name: '§7Ciseaux de Secours', desc: '§7Dissection rapide et découpe de pansements.' }
        ]
    },

    // ----------------------------------------------------
    // PAGE 2 : Composants Transformés & Matériel Médical (21 items)
    // ----------------------------------------------------
    {
        title: '§c§lArmoire §8(2/2) - §bComposants Médicaux & Matériel',
        items: [
            { slot: 10, id: 'zombie_extreme:cloth', count: 16, name: '§fTissu & Gaze Médicale', desc: '§7Toile de gaze stérile haute densité pour pansements.' },
            { slot: 11, id: 'zombie_extreme:rubber', count: 8, name: '§8Caoutchouc & Tubulures', desc: '§7Élastomère pour garrots compressifs et tubulures.' },
            { slot: 12, id: 'zombie_extreme:plastic', count: 8, name: '§6Polymère & Piluliers', desc: '§7Boîtiers étanches antichocs pour kits d\'urgence.' },
            { slot: 13, id: 'zombie_extreme:steel_plate', count: 4, name: '§8Plaques d\'Acier Chirurgical', desc: '§7Acier inoxydable trempé pour boîtiers opératoires.' },
            { slot: 14, id: 'zombie_extreme:ignotsteel', count: 4, name: '§7Lingots d\'Acier Trempé', desc: '§7Métal forgé lourd pour agrafeuses et chirurgie.' },
            { slot: 15, id: 'zombie_extreme:filter', count: 2, name: '§3Filtres Nanométriques', desc: '§7Cartouches de stérilisation et filtration fine.' },
            { slot: 16, id: 'zombie_extreme:batteries', count: 2, name: '§eMicro-Batteries Thermiques', desc: '§7Cellules d\'énergie pour conservation et cryogénie.' },

            { slot: 19, id: 'zombie_extreme:vodka', count: 8, name: '§fAlcool Antiseptique (Vodka)', desc: '§7Éthanol 70°-90° pour désinfection et distillation.' },
            { slot: 20, id: 'zombie_extreme:whiskey', count: 4, name: '§6Whiskey Chirurgical', desc: '§7Désinfectant puissant pour instruments opératoires.' },
            { slot: 21, id: 'zombie_extreme:acid_bottle', count: 3, name: '§aAcide de Synthèse Réactif', desc: '§7Catalyseur biochimique pour synthèses de stimulants.' },
            { slot: 22, id: 'medicalmod:syringe', count: 4, name: '§bSeringues Hypodermiques', desc: '§7Seringues stériles à aiguille creuse et piston.' },
            { slot: 23, id: 'medicalmod:clean_water', count: 4, name: '§9Eau Distillée Injectable', desc: '§7Eau apyrogène stérile pour préparations médicales.' },
            { slot: 24, id: 'medicalmod:cotton_swab', count: 8, name: '§fÉcouvillons Applicateurs', desc: '§7Tampons de coton pour prélèvements et antiseptiques.' },
            { slot: 25, id: 'medicalmod:iv_bag', count: 4, name: '§bPoches de Perfusion IV', desc: '§7Conteneurs étanches pour solutés et sang total.' },

            { slot: 28, id: 'medicalmod:mask', count: 4, name: '§fMasques Chirurgicaux FFP3', desc: '§7Protection respiratoire à haute filtration.' },
            { slot: 29, id: 'medicalmod:surgery_tools', count: 1, name: '§cTrousse Chirurgicale', desc: '§7Instruments de dissection, bistouris et pinces.' },
            { slot: 30, id: 'zmodfood:aspirin', count: 8, name: '§aBoîtes d\'Aspirine', desc: '§7Comprimés analgésiques et antipyrétiques.' },
            { slot: 31, id: 'zmodfood:tabletki', count: 8, name: '§fFlacons de Tabletki', desc: '§7Pilules antibactériennes à large spectre.' },
            { slot: 32, id: 'zmodfood:bint', count: 8, name: '§fBandages Médicaux Bint', desc: '§7Rouleaux de gaze hydrophile purifiée.' },
            { slot: 33, id: 'zmodfood:antiradin', count: 4, name: '§bPlaquettes Antiradin', desc: '§7Comprimés chélateurs de radiation.' },
            { slot: 34, id: 'apocaly_soin:bandage', count: 4, name: '§fRouleaux de Bandage', desc: '§7Bandages compressifs pour soins d\'urgence.' }
        ]
    }
];

function openMedicalSuppliesGUI(player, pageIndex) {
    if (!player) return;
    pageIndex = pageIndex || 0;
    if (pageIndex < 0) pageIndex = 0;
    if (pageIndex >= SUPPLIES_PAGES.length) pageIndex = SUPPLIES_PAGES.length - 1;

    let pageData = SUPPLIES_PAGES[pageIndex];

    player.openChestGUI(Text.of(pageData.title), 6, gui => {
        gui.playerSlots = true;

        // Remplir fond
        for (let i = 0; i < 54; i++) {
            let col = i % 9;
            let row = Math.floor(i / 9);
            gui.slot(col, row, slot => {
                slot.item = Item.of('minecraft:gray_stained_glass_pane').withName(Text.of(' '));
            });
        }

        // Remplir avec les fournitures
        for (let supp of pageData.items) {
            let col = supp.slot % 9;
            let row = Math.floor(supp.slot / 9);

            let stack = Item.of(supp.id, supp.count)
                .withName(Text.of(supp.name))
                .withLore([
                    Text.of(supp.desc),
                    Text.of('§8-----------------------------'),
                    Text.of(`§7Identifiant : §8${supp.id}`),
                    Text.of(`§7Lot fourni : §e${supp.count}x`),
                    Text.of('§a▶ Cliquez pour prendre ce lot')
                ]);

            gui.button(col, row, stack, Text.of(supp.name), event => {
                let p = event.slot.gui.player;
                givePlayerItem(p, supp.id, supp.count);
                p.tell(Text.of(`§a✚ Vous avez récupéré : §e${supp.count}x ${supp.name}§a.`));
                p.server.runCommandSilent(`playsound minecraft:item.bundle.drop_contents player ${p.username} ${p.x} ${p.y} ${p.z} 1.0 1.2`);
            });
        }

        // Ligne 0 : Navigation & Actions rapides
        // (0, 0) : Bouton Table de Soins
        gui.button(0, 0, Item.of('minecraft:brewing_stand').withName(Text.of('§a§l« Table de Soins')), Text.of('§a§l« Table de Soins'), event => {
            openMedicinePage(event.slot.gui.player, 0);
        });

        // (1, 0) : Bouton Laboratoire
        gui.button(1, 0, Item.of('minecraft:smithing_table').withName(Text.of('§6§l🔧 Ouvrir le Laboratoire')), Text.of('§6§l🔧 Ouvrir le Laboratoire'), event => {
            if (global.openPreparationPage) {
                global.openPreparationPage(event.slot.gui.player, 0);
            } else {
                event.slot.gui.player.tell(Text.of('§c[Labo] Laboratoire indisponible.'));
            }
        });

        // (4, 0) : Indicateur de Page
        gui.slot(4, 0, slot => {
            slot.item = Item.of('minecraft:compass')
                .withName(Text.of(`§e§lArmoire Médicale §8(Page ${pageIndex + 1} / ${SUPPLIES_PAGES.length})`))
                .withLore([
                    Text.of('§7Cliquez sur un objet pour le recevoir immédiatement.'),
                    Text.of('§7Accessible à tous pour faciliter les soins et les crafts.')
                ]);
        });

        // (7, 0) : Bouton "Prendre tous les objets de cette page"
        gui.button(7, 0, Item.of('minecraft:chest').withName(Text.of('§6§l🎁 Recevoir TOUT le lot de cette page')), Text.of('§6§l🎁 Tout recevoir'), event => {
            let p = event.slot.gui.player;
            for (let s of pageData.items) {
                givePlayerItem(p, s.id, s.count);
            }
            p.tell(Text.of(`§a🎁 Vous avez reçu tous les objets de la page ${pageIndex + 1} !`));
            p.server.runCommandSilent(`playsound minecraft:entity.player.levelup player ${p.username} ${p.x} ${p.y} ${p.z} 1.0 1.0`);
        });

        // (8, 0) : Fermer
        gui.button(8, 0, Item.of('minecraft:barrier').withName(Text.of('§c§lFermer')), Text.of('§c§lFermer'), event => {
            event.slot.gui.player.closeMenu();
        });

        // Ligne 5 : Flèches de changement de page
        // (0, 5) : Page Précédente
        if (pageIndex > 0) {
            gui.button(0, 5, Item.of('minecraft:arrow').withName(Text.of('§e◀ Page 1 : Matières Premières')), Text.of('§e◀ Page 1'), event => {
                openMedicalSuppliesGUI(event.slot.gui.player, pageIndex - 1);
            });
        }

        // (8, 5) : Page Suivante
        if (pageIndex < SUPPLIES_PAGES.length - 1) {
            gui.button(8, 5, Item.of('minecraft:arrow').withName(Text.of('§ePage 2 : Composants Médicaux ▶')), Text.of('§ePage 2 ▶'), event => {
                openMedicalSuppliesGUI(event.slot.gui.player, pageIndex + 1);
            });
        }
    });
}
global.openMedicalSuppliesGUI = openMedicalSuppliesGUI;

// ========================================================
// 5. PERSISTANCE DES DONNÉES SUR RESPAWN (MORT DU JOUEUR)
// ========================================================
PlayerEvents.respawned(event => {
    try {
        let oldPlayer = event.oldPlayer;
        let newPlayer = event.player;
        if (oldPlayer && newPlayer && !event.keepData) {
            let oldNBT = oldPlayer.persistentData;
            let newNBT = newPlayer.persistentData;
            if (oldNBT.contains('is_medic')) {
                newNBT.putBoolean('is_medic', oldNBT.getBoolean('is_medic'));
            }
            if (oldNBT.contains('med_tier')) {
                newNBT.putInt('med_tier', oldNBT.getInt('med_tier'));
            }
            if (oldNBT.contains('med_unlocked_crafts')) {
                newNBT.put('med_unlocked_crafts', oldNBT.get('med_unlocked_crafts'));
            }
            if (oldNBT.contains('med_locked_crafts')) {
                newNBT.put('med_locked_crafts', oldNBT.get('med_locked_crafts'));
            }
        }
    } catch (e) {
        console.error('[Médecine] Erreur copie persistentData: ' + e);
    }
});

// ========================================================
// 6. RECETTES DE CRAFT DE LA TABLE MÉDICALE
// ========================================================
ServerEvents.recipes(event => {
    // Craft de la Table de Médecine dans l'établi
    event.shaped('kubejs:medicine_table', [
        'RIR',
        'ICI',
        'RIR'
    ], {
        R: 'minecraft:red_wool',
        I: 'minecraft:iron_ingot',
        C: 'minecraft:crafting_table'
    });

    event.shapeless('kubejs:medicine_table', [
        'minecraft:crafting_table',
        'minecraft:red_wool',
        'minecraft:iron_ingot'
    ]);

    event.shapeless('kubejs:medicine_table', [
        'minecraft:crafting_table',
        'minecraft:red_dye',
        'minecraft:iron_ingot'
    ]);
});

// ========================================================
// 6.b EXIGENCES DE SOINS PAR SÉQUELLE (TIER & MATÉRIEL)
// ========================================================
const HEAL_REQUIREMENTS = {
    'douleur': {
        minTier: 1,
        tierName: 'Tier 1 (Débutant)',
        items: ['zmodfood:aspirin', 'apocaly_soin:baume_golden_star', 'apocaly_soin:antidouleurs'],
        itemDesc: 'Boîte d\'Aspirine ou Baume Golden Star'
    },
    'epuisement': {
        minTier: 1,
        tierName: 'Tier 1 (Débutant)',
        items: ['zmodfood:tabletki', 'minecraft:honey_bottle', 'minecraft:apple'],
        itemDesc: 'Flacon de Tabletki ou Fiole de Miel'
    },
    'poison': {
        minTier: 1,
        tierName: 'Tier 1 (Débutant)',
        items: ['minecraft:milk_bucket', 'zmodfood:antiradin', 'minecraft:honey_bottle'],
        itemDesc: 'Seau de lait ou Antiradin'
    },
    'hemorragie': {
        minTier: 2,
        tierName: 'Tier 2 (Intermédiaire)',
        items: ['apocaly_soin:pansement_hemostatique', 'lrtactical:consumable', 'apocaly_soin:bandage'],
        itemDesc: 'Pansement Hémostatique ou Trousse Carfak'
    },
    'infection': {
        minTier: 2,
        tierName: 'Tier 2 (Intermédiaire)',
        items: ['lrtactical:consumable', 'zmodfood:aspirin', 'zmodfood:tabletki'],
        itemDesc: 'Trousse AI-2 ou Tabletki'
    },
    'traumatisme': {
        minTier: 2,
        tierName: 'Tier 2 (Intermédiaire)',
        items: ['apocaly_soin:antidouleurs', 'zmodfood:aspirin', 'apocaly_soin:baume_golden_star'],
        itemDesc: 'Antidouleurs Puissants ou Aspirine'
    },
    'brulure': {
        minTier: 2,
        tierName: 'Tier 2 (Intermédiaire)',
        items: ['lrtactical:consumable', 'apocaly_soin:baume_golden_star', 'apocaly_soin:pansement'],
        itemDesc: 'Pot de Vaseline ou Baume Golden Star'
    },
    'inconscient': {
        minTier: 5,
        tierName: 'Tier 5 (Sommet Médical)',
        items: ['apocaly_soin:adrenaline', 'lrtactical:consumable'],
        itemDesc: 'Auto-Injecteur d\'Adrénaline (réanimation)'
    },
    'fracture': {
        minTier: 3,
        tierName: 'Tier 3 (Expert - Chirurgie)',
        items: ['apocaly_soin:cms', 'lrtactical:consumable'],
        itemDesc: 'Kit Chirurgical CMS ou Kit Surv12'
    },
    'irradie': {
        minTier: 3,
        tierName: 'Tier 3 (Expert - Chirurgie)',
        items: ['zmodfood:antiradin', 'lrtactical:consumable'],
        itemDesc: 'Plaquette Antiradin ou Poche de Sang'
    },
    'amputation': {
        minTier: 4,
        tierName: 'Tier 4 (Exceptionnel)',
        items: ['lrtactical:consumable', 'apocaly_soin:stimulant_regenerant_experimental'],
        itemDesc: 'Valise Surv12 ou Stimulant Régénérant Expérimental (Vert)'
    }
};

// ========================================================
// 7. GESTION DES COMMANDES (COMMANDE UNIQUE : /soin)
// ========================================================
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    function hasAdminPerm(source) {
        if (!source) return false;
        if (!source.player) return true; // Console toujours autorisée
        return source.hasPermission(2);
    }

    function getPlayerDistance(p1, p2) {
        if (!p1 || !p2) return 999999;
        try {
            if (p1.level && p2.level && p1.level.dimension !== p2.level.dimension) return 999999;
            let dx = p1.x - p2.x;
            let dy = p1.y - p2.y;
            let dz = p1.z - p2.z;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        } catch (e) {
            return 999999;
        }
    }

    function showHelp(source) {
        source.sendSuccess(Text.of('§8============== §c§lAIDE SYSTÈME MÉDICAL §8=============='), false);
        source.sendSuccess(Text.of('§e/soin §8: Ouvre la table de soins (Médecins & OP).'), false);
        source.sendSuccess(Text.of('§e/soin composants §8: Ouvre la table des fournitures et composants médicaux.'), false);
        source.sendSuccess(Text.of('§e/soin diagnostiquer <patient> §8: Ausculte un patient et liste ses blessures (Médecins).'), false);
        source.sendSuccess(Text.of('§e/soin info [joueur] §8: Consulte le dossier médical.'), false);
        source.sendSuccess(Text.of('§e/soin list §8: Liste tous les protocoles médicaux.'), false);
        if (hasAdminPerm(source)) {
            source.sendSuccess(Text.of('§c§lCommandes Staff / OP :'), false);
            source.sendSuccess(Text.of('§6/soin kit §8: Donne un pack de tous les composants de craft médicaux.'), false);
            source.sendSuccess(Text.of('§6/soin role add <joueur> [palier 1-5] §8: Assigne le Rôle Médecin.'), false);
            source.sendSuccess(Text.of('§6/soin role remove <joueur> §8: Retire le Rôle Médecin.'), false);
            source.sendSuccess(Text.of('§6/soin role list §8: Liste les médecins en ligne.'), false);
            source.sendSuccess(Text.of('§6/soin tier <joueur> <0-5> §8: Définit le niveau de maîtrise.'), false);
            source.sendSuccess(Text.of('§6/soin unlock <joueur> <id> §8: Débloque un craft individuel.'), false);
            source.sendSuccess(Text.of('§6/soin lock <joueur> <id> §8: Verrouille un craft individuel.'), false);
            source.sendSuccess(Text.of('§6/soin reset <joueur> §8: Réinitialise le dossier médical.'), false);
        }
        source.sendSuccess(Text.of('§8====================================================='), false);
    }

    function handleDiagnosePatient(source, targetName) {
        let doctor = source.player;
        if (!doctor) {
            source.sendFailure(Text.of('§cCette commande doit être exécutée par un joueur en jeu.'));
            return 0;
        }

        let isOp = hasAdminPerm(source);
        let doctorIsMedic = isOp || isMedic(doctor);

        if (!doctorIsMedic) {
            source.sendFailure(Text.of('§c[Médecine] Seuls les praticiens qualifiés (Rôle Médecin) peuvent ausculter un patient !'));
            return 0;
        }

        let patient = findPlayer(source.server, targetName);
        if (!patient) {
            source.sendFailure(Text.of(`§c[Médecine] Patient introuvable en ligne : "${targetName}".`));
            return 0;
        }

        if (!isOp && doctor.username !== patient.username) {
            let dist = getPlayerDistance(doctor, patient);
            if (dist > 3.0) {
                source.sendFailure(Text.of(`§c[Médecine] Vous êtes trop éloigné de ${patient.username} pour l'ausculter (Distance max : 3 blocs, distance actuelle : ${Math.round(dist * 10) / 10}m).`));
                return 0;
            }
        }

        let docTier = getPlayerTier(doctor);
        let docTierInfo = MEDICAL_TIERS[docTier] || MEDICAL_TIERS[1];

        let consList = [];
        try {
            if (global.getPlayerConsequencesList) {
                consList = global.getPlayerConsequencesList(patient);
            }
        } catch (e) {}

        let pHealth = Math.round(patient.health);
        let pMaxHealth = Math.round(patient.maxHealth);
        let healthColor = pHealth > 15 ? '§a' : (pHealth > 7 ? '§e' : '§c');

        source.sendSuccess(Text.of(`§8============== §b§lDIAGNOSTIC MÉDICAL §8==============`), false);
        source.sendSuccess(Text.of(`§7Praticien : §eDr. ${doctor.username} §8(${docTierInfo.badge} §7Tier ${docTier}§8) | §7Patient : §f${patient.username}`), false);
        source.sendSuccess(Text.of(`§7Constantes vitales : ${healthColor}${pHealth} §7/ §f${pMaxHealth} PV`), false);

        if (consList.length === 0) {
            source.sendSuccess(Text.of('§a✔ Aucune séquelle ni traumatisme actif. Le patient est stable.'), false);
        } else {
            source.sendSuccess(Text.of(`§c⚠️ Séquelles & Pathologies actives (${consList.length}) :`), false);
            for (let c of consList) {
                let req = HEAL_REQUIREMENTS[c.id];
                let reqTierText = req ? req.tierName : 'Tier 1+';
                let reqItemText = req ? req.itemDesc : 'Soin médical adapté';

                source.sendSuccess(Text.of(`  ${c.color}§l- ${c.name} §8(id: §e${c.id}§8)`), false);
                source.sendSuccess(Text.of(`    §7Durée restante : ${c.durationText} §8| §7Sévérité : §e${c.severity}`), false);
                source.sendSuccess(Text.of(`    §7Recommandation : §f${reqTierText}`), false);
                source.sendSuccess(Text.of(`    §7Traitement préconisé : §e${reqItemText}`), false);
            }
            source.sendSuccess(Text.of(`§7(Les soins s'effectuent en appliquant le matériel médical approprié en RP.)`), false);
        }
        source.sendSuccess(Text.of(`§8====================================================`), false);

        doctor.server.runCommandSilent(`playsound minecraft:item.book.page_turn player ${doctor.username} ${doctor.x} ${doctor.y} ${doctor.z} 1.0 1.0`);
        if (doctor.username !== patient.username) {
            patient.tell(Text.of(`§7[§bMédecine§7] §eDr. ${doctor.username} §7procède à votre auscultation médicale...`));
        }

        return 1;
    }

    function handleRoleAdd(source, targetName, tierArg) {
        let target = findPlayer(source.server, targetName);
        if (!target) {
            source.sendFailure(Text.of(`§c[Médecine] Joueur introuvable en ligne : "${targetName}".`));
            return 0;
        }
        let tier = (tierArg !== undefined && tierArg !== null && tierArg >= 1 && tierArg <= 5) ? tierArg : 1;
        setPlayerMedicRole(target, true, tier);
        let tInfo = MEDICAL_TIERS[tier];
        source.sendSuccess(Text.of(`§a[Médecine] §fLe joueur §e${target.username} §fa reçu le §6Rôle Médecin §f(${tInfo.badge} §e${tInfo.title}§f) !`), true);
        target.tell(Text.of(`§a[Médecine] ✚ §bFélicitations ! Vous avez reçu le §6Rôle Médecin §b(${tInfo.badge} §e${tInfo.title}§b) !`));
        target.tell(Text.of(`§7Vous avez désormais accès à la table de soins et à la commande : §e/soin diagnostiquer <patient>`));
        target.server.runCommandSilent(`playsound minecraft:ui.toast.challenge_complete player ${target.username} ${target.x} ${target.y} ${target.z} 1.0 1.2`);
        return 1;
    }

    function handleRoleRemove(source, targetName) {
        let target = findPlayer(source.server, targetName);
        if (!target) {
            source.sendFailure(Text.of(`§c[Médecine] Joueur introuvable en ligne : "${targetName}".`));
            return 0;
        }
        setPlayerMedicRole(target, false);
        source.sendSuccess(Text.of(`§c[Médecine] §fLe §6Rôle Médecin §fa été retiré à §e${target.username}§f.`), true);
        target.tell(Text.of(`§c[Médecine] ✖ Votre §6Rôle Médecin §cvous a été retiré. Vous redevenez simple civil.`));
        target.server.runCommandSilent(`playsound minecraft:block.chest.locked player ${target.username} ${target.x} ${target.y} ${target.z} 1.0 0.8`);
        return 1;
    }

    function handleRoleList(source) {
        let players = source.server.playerList.players;
        let medics = [];
        for (let i = 0; i < players.size(); i++) {
            let p = players.get(i);
            if (isMedic(p)) {
                let t = getPlayerTier(p);
                let tInfo = MEDICAL_TIERS[t];
                medics.push(`§e${p.username} §8(${tInfo.badge})`);
            }
        }
        source.sendSuccess(Text.of(`§8============== §6§lMÉDECINS EN LIGNE (${medics.length}) §8==============`), false);
        if (medics.length === 0) {
            source.sendSuccess(Text.of('§7Aucun médecin connecté actuellement.'), false);
        } else {
            source.sendSuccess(Text.of(`  ${medics.join('§7, ')}`), false);
        }
        source.sendSuccess(Text.of('§8====================================================='), false);
        return 1;
    }

    function showCraftList(source) {
        let p = source.player;
        let isOp = hasAdminPerm(source);
        let pTier = p ? getPlayerTier(p) : 5;

        source.sendSuccess(Text.of('§8============== §c§lLISTE DES CRAFTS MÉDICAUX §8=============='), false);
        for (let t = 1; t <= 5; t++) {
            let tInfo = MEDICAL_TIERS[t];
            let tierCrafts = ALL_CRAFTS.filter(c => c.tier === t);
            let canSeeTier = isOp || (p && isMedic(p) && pTier >= t);

            if (canSeeTier) {
                source.sendSuccess(Text.of(`${tInfo.badge} §f${tInfo.title} §8(${tierCrafts.length} protocoles) :`), false);
                for (let c of tierCrafts) {
                    let unl = isOp || (p && isCraftUnlocked(p, c));
                    if (unl) {
                        source.sendSuccess(Text.of(`  §8- §e${c.id} §8: §f${c.name}`), false);
                    } else {
                        source.sendSuccess(Text.of(`  §8- §7??? §8: §8[Protocole verrouillé]`), false);
                    }
                }
            } else {
                source.sendSuccess(Text.of(`${tInfo.badge} §7${tInfo.title} §8(Verrouillé - Niveau insuffisant) :`), false);
                source.sendSuccess(Text.of(`  §8- §8[${tierCrafts.length} protocoles confidentiels non découverts]`), false);
            }
        }
        source.sendSuccess(Text.of('§8========================================================'), false);
    }

    function showPlayerMedicalInfo(source, target) {
        let tier = getPlayerTier(target);
        let tInfo = MEDICAL_TIERS[tier];
        let unlList = getUnlockedCraftsList(target);
        let lckList = getLockedCraftsList(target);
        let targetIsMedic = isMedic(target);

        let accessible = 0;
        for (let c of ALL_CRAFTS) {
            if (isCraftUnlocked(target, c)) accessible++;
        }

        source.sendSuccess(Text.of('§8============== §c§lDOSSIER MÉDICAL RP §8=============='), false);
        source.sendSuccess(Text.of(`§7Praticien : §e${target.username} §8| §7Statut : ${targetIsMedic ? '§a✚ Médecin Actif' : '§7Civil'}`), false);
        source.sendSuccess(Text.of(`§7Grade : ${tInfo.badge} §f${tInfo.title}`), false);
        source.sendSuccess(Text.of(`§7Classification : §f${tInfo.subtitle}`), false);
        source.sendSuccess(Text.of(`§7Compétence : §f${tInfo.maitrise}`), false);
        source.sendSuccess(Text.of(`§7Complexité max : §f${tInfo.complexite} §8| §7Risque : §f${tInfo.risque}`), false);
        source.sendSuccess(Text.of(`§7Protocoles autorisés : §a${accessible} §7/ §f${ALL_CRAFTS.length}`), false);

        if (unlList.length > 0) {
            source.sendSuccess(Text.of(`§a★ Déblocages spécifiques (${unlList.length}) : §f${unlList.join(', ')}`), false);
        }
        if (lckList.length > 0) {
            source.sendSuccess(Text.of(`§c🔒 Verrouillages stricts (${lckList.length}) : §f${lckList.join(', ')}`), false);
        }

        // Affichage des séquelles / conséquences actives
        try {
            if (global.getPlayerConsequencesList) {
                let consList = global.getPlayerConsequencesList(target);
                if (consList.length > 0) {
                    source.sendSuccess(Text.of(`§c⚠️ Séquelles & Conséquences actives (${consList.length}) :`), false);
                    for (let c of consList) {
                        source.sendSuccess(Text.of(`  ${c.color}§l- ${c.name} §8| ${c.durationText} §8| §7Sévérité: §e${c.severity}`), false);
                    }
                } else {
                    source.sendSuccess(Text.of(`§a✔ État de santé : §fAucune séquelle active`), false);
                }
            }
        } catch (e) {}
        source.sendSuccess(Text.of('§8==================================================='), false);
    }

    function handleSetTier(source, targetName, level) {
        if (level < 0 || level > 5) {
            source.sendFailure(Text.of('§c[Médecine] Le niveau doit être compris entre 0 et 5.'));
            return 0;
        }
        let target = findPlayer(source.server, targetName);
        if (!target) {
            source.sendFailure(Text.of(`§c[Médecine] Joueur introuvable en ligne : "${targetName}".`));
            return 0;
        }

        setPlayerTier(target, level);
        let tInfo = MEDICAL_TIERS[level];

        source.sendSuccess(Text.of(`§a[Médecine] §fLe niveau médical de §e${target.username} §fa été défini sur : ${tInfo.badge} §f${tInfo.title} §8(Tier ${level})§f.`), true);
        target.tell(Text.of(`§a[Médecine] §fVotre grade médical a été mis à jour : ${tInfo.badge} §b${tInfo.title} §8(${tInfo.maitrise})§f!`));
        target.server.runCommandSilent(`playsound minecraft:ui.toast.challenge_complete player ${target.username} ${target.x} ${target.y} ${target.z} 1.0 1.2`);
        return 1;
    }

    function handleUnlockCraft(source, targetName, craftId) {
        craftId = craftId.toLowerCase().trim();
        let craft = ALL_CRAFTS_MAP[craftId];
        if (!craft) {
            source.sendFailure(Text.of(`§c[Médecine] Craft inconnu : "${craftId}". Tapez §6/soin list §cpour voir tous les identifiants.`));
            return 0;
        }
        let target = findPlayer(source.server, targetName);
        if (!target) {
            source.sendFailure(Text.of(`§c[Médecine] Joueur introuvable en ligne : "${targetName}".`));
            return 0;
        }

        unlockCraftForPlayer(target, craftId);

        source.sendSuccess(Text.of(`§a[Médecine] §fLe craft §e${craft.name} §8(${craftId}) §aa été débloqué individuellement pour §e${target.username}§f.`), true);
        target.tell(Text.of(`§a[Médecine] ★ §fProtocole débloqué : Vous avez appris à fabriquer §e${craft.name} §f!`));
        target.server.runCommandSilent(`playsound minecraft:entity.player.levelup player ${target.username} ${target.x} ${target.y} ${target.z} 1.0 1.2`);
        return 1;
    }

    function handleLockCraft(source, targetName, craftId) {
        craftId = craftId.toLowerCase().trim();
        let craft = ALL_CRAFTS_MAP[craftId];
        if (!craft) {
            source.sendFailure(Text.of(`§c[Médecine] Craft inconnu : "${craftId}". Tapez §6/soin list §cpour voir tous les identifiants.`));
            return 0;
        }
        let target = findPlayer(source.server, targetName);
        if (!target) {
            source.sendFailure(Text.of(`§c[Médecine] Joueur introuvable en ligne : "${targetName}".`));
            return 0;
        }

        lockCraftForPlayer(target, craftId);

        source.sendSuccess(Text.of(`§c[Médecine] §fLe craft §e${craft.name} §8(${craftId}) §ca été verrouillé pour §e${target.username}§f.`), true);
        target.tell(Text.of(`§c[Médecine] 🔒 Le protocole médical §e${craft.name} §cvous a été retiré.`));
        target.server.runCommandSilent(`playsound minecraft:block.chest.locked player ${target.username} ${target.x} ${target.y} ${target.z} 1.0 0.8`);
        return 1;
    }

    function handleResetPlayer(source, targetName) {
        let target = findPlayer(source.server, targetName);
        if (!target) {
            source.sendFailure(Text.of(`§c[Médecine] Joueur introuvable en ligne : "${targetName}".`));
            return 0;
        }

        resetPlayerMedical(target);

        source.sendSuccess(Text.of(`§a[Médecine] §fLe profil médical de §e${target.username} §fa été réinitialisé à zéro.`), true);
        target.tell(Text.of('§e[Médecine] §7Votre profil et vos crafts médicaux ont été réinitialisés à l\'état civil initial.'));
        return 1;
    }

    // ----------------------------------------------------
    // COMMANDE UNIQUE : /soin (Ouvrir & Gérer la Table de Soins, Diagnostiquer, Gérer Rôles)
    // ----------------------------------------------------
    let soinCmd = Commands.literal('soin')
        .executes(c => {
            let entity = c.source.entity;
            if (entity && entity.isPlayer()) {
                if (hasAdminPerm(c.source) || isMedic(entity)) {
                    openMedicinePage(entity, 0);
                } else {
                    c.source.sendFailure(Text.of('§c[Médecine] Seuls les membres possédant le Rôle Médecin peuvent ouvrir la table de soins !'));
                }
            } else {
                showHelp(c.source);
            }
            return 1;
        })
        .then(Commands.literal('open').executes(c => {
            let entity = c.source.entity;
            if (entity && entity.isPlayer()) {
                if (hasAdminPerm(c.source) || isMedic(entity)) {
                    openMedicinePage(entity, 0);
                } else {
                    c.source.sendFailure(Text.of('§c[Médecine] Seuls les membres possédant le Rôle Médecin peuvent ouvrir la table de soins !'));
                }
            }
            return 1;
        }))
        .then(Commands.literal('help').executes(c => {
            showHelp(c.source);
            return 1;
        }))
        .then(Commands.literal('list').executes(c => {
            showCraftList(c.source);
            return 1;
        }))
        // TABLE & ARMOIRE DES COMPOSANTS
        .then(Commands.literal('composants').executes(c => {
            let entity = c.source.entity;
            if (entity && entity.isPlayer()) {
                openMedicalSuppliesGUI(entity);
            }
            return 1;
        }))
        .then(Commands.literal('fournitures').executes(c => {
            let entity = c.source.entity;
            if (entity && entity.isPlayer()) {
                openMedicalSuppliesGUI(entity);
            }
            return 1;
        }))
        .then(Commands.literal('armoire').executes(c => {
            let entity = c.source.entity;
            if (entity && entity.isPlayer()) {
                openMedicalSuppliesGUI(entity);
            }
            return 1;
        }))
        // DON DU KIT DE TOUS LES COMPOSANTS
        .then(
            Commands.literal('kit')
                .executes(c => {
                    let entity = c.source.entity;
                    if (entity && entity.isPlayer()) {
                        for (let page of SUPPLIES_PAGES) {
                            for (let s of page.items) {
                                givePlayerItem(entity, s.id, s.count);
                            }
                        }
                        c.source.sendSuccess(Text.of('§a[Médecine] 📦 Vous avez reçu le lot complet de toutes les fournitures médicales !'), false);
                        entity.server.runCommandSilent(`playsound minecraft:entity.player.levelup player ${entity.username} ${entity.x} ${entity.y} ${entity.z} 1.0 1.0`);
                    } else {
                        c.source.sendFailure(Text.of('§cCommande réservée aux joueurs.'));
                    }
                    return 1;
                })
        )
        // DIAGNOSTIQUER UN PATIENT (Réservé strictement aux Médecins et OP)
        .then(
            Commands.literal('diagnostiquer')
                .then(
                    Commands.argument('patient', Arguments.STRING.create(event))
                        .executes(c => {
                            let targetName = Arguments.STRING.getResult(c, 'patient');
                            return handleDiagnosePatient(c.source, targetName);
                        })
                )
        )
        // Alias AUSCULTER
        .then(
            Commands.literal('ausculter')
                .then(
                    Commands.argument('patient', Arguments.STRING.create(event))
                        .executes(c => {
                            let targetName = Arguments.STRING.getResult(c, 'patient');
                            return handleDiagnosePatient(c.source, targetName);
                        })
                )
        )
        // DOSSIER MÉDICAL
        .then(
            Commands.literal('info')
                .executes(c => {
                    let entity = c.source.entity;
                    if (entity && entity.isPlayer()) {
                        showPlayerMedicalInfo(c.source, entity);
                    } else {
                        c.source.sendFailure(Text.of('§cPrécisez un joueur : /soin info <joueur>'));
                    }
                    return 1;
                })
                .then(
                    Commands.argument('joueur', Arguments.STRING.create(event))
                        .executes(c => {
                            let targetName = Arguments.STRING.getResult(c, 'joueur');
                            let target = findPlayer(c.source.server, targetName);
                            if (!target) {
                                c.source.sendFailure(Text.of(`§c[Médecine] Joueur introuvable en ligne : "${targetName}".`));
                                return 0;
                            }
                            showPlayerMedicalInfo(c.source, target);
                            return 1;
                        })
                )
        )
        // GESTION DU RÔLE MÉDECIN (OP UNIQUEMENT)
        .then(
            Commands.literal('role')
                .requires(s => hasAdminPerm(s))
                .then(
                    Commands.literal('add')
                        .then(
                            Commands.argument('joueur', Arguments.STRING.create(event))
                                .executes(c => {
                                    let targetName = Arguments.STRING.getResult(c, 'joueur');
                                    return handleRoleAdd(c.source, targetName, 1);
                                })
                                .then(
                                    Commands.argument('palier', Arguments.INTEGER.create(event))
                                        .executes(c => {
                                            let targetName = Arguments.STRING.getResult(c, 'joueur');
                                            let tier = Arguments.INTEGER.getResult(c, 'palier');
                                            return handleRoleAdd(c.source, targetName, tier);
                                        })
                                )
                        )
                )
                .then(
                    Commands.literal('remove')
                        .then(
                            Commands.argument('joueur', Arguments.STRING.create(event))
                                .executes(c => {
                                    let targetName = Arguments.STRING.getResult(c, 'joueur');
                                    return handleRoleRemove(c.source, targetName);
                                })
                        )
                )
                .then(
                    Commands.literal('list')
                        .executes(c => {
                            return handleRoleList(c.source);
                        })
                )
        )
        // PALIER / TIER (OP UNIQUEMENT)
        .then(
            Commands.literal('tier')
                .requires(s => hasAdminPerm(s))
                .then(
                    Commands.argument('joueur', Arguments.STRING.create(event))
                        .then(
                            Commands.argument('niveau', Arguments.INTEGER.create(event))
                                .executes(c => {
                                    let targetName = Arguments.STRING.getResult(c, 'joueur');
                                    let level = Arguments.INTEGER.getResult(c, 'niveau');
                                    return handleSetTier(c.source, targetName, level);
                                })
                        )
                )
        )
        // DÉBLOCAGE CRAFT (OP UNIQUEMENT)
        .then(
            Commands.literal('unlock')
                .requires(s => hasAdminPerm(s))
                .then(
                    Commands.argument('joueur', Arguments.STRING.create(event))
                        .then(
                            Commands.argument('craft_id', Arguments.STRING.create(event))
                                .executes(c => {
                                    let targetName = Arguments.STRING.getResult(c, 'joueur');
                                    let craftId = Arguments.STRING.getResult(c, 'craft_id');
                                    return handleUnlockCraft(c.source, targetName, craftId);
                                })
                        )
                )
        )
        // VERROUILLAGE CRAFT (OP UNIQUEMENT)
        .then(
            Commands.literal('lock')
                .requires(s => hasAdminPerm(s))
                .then(
                    Commands.argument('joueur', Arguments.STRING.create(event))
                        .then(
                            Commands.argument('craft_id', Arguments.STRING.create(event))
                                .executes(c => {
                                    let targetName = Arguments.STRING.getResult(c, 'joueur');
                                    let craftId = Arguments.STRING.getResult(c, 'craft_id');
                                    return handleLockCraft(c.source, targetName, craftId);
                                })
                        )
                )
        )
        // RÉINITIALISATION PROFIL (OP UNIQUEMENT)
        .then(
            Commands.literal('reset')
                .requires(s => hasAdminPerm(s))
                .then(
                    Commands.argument('joueur', Arguments.STRING.create(event))
                        .executes(c => {
                            let targetName = Arguments.STRING.getResult(c, 'joueur');
                            return handleResetPlayer(c.source, targetName);
                        })
                )
        );

    event.register(soinCmd);

    console.log('[KubeJS] Système Médical initialisé (Commande unique : /soin) !');
});

// ========================================================
// 8. INTERACTIONS EN JEU (BLOCS & ITEMS)
// ========================================================

// Clic droit sur le bloc Table de Médecine
BlockEvents.rightClicked('kubejs:medicine_table', event => {
    if (event.hand.name() !== 'MAIN_HAND') return;
    openMedicinePage(event.player, 0);
    event.success();
});

// Clic droit avec accroupissement sur l'alambic
BlockEvents.rightClicked('minecraft:brewing_stand', event => {
    if (event.hand.name() !== 'MAIN_HAND') return;
    if (event.player.isShiftKeyDown()) {
        openMedicinePage(event.player, 0);
        event.success();
    }
});

// Clic droit dans les airs en tenant l'objet Table de Médecine
ItemEvents.rightClicked('kubejs:medicine_table', event => {
    if (event.hand.name() !== 'MAIN_HAND') return;
    if (event.player.isShiftKeyDown()) {
        openMedicinePage(event.player, 0);
        event.success();
    }
});
