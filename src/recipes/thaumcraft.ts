import type {
  Bonus,
  Ingredient,
  Shaped,
  Shapeless,
  Stack
} from '../lib/format.ts';

import * as format from '../lib/format.ts';
import { maybe } from '../lib/fn.ts';

export type RecipeArcane = {
  input: Shaped | Shapeless;
  output: Ingredient;
  /** Defaults to `"ASPECTS"` as this does not require research */
  research?: string;
  aspects: Stack[];
};

export type RecipeArcaneShaped = RecipeArcane & { input: Shaped };

export const RESEARCH_CATEGORY = {
  basics: 'BASICS',
  thaumaturgy: 'THAUMATURGY',
  alchemy: 'ALCHEMY',
  artifice: 'ARTIFICE',
  golemancy: 'GOLEMANCY',
  eldritch: 'ELDRITCH',
  automagy: 'AUTOMAGY',
  forbidden: 'FORBIDDEN'
} as const;

export const RESEARCH = {
  [RESEARCH_CATEGORY.basics]: {
    warp: 'WARP',
    research: 'RESEARCH',
    enchant: 'ENCHANT',
    nodes: 'NODES',
    researchDupe: 'RESEARCHDUPE',
    ore: 'ORE',
    aspects: 'ASPECTS',
    knowfrag: 'KNOWFRAG',
    researcher2: 'RESEARCHER2',
    crimson: 'CRIMSON',
    chestScan: 'salisarcana:CHESTSCAN',
    nodeJar: 'NODEJAR',
    researcher: 'RESEARCHER1',
    nodeTapper2: 'NODETAPPER2',
    deconstructor: 'DECONSTRUCTOR',
    nodeTapper1: 'NODETAPPER1',
    thaumonomicon: 'THAUMONOMICON',
    plants: 'PLANTS',
    nodePreserve: 'NODEPRESERVE',
    pech: 'PECH'
  },
  [RESEARCH_CATEGORY.thaumaturgy]: {
    nodeStabilizer: 'NODESTABILIZER',
    replaceWandCore: 'salisarcana:REPLACEWANDCORE',
    wandPedFoc: 'WANDPEDFOC',
    vampBat: 'VAMPBAT',
    rodBone: 'ROD_bone',
    basicThaumaturgy: 'BASICTHAUMATURGY',
    focusExcavation: 'FOCUSEXCAVATION',
    sceptre: 'SCEPTRE',
    replaceWandCaps: 'salisarcana:REPLACEWANDCAPS',
    rodQuartzStaff: 'ROD_quartz_staff',
    focusHellBat: 'FOCUSHELLBAT',
    visChargeRelay: 'VISCHARGERELAY',
    rodIce: 'ROD_ice',
    nodeStabilizeRadV: 'NODESTABILIZERADV',
    rodReed: 'ROD_reed',
    rodGreatwoodStaff: 'ROD_greatwood_staff',
    focusDisenchanting: 'salisarcana:FOCUS_DISENCHANTING',
    rodSilverwoodStaff: 'ROD_silverwood_staff',
    focusFrost: 'FOCUSFROST',
    visAmulet: 'VISAMULET',
    focusManipulation: 'FOCALMANIPULATION',
    focusFire: 'FOCUSFIRE',
    capGold: 'CAP_gold',
    rodSilverwood: 'ROD_silverwood',
    visPower: 'VISPOWER',
    focusPouch: 'FOCUSPOUCH',
    capCopper: 'CAP_copper',
    rodReedStaff: 'ROD_reed_staff',
    focusShock: 'FOCUSSHOCK',
    capSilver: 'CAP_silver',
    rodQuartz: 'ROD_quartz',
    capIron: 'CAP_iron',
    focusWarding: 'FOCUSWARDING',
    rodObsidian: 'ROD_obsidian',
    focusPortableHole: 'FOCUSPORTABLEHOLE',
    capThaumium: 'CAP_thaumium',
    rodWood: 'ROD_wood',
    rodGreatwood: 'ROD_greatwood',
    rodBlaze: 'ROD_blaze',
    rodBoneStaff: 'ROD_bone_staff',
    rodObsidianStaff: 'ROD_obsidian_staff',
    focusTrade: 'FOCUSTRADE',
    rodIceStaff: 'ROD_ice_staff',
    wandPed: 'WANDPED',
    rodBlazeStaff: 'ROD_blaze_staff'
  },
  [RESEARCH_CATEGORY.alchemy]: {
    alumentum: 'ALUMENTUM',
    bathSalts: 'BATHSALTS',
    crucible: 'CRUCIBLE',
    entropicProcessing: 'ENTROPICPROCESSING',
    transIron: 'TRANSIRON',
    thaumatorium: 'THAUMATORIUM',
    alchemicManufacture: 'ALCHEMICALMANUFACTURE',
    liquidDeath: 'LIQUIDDEATH',
    tubes: 'TUBES',
    transTin: 'TRANSTIN',
    saneSoap: 'SANESOAP',
    etherealBloom: 'ETHEREALBLOOM',
    tallow: 'TALLOW',
    pureSilver: 'PURESILVER',
    pureTin: 'PURETIN',
    transCopper: 'TRANSCOPPER',
    essentiaCrystal: 'ESSENTIACRYSTAL',
    arcaneSpa: 'ARCANESPA',
    centrifuge: 'CENTRIFUGE',
    transSilver: 'TRANSSILVER',
    pureIron: 'PUREIRON',
    alchemicaDuplication: 'ALCHEMICALDUPLICATION',
    jarVoid: 'JARVOID',
    nitor: 'NITOR',
    bottleTaint: 'BOTTLETAINT',
    pureGold: 'PUREGOLD',
    distillEssentia: 'DISTILESSENTIA',
    phial: 'PHIAL',
    tubeFilter: 'TUBEFILTER',
    pureLead: 'PURELEAD',
    thaumium: 'THAUMIUM',
    transLead: 'TRANSLEAD',
    transGold: 'TRANSGOLD',
    pureCopper: 'PURECOPPER',
    jarLabel: 'JARLABEL'
  },
  [RESEARCH_CATEGORY.artifice]: {
    runicEmergency: 'RUNICEMERGENCY',
    goggles: 'GOGGLES',
    enchFabric: 'ENCHFABRIC',
    elementalPick: 'ELEMENTALPICK',
    elementalAxe: 'ELEMENTALAXE',
    table: 'TABLE',
    infernalFurnace: 'INFERNALFURNACE',
    banners: 'BANNERS',
    elementalShovel: 'ELEMENTALSHOVEL',
    levitator: 'LEVITATOR',
    hoverGirdle: 'HOVERGIRDLE',
    wardenArcana: 'WARDEDARCANA',
    basicArtifice: 'BASICARTIFACE',
    fluxScrub: 'FLUXSCRUB',
    thaumometer: 'THAUMOMETER',
    bootsTraveller: 'BOOTSTRAVELLER',
    restable: 'RESTABLE',
    mirrorEssentia: 'MIRRORESSENTIA',
    primalArrow: 'PRIMALARROW',
    arcaneEar: 'ARCANEEAR',
    grate: 'GRATE',
    runicCharged: 'RUNICCHARGED',
    runicHealing: 'RUNICHEALING',
    hoverHarness: 'HOVERHARNESS',
    mirror: 'MIRROR',
    lampGrowth: 'LAMPGROWTH',
    maskGrinningDevil: 'MASKGRINNINGDEVIL',
    elementalHoe: 'ELEMENTALHOE',
    mirrorHand: 'MIRRORHAND',
    arcTable: 'ARCTABLE',
    infusion: 'INFUSION',
    runicKinetic: 'RUNICKINETIC',
    paveWard: 'PAVEWARD',
    maskAngryGhost: 'MASKANGRYGHOST',
    maskSippingFiend: 'MASKSIPPINGFIEND',
    arcaneLamp: 'ARCANELAMP',
    armorFortress: 'ARMORFORTRESS',
    bellow: 'BELLOWS',
    helmGoggles: 'HELMGOGGLES',
    runicArmor: 'RUNICARMOR',
    runicAugmentation: 'RUNICAUGMENTATION',
    lampFertility: 'LAMPFERTILITY',
    boneBow: 'BONEBOW',
    arcaneStone: 'ARCANESTONE',
    sinStone: 'SINSTONE',
    elementalSword: 'ELEMENTALSWORD',
    paveTravel: 'PAVETRAVEL',
    jarBrain: 'JARBRAIN',
    arcaneBore: 'ARCANEBORE',
    infusionEnchantment: 'INFUSIONENCHANTMENT'
  },
  [RESEARCH_CATEGORY.golemancy]: {
    golemClay: 'GOLEMCLAY',
    upgradeWater: 'UPGRADEWATER',
    hungryChest: 'HUNGRYCHEST',
    golemTallow: 'GOLEMTALLOW',
    golemWood: 'GOLEMWOOD',
    golemFlesh: 'GOLEMFLESH',
    upgradeEarth: 'UPGRADEEARTH',
    tinyDart: 'TINYDART',
    upgradeFire: 'UPGRADEFIRE',
    upgradeEntropy: 'UPGRADEENTROPY',
    coreUse: 'COREUSE',
    tinyHammer: 'TINYHAMMER',
    travelTrunk: 'TRAVELTRUNK',
    tinyBowtie: 'TINYBOWTIE',
    golemBell: 'GOLEMBELL',
    coreSorting: 'CORESORTING',
    golemThaumium: 'GOLEMTHAUMIUM',
    tinyHat: 'TINYHAT',
    tinyFez: 'TINYFEZ',
    coreLumber: 'CORELUMBER',
    tinyGlasses: 'TINYGLASSES',
    tinyVisor: 'TINYVISOR',
    upgradeAir: 'UPGRADEAIR',
    coreFishing: 'COREFISHING',
    coreGather: 'COREGATHER',
    coreHarvest: 'COREHARVEST',
    coreButcher: 'COREBUTCHER',
    coreGuard: 'COREGUARD',
    advancedGolem: 'ADVANCEDGOLEM',
    tinyArmor: 'TINYARMOR',
    coreFill: 'COREFILL',
    golemFetter: 'GOLEMFETTER',
    golemStraw: 'GOLEMSTRAW',
    corealAlchemy: 'COREALCHEMY',
    golemStone: 'GOLEMSTONE',
    golemIron: 'GOLEMIRON',
    coreLiquid: 'CORELIQUID',
    coreEmpty: 'COREEMPTY',
    upgradeOrder: 'UPGRADEORDER'
  },
  [RESEARCH_CATEGORY.eldritch]: {
    eldritchMajor: 'ELDRITCHMAJOR',
    advAlchemyFurnace: 'ADVALCHEMYFURNACE',
    armorVoidFortress: 'ARMORVOIDFORTRESS',
    eldritchMinor: 'ELDRITCHMINOR',
    enterOuter: 'ENTEROUTER',
    focusPrimal: 'FOCUSPRIMAL',
    essentiaReservoir: 'ESSENTIARESERVOIR',
    sanityCheck: 'SANITYCHECK',
    rodPrimalStaff: 'ROD_primal_staff',
    oculus: 'OCULUS',
    outerRev: 'OUTERREV',
    primalCrusher: 'PRIMALCRUSHER',
    primPearl: 'PRIMPEARL',
    primNode: 'PRIMNODE',
    capVoid: 'CAP_void',
    voidMetal: 'VOIDMETAL'
  },
  [RESEARCH_CATEGORY.automagy]: {
    redCrystal: 'REDCRYSTAL',
    golemLinker: 'GOLEMLINKER',
    netherruneWisp: 'NETHERRUNE_WISP',
    mobLure: 'MOBLURE',
    dimensionLUre: 'DIMENSIONLURE',
    advNodeJar: 'ADVNODEJAR',
    tallyBlockLens: 'TALLYBLOCK_LENS',
    netherruneGhast: 'NETHERRUNE_GHAST',
    netherruneBat: 'NETHERRUNE_BAT',
    sliversTravel: 'SLIVERS_TRAVEL',
    remoteComparator: 'REMOTECOMPARATOR',
    essentiaLocusAggregator: 'ESSENTIALOCUSAGGREGATOR',
    mirrorInput: 'MIRRORINPUT',
    redCrystalDim: 'REDCRYSTAL_DIM',
    redCrystalMirrorbound: 'REDCRYSTAL_MIRRORBOUND',
    thirstyTank: 'THIRSTYTANK',
    eagerChest: 'EAGERCHEST',
    thirstyTankGlyphBovine: 'THIRSTYTANK_GLYPH_BOVINE',
    netherruneLight: 'NETHERRUNE_LIGHT',
    hungryMaw: 'HUNGRYMAW',
    alchemyBoiler: 'ALCHEMYBOILER',
    entitySignal: 'ENTITYSIGNAL',
    netherruneSlime: 'NETHERRUNE_SLIME',
    netherruneZombie: 'NETHERRUNE_ZOMBIE',
    xpStone: 'XPSTONE',
    greedyChest: 'GREEDYCHEST',
    golemWorkbench: 'GOLEMWORKBENCH',
    netherruneSoul: 'NETHERRUNE_SOUL',
    mirrorMultiDest: 'MIRRORMULTIDEST',
    enderDisjunction: 'ENDERDISJUNCTION',
    invetariumDelivery: 'INVENTARIUM_DELIVERY',
    slivers: 'SLIVERS',
    enchantFishing: 'ENCHANT_FISHING',
    netherruneCelerity: 'NETHERRUNE_CELERITY',
    thirstyTankGlyp: 'THIRSTYTANK_GLYPH',
    crystalBrain: 'CRYSTALBRAIN',
    vishroomSoup: 'VISHROOMSOUP',
    nitorLight: 'NITORLIGHT',
    inventarium: 'INVENTARIUM',
    inventariumPointer: 'INVENTARIUM_POINTER',
    redCrystalRez: 'REDCRYSTAL_RES',
    entropicRefining: 'ENTROPICREFINING',
    golemWorkbenchUpgrade: 'GOLEMWORKBENCH_UPGRADE',
    focusCrafting: 'FOCUSCRAFTING',
    enchantedPaper: 'ENCHANTEDPAPER',
    autoHandMirror: 'AUTOHANDMIRROR',
    redstoneTheory: 'REDSTONETHEORY',
    netherruneSkeleton: 'NETHERRUNE_SKELETON',
    essentiaLocus: 'ESSENTIALOCUS',
    magicHourglass: 'MAGICHOURGLASS',
    amnesiaStone: 'AMNESIASTONE',
    focusCraftingUpgrade: 'FOCUSCRAFTING_UPGRADE',
    redCrystalAmp: 'REDCRYSTAL_AMP',
    inventarumExtra: 'INVENTARIUM_EXTRA',
    netherruneCrystal: 'NETHERRUNE_CRYSTAL',
    thaumostaticRefueler: 'THAUMOSTATICREFUELER',
    tallyBlock: 'TALLYBLOCK',
    netherMind: 'NETHERMIND',
    visReader: 'VISREADER',
    finiCalMaw: 'FINICALMAW',
    avaricious: 'AVARICIOUS',
    tenaciousChest: 'TENACIOUSCHEST',
    redCrystalDense: 'REDCRYSTAL_DENSE',
    sliversWarding: 'SLIVERS_WARDING',
    golemInhibitor: 'GOLEMINHIBITOR'
  },
  [RESEARCH_CATEGORY.forbidden]: {
    skullAxe: 'SKULLAXE',
    bloodRapier: 'BLOODRAPIER',
    arcaneCake: 'ARCANECAKE',
    taintPick: 'TAINTPICK',
    taintTree: 'TAINTTREE',
    wrath: 'WRATH',
    schools: 'SCHOOLS',
    transEmerald: 'TRANSEMERALD',
    hellFire: 'HELLFIRE',
    voidToucher: 'VOIDTOUCHED',
    rodTainted: 'ROD_tainted',
    eldritchOrb: 'ELDRITCHORB',
    bloodWell: 'BLOODWELL',
    consuming: 'CONSUMING',
    cluster: 'CLUSTER',
    subCollar: 'SUBCOLLAR',
    bloodMagic: 'BLOODMAGIC',
    rodInfernal: 'ROD_infernal',
    crystalWell: 'CRYSTALWELL',
    fork: 'FORK',
    rodBloodStaff: 'ROD_blood_staff',
    ringFood: 'RINGFOOD',
    corrupting: 'CORRUPTING',
    taintStone: 'TAINTSTONE',
    rodBlood: 'ROD_blood',
    capAlchemical: 'CAP_alchemical',
    ridingCrop: 'RIDINGCROP',
    netherShards: 'NETHERSHARDS',
    primeWell: 'PRIMEWELL',
    greedy: 'GREEDY',
    educational: 'EDUCATIONAL',
    rodProfane: 'ROD_profane',
    impact: 'IMPACT',
    wrathCage: 'WRATHCAGE',
    blackFlower: 'BLACKFLOWER',
    morphTools: 'MORPHTOOLS',
    taintShovel: 'TAINTSHOVEL',
    focusBlink: 'FOCUSBLINK'
  }
};

export const ASPECT = {
  aer: 'aer',
  terra: 'terra',
  ignis: 'ignis',
  aqua: 'aqua',
  ordo: 'ordo',
  perditio: 'perditio',
  vacuos: 'vacuos',
  lux: 'lux',
  tempestas: 'tempestas',
  motus: 'motus',
  gelum: 'gelum',
  vitreus: 'vitreus',
  victus: 'victus',
  venenum: 'venenum',
  potentia: 'potentia',
  permutatio: 'permutatio',
  metallum: 'metallum',
  mortuus: 'mortuus',
  volatus: 'volatus',
  tenebrae: 'tenebrae',
  spiritus: 'spiritus',
  sano: 'sano',
  iter: 'iter',
  alienis: 'alienis',
  praecantatio: 'praecantatio',
  auram: 'auram',
  vitium: 'vitium',
  limus: 'limus',
  herba: 'herba',
  arbor: 'arbor',
  bestia: 'bestia',
  corpus: 'corpus',
  exanimis: 'exanimis',
  cognitio: 'cognitio',
  sensus: 'sensus',
  humanus: 'humanus',
  messis: 'messis',
  perfodio: 'perfodio',
  instrumentum: 'instrumentum',
  meto: 'meto',
  telum: 'telum',
  tutamen: 'tutamen',
  fames: 'fames',
  lucrum: 'lucrum',
  fabrico: 'fabrico',
  pannus: 'pannus',
  machina: 'machina',
  vinculum: 'vinculum',
  luxuria: 'luxuria',
  infernus: 'infernus',
  superbia: 'superbia',
  gula: 'gula',
  invidia: 'invidia',
  desidia: 'desidia',
  ira: 'ira'
} as const;

/**
 * Add shaped [Arcane Worktable](https://ftbwiki.org/Arcane_Worktable_(Thaumcraft_4)) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const addArcaneShaped = (recipe: RecipeArcaneShaped) => {
  const out = format.recipe(
    format.literal(recipe.research ?? RESEARCH[RESEARCH_CATEGORY.basics].aspects),
    format.ingredient(recipe.output),
    format.aspects(recipe.aspects),
    format.shaped(recipe.input)
  );

  return `mods.thaumcraft.Arcane.addShaped(${out});`;
};

export type RecipeArcaneShapeless = RecipeArcane & { input: Shapeless };

/**
 * Add shapeless [Arcane Worktable](https://ftbwiki.org/Arcane_Worktable_(Thaumcraft_4)) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const addArcaneShapeless = (recipe: RecipeArcaneShapeless) => {
  const out = format.recipe(
    format.literal(recipe.research ?? 'ASPECTS'),
    format.ingredient(recipe.output),
    format.aspects(recipe.aspects),
    format.array(3)(recipe.input)
  );

  return `mods.thaumcraft.Arcane.addShapeless(${out});`;
};

/**
 * Add [Arcane Worktable](https://ftbwiki.org/Arcane_Worktable_(Thaumcraft_4)) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const addArcane = (recipe: RecipeArcane) => {
  if (Array.isArray(recipe.input)) return addArcaneShapeless(recipe as RecipeArcaneShapeless);
  return addArcaneShaped(recipe as RecipeArcaneShaped);
};

/**
 * Remove [Arcane Worktable](https://ftbwiki.org/Arcane_Worktable_(Thaumcraft_4)) recipe
 * 
 * **Note**: Some recipes might not be removable
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const removeArcane = (output: string) =>
  `mods.thaumcraft.Arcane.removeRecipe(${output});`;

/**
 * Add item [Aspects](https://ftbwiki.org/List_of_Aspects_(Thaumcraft_4))
 *  
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const addAspectItem = (id: string) =>
  (aspects: Stack[]) =>
    `mods.thaumcraft.Aspects.add(${format.recipe(id, format.aspects(aspects))});`;

/**
 * Set item [Aspects](https://ftbwiki.org/List_of_Aspects_(Thaumcraft_4))
 *  
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const setAspectItem = (id: string) =>
  (aspects: Stack[]) =>
    `mods.thaumcraft.Aspects.set(${format.recipe(id, format.aspects(aspects))});`;

/**
 * Remove item [Aspects](https://ftbwiki.org/List_of_Aspects_(Thaumcraft_4))
 *  
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const removeAspectItem = (id: string) =>
  (aspects: Stack[]) =>
    `mods.thaumcraft.Aspects.remove(${format.recipe(id, format.aspects(aspects))});`;

/**
 * Add entity [Aspects](https://ftbwiki.org/List_of_Aspects_(Thaumcraft_4))
 *  
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const addAspectEntity = (id: string) =>
  (aspects: Stack[]) =>
    `mods.thaumcraft.Aspects.addEntity(${format.recipe(format.literal(id), format.aspects(aspects))});`;

/**
 * Set entity [Aspects](https://ftbwiki.org/List_of_Aspects_(Thaumcraft_4))
 *  
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const setAspectEntity = (id: string) =>
  (aspects: Stack[]) =>
    `mods.thaumcraft.Aspects.setEntity(${format.recipe(format.literal(id), format.aspects(aspects))});`;

/**
 * Remove entity [Aspects](https://ftbwiki.org/List_of_Aspects_(Thaumcraft_4))
 *  
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const removeAspectEntity = (id: string) =>
  (aspects: Stack[]) =>
    `mods.thaumcraft.Aspects.removeEntity(${format.recipe(format.literal(id), format.aspects(aspects))});`;

export type RecipeCrucibleAlchemy = {
  input: Ingredient;
  output: Ingredient;
  research: string;
  aspects: Stack[];
};

/**
 * Add [Crucible](https://ftbwiki.org/Crucible_(Thaumcraft_4)) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const addCrucibleAlchemy = (recipe: RecipeCrucibleAlchemy) => {
  const out = format.recipe(
    format.literal(recipe.research),
    format.ingredient(recipe.output),
    format.ingredient(recipe.input),
    format.aspects(recipe.aspects)
  );

  return `mods.thaumcraft.Crucible.addRecipe(${out});`;
};

/**
 * Remove [Crucible](https://ftbwiki.org/Crucible_(Thaumcraft_4)) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const removeCrucibleAlchemy = (output: string) =>
  `mods.thaumcraft.Crucible.removeRecipe(${output});`;

export type RecipeInfusion = {
  input: string;
  catalysts: string[];
  output: Ingredient;
  research: string;
  aspects: Stack[];
  instability: number;
};

/**
 * Add [Infusion](https://thaumcraft-4.fandom.com/wiki/Infusion) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const addInfusion = (recipe: RecipeInfusion) => {
  const out = format.recipe(
    format.literal(recipe.research),
    recipe.input,
    format.array(3)(recipe.catalysts),
    format.aspects(recipe.aspects),
    format.ingredient(recipe.output),
    recipe.instability
  );

  return `mods.thaumcraft.Infusion.addRecipe(${out});`;
};

/**
 * Remove [Infusion](https://thaumcraft-4.fandom.com/wiki/Infusion) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const removeInfusion = (id: string) =>
  `mods.thaumcraft.Infusion.removeRecipe(${id});`;

export type RecipeInfusionEnchantment = {
  catalysts: string[];
  research: string;
  aspects: Stack[];
  enchantment: number;
  instability: number;
};

/**
 * Add [Infusion Enchanting](https://thaumcraft-4.fandom.com/wiki/Infusion_Enchanting) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const addInfusionEnchantment = (recipe: RecipeInfusionEnchantment) => {
  const out = format.recipe(
    format.literal(recipe.research),
    recipe.enchantment,
    recipe.instability,
    format.aspects(recipe.aspects),
    format.array(3)(recipe.catalysts)
  );

  return `mods.thaumcraft.Infusion.addEnchantment(${out});`;
};

/**
 * Remove [Infusion Enchanting](https://thaumcraft-4.fandom.com/wiki/Infusion_Enchanting) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const removeInfusionEnchantment = (id: number) =>
  `mods.thaumcraft.Infusion.removeEnchant(${id});`;

const addLoot = (type: string) =>
  (bonus: Bonus) =>
    `mods.thaumcraft.Loot.add${type}Loot(${format.recipe(bonus.id, bonus.p * 100)});`;

/**
 * Add to [Common Treasure](https://ftbwiki.org/Common_Treasure) loot table
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const addLootCommon = addLoot('Common');

/**
 * Add to [Uncommon Treasure](https://ftbwiki.org/Uncommon_Treasure) loot table
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const addLootUncommon = addLoot('Uncommon');

/**
 * Add to [Rare Treasure](https://ftbwiki.org/Rare_Treasure) loot table
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const addLootRare = addLoot('Rare');

const removeLoot = (type: string) =>
  (id: string) =>
    `mods.thaumcraft.Loot.remove${type}Loot(${id});`;

/**
 * Remove from [Common Treasure](https://ftbwiki.org/Common_Treasure) loot table
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const removeLootCommon = removeLoot('Common');

/**
 * Remove from [Uncommon Treasure](https://ftbwiki.org/Uncommon_Treasure) loot table
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const removeLootUncommon = removeLoot('Uncommon');

/**
 * Remove from [Rare Treasure](https://ftbwiki.org/Rare_Treasure) loot table
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const removeLootRare = removeLoot('Rare');

/**
 * Add [Research Warp](https://thaumcraft-4.fandom.com/wiki/Warp#Warp_from_research_and_crafting)
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const addWarpResearch = (research: string) =>
  (warp: number) =>
    `mods.thaumcraft.Warp.addToResearch(${format.recipe(format.literal(research), warp)});`;

/**
 * Add [Item Warp](https://thaumcraft-4.fandom.com/wiki/Warp#Item_warp)
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const addWarpItem = (id: string) =>
  (warp: number) =>
    `mods.thaumcraft.Warp.addToItem(${format.recipe(id, warp)});`;

/**
 * Remove [Research Warp](https://thaumcraft-4.fandom.com/wiki/Warp#Warp_from_research_and_crafting)
 * 
 * Removes all Remove [Research Warp](https://thaumcraft-4.fandom.com/wiki/Warp#Warp_from_research_and_crafting) if `research` is `undefined`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const removeWarpResearch = (research?: string) => {
  if (typeof research !== 'string') return 'mods.thaumcraft.Warp.removeAllResearch();';
  return `mods.thaumcraft.Warp.removeFromResearch(${format.literal(research)});`;
};

/**
 * Remove [Item Warp](https://thaumcraft-4.fandom.com/wiki/Warp#Item_warp)
 * 
 * Removes all [Item Warp](https://thaumcraft-4.fandom.com/wiki/Warp#Item_warp) if `id` is `undefined`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const removeWarpItem = (id?: string) => {
  if (typeof id !== 'string') return 'mods.thaumcraft.Warp.removeAllItems();';
  return `mods.thaumcraft.Warp.removeFromItem(${id});`;
};

/**
 * Remove all [Item](https://thaumcraft-4.fandom.com/wiki/Warp#Item_warp) and [Research Warp](https://thaumcraft-4.fandom.com/wiki/Warp#Warp_from_research_and_crafting)
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
export const removeWarp = () =>
  'mods.thaumcraft.Warp.removeAll();';

/**
 * Remove [Research](https://thaumcraft-4.fandom.com/wiki/Research) from dependencies
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const orphanResearch = (research: string) =>
  `mods.thaumcraft.Research.orphanResearch(${format.literal(research)});`;

/**
 * Remove [Research](https://thaumcraft-4.fandom.com/wiki/Research)
 * 
 * **Note**: Thaumonomicon will crash if research is required. Use `orphanResearch` to clear dependencies
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const removeResearch = (research: string) =>
  `mods.thaumcraft.Research.removeResearch(${format.literal(research)});`;

/**
 * Remove [Research](https://thaumcraft-4.fandom.com/wiki/Research) tab
 * 
 * **Note**: Thaumonomicon will crash if research within the tab is required. Use `orphanResearch` on all research to clear dependencies
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const removeResearchTab = (tab: string) =>
  `mods.thaumcraft.Research.removeTab(${format.literal(tab)});`;

export type Texture = { domain: string; path: string };

export type RecipeResearchTab = {
  id: string;
  icon: Texture;
  bg?: Texture;
};

/**
 * Add [Research](https://thaumcraft-4.fandom.com/wiki/Research) tab
 * 
 * Creates `tc.research_category.<id>` localization key
 * 
 * Texture paths are formatted as `/textures/` + `<texture.domain>` + `/` + `<texture.path>`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const addResearchTab = (recipe: RecipeResearchTab) => {
  const out = format.recipe(
    format.literal(recipe.id),
    format.literal(recipe.icon.domain),
    format.literal(recipe.icon.path),
    maybe(format.literal)(recipe.bg?.domain),
    maybe(format.literal)(recipe.bg?.path)
  );

  return `mods.thaumcraft.Research.addTab(${out});`;
};

export type RecipeResearch = {
  id: string;
  tab: string;
  aspects?: Stack[];
  /** Negative moves left, positive moves right */
  x: number;
  /** Negative moves up, positive moves down */
  y: number;
  /** Typically between 0 and 15 */
  complexity: number;
  /** Item ID */
  icon: string;
};

/**
 * Add [Research](https://thaumcraft-4.fandom.com/wiki/Research)
 * 
 * Creates `tc.research_name.<id>` (title) and `tc.research_text.<id>` (tooltip) localization keys
 * 
 * **Note**: Requires pages, will crash otherwise
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const addResearch = (recipe: RecipeResearch) => {
  const out = format.recipe(
    format.literal(recipe.id),
    format.literal(recipe.tab),
    maybe(format.aspects)(recipe.aspects),
    recipe.x,
    recipe.y,
    recipe.complexity,
    recipe.icon
  );

  return `mods.thaumcraft.Research.addResearch(${out});`;
};

/**
 * Add [Research](https://thaumcraft-4.fandom.com/wiki/Research) page
 * 
 * Creates `tc.research_page.<id>` localization key
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const addResearchPage = (id: string) =>
  `mods.thaumcraft.Research.addPage(${format.recipe(format.literal(id), format.literal(`tc.research_page.${id}`))});`;

export type TextResearchImage = {
  src: Texture;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  scale?: number;
};

export type TextResearch = string | TextResearchImage;

export const formatResearchPage = (...lines: Array<string | TextResearch[]>): string => lines
  .map(line => {
    if (typeof line === 'string') return '<LINE>';
    return line.map(text => {
      if (typeof text === 'string') return text;
      return `<IMG>${[
        text.src.domain,
        text.src.path,
        text.x ?? 0,
        text.y ?? 0,
        text.w ?? 255,
        text.h ?? 255,
        text.scale ?? 0.0625
      ].join(':')}</IMG>`;
    }).join('');
  })
  .join('<BR>');

const addResearchPageCraftable = (type: string) =>
  (research: string) =>
    (id: string) =>
      `mods.thaumcraft.Research.add${type}Page(${format.recipe(format.literal(research), id)});`;

/**
 * Add crafting [Research](https://thaumcraft-4.fandom.com/wiki/Research) page
 * 
 * **Note**: Displays the first crafting recipe found
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const addResearchPageCrafting = addResearchPageCraftable('Crafting');

/**
 * Add arcane crafting [Research](https://thaumcraft-4.fandom.com/wiki/Research) page
 * 
 * **Note**: Displays the first arcane crafting recipe found
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const addResearchPageArcane = addResearchPageCraftable('Arcane');

/**
 * Add crucible [Research](https://thaumcraft-4.fandom.com/wiki/Research) page
 * 
 * **Note**: Displays the first crucible recipe found
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const addResearchPageCrucible = addResearchPageCraftable('Crucible');

/**
 * Add infusion [Research](https://thaumcraft-4.fandom.com/wiki/Research) page
 * 
 * **Note**: Displays the first infusion recipe found
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const addResearchPageInfusion = addResearchPageCraftable('Infusion');

/**
 * Add infusion enchanting [Research](https://thaumcraft-4.fandom.com/wiki/Research) page
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const addResearchPageEnchantment = (research: string) =>
  (enchantment: number) =>
    `mods.thaumcraft.Research.addEnchantmentPage(${format.recipe(format.literal(research), enchantment)});`;

/**
 * Add [Research](https://thaumcraft-4.fandom.com/wiki/Research) requirement
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const addResearchRequirement = (research: string) =>
  (requirement: string | { id: string; hidden: boolean }) => {
    const out = format.recipe(
      format.literal(research),
      format.literal(typeof requirement === 'string' ? requirement : requirement.id),
      typeof requirement === 'string' ? false : requirement.hidden
    );

    return `mods.thaumcraft.Research.addPrereq(${out});`;
  };

/**
 * Add [Research](https://thaumcraft-4.fandom.com/wiki/Research) sibling
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const addResearchSibling = (research: string) =>
  (sibling: string) =>
    `mods.thaumcraft.Research.addSibling(${format.recipe(format.literal(research), format.literal(sibling))});`;

/**
 * Remove [Research](https://thaumcraft-4.fandom.com/wiki/Research) requirement
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const removeResearchRequirement = (research: string) =>
  `mods.thaumcraft.Research.clearPrereqs(${format.literal(research)});`;

/**
 * Remove [Research](https://thaumcraft-4.fandom.com/wiki/Research) sibling
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const removeResearchSibling = (research: string) =>
  `mods.thaumcraft.Research.clearSiblings(${format.literal(research)});`;

const setResearchType = (type: string) =>
  (research: string) =>
    (enabled: boolean) =>
      `mods.thaumcraft.Research.set${type}(${format.recipe(format.literal(research), enabled)});`;

/**
 * Set [Research](https://thaumcraft-4.fandom.com/wiki/Research) type to `round`.
 * Research has a round icon in the Thaumonomicon. Usually for non-recipe researches or auto-unlocked researches.
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const setResearchTypeRound = setResearchType('Round');

/**
 * Set [Research](https://thaumcraft-4.fandom.com/wiki/Research) type to `spikey`.
 * Research has spikes around its icon. Generally for indicating that a research is important.
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const setResearchTypeSpikey = setResearchType('Spikey');

/**
 * Set [Research](https://thaumcraft-4.fandom.com/wiki/Research) type to `stub`.
 * Research cannot be researched by the player. Generally for researches that are unlocked other ways such as Siblings or auto-unlock.
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const setResearchTypeStub = setResearchType('Stub');

/**
 * Set [Research](https://thaumcraft-4.fandom.com/wiki/Research) type to `secondary`.
 * Research has an octagonal icon in the Thaumonomicon and is purchased with points instead of researched.
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const setResearchTypeSecondary = setResearchType('Secondary');

/**
 * Set [Research](https://thaumcraft-4.fandom.com/wiki/Research) type to `virtual`.
 * Research does not really exist and cannot be researched. Used as "parent" research that cannot normally be unlocked.
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const setResearchTypeVirtual = setResearchType('Virtual');

/**
 * Set [Research](https://thaumcraft-4.fandom.com/wiki/Research) type to `auto-unlock`.
 * Research starts out already unlocked.
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const setResearchTypeAuto = setResearchType('AutoUnlock');

/**
 * Set [Research](https://thaumcraft-4.fandom.com/wiki/Research) type to `concealed`.
 * Research does not appear in the Thaumonomicon until its parent researches are completed. Used for most researches by default.
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const setResearchTypeHidden = setResearchType('Concealed');

/**
 * Set required [Research](https://thaumcraft-4.fandom.com/wiki/Research) aspects
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const setResearchAspects = (research: string) =>
  (aspects: Stack[]) =>
    `mods.thaumcraft.Research.setAspects(${format.recipe(format.literal(research), format.aspects(aspects))});`;

/**
 * Set [Research](https://thaumcraft-4.fandom.com/wiki/Research) complexity
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const setResearchComplexity = (research: string) =>
  (complexity: number) =>
    `mods.thaumcraft.Research.setComplexity(${format.recipe(format.literal(research), complexity)});`;

/**
 * Removes all [Research](https://thaumcraft-4.fandom.com/wiki/Research) pages
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const resetResearch = (research: string) =>
  `mods.thaumcraft.Research.clearPages(${format.literal(research)});`;

/**
 * Clear [Research](https://thaumcraft-4.fandom.com/wiki/Research) cache.
 * 
 * **Note**: This only works when the page type is unchanged, otherwise use `resetResearch` and manually add back missing pages.
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
export const refreshResearch = (research: string) =>
  `mods.thaumcraft.Research.refreshResearchRecipe(${format.literal(research)});`;

export type RecipeResearchMove = {
  research: string;
  category: string;
  x: number;
  y: number;
};

export const moveResearch = (recipe: RecipeResearchMove) => {
  const out = format.recipe(
    format.literal(recipe.research),
    format.literal(recipe.category),
    recipe.x,
    recipe.y
  );

  return `mods.thaumcraft.Research.moveResearch(${out});`;
};
