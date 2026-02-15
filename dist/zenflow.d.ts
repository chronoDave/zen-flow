type Stack = {
    id: string;
    n: number;
};
type Bonus = {
    id: string;
    p: number;
};
type Liquid = {
    id: string;
    mb: number;
};
type Ingredient = string | Stack;
type Cast = string | {
    id: string;
    consume: boolean;
};
type Shapeless = string[];
type Shaped = Partial<{
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    corner: string;
    edge: string;
    ring: string;
    square: string;
    center: string;
    fill: string;
}>;
declare const COLOR: {
    readonly black: "§0";
    readonly darkBlue: "§1";
    readonly darkGreen: "§2";
    readonly darkAqua: "§3";
    readonly darkRed: "§4";
    readonly darkPurple: "§5";
    readonly gold: "§6";
    readonly gray: "§7";
    readonly darkGray: "§8";
    readonly blue: "§9";
    readonly green: "§a";
    readonly aqua: "§b";
    readonly red: "§c";
    readonly lightPurple: "§d";
    readonly yellow: "§e";
    readonly white: "§f";
};
declare const STYLE: {
    readonly obfuscated: "§k";
    readonly bold: "§l";
    readonly strikethrough: "§m";
    readonly underline: "§n";
    readonly italic: "§o";
    readonly reset: "§r";
};
type TextRich = {
    text: string;
    color?: keyof typeof COLOR;
    style?: keyof typeof STYLE;
};
type Text = string | TextRich;
type Texture = {
    domain: string;
    path: string;
};
type TextResearchImage = {
    src: Texture;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    scale?: number;
};
type TextResearch = Text | TextResearchImage;
declare const research: (...lines: Array<string | TextResearch[]>) => string;

type RecipeGrinder = {
    input: string;
    output: Ingredient;
    bonus?: {
        primary?: Bonus;
        secondary?: Bonus;
    };
    turns: number;
};
/**
 * Add [Quartz Grindstone](https://appliedenergistics.org/ae2-site-archive/Quartz-Grindstone/) recipe
 *
 * Common values:
 *  - Ingot: `2 turns`
 *  - Ore: `4 turns`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Applied_Energistics_2_Support
 */
declare const addGrinder: (recipe: RecipeGrinder) => string;
/**
 * Removes [Quartz Grindstone](https://appliedenergistics.org/ae2-site-archive/Quartz-Grindstone/) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Applied_Energistics_2_Support
 */
declare const removeGrinder: (input: string) => string;
type RecipePressInscriber = {
    input: {
        top: string;
        center: string;
        bottom?: string;
    };
    output: Ingredient;
};
/**
 * Add [Inscriber (inscribe)](https://appliedenergistics.org/ae2-site-archive/Inscriber/index.html) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Applied_Energistics_2_Support
 */
declare const addInscriber: (recipe: RecipePressInscriber) => string;
/**
 * Add [Inscriber (press)](https://appliedenergistics.org/ae2-site-archive/Inscriber/index.html) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Applied_Energistics_2_Support
 */
declare const addPress: (recipe: RecipePressInscriber) => string;
/**
 * Remove [Inscriber](https://appliedenergistics.org/ae2-site-archive/Inscriber/index.html) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Applied_Energistics_2_Support
 */
declare const removePressInscriber: (output: string) => string;

type RecipeCompressor = {
    input: Stack;
    output: string;
    exact?: boolean;
};
/**
 * Add [Neutronium Compressor](https://ftb.fandom.com/wiki/Neutronium_Compressor) recipe
 *
 * @see https://ftb.fandom.com/wiki/Using_MineTweaker_and_Avaritia
 */
declare const addCompressor: (recipe: RecipeCompressor) => string;
/**
 * Remove [Neutronium Compressor](https://ftb.fandom.com/wiki/Neutronium_Compressor) recipe
 *
 * @see https://ftb.fandom.com/wiki/Using_MineTweaker_and_Avaritia
 */
declare const removeCompressor: (id: string) => string;
type ShapedExtreme = [
    Partial<[string, string, string, string, string, string, string, string, string]>,
    Partial<[string, string, string, string, string, string, string, string, string]>,
    Partial<[string, string, string, string, string, string, string, string, string]>,
    Partial<[string, string, string, string, string, string, string, string, string]>,
    Partial<[string, string, string, string, string, string, string, string, string]>,
    Partial<[string, string, string, string, string, string, string, string, string]>,
    Partial<[string, string, string, string, string, string, string, string, string]>,
    Partial<[string, string, string, string, string, string, string, string, string]>,
    Partial<[string, string, string, string, string, string, string, string, string]>
];
/**
 * Add shaped [Extreme Crafting Table](https://ftb.fandom.com/wiki/Extreme_Crafting_Table) recipe
 *
 * @see https://ftb.fandom.com/wiki/Using_MineTweaker_and_Avaritia
 */
declare const addExtreme: (output: Ingredient) => (input: ShapedExtreme) => string;
/**
 * Remove [Extreme Crafting Table](https://ftb.fandom.com/wiki/Extreme_Crafting_Table) recipe
 *
 * @see https://ftb.fandom.com/wiki/Using_MineTweaker_and_Avaritia
 */
declare const removeExtreme: (id: string) => string;

type RecipeBlock = {
    name: string;
    material: string;
    texture?: string;
    creativeTab?: string;
    renderType?: number;
    drops?: string[];
    /** If set to `true`, `hardness` is set to `-1` */
    unbreakable?: boolean;
    hardness?: number;
    lightLevel?: number;
    opacity?: number;
};
/**
 * Create custom block
 *
 * Textures can be placed in `/config/contenttweaker/icons/blocks/<texture>`
 *
 * Scripts containing `createBlock` must be placed in `/contentScripts`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ContentTweaker:BlockItem_Support
 */
declare const createBlock: (id: string) => (recipe: RecipeBlock) => string;
type RecipeItem = {
    name: string;
    texture?: string;
    creativeTab?: string;
    damage?: number;
    stackSize?: number;
    toolType?: string;
    level?: number;
    is3d?: boolean;
    tooltip?: string[];
};
/**
 * Create custom item
 *
 * Scripts containing `createItem` must be placed in `/contentScripts`
 *
 * Textures can be placed in `/config/contenttweaker/icons/items/<texture>`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ContentTweaker:BlockItem_Support
 */
declare const createItem: (id: string) => (recipe: RecipeItem) => string;
type RecipeLiquid = {
    density: number;
    gaseous?: boolean;
    luminosity: number;
    temperature: number;
    viscosity: number;
    color: number;
    setFire?: boolean;
    castingMaterial?: number;
    texture?: {
        still?: string;
        flowing?: string;
    };
};
/**
 * Create custom liquid
 *
 * Scripts containing `createLiquid` must be placed in `/contentScripts`
 *
 * Textures can be placed in `/config/contenttweaker/icons/blocks/<texture>`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ContentTweaker:BlockItem_Support
 */
declare const createLiquid: (id: string) => (recipe: RecipeLiquid) => string;
type RecipeMaterial = {
    /** Display name */
    name: string;
    color: {
        /** Display name colour */
        name: keyof typeof COLOR;
        /** Tool part colour */
        tool: number;
    };
    durability: number;
    /** Mining speed */
    speed: number;
    /** Attack damage in heart */
    damage: number;
    /** Mining level */
    level: number;
    resource: string;
    reinforced?: number;
    stonebound?: number;
    modifier: number;
    /** TiC material ID */
    id: number;
    value: number;
    buildParts?: boolean;
    /** Amount of modifiers accepted */
    modifiers: number;
    tooltip: string;
    arrow: {
        mass: number;
        breakChance: number;
    };
    bow: {
        drawSpeed: number;
        speed: number;
    };
    nativeModifiers?: Ingredient[];
    nativeEnchantments?: string[];
};
/**
 * Create custom [Tinkers' Construct material](https://tinkers-construct.fandom.com/wiki/Material_Stats)
 *
 * Common values:
 *
 * Mining level:
 *  - `1` => Iron
 *  - `2` => Redstone
 *  - `3` => Obsidian
 *  - `4` => Cobalt
 *  - `5` => Manyullyn
 *
 * Mining speed:
 *  - `1` => Nothing
 *  - `2` => Wood
 *  - `4` => Stone
 *  - `6` => Iron
 *  - `8` => Diamond
 *  - `9` => Netherite
 *  - `12` => Gold
 *
 * Durability:
 *  - `33` => Gold
 *  - `60` => Wood
 *  - `132` => Stone
 *  - `251` => Iron
 *  - `1562` => Diamond
 *  - `2032` => Netherite
 *
 * Damage:
 *  - `1` => Wood, Gold
 *  - `1.5` => Stone
 *  - `2` => Iron
 *  - `2.5` => Diamond
 *  - `3` => Netherite
 *
 * Scripts containing `createMaterial` must be placed in `/contentScripts`
 *
 * Textures can be placed in `/config/contenttweaker/icons/items/<texture>`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ContentTweaker:TConstruct_Support
 */
declare const createMaterial: (id: string) => (recipe: RecipeMaterial) => string;

type RecipeComposter = {
    id: string;
    fill: number;
    color?: string;
};
/**
 * Add [Composter](https://ftb.fandom.com/wiki/Barrel_(Ex_Nihilo)) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
declare const addComposter: (recipe: RecipeComposter) => string;
/**
 * Remove [Composter](https://ftb.fandom.com/wiki/Barrel_(Ex_Nihilo)) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
declare const removeComposter: (id: string) => string;
/**
 * Add [Crucible](https://ftb.fandom.com/wiki/Crucible_(Ex_Nihilo)) recipe
 *
 * Common recipes:
 *  - Stone => Lava (`250mb`)
 *  - Gravel => Lava (`250mb`)
 *  - Netherrack => Lava (`1000mb`)
 *  - Leaves => Water (`100mb`)
 *  - Snow => Water (`500mb`)
 *  - Ice => Water (`1000mb`)
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
declare const addCrucible: (output: Liquid) => (input: string) => string;
/**
 * Remove [Crucible](https://ftb.fandom.com/wiki/Crucible_(Ex_Nihilo)) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
declare const removeCrucible: (output: string) => string;
/**
 * Add [Crucible](https://ftb.fandom.com/wiki/Crucible_(Ex_Nihilo)) fuel source
 *
 * Common values:
 *  - Torch: `0.1`
 *  - Lava (Flowing): `0.1`
 *  - Lava (Still): `0.2`
 *  - Fire: `0.3`
 *  - Blazing Pyrotheum: `0.7`
 *  - Uranium Block: `2.0`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
declare const addCrucibleFuel: (input: Stack) => string;
/**
 * Remove [Crucible](https://ftb.fandom.com/wiki/Crucible_(Ex_Nihilo)) fuel source
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
declare const removeCrucibleFuel: (input: string) => string;
type BonusHammer = Bonus & {
    luck?: number;
};
/**
 * Add [Hammer](https://ftb.fandom.com/wiki/Hammer_(Ex_Nihilo)) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
declare const addHammer: (input: string) => (...output: BonusHammer[]) => string;
/**
 * Remove [Hammer](https://ftb.fandom.com/wiki/Hammer_(Ex_Nihilo)) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
declare const removeHammer: (input: string) => string;
/**
 * Add [Sieve](https://ftb.fandom.com/wiki/Sieve_(Ex_Nihilo)) recipe
 *
 * Chance is calculated as `1 / chance`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
declare const addSieve: (input: string) => (...output: Bonus[]) => string;
/**
 * Remove [Sieve](https://ftb.fandom.com/wiki/Sieve_(Ex_Nihilo)) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
declare const removeSieve: (input: string) => string;

/**
 * Adds [QED](https://ftb.fandom.com/wiki/QED) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Extra_Utilities_Support
 */
declare const addQED: (output: Ingredient) => (input: Shaped) => string;
/**
 * Remove [QED](https://ftb.fandom.com/wiki/QED) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Extra_Utilities_Support
 */
declare const removeQED: (output: string) => string;

type RecipeCarpenter = {
    input: Shaped;
    output: Ingredient;
    ticks: number;
    top?: string;
    liquid?: Liquid;
};
/**
 * Add [Carpenter](https://feed-the-beast.fandom.com/wiki/Carpenter) recipe
 *
 * Common values:
 *  - Beealyzer / Treealyzer => `100`
 *  - Hardened Casing => `75`
 *  - Scented Panelling / Impregnated Casing => `50`
 *  - Candle => `10`
 *  - Circuit boards => `20`, `40`, `80`
 *
 * RF cost is equal to `204 * ticks`, assuming `1` energy modifier (Forestry config)
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const addCarpenter: (recipe: RecipeCarpenter) => string;
/**
 * Remove [Carpenter](https://feed-the-beast.fandom.com/wiki/Carpenter) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const removeCarpenter: (output: string, liquid?: string) => string;
type RecipeCentrifuge = {
    input: string;
    output: Bonus[];
    ticks: number;
};
/**
 * Add [Centrifuge](https://feed-the-beast.fandom.com/wiki/Centrifuge) recipe
 *
 * Common values:
 *  - Combs => `20`
 *  - Propolis => `5`
 *
 * RF cost is equal to `320 * ticks`, assuming `1` energy modifier (Forestry config)
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const addCentrifuge: (recipe: RecipeCentrifuge) => string;
/**
 * Remove [Centrifuge](https://feed-the-beast.fandom.com/wiki/Centrifuge) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const removeCentrifuge: (input: string) => string;
type RecipeFermenter = {
    input: Liquid;
    output: Liquid;
    catalyst: string;
};
/**
 * Add [Fermenter](https://feed-the-beast.fandom.com/wiki/Fermenter) recipe
 *
 * `Recipe.liquid + Recipe.catalyst => Liquid`
 *
 * RF cost is equal to `420 * ticks`, assuming `1` energy modifier (Forestry config)
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const addFermenter: (recipe: RecipeFermenter) => string;
/**
 * Remove [Fermenter](https://feed-the-beast.fandom.com/wiki/Fermenter) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const removeFermenter: (input: string) => string;
type RecipeFermenterFuel = {
    id: string;
    cycles: number;
    burn: number;
};
/**
 * Add [Fermenter](https://feed-the-beast.fandom.com/wiki/Fermenter) fuel recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const addFermenterFuel: (recipe: RecipeFermenterFuel) => string;
/**
 * Remove [Fermenter](https://feed-the-beast.fandom.com/wiki/Fermenter) fuel recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const removeFermenterFuel: (input: string) => string;
type RecipeMoistener = {
    input: string;
    output: string;
    ticks: number;
};
/**
 * Add [Moistener](https://feed-the-beast.fandom.com/wiki/Moistener) recipe
 *
 * Common values:
 *  - Mycelium => `5000`
 *  - Mossy Cobblestone => `20.000`
 *  - Mossy Stone Bricks => `20.000`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const addMoistener: (recipe: RecipeMoistener) => string;
/**
 * Remove [Moistener](https://feed-the-beast.fandom.com/wiki/Moistener) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const removeMoistener: (output: string) => string;
type RecipeSqueezer = {
    input: Ingredient[];
    output: Liquid;
    ticks: number;
    bonus: Bonus;
};
/**
 * Add [Squeezer](https://ftb.fandom.com/wiki/Squeezer_(Forestry)) recipe
 *
 * Common values:
 *  - Honeydrop => `10`
 *  - Phosphor => `10`
 *  - Fruits => `10`, `20`, `60`, `70`
 *  - Plants => `10`
 *  - Capsules => `10`
 *
 * RF cost is equal to `200 * ticks`, assuming `1` energy modifier (Forestry config)
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const addSqueezer: (recipe: RecipeSqueezer) => string;
/**
 * Remove [Squeezer](https://ftb.fandom.com/wiki/Squeezer_(Forestry)) recipe
 *
 * - Recipe: `undefined` => Remove all recipes
 * - Recipe: `string[]` => Remove specific recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const removeSqueezer: (output: string, input?: string[]) => string;
type RecipeStill = {
    input: Liquid;
    output: Liquid;
    ticks: number;
};
/**
 * Add [Still](https://ftb.fandom.com/wiki/Still) recipe
 *
 * Common values:
 *  - All => `100`
 *
 * RF cost is equal to `200 * ticks`, assuming `1` energy modifier (Forestry config)
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const addStill: (recipe: RecipeStill) => string;
/**
 * Remove [Still](https://ftb.fandom.com/wiki/Still) recipe
 *
 * - Recipe: `undefined` => Remove all recipes
 * - Recipe: `string[]` => Remove specific recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const removeStill: (output: string, input?: string) => string;
type RecipeFabricator = {
    input: Shaped;
    output: Ingredient;
    glass: number;
    cast?: string;
};
/**
 * Add [Thermionic Fabricator](https://feed-the-beast.fandom.com/wiki/Thermionic_Fabricator) recipe
 *
 * RF cost is equal to `200 * ticks`, assuming `1` energy modifier (Forestry config)
 *
 * Common glass values:
 *  - Electron Tube => `500`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const addFabricator: (recipe: RecipeFabricator) => string;
/**
 * Remove [Thermionic Fabricator](https://feed-the-beast.fandom.com/wiki/Thermionic_Fabricator) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const removeFabricator: (output: string) => string;
type RecipeFabricatorGlass = {
    mb: number;
    id: string;
    temperature: number;
};
/**
 * Add [Thermionic Fabricator](https://feed-the-beast.fandom.com/wiki/Thermionic_Fabricator) glass recipe
 *
 * Common values:
 * - Glass => `1000mB`, `1000C`
 * - Sand => `1000mB`, `3000C`
 * - Glass Pane => `375mB`, `1000C`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const addFabricatorGlass: (recipe: RecipeFabricatorGlass) => string;
/**
 * Remove [Thermionic Fabricator](https://feed-the-beast.fandom.com/wiki/Thermionic_Fabricator) glass recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
declare const removeFabricatorGlass: (input: string) => string;

type ChestLoot = {
    id: string;
    p?: number;
    min?: number;
    max?: number;
};
/**
 * Add item to dungeon loot
 *
 * Common values:
 *  - `dungeonChest`
 *  - `mineshaftChest`
 *
 * A loot table can be generated using `/mt loot`
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Loot
 */
declare const addChestLoot: (id: string) => (loot: ChestLoot) => string;
/**
 * Remove item to dungeon loot
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Loot
 */
declare const removeChestLoot: (chest: string) => (id: string) => string;
/**
 * Add item to tall grass
 *
 * A loot table can be generated using `/mt seeds`
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Loot
 */
declare const addSeed: (seed: Bonus) => string;
/**
 * Remove item from tall grass
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Loot
 */
declare const removeSeed: (id: string) => string;

/**
 * Add shaped crafting recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
declare const addShaped: (output: Ingredient) => (input: Shaped) => string;
/**
* Remove shaped crafting recipe
*
* @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
*/
declare const removeShaped: (output: string, input?: Shaped) => string;
/**
 * Add shapeless crafting recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
declare const addShapeless: (output: Ingredient) => (input: Shapeless) => string;
/**
* Remove shapeless crafting recipe
*
* @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
*/
declare const removeShapeless: (output: string, input?: Shapeless) => string;
/**
 * Add crafting recipe
 *
 * - Input: `{}` => Shaped recipe
 * - Input: `[]` => Shapeless recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
declare const add: (output: Ingredient) => (input: Shaped | Shapeless) => string;
/**
 * Remove all crafting recipes (shaped & shapeless)
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
declare const remove: (output: string) => string;
/**
 * Add shaped crafing recipe with mirror
 *
 * @see @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
declare const addMirror: (output: Ingredient) => (input: Shaped) => string;
type RecipeFurnace = {
    input: string;
    output: string;
    xp?: number;
};
/**
 * Add furnace recipe
 *
 * Common values:
 * - Coal: `0.1xp`
 * - Blocks: `0.1xp`
 * - Food: `0.35xp`
 * - Iron Ingot: `0.7xp`
 * - Gold Ingot: `1xp`
 * - Gems: `1xp`
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Furnace
 */
declare const addFurnace: (recipe: RecipeFurnace) => string;
/**
 * Remove furnace recipe
 *
 * - Recipe: `string` => Remove all recipes that create this ingredient
 * - Recipe `{}` => Remove this specific recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Furnace
 */
declare const removeFurnace: (output: string, input?: string) => string;
/**
 * Add furnace fuel
 *
 * Common values:
 *  - Coal: `1600`
 *  - Planks: `300`
 *  - Stick: `100`
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Furnace
 */
declare const addFurnaceFuel: (fuel: string) => (n: number) => string;
/**
 * Remove furnace fuel, with the exception of vanilla fuels
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Furnace
 */
declare const removeFurnaceFuel: (fuel: string) => string;
/**
 * Add localisation string
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Localization_164
 */
declare const setLocalisation: (locale: string) => (id: string) => (text: string) => string;

/**
 * Add an entity to the [Auto-Spawner](https://feed-the-beast.fandom.com/wiki/Auto-Spawner) blacklist, disabling spawning
 *
 * A list of entities can be generated using `/mt entities`
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
declare const addBlacklistAutospawner: (id: string) => string;
/**
 * Remove an entity to the [Auto-Spawner](https://feed-the-beast.fandom.com/wiki/Auto-Spawner) blacklist, enabling spawning
 *
 * A list of entities can be generated using `/mt entities`
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
declare const removeBlacklistAutospawner: (id: string) => string;
declare const HARVESTER_TYPE: {
    tree: string;
    leaf: string;
    block: string;
    column: string;
    treeInverse: string;
};
type RecipeHarvester = {
    type: keyof typeof HARVESTER_TYPE;
    id: string;
    bonus?: Array<string | Stack | Bonus>;
};
/**
 * Add harvestable blocks to the [Harvester](https://feed-the-beast.fandom.com/wiki/Harvester)
 *
 * Types:
 *  - `tree` => Tree cutting algorithm. Leaves first, then logs
 *  - `leaf` => Only cut leaves
 *  - `block` => Single block, such as pumpkins and melons
 *  - `column` => Stacked blocks, such as reeds and cacti
 *  - `treeInverse` => Upside-down trees, such as Natura's Bloodwood
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
declare const addHarvester: (recipe: RecipeHarvester) => string;
/**
 * Add item to [Laser Drill](https://ftb.fandom.com/wiki/Laser_Drill_(MineFactory_Reloaded))
 *
 * Common values:
 *  - Coal => `175`
 *  - Iron => `150`
 *  - Redstone => `100`
 *  - Copper => `90`
 *  - Tin => `85`
 *  - Glowstone => `80`
 *  - Lapis => `80`
 *  - Gold => `70`
 *  - Lead => `60`
 *  - Diamond => `55`
 *  - Sulfur => `40`
 *  - Salpeter => `40`
 *  - Emerald => `35`
 *  - Silver => `30`
 *  - Platinum => `15`
 *
 * A list of laser ores can be generated using `/mt mfr laserores`
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
declare const addLaserOre: (id: string) => (n: number) => string;
/**
 * Remove item from [Laser Drill](https://ftb.fandom.com/wiki/Laser_Drill_(MineFactory_Reloaded))
 *
 * A list of laser ores can be generated using `/mt mfr laserores`
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
declare const removeLaserOre: (id: string) => string;
declare const FOCI: {
    readonly white: 0;
    readonly orange: 1;
    readonly magenta: 2;
    readonly lightBlue: 3;
    readonly yellow: 4;
    readonly lime: 5;
    readonly pink: 6;
    readonly gray: 7;
    readonly lightGray: 8;
    readonly cyan: 9;
    readonly purple: 10;
    readonly blue: 11;
    readonly brown: 12;
    readonly green: 13;
    readonly red: 14;
    readonly black: 15;
};
/**
 * Add item to [Laser Drill](https://ftb.fandom.com/wiki/Laser_Drill_(MineFactory_Reloaded)) Foci
 *
 * Common values:
 *  - Coal => `175 (black)`
 *  - Iron => `150 (brown)`
 *  - Redstone => `100 (red)`
 *  - Copper => `90 (orange)`
 *  - Tin => `85 (silver)`
 *  - Glowstone => `80 (yellow)`
 *  - Lapis => `80 (blue)`
 *  - Gold => `70 (yellow)`
 *  - Lead => `60 (purple)`
 *  - Diamond => `55 (lightBlue)`
 *  - Sulfur => `40 (yellow)`
 *  - Salpeter => `40 (white)`
 *  - Emerald => `35 (lime)`
 *  - Silver => `30 (gray)`
 *  - Platinum => `15 (lightBlue)`
 *
 * A list of laser ores can be generated using `/mt mfr laserores`
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
declare const addLaserFoci: (id: string) => (foci: keyof typeof FOCI) => string;
/**
 * Remove item from [Laser Drill](https://ftb.fandom.com/wiki/Laser_Drill_(MineFactory_Reloaded)) Foci
 *
 * A list of laser ores can be generated using `/mt mfr laserores`
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
declare const removeLaserFoci: (id: string) => (foci: keyof typeof FOCI) => string;
type RecipeLaser = {
    id: string;
    foci: keyof typeof FOCI;
    weight: number;
};
/**
 * Add [Planter](https://ftb.fandom.com/wiki/Planter_(MineFactory_Reloaded)) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
declare const addPlanter: (id: string) => string;
/**
 * Add [Rubber Tree](https://ftb.fandom.com/wiki/Rubber_Tree_(MineFactory_Reloaded)) to biome, allowing rubber trees to be generated in that biome
 *
 * A list of biomes can be generated using `/mt biomes`
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
declare const addBiomeRubberTree: (id: string) => string;
/**
 * Remove [Rubber Tree](https://ftb.fandom.com/wiki/Rubber_Tree_(MineFactory_Reloaded)) from biome, disabling rubber trees from being generated in that biome
 *
 * A list of biomes can be generated using `/mt biomes`
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
declare const removeBiomeRubberTree: (id: string) => string;
/**
 * Add item to [Sludge Boiler](https://ftb.fandom.com/wiki/Sludge_Boiler)
 *
 * Common values:
 *  - Peat => `10`
 *  - Decaying Wheat => `20`
 *  - Sand => `50`
 *  - Clay Block => `30`
 *  - Dirt => `10`
 *  - Gravel => `10`
 *  - Red Sand => `5`
 *  - Soul Sand => `5`
 *  - Mycelium => `3`
 *  - Podzol => `2`
 *  - Netherrack => `1`
 *
 * A list of sludge drops can be generated using `/mt mfr sludgedrops`
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
declare const addSludgeBoiler: (id: string) => (weight: number) => string;
/**
 * Remove item from [Sludge Boiler](https://ftb.fandom.com/wiki/Sludge_Boiler)
 *
 * A list of sludge drops can be generated using `/mt mfr sludgedrops`
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
declare const removeSludgeBoiler: (id: string) => string;

/**
 * Hide item from NEI
 *
 * Some items may not get hidden depending on when they get added to NEI. For better support, consider using [NotEnoughItems Unofficial 1.7.10](https://www.curseforge.com/minecraft/mc-mods/notenoughitems-gtnh)
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:NEI_Support
 */
declare const hide: (id: string) => string;
/**
 * Add item from NEI
 *
 * Can be used to add items with metadata to NEI
 *
 * @example add('<minecraft:bread>.withTag({ display: { Name: "Tasty bread", Lore: ["Thanks to MineTweaker,", "We can now have tastier bread"] } });')
 * @see https://minetweaker3.aizistral.com/wiki/Mods:NEI_Support
 */
declare const show: (id: string) => string;
/**
 * Rename item in NEI
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:NEI_Support
 */
declare const rename: (id: string) => (name: string) => string;

/**
 * Add item to a valid ore dictionary
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Ore_Dictionary
 */
declare const addOreDict: (dict: string) => (id: string) => string;
/**
 * Remove item from valid ore dictionary
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Ore_Dictionary
 */
declare const removeOreDict: (dict: string) => (id: string) => string;
/**
 * Add all entries from `b` into `a`
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Ore_Dictionary
 */
declare const joinOreDict: (a: string) => (b: string) => string;
/**
 * Mirror all entries from `b` to `a`
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Ore_Dictionary
 */
declare const mirrorOreDict: (a: string) => (b: string) => string;

declare const withName: (name: Text) => (id: string) => string;
declare const withTag: (tag: Record<string, unknown>) => (id: string) => string;
declare const withWeight: (weight: number) => (id: string) => string;
declare const ENCHANTMENT: {
    readonly protection: 0;
    readonly fireProtection: 1;
    readonly featherFalling: 2;
    readonly blastProtection: 3;
    readonly projectileProtection: 4;
    readonly respiration: 5;
    readonly aquaAffinity: 6;
    readonly thorns: 7;
    readonly sharpness: 16;
    readonly smite: 17;
    readonly baneOfAntrophods: 18;
    readonly knockback: 19;
    readonly fireAspect: 20;
    readonly looting: 21;
    readonly efficiency: 32;
    readonly silkTouch: 33;
    readonly unbreaking: 34;
    readonly fortune: 35;
    readonly power: 48;
    readonly punch: 49;
    readonly flame: 50;
    readonly infinity: 51;
};
type Enchantment = {
    id: keyof typeof ENCHANTMENT | number;
    lvl: number;
};
declare const withEnchantment: (...enchantments: Enchantment[]) => (id: string) => string;
declare const withTooltip: (...tooltip: Text[]) => (id: string) => string;
declare const withTooltipShift: (...tooltip: Text[]) => (id: string) => string;

type RecipeMagmaCrucible = {
    input: string;
    output: Liquid;
    rf: number;
};
/**
 * Add [Magma Crucible](https://oldcofh.github.io/docs/thermal-expansion/machines/magma-crucible/) recipe
 *
 * Common values:
 *  - Cobblestone => `1000mB`, `320.000 RF`
 *  - Stone => `1000mB`, `320.000 RF`
 *  - Obsidian =>	`1000mB`, `320.000 RF`
 *  - Netherrack => `1000mB`, `120.000 RF`
 *  - Blaze Rod => `250mB`, `20.000 RF`
 *  - Snowball => `125mB`, `200 RF`
 *  - Snow (block) => `500mB`, `800 RF`
 *  - Ice => `1000mB`, `1600 RF`
 *  - Redstone (dust) => `100mB`, `8000 RF`
 *  - Block of Redstone => `900mB`, `72.000 RF`
 *  - Glowstone Dust => `250mB`, `20.000 RF`
 *  - Glowstone (block) => `1000mB`, `80.000 RF`
 *  - Ender Pearl => `250mB`, `20.000 RF`
 *  - Pulverized Coal => `100mB`, `8000 RF`
 *  - Pyrotheum Dust => `250mB`, `8000 RF`
 *  - Cryotheum Dust => `250mB`, `8000 RF`
 *  - Aerotheum Dust => `250mB`, `8000 RF`
 *  - Petrotheum Dust => `250mB`, `8000 RF`
 *
 * A list of recipes can be generated using `/mt thermalexpansion Crucible`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
declare const addMagmaCrucible: (recipe: RecipeMagmaCrucible) => string;
/**
 * Remove [Magma Crucible](https://oldcofh.github.io/docs/thermal-expansion/machines/magma-crucible/) recipe
 *
 * A list of recipes can be generated using `/mt thermalexpansion Crucible`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
declare const removeMagmaCrucible: (input: string) => string;
type RecipeRedstoneFurnace = {
    input: string;
    output: Ingredient;
    rf: number;
};
/**
 * Add [Redstone Furnace](https://oldcofh.github.io/docs/thermal-expansion/machines/redstone-furnace/) recipe
 *
 * Common values:
 * - Most Furnace recipes => `1600 RF`
 * - Pulverized metals (dusts) => `1000 RF`
 * - Raw food => `800 RF`
 * - Cactus => `800 RF`
 * - Redstone Ore => `1600 RF`
 * - Lapis Lazuli Ore => `1600 RF`
 * - Hay Bale => `3200 RF`
 *
 * A list of recipes can be generated using `/mt thermalexpansion Furnace`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
declare const addRedstoneFurnace: (recipe: RecipeRedstoneFurnace) => string;
/**
 * Remove [Redstone Furnace](https://oldcofh.github.io/docs/thermal-expansion/machines/redstone-furnace/) recipe
 *
 * A list of recipes can be generated using `/mt thermalexpansion Furnace`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
declare const removeRedstoneFurnace: (input: string) => string;
type RecipeInsolator = {
    input: {
        left: Ingredient;
        right: Ingredient;
    };
    output: Ingredient;
    bonus?: Bonus;
    rf: number;
};
/**
 * Add [Phytogenic Insolator](https://oldcofh.github.io/docs/thermal-expansion/machines/phytogenic-insolator/) recipe
 *
 * A list of recipes can be generated using `/mt thermalexpansion Insolator`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
declare const addInsolator: (recipe: RecipeInsolator) => string;
/**
 * Remove [Phytogenic Insolator](https://oldcofh.github.io/docs/thermal-expansion/machines/phytogenic-insolator/) recipe
 *
 * A list of recipes can be generated using `/mt thermalexpansion Insolator`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
declare const removeInsolator: (input: {
    left: string;
    right: string;
}) => string;
type RecipePulverizer = {
    input: string;
    output: Ingredient;
    bonus?: Bonus;
    rf: number;
};
/**
 * Add [Pulverizer](https://oldcofh.github.io/docs/thermal-expansion/machines/pulverizer/) recipe
 *
 * Common values:
 *  - Ores => `4000RF`
 *  - Minerals / Gems => `2400RF`
 *  - Redstone => `3200RF`
 *  - Ingots => `2400RF`
 *  - Wood => `1600RF`
 *  - Stone = > `3200RF`
 *  - Rods => `1600RF`
 *  - Wool => `1600RF`
 *
 * A list of recipes can be generated using `/mt thermalexpansion Pulverizer`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
declare const addPulverizer: (recipe: RecipePulverizer) => string;
/**
 * Remove [Pulverizer](https://oldcofh.github.io/docs/thermal-expansion/machines/pulverizer/) recipe
 *
 * A list of recipes can be generated using `/mt thermalexpansion Pulverizer`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
declare const removePulverizer: (input: string) => string;
type RecipeSawmill = {
    input: string;
    output: Ingredient;
    bonus?: Bonus;
    rf: number;
};
/**
 * Add [Sawmill](https://oldcofh.github.io/docs/thermal-expansion/machines/sawmill/) recipe
 *
 * Common values:
 *  - Log => `800RF`
 *  - Rubber Log => `1200RF`
 *  - Blocks => `2400RF`
 *  - Items => `2400RF`
 *  - Tools => `1600RF`
 *  - Melon => `800RF`
 *
 * A list of recipes can be generated using `/mt thermalexpansion Sawmill`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
declare const addSawmill: (recipe: RecipeSawmill) => string;
/**
 * Remove [Sawmill](https://oldcofh.github.io/docs/thermal-expansion/machines/sawmill/) recipe
 *
 * A list of recipes can be generated using `/mt thermalexpansion Sawmill`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
declare const removeSawmill: (input: string) => string;
type RecipeInductionSmelter = {
    input: {
        left: Ingredient;
        right: Ingredient;
    };
    output: Ingredient;
    bonus?: Bonus;
    rf: number;
};
/**
 * Add [Induction Smelter](https://oldcofh.github.io/docs/thermal-expansion/machines/induction-smelter/) recipe
 *
 * Common values:
 *  - Alloys => `1600RF`, `2400RF`
 *  - Sand + Dust => `800RF`
 *  - Sand + Ore => `3200RF`
 *  - Cinnabar + Ore => `4000RF`
 *  - Pyrotheum + Ore => `4000RF`, `8000RF`
 *  - Slag + Ore => `4000RF`
 *
 * A list of recipes can be generated using `/mt thermalexpansion Smelter`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
declare const addInductionSmelter: (recipe: RecipeInductionSmelter) => string;
/**
 * Remove [Induction Smelter](https://oldcofh.github.io/docs/thermal-expansion/machines/induction-smelter/) recipe
 *
 * A list of recipes can be generated using `/mt thermalexpansion Smelter`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
declare const removeInductionSmelter: (input: {
    left: string;
    right: string;
}) => string;
type RecipeTransposerFill = {
    input: string;
    output: Ingredient;
    liquid: Liquid;
    rf: number;
};
/**
 * Add [Fluid Transposer](https://oldcofh.github.io/docs/thermal-expansion/machines/fluid-transposer/) fill recipe
 *
 * Common values:
 *  - Ducts => `800RF`
 *  - Frame => `16.000RF`
 *  - Blend => `4000RF`
 *  - Powder => `4000RF`
 *  - Stone => `8000RF`
 *
 * A list of recipes can be generated using `/mt thermalexpansion Transposer`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
declare const addTransposerFill: (recipe: RecipeTransposerFill) => string;
/**
 * Remove [Fluid Transposer](https://oldcofh.github.io/docs/thermal-expansion/machines/fluid-transposer/) fill recipe
 *
 * A list of recipes can be generated using `/mt thermalexpansion Transposer`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
declare const removeTransposerFill: (recipe: {
    input: string;
    liquid: string;
}) => string;
type RecipeTransposerExtract = {
    input: string;
    output: Liquid;
    bonus?: Bonus;
    rf: number;
};
/**
 * Add [Fluid Transposer](https://oldcofh.github.io/docs/thermal-expansion/machines/fluid-transposer/) extract recipe
 *
 * Common values:
 *  - Bucket: `800RF, 1000mB`
 *  - Bottle: `1600RF, 1000mB`
 *
 * A list of recipes can be generated using `/mt thermalexpansion Transposer`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
declare const addTransposerExtract: (recipe: RecipeTransposerExtract) => string;
/**
 * Remove [Fluid Transposer](https://oldcofh.github.io/docs/thermal-expansion/machines/fluid-transposer/) extract recipe
 *
 * A list of recipes can be generated using `/mt thermalexpansion Transposer`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
declare const removeTransposerExtract: (input: string) => string;

type RecipeCastingBasin = {
    input: Liquid;
    output: string;
    cast?: Cast;
    ticks: number;
};
/**
 * Add [Casting Basin](https://tinkers-construct.fandom.com/wiki/Casting_Basin) recipe
 *
 * Common values:
 *  - Ticks => `20`
 *  - Liquid (Block) => `1296`
 *  - Liquid (Ingot) => `144`
 *
 * Recipes can be generated using `/mt tconstruct Casting`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const addCastingBasin: (recipe: RecipeCastingBasin) => string;
/**
 * Remove [Casting Basin](https://tinkers-construct.fandom.com/wiki/Casting_Basin) recipe
 *
 * Recipes can be generated using `/mt tconstruct Casting`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const removeCastingBasin: (output: string) => string;
type RecipeCastingTable = {
    input: Liquid;
    output: string;
    ticks: number;
    cast?: Cast;
};
/**
 * Add [Casting Table](https://tinkers-construct.fandom.com/wiki/Casting_Table) recipe
 *
 * Common values:
 *  - Ticks => `20`
 *  - Liquid (Ingot) => `144`
 *
 * Recipes can be generated using `/mt tconstruct Casting`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const addCastingTable: (recipe: RecipeCastingTable) => string;
/**
 * Remove [Casting Table](https://tinkers-construct.fandom.com/wiki/Casting_Table) recipe
 *
 * Recipes can be generated using `/mt tconstruct Casting`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const removeCastingTable: (output: string) => string;
type RecipeDryingRack = {
    input: string;
    output: string;
    ticks: number;
};
/**
 * Add [Drying Rack](https://tinkers-construct.fandom.com/wiki/Drying_Rack) recipe
 *
 * Common values:
 *  - `6000` ticks
 *
 * Recipes can be generated using `/mt tconstruct Drying`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const addDryingRack: (recipe: RecipeDryingRack) => string;
/**
 * Remove [Drying Rack](https://tinkers-construct.fandom.com/wiki/Drying_Rack) recipe
 *
 * Recipes can be generated using `/mt tconstruct Drying`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const removeDryingRack: (output: string) => string;
declare const MODIFIER: {
    readonly lvl1: "Tier1Free";
    readonly lvl2: "Tier1.5Free";
    readonly lvl3: "Tier2Free";
    readonly silkTouch: "Silk Touch";
    readonly luck: "Lapis";
    readonly fiery: "Blaze";
    readonly sharpness: "ModAttack";
    readonly beheading: "Beheading";
    readonly diamond: "Diamond";
    readonly reinforced: "Reinforced";
    readonly haste: "Redstone";
    readonly necrotic: "Necrotic";
    readonly emerald: "Emerald";
    readonly smite: "ModSmite";
    readonly knockback: "Piston";
    readonly baneOfAnthropods: "ModAntiSpider";
    readonly flux: "Flux";
};
/**
 * Remove [Modifier](https://tinkers-construct.fandom.com/wiki/Modifiers)
 *
 * A list of modifiers can be generated from `/mt modifiers`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const removeModifier: (id: string) => string;
type RecipeSmelteryFluid = {
    input: string;
    output: Liquid;
    temperature: number;
    render?: string;
};
/**
 * Add [Smeltery](https://tinkers-construct.fandom.com/wiki/Smeltery) fluid recipe
 *
 * A list of recipes can be generated from `/mt tconstruct Smeltery`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const addSmelteryFluid: (recipe: RecipeSmelteryFluid) => string;
/**
 * Remove [Smeltery](https://tinkers-construct.fandom.com/wiki/Smeltery) fluid recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const removeSmelteryFluid: (input: string) => string;
type RecipeSmelteryAlloy = {
    input: Liquid[];
    output: string | Liquid;
};
/**
 * Add [Smeltery](https://tinkers-construct.fandom.com/wiki/Smeltery) alloy recipe
 *
 * A list of recipes can be generated from `/mt tconstruct Smeltery`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const addSmelteryAlloy: (recipe: RecipeSmelteryAlloy) => string;
/**
 * Remove [Smeltery](https://tinkers-construct.fandom.com/wiki/Smeltery) alloy recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const removeSmelteryAlloy: (output: string) => string;
type RecipeSmelteryFuel = {
    temperature: number;
    ticks: number;
};
/**
 * Add [Smeltery](https://tinkers-construct.fandom.com/wiki/Smeltery) fuel
 *
 * Common values:
 *  - Lava => `1000`
 *  - Pyrotheum => `5000`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const addSmelteryFuel: (id: string) => (recipe: RecipeSmelteryFuel) => string;
/**
 * Remove [Smeltery](https://tinkers-construct.fandom.com/wiki/Smeltery) fuel
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const removeSmelteryFuel: (id: string) => string;
declare const MATERIAL: {
    readonly wood: "Wood";
    readonly stone: "Stone";
    readonly iron: "Iron";
    readonly flint: "Flint";
    readonly cactus: "Cactus";
    readonly bone: "Bone";
    readonly obsidian: "Obsidian";
    readonly alumite: "Alumite";
    readonly netherrack: "Netherrack";
    readonly slimeBlue: "Blue Slime";
    readonly slimeGreen: "Green Slime";
    readonly paper: "Paper";
    readonly cobalt: "Cobalt";
    readonly ardite: "Ardite";
    readonly manyullyn: "Manyullyn";
    readonly copper: "Copper";
    readonly bronze: "Bronze";
    readonly steel: "Steel";
    readonly pigIron: "Pig Iron";
    readonly lead: "Lead";
    readonly silver: "Silver";
    readonly ferrous: "Ferrous";
    readonly shiny: "Shiny";
    readonly electrum: "Electrum";
    readonly invar: "Invar";
    readonly woodMagical: "Magical Wood";
    readonly bedrock: "Bedrockium";
    readonly unstable: "Unstable Induced";
};
type RecipeRepairMaterial = {
    material: string;
    n: number;
};
/**
 * Add repair [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats)
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const addRepairMaterial: (id: string) => (recipe: RecipeRepairMaterial) => string;
/**
 * Remove repair [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats)
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const removeRepairMaterial: (id: string, material?: string) => string;
type MaterialStats = {
    /** Display name */
    name: string;
    color: {
        /** Display name colour */
        name: keyof typeof COLOR;
        /** Tool part colour */
        tool: number;
    };
    durability: number;
    /** Mining speed */
    speed: number;
    /** Attack damage in heart */
    damage: number;
    /** Mining level */
    level: number;
    reinforced?: number;
    stonebound?: number;
    /** Handle modifier */
    modifier: number;
};
/**
 * Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) stats
 *
 * Common values:
 *
 * Level:
 *  - `1` => Iron
 *  - `2` => Redstone
 *  - `3` => Obsidian
 *  - `4` => Cobalt
 *  - `5` => Manyullyn
 *
 * Speed:
 *  - `1` => Nothing
 *  - `2` => Wood
 *  - `4` => Stone
 *  - `6` => Iron
 *  - `8` => Diamond
 *  - `9` => Netherite
 *  - `12` => Gold
 *
 * Durability:
 *  - `33` => Gold
 *  - `60` => Wood
 *  - `132` => Stone
 *  - `251` => Iron
 *  - `1562` => Diamond
 *  - `2032` => Netherite
 *
 * Damage:
 *  - `1` => Wood, Gold
 *  - `1.5` => Stone
 *  - `2` => Iron
 *  - `2.5` => Diamond
 *  - `3` => Netherite
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const setMaterialStats: (id: string) => (stats: MaterialStats) => string;
/**
 * Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) display name
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const setMaterialName: (id: string) => (name: string) => string;
/**
 * Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) mining level
 *
 * Common values:
 *  - `0` => Stone
 *  - `1` => Iron
 *  - `2` => Redstone
 *  - `3` => Obsidian
 *  - `4` => Cobalt
 *  - `5` => Manyullyn
 *  - `7` => Bedrockium
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const setMaterialMiningLevel: (id: string) => (n: number) => string;
/**
 * Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) durability
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const setMaterialDurability: (id: string) => (n: number) => string;
/**
 * Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) mining speed
 *
 * Common values:
 *  - `1.5` => Blue / Green Slime
 *  - `2.0` => Paper
 *  - `3.5` => Wood
 *  - `4.0` => Stone
 *  - `5.0` => Cactus
 *  - `6.0` => Iron
 *  - `7.0` => Obsidian
 *  - `8.0` => Alumite
 *  - `9.0` => Manyullyn
 *  - `14.0` => Cobalt
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const setMaterialSpeed: (id: string) => (n: number) => string;
/**
 * Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) damage
 *
 * Common values:
 *  - `0` => Wood, Blue / Green Slime, Paper
 *  - `0.5` => Stone, Bone, Netherrack
 *  - `1` => Iron, Flint, Cactus
 *  - `1.5` => Alumite, Cobalt, Ardite
 *  - `2` => Manyullyn
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const setMaterialDamage: (id: string) => (n: number) => string;
/**
* Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) handle modifier
*
* Common values:
*  - `0.3` => Paper
*  - `0.5` => Stone
*  - `0.7` => Flint
*  - `0.8` => Obsidian
*  - `1` => Wood, Cactus, Bone
*  - `1.2` => Netherrack
*  - `1.3` => Iron, Alumite
*  - `1.5` => Green Slime
*  - `1.75` => Cobalt
*  - `2` => Blue Slime, Ardite
*  - `2.5` => Manyullyn
*
* @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
*/
declare const setMaterialHandleModifier: (id: string) => (n: number) => string;
/**
* Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) reinforced level
*
* Common values:
*  - `1` => Iron
*  - `2` => Alumite, Cobalt
*  - `3` => Obsidian
*
* @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
*/
declare const setMaterialReinforcedLevel: (id: string) => (n: number) => string;
/**
* Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) stonebound level
*
* Common values:
*  - `1` => Stone, Netherrack
*  - `2` => Ardite
*
* @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
*/
declare const setMaterialLevelStonebound: (material: string) => (n: number) => string;
/**
* Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) display name colour
*
* @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
*/
declare const setMaterialStyle: (material: string) => (style: keyof typeof COLOR) => string;
type BowStats = {
    durability: number;
    drawSpeed: number;
    flightSpeed: number;
};
/**
 * Set bow [Material](https://github.com/SlimeKnights/TinkersConstruct/blob/9ea7a0e60fe180aff591701b12c89da21da99289/src/main/java/tconstruct/weaponry/TinkerWeaponry.java#L312) stats
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const setBowMaterialStats: (id: string) => (stats: BowStats) => string;
/**
 * Set bow [Material](https://tinkers-construct.fandom.com/wiki/Shortbow) durability
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const setBowMaterialDurability: (id: string) => (n: number) => string;
/**
 * Set bow [Material](https://tinkers-construct.fandom.com/wiki/Shortbow) draw speed
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const setBowMaterialDrawspeed: (id: string) => (n: number) => string;
/**
 * Set bow [Material](https://tinkers-construct.fandom.com/wiki/Shortbow) flight speed
 *
 * Vanilla bow speed is `3`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const setBowMaterialFlightSpeed: (id: string) => (n: number) => string;
type ArrowStats = {
    mass: number;
    breakChance: number;
    accuracy: number;
};
/**
 * Set arrow [Material](https://github.com/SlimeKnights/TinkersConstruct/blob/9ea7a0e60fe180aff591701b12c89da21da99289/src/main/java/tconstruct/weaponry/TinkerWeaponry.java#L335) stats
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const setArrowStats: (id: string) => (stats: ArrowStats) => string;
/**
 * Set arrow [Material](https://github.com/SlimeKnights/TinkersConstruct/blob/9ea7a0e60fe180aff591701b12c89da21da99289/src/main/java/tconstruct/weaponry/TinkerWeaponry.java#L335) mass
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const setArrowMass: (id: string) => (n: number) => string;
/**
 * Set arrow [Material](https://github.com/SlimeKnights/TinkersConstruct/blob/9ea7a0e60fe180aff591701b12c89da21da99289/src/main/java/tconstruct/weaponry/TinkerWeaponry.java#L335) break chance
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const setArrowBreakChance: (id: string) => (n: number) => string;
/**
 * Set arrow [Material](https://github.com/SlimeKnights/TinkersConstruct/blob/9ea7a0e60fe180aff591701b12c89da21da99289/src/main/java/tconstruct/weaponry/TinkerWeaponry.java#L335) accuracy
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
declare const setArrowAccuracy: (id: string) => (n: number) => string;

type RecipeAltar = {
    input: string;
    output: string;
    tier: number;
    lp: number;
    /** LP per tick */
    lpt?: number;
    /** Drain per tick (in LP) */
    dpt?: number;
};
/**
 * Add [Blood Altar](https://ftbwiki.org/Blood_Altar) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support
 */
declare const addAltar: (recipe: RecipeAltar) => string;
/**
 * Remove [Blood Altar](https://ftbwiki.org/Blood_Altar) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support
 */
declare const removeAltar: (output: string) => string;
/**
 * Add shaped [Blood Orb](https://ftbwiki.org/Blood_Orb) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support
 */
declare const addBloodOrbShaped: (output: Ingredient) => (input: Shaped) => string;
/**
 * Add shapeless [Blood Orb](https://ftbwiki.org/Blood_Orb) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support
 */
declare const addBloodOrbShapeless: (output: Ingredient) => (input: Shapeless) => string;
/**
 * Add [Blood Orb](https://ftbwiki.org/Blood_Orb) recipe
 *
 * - Input: `{}` => Shaped recipe
 * - Input: `[]` => Shapeless recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support
 */
declare const addBloodOrb: (output: Ingredient) => (input: Shaped | Shapeless) => string;
type RecipeAlchemy = {
    input: Shapeless;
    output: Ingredient;
    tier: number;
    lp: number;
};
/**
 * Add [Alchemic Chemistry Set](https://ftbwiki.org/Alchemic_Chemistry_Set) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support
*/
declare const addAlchemy: (recipe: RecipeAlchemy) => string;
/**
 * Remove [Alchemic Chemistry Set](https://ftbwiki.org/Alchemic_Chemistry_Set) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support
*/
declare const removeAlchemy: (output: string) => string;
/**
 * Add [Ritual of Binding](https://ftbwiki.org/Ritual_of_Binding) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support:Rituals
 */
declare const addRitualBinding: (output: string) => (input: string) => string;
/**
 * Remove [Ritual of Binding](https://ftbwiki.org/Ritual_of_Binding) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support:Rituals
 */
declare const removeRitualBinding: (output: string) => string;
type RecipeMeteor = {
    input: string;
    /** OreDict entries */
    output: Bonus[];
    radius: number;
};
/**
 * Add [Mark of the Falling Tower](https://ftbwiki.org/Mark_of_the_Falling_Tower) recipe
 *
 * For better support, consider using the provided meteor config JSON files
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support:Rituals
 */
declare const addRitualMeteor: (recipe: RecipeMeteor) => string;
/**
 * Remove [Mark of the Falling Tower](https://ftbwiki.org/Mark_of_the_Falling_Tower) recipe
 *
 * For better support, consider using the provided meteor config JSON files
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support:Rituals
 */
declare const removeRitualMeteor: (input: string) => string;
/**
 * Add [Reap of the Harvest Moon](https://ftbwiki.org/Reap_of_the_Harvest_Moon) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support:Rituals
 */
declare const addRitualHarvest: (output: string) => (input: string) => string;

declare const ASPECT: {
    readonly aer: "aer";
    readonly terra: "terra";
    readonly ignis: "ignis";
    readonly aqua: "aqua";
    readonly ordo: "ordo";
    readonly perditio: "perditio";
    readonly vacuos: "vacuos";
    readonly lux: "lux";
    readonly tempestas: "tempestas";
    readonly motus: "motus";
    readonly gelum: "gelum";
    readonly vitreus: "vitreus";
    readonly victus: "victus";
    readonly venenum: "venenum";
    readonly potentia: "potentia";
    readonly permutatio: "permutatio";
    readonly metallum: "metallum";
    readonly mortuus: "mortuus";
    readonly volatus: "volatus";
    readonly tenebrae: "tenebrae";
    readonly spiritus: "spiritus";
    readonly sano: "sano";
    readonly iter: "iter";
    readonly alienis: "alienis";
    readonly praecantatio: "praecantatio";
    readonly auram: "auram";
    readonly vitium: "vitium";
    readonly limus: "limus";
    readonly herba: "herba";
    readonly arbor: "arbor";
    readonly bestia: "bestia";
    readonly corpus: "corpus";
    readonly exanimis: "exanimis";
    readonly cognitio: "cognitio";
    readonly sensus: "sensus";
    readonly humanus: "humanus";
    readonly messis: "messis";
    readonly perfodio: "perfodio";
    readonly instrumentum: "instrumentum";
    readonly meto: "meto";
    readonly telum: "telum";
    readonly tutamen: "tutamen";
    readonly fames: "fames";
    readonly lucrum: "lucrum";
    readonly fabrico: "fabrico";
    readonly pannus: "pannus";
    readonly machina: "machina";
    readonly vinculum: "vinculum";
    readonly luxuria: "luxuria";
    readonly infernus: "infernus";
    readonly superbia: "superbia";
    readonly gula: "gula";
    readonly invidia: "invidia";
    readonly desidia: "desidia";
    readonly ira: "ira";
};
type AspectShaped = {
    [ASPECT.aer]: number;
    [ASPECT.terra]: number;
    [ASPECT.ignis]: number;
    [ASPECT.aqua]: number;
    [ASPECT.ordo]: number;
    [ASPECT.perditio]: number;
};
type RecipeArcane = {
    input: Shaped | Shapeless;
    output: Ingredient;
    /** Defaults to `"ASPECTS"` as this does not require research */
    research?: string;
    aspects?: Partial<AspectShaped>;
};
type RecipeArcaneShaped = RecipeArcane & {
    input: Shaped;
};
declare const RESEARCH_TAB: {
    readonly basics: "BASICS";
    readonly thaumaturgy: "THAUMATURGY";
    readonly alchemy: "ALCHEMY";
    readonly artifice: "ARTIFICE";
    readonly golemancy: "GOLEMANCY";
    readonly eldritch: "ELDRITCH";
    readonly automagy: "AUTOMAGY";
    readonly forbidden: "FORBIDDEN";
};
declare const RESEARCH: {
    readonly BASICS: {
        readonly warp: "WARP";
        readonly research: "RESEARCH";
        readonly enchant: "ENCHANT";
        readonly nodes: "NODES";
        readonly researchDupe: "RESEARCHDUPE";
        readonly ore: "ORE";
        readonly aspects: "ASPECTS";
        readonly knowfrag: "KNOWFRAG";
        readonly researcher2: "RESEARCHER2";
        readonly crimson: "CRIMSON";
        readonly chestScan: "salisarcana:CHESTSCAN";
        readonly nodeJar: "NODEJAR";
        readonly researcher: "RESEARCHER1";
        readonly nodeTapper2: "NODETAPPER2";
        readonly deconstructor: "DECONSTRUCTOR";
        readonly nodeTapper1: "NODETAPPER1";
        readonly thaumonomicon: "THAUMONOMICON";
        readonly plants: "PLANTS";
        readonly nodePreserve: "NODEPRESERVE";
        readonly pech: "PECH";
    };
    readonly THAUMATURGY: {
        readonly nodeStabilizer: "NODESTABILIZER";
        readonly replaceWandCore: "salisarcana:REPLACEWANDCORE";
        readonly wandPedFoc: "WANDPEDFOC";
        readonly vampBat: "VAMPBAT";
        readonly rodBone: "ROD_bone";
        readonly basicThaumaturgy: "BASICTHAUMATURGY";
        readonly focusExcavation: "FOCUSEXCAVATION";
        readonly sceptre: "SCEPTRE";
        readonly replaceWandCaps: "salisarcana:REPLACEWANDCAPS";
        readonly rodQuartzStaff: "ROD_quartz_staff";
        readonly focusHellBat: "FOCUSHELLBAT";
        readonly visChargeRelay: "VISCHARGERELAY";
        readonly rodIce: "ROD_ice";
        readonly nodeStabilizerAdv: "NODESTABILIZERADV";
        readonly rodReed: "ROD_reed";
        readonly rodGreatwoodStaff: "ROD_greatwood_staff";
        readonly focusDisenchanting: "salisarcana:FOCUS_DISENCHANTING";
        readonly rodSilverwoodStaff: "ROD_silverwood_staff";
        readonly focusFrost: "FOCUSFROST";
        readonly visAmulet: "VISAMULET";
        readonly focalManipulation: "FOCALMANIPULATION";
        readonly focusFire: "FOCUSFIRE";
        readonly capGold: "CAP_gold";
        readonly rodSilverwood: "ROD_silverwood";
        readonly visPower: "VISPOWER";
        readonly focusPouch: "FOCUSPOUCH";
        readonly capCopper: "CAP_copper";
        readonly rodReedStaff: "ROD_reed_staff";
        readonly focusShock: "FOCUSSHOCK";
        readonly capSilver: "CAP_silver";
        readonly rodQuartz: "ROD_quartz";
        readonly capIron: "CAP_iron";
        readonly focusWarding: "FOCUSWARDING";
        readonly rodObsidian: "ROD_obsidian";
        readonly focusPortableHole: "FOCUSPORTABLEHOLE";
        readonly capThaumium: "CAP_thaumium";
        readonly rodWood: "ROD_wood";
        readonly rodGreatwood: "ROD_greatwood";
        readonly rodBlaze: "ROD_blaze";
        readonly rodBoneStaff: "ROD_bone_staff";
        readonly rodObsidianStaff: "ROD_obsidian_staff";
        readonly focusTrade: "FOCUSTRADE";
        readonly rodIceStaff: "ROD_ice_staff";
        readonly wandPed: "WANDPED";
        readonly rodBlazeStaff: "ROD_blaze_staff";
    };
    readonly ALCHEMY: {
        readonly alumentum: "ALUMENTUM";
        readonly bathSalts: "BATHSALTS";
        readonly crucible: "CRUCIBLE";
        readonly entropicProcessing: "ENTROPICPROCESSING";
        readonly transIron: "TRANSIRON";
        readonly thaumatorium: "THAUMATORIUM";
        readonly alchemicManufacture: "ALCHEMICALMANUFACTURE";
        readonly liquidDeath: "LIQUIDDEATH";
        readonly tubes: "TUBES";
        readonly transTin: "TRANSTIN";
        readonly saneSoap: "SANESOAP";
        readonly etherealBloom: "ETHEREALBLOOM";
        readonly tallow: "TALLOW";
        readonly pureSilver: "PURESILVER";
        readonly pureTin: "PURETIN";
        readonly transCopper: "TRANSCOPPER";
        readonly essentiaCrystal: "ESSENTIACRYSTAL";
        readonly arcaneSpa: "ARCANESPA";
        readonly centrifuge: "CENTRIFUGE";
        readonly transSilver: "TRANSSILVER";
        readonly pureIron: "PUREIRON";
        readonly alchemicaDuplication: "ALCHEMICALDUPLICATION";
        readonly jarVoid: "JARVOID";
        readonly nitor: "NITOR";
        readonly bottleTaint: "BOTTLETAINT";
        readonly pureGold: "PUREGOLD";
        readonly distillEssentia: "DISTILESSENTIA";
        readonly phial: "PHIAL";
        readonly tubeFilter: "TUBEFILTER";
        readonly pureLead: "PURELEAD";
        readonly thaumium: "THAUMIUM";
        readonly transLead: "TRANSLEAD";
        readonly transGold: "TRANSGOLD";
        readonly pureCopper: "PURECOPPER";
        readonly jarLabel: "JARLABEL";
    };
    readonly ARTIFICE: {
        readonly runicEmergency: "RUNICEMERGENCY";
        readonly goggles: "GOGGLES";
        readonly enchFabric: "ENCHFABRIC";
        readonly elementalPick: "ELEMENTALPICK";
        readonly elementalAxe: "ELEMENTALAXE";
        readonly table: "TABLE";
        readonly infernalFurnace: "INFERNALFURNACE";
        readonly banners: "BANNERS";
        readonly elementalShovel: "ELEMENTALSHOVEL";
        readonly levitator: "LEVITATOR";
        readonly hoverGirdle: "HOVERGIRDLE";
        readonly wardenArcana: "WARDEDARCANA";
        readonly basicArtifice: "BASICARTIFACE";
        readonly fluxScrub: "FLUXSCRUB";
        readonly thaumometer: "THAUMOMETER";
        readonly bootsTraveller: "BOOTSTRAVELLER";
        readonly restable: "RESTABLE";
        readonly mirrorEssentia: "MIRRORESSENTIA";
        readonly primalArrow: "PRIMALARROW";
        readonly arcaneEar: "ARCANEEAR";
        readonly grate: "GRATE";
        readonly runicCharged: "RUNICCHARGED";
        readonly runicHealing: "RUNICHEALING";
        readonly hoverHarness: "HOVERHARNESS";
        readonly mirror: "MIRROR";
        readonly lampGrowth: "LAMPGROWTH";
        readonly maskGrinningDevil: "MASKGRINNINGDEVIL";
        readonly elementalHoe: "ELEMENTALHOE";
        readonly mirrorHand: "MIRRORHAND";
        readonly arcTable: "ARCTABLE";
        readonly infusion: "INFUSION";
        readonly runicKinetic: "RUNICKINETIC";
        readonly paveWard: "PAVEWARD";
        readonly maskAngryGhost: "MASKANGRYGHOST";
        readonly maskSippingFiend: "MASKSIPPINGFIEND";
        readonly arcaneLamp: "ARCANELAMP";
        readonly armorFortress: "ARMORFORTRESS";
        readonly bellow: "BELLOWS";
        readonly helmGoggles: "HELMGOGGLES";
        readonly runicArmor: "RUNICARMOR";
        readonly runicAugmentation: "RUNICAUGMENTATION";
        readonly lampFertility: "LAMPFERTILITY";
        readonly boneBow: "BONEBOW";
        readonly arcaneStone: "ARCANESTONE";
        readonly sinStone: "SINSTONE";
        readonly elementalSword: "ELEMENTALSWORD";
        readonly paveTravel: "PAVETRAVEL";
        readonly jarBrain: "JARBRAIN";
        readonly arcaneBore: "ARCANEBORE";
        readonly infusionEnchantment: "INFUSIONENCHANTMENT";
    };
    readonly GOLEMANCY: {
        readonly golemClay: "GOLEMCLAY";
        readonly upgradeWater: "UPGRADEWATER";
        readonly hungryChest: "HUNGRYCHEST";
        readonly golemTallow: "GOLEMTALLOW";
        readonly golemWood: "GOLEMWOOD";
        readonly golemFlesh: "GOLEMFLESH";
        readonly upgradeEarth: "UPGRADEEARTH";
        readonly tinyDart: "TINYDART";
        readonly upgradeFire: "UPGRADEFIRE";
        readonly upgradeEntropy: "UPGRADEENTROPY";
        readonly coreUse: "COREUSE";
        readonly tinyHammer: "TINYHAMMER";
        readonly travelTrunk: "TRAVELTRUNK";
        readonly tinyBowtie: "TINYBOWTIE";
        readonly golemBell: "GOLEMBELL";
        readonly coreSorting: "CORESORTING";
        readonly golemThaumium: "GOLEMTHAUMIUM";
        readonly tinyHat: "TINYHAT";
        readonly tinyFez: "TINYFEZ";
        readonly coreLumber: "CORELUMBER";
        readonly tinyGlasses: "TINYGLASSES";
        readonly tinyVisor: "TINYVISOR";
        readonly upgradeAir: "UPGRADEAIR";
        readonly coreFishing: "COREFISHING";
        readonly coreGather: "COREGATHER";
        readonly coreHarvest: "COREHARVEST";
        readonly coreButcher: "COREBUTCHER";
        readonly coreGuard: "COREGUARD";
        readonly advancedGolem: "ADVANCEDGOLEM";
        readonly tinyArmor: "TINYARMOR";
        readonly coreFill: "COREFILL";
        readonly golemFetter: "GOLEMFETTER";
        readonly golemStraw: "GOLEMSTRAW";
        readonly coreAlchemy: "COREALCHEMY";
        readonly golemStone: "GOLEMSTONE";
        readonly golemIron: "GOLEMIRON";
        readonly coreLiquid: "CORELIQUID";
        readonly coreEmpty: "COREEMPTY";
        readonly upgradeOrder: "UPGRADEORDER";
    };
    readonly ELDRITCH: {
        readonly eldritchMajor: "ELDRITCHMAJOR";
        readonly advAlchemyFurnace: "ADVALCHEMYFURNACE";
        readonly armorVoidFortress: "ARMORVOIDFORTRESS";
        readonly eldritchMinor: "ELDRITCHMINOR";
        readonly enterOuter: "ENTEROUTER";
        readonly focusPrimal: "FOCUSPRIMAL";
        readonly essentiaReservoir: "ESSENTIARESERVOIR";
        readonly sanityCheck: "SANITYCHECK";
        readonly rodPrimalStaff: "ROD_primal_staff";
        readonly oculus: "OCULUS";
        readonly outerRev: "OUTERREV";
        readonly primalCrusher: "PRIMALCRUSHER";
        readonly primPearl: "PRIMPEARL";
        readonly primNode: "PRIMNODE";
        readonly capVoid: "CAP_void";
        readonly voidMetal: "VOIDMETAL";
    };
    readonly AUTOMAGY: {
        readonly redCrystal: "REDCRYSTAL";
        readonly golemLinker: "GOLEMLINKER";
        readonly netherruneWisp: "NETHERRUNE_WISP";
        readonly mobLure: "MOBLURE";
        readonly dimensionLure: "DIMENSIONLURE";
        readonly advNodeJar: "ADVNODEJAR";
        readonly tallyBlockLens: "TALLYBLOCK_LENS";
        readonly netherruneGhast: "NETHERRUNE_GHAST";
        readonly netherruneBat: "NETHERRUNE_BAT";
        readonly sliversTravel: "SLIVERS_TRAVEL";
        readonly remoteComparator: "REMOTECOMPARATOR";
        readonly essentiaLocusAggregator: "ESSENTIALOCUSAGGREGATOR";
        readonly mirrorInput: "MIRRORINPUT";
        readonly redCrystalDim: "REDCRYSTAL_DIM";
        readonly redCrystalMirrorbound: "REDCRYSTAL_MIRRORBOUND";
        readonly thirstyTank: "THIRSTYTANK";
        readonly eagerChest: "EAGERCHEST";
        readonly thirstyTankGlyphBovine: "THIRSTYTANK_GLYPH_BOVINE";
        readonly netherruneLight: "NETHERRUNE_LIGHT";
        readonly hungryMaw: "HUNGRYMAW";
        readonly alchemyBoiler: "ALCHEMYBOILER";
        readonly entitySignal: "ENTITYSIGNAL";
        readonly netherruneSlime: "NETHERRUNE_SLIME";
        readonly netherruneZombie: "NETHERRUNE_ZOMBIE";
        readonly xpStone: "XPSTONE";
        readonly greedyChest: "GREEDYCHEST";
        readonly golemWorkbench: "GOLEMWORKBENCH";
        readonly netherruneSoul: "NETHERRUNE_SOUL";
        readonly mirrorMultiDest: "MIRRORMULTIDEST";
        readonly enderDisjunction: "ENDERDISJUNCTION";
        readonly invetariumDelivery: "INVENTARIUM_DELIVERY";
        readonly slivers: "SLIVERS";
        readonly enchantFishing: "ENCHANT_FISHING";
        readonly netherruneCelerity: "NETHERRUNE_CELERITY";
        readonly thirstyTankGlyph: "THIRSTYTANK_GLYPH";
        readonly crystalBrain: "CRYSTALBRAIN";
        readonly vishroomSoup: "VISHROOMSOUP";
        readonly nitorLight: "NITORLIGHT";
        readonly inventarium: "INVENTARIUM";
        readonly inventariumPointer: "INVENTARIUM_POINTER";
        readonly redCrystalRez: "REDCRYSTAL_RES";
        readonly entropicRefining: "ENTROPICREFINING";
        readonly golemWorkbenchUpgrade: "GOLEMWORKBENCH_UPGRADE";
        readonly focusCrafting: "FOCUSCRAFTING";
        readonly enchantedPaper: "ENCHANTEDPAPER";
        readonly autoHandMirror: "AUTOHANDMIRROR";
        readonly redstoneTheory: "REDSTONETHEORY";
        readonly netherruneSkeleton: "NETHERRUNE_SKELETON";
        readonly essentiaLocus: "ESSENTIALOCUS";
        readonly magicHourglass: "MAGICHOURGLASS";
        readonly amnesiaStone: "AMNESIASTONE";
        readonly focusCraftingUpgrade: "FOCUSCRAFTING_UPGRADE";
        readonly redCrystalAmp: "REDCRYSTAL_AMP";
        readonly inventarumExtra: "INVENTARIUM_EXTRA";
        readonly netherruneCrystal: "NETHERRUNE_CRYSTAL";
        readonly thaumostaticRefueler: "THAUMOSTATICREFUELER";
        readonly tallyBlock: "TALLYBLOCK";
        readonly netherMind: "NETHERMIND";
        readonly visReader: "VISREADER";
        readonly finiCalMaw: "FINICALMAW";
        readonly avaricious: "AVARICIOUS";
        readonly tenaciousChest: "TENACIOUSCHEST";
        readonly redCrystalDense: "REDCRYSTAL_DENSE";
        readonly sliversWarding: "SLIVERS_WARDING";
        readonly golemInhibitor: "GOLEMINHIBITOR";
    };
    readonly FORBIDDEN: {
        readonly skullAxe: "SKULLAXE";
        readonly bloodRapier: "BLOODRAPIER";
        readonly arcaneCake: "ARCANECAKE";
        readonly taintPick: "TAINTPICK";
        readonly taintTree: "TAINTTREE";
        readonly wrath: "WRATH";
        readonly schools: "SCHOOLS";
        readonly transEmerald: "TRANSEMERALD";
        readonly hellFire: "HELLFIRE";
        readonly voidToucher: "VOIDTOUCHED";
        readonly rodTainted: "ROD_tainted";
        readonly eldritchOrb: "ELDRITCHORB";
        readonly bloodWell: "BLOODWELL";
        readonly consuming: "CONSUMING";
        readonly cluster: "CLUSTER";
        readonly subCollar: "SUBCOLLAR";
        readonly bloodMagic: "BLOODMAGIC";
        readonly rodInfernal: "ROD_infernal";
        readonly crystalWell: "CRYSTALWELL";
        readonly fork: "FORK";
        readonly rodBloodStaff: "ROD_blood_staff";
        readonly ringFood: "RINGFOOD";
        readonly corrupting: "CORRUPTING";
        readonly taintStone: "TAINTSTONE";
        readonly rodBlood: "ROD_blood";
        readonly capAlchemical: "CAP_alchemical";
        readonly ridingCrop: "RIDINGCROP";
        readonly netherShards: "NETHERSHARDS";
        readonly primeWell: "PRIMEWELL";
        readonly greedy: "GREEDY";
        readonly educational: "EDUCATIONAL";
        readonly rodProfane: "ROD_profane";
        readonly impact: "IMPACT";
        readonly wrathCage: "WRATHCAGE";
        readonly blackFlower: "BLACKFLOWER";
        readonly morphTools: "MORPHTOOLS";
        readonly taintShovel: "TAINTSHOVEL";
        readonly focusBlink: "FOCUSBLINK";
    };
};
/**
 * Add shaped [Arcane Worktable](https://ftbwiki.org/Arcane_Worktable_(Thaumcraft_4)) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const addArcaneShaped: (recipe: RecipeArcaneShaped) => string;
type RecipeArcaneShapeless = RecipeArcane & {
    input: Shapeless;
};
/**
 * Add shapeless [Arcane Worktable](https://ftbwiki.org/Arcane_Worktable_(Thaumcraft_4)) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const addArcaneShapeless: (recipe: RecipeArcaneShapeless) => string;
/**
 * Add [Arcane Worktable](https://ftbwiki.org/Arcane_Worktable_(Thaumcraft_4)) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const addArcane: (recipe: RecipeArcane) => string;
/**
 * Remove [Arcane Worktable](https://ftbwiki.org/Arcane_Worktable_(Thaumcraft_4)) recipe
 *
 * **Note**: Some recipes might not be removable
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const removeArcane: (output: string) => string;
/**
 * Add item [Aspects](https://ftbwiki.org/List_of_Aspects_(Thaumcraft_4))
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const addAspectItem: (id: string) => (aspects: Stack[]) => string;
/**
 * Set item [Aspects](https://ftbwiki.org/List_of_Aspects_(Thaumcraft_4))
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const setAspectItem: (id: string) => (aspects: Stack[]) => string;
/**
 * Remove item [Aspects](https://ftbwiki.org/List_of_Aspects_(Thaumcraft_4))
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const removeAspectItem: (id: string) => (aspects: Stack[]) => string;
/**
 * Add entity [Aspects](https://ftbwiki.org/List_of_Aspects_(Thaumcraft_4))
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const addAspectEntity: (id: string) => (aspects: Stack[]) => string;
/**
 * Set entity [Aspects](https://ftbwiki.org/List_of_Aspects_(Thaumcraft_4))
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const setAspectEntity: (id: string) => (aspects: Stack[]) => string;
/**
 * Remove entity [Aspects](https://ftbwiki.org/List_of_Aspects_(Thaumcraft_4))
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const removeAspectEntity: (id: string) => (aspects: Stack[]) => string;
type RecipeCrucibleAlchemy = {
    input: string;
    output: Ingredient;
    research: string;
    aspects: Stack[];
};
/**
 * Add [Crucible](https://ftbwiki.org/Crucible_(Thaumcraft_4)) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const addCrucibleAlchemy: (recipe: RecipeCrucibleAlchemy) => string;
/**
 * Remove [Crucible](https://ftbwiki.org/Crucible_(Thaumcraft_4)) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const removeCrucibleAlchemy: (output: string) => string;
type RecipeInfusion = {
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
declare const addInfusion: (recipe: RecipeInfusion) => string;
/**
 * Remove [Infusion](https://thaumcraft-4.fandom.com/wiki/Infusion) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const removeInfusion: (id: string) => string;
type RecipeInfusionEnchantment = {
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
declare const addInfusionEnchantment: (recipe: RecipeInfusionEnchantment) => string;
/**
 * Remove [Infusion Enchanting](https://thaumcraft-4.fandom.com/wiki/Infusion_Enchanting) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const removeInfusionEnchantment: (id: number) => string;
/**
 * Add to [Common Treasure](https://ftbwiki.org/Common_Treasure) loot table
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const addLootCommon: (bonus: Bonus) => string;
/**
 * Add to [Uncommon Treasure](https://ftbwiki.org/Uncommon_Treasure) loot table
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const addLootUncommon: (bonus: Bonus) => string;
/**
 * Add to [Rare Treasure](https://ftbwiki.org/Rare_Treasure) loot table
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const addLootRare: (bonus: Bonus) => string;
/**
 * Remove from [Common Treasure](https://ftbwiki.org/Common_Treasure) loot table
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const removeLootCommon: (id: string) => string;
/**
 * Remove from [Uncommon Treasure](https://ftbwiki.org/Uncommon_Treasure) loot table
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const removeLootUncommon: (id: string) => string;
/**
 * Remove from [Rare Treasure](https://ftbwiki.org/Rare_Treasure) loot table
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const removeLootRare: (id: string) => string;
/**
 * Add [Research Warp](https://thaumcraft-4.fandom.com/wiki/Warp#Warp_from_research_and_crafting)
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const addWarpResearch: (research: string) => (warp: number) => string;
/**
 * Add [Item Warp](https://thaumcraft-4.fandom.com/wiki/Warp#Item_warp)
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const addWarpItem: (id: string) => (warp: number) => string;
/**
 * Remove [Research Warp](https://thaumcraft-4.fandom.com/wiki/Warp#Warp_from_research_and_crafting)
 *
 * Removes all Remove [Research Warp](https://thaumcraft-4.fandom.com/wiki/Warp#Warp_from_research_and_crafting) if `research` is `undefined`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const removeWarpResearch: (research?: string) => string;
/**
 * Remove [Item Warp](https://thaumcraft-4.fandom.com/wiki/Warp#Item_warp)
 *
 * Removes all [Item Warp](https://thaumcraft-4.fandom.com/wiki/Warp#Item_warp) if `id` is `undefined`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const removeWarpItem: (id?: string) => string;
/**
 * Remove all [Item](https://thaumcraft-4.fandom.com/wiki/Warp#Item_warp) and [Research Warp](https://thaumcraft-4.fandom.com/wiki/Warp#Warp_from_research_and_crafting)
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support
 */
declare const removeWarp: () => string;
/**
 * Remove [Research](https://thaumcraft-4.fandom.com/wiki/Research) from dependencies
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const orphanResearch: (research: string) => string;
/**
 * Remove [Research](https://thaumcraft-4.fandom.com/wiki/Research)
 *
 * **Note**: Thaumonomicon will crash if research is required. Use `orphanResearch` to clear dependencies
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const removeResearch: (research: string) => string;
/**
 * Remove [Research](https://thaumcraft-4.fandom.com/wiki/Research) tab
 *
 * **Note**: Thaumonomicon will crash if research within the tab is required. Use `orphanResearch` on all research to clear dependencies
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const removeResearchTab: (tab: string) => string;
type RecipeResearchTab = {
    id: string;
    icon: Texture;
    bg?: Texture;
};
/**
 * Add [Research](https://thaumcraft-4.fandom.com/wiki/Research) tab
 *
 * Creates `tc.RESEARCH_TAB.<id>` localization key
 *
 * Texture paths are formatted as `/textures/` + `<texture.domain>` + `/` + `<texture.path>`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const addResearchTab: (recipe: RecipeResearchTab) => string;
type RecipeResearch = {
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
    icon: string | Texture;
};
/**
 * Add [Research](https://thaumcraft-4.fandom.com/wiki/Research)
 *
 * Creates `tc.research_name.<id>` (title) and `tc.research_text.<id>` (tooltip) localization keys
 *
 * **Note**: Requires pages, will crash otherwise. Will also crash if `x` or `y` collides with existing research.
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const addResearch: (recipe: RecipeResearch) => string;
/**
 * Add [Research](https://thaumcraft-4.fandom.com/wiki/Research) page
 *
 * Creates `tc.research_page.<id>` localization key
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const addResearchPage: (research: string) => (id: string) => string;
/**
 * Add crafting [Research](https://thaumcraft-4.fandom.com/wiki/Research) page
 *
 * **Note**: Displays the first crafting recipe found
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const addResearchPageCrafting: (research: string) => (id: string) => string;
/**
 * Add arcane crafting [Research](https://thaumcraft-4.fandom.com/wiki/Research) page
 *
 * **Note**: Displays the first arcane crafting recipe found
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const addResearchPageArcane: (research: string) => (id: string) => string;
/**
 * Add crucible [Research](https://thaumcraft-4.fandom.com/wiki/Research) page
 *
 * **Note**: Displays the first crucible recipe found
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const addResearchPageCrucible: (research: string) => (id: string) => string;
/**
 * Add infusion [Research](https://thaumcraft-4.fandom.com/wiki/Research) page
 *
 * **Note**: Displays the first infusion recipe found
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const addResearchPageInfusion: (research: string) => (id: string) => string;
/**
 * Add infusion enchanting [Research](https://thaumcraft-4.fandom.com/wiki/Research) page
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const addResearchPageEnchantment: (research: string) => (enchantment: number) => string;
/**
 * Add [Research](https://thaumcraft-4.fandom.com/wiki/Research) parent research
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const addResearchParent: (research: string) => (parent: string | {
    id: string;
    hidden: boolean;
}) => string;
/**
 * Add [Research](https://thaumcraft-4.fandom.com/wiki/Research) sibling
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const addResearchSibling: (research: string) => (sibling: string) => string;
/**
 * Remove [Research](https://thaumcraft-4.fandom.com/wiki/Research) parent research
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const removeResearchParent: (research: string) => string;
/**
 * Remove [Research](https://thaumcraft-4.fandom.com/wiki/Research) sibling
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const removeResearchSibling: (research: string) => string;
/**
 * Set [Research](https://thaumcraft-4.fandom.com/wiki/Research) type to `round`.
 * Research has a round icon in the Thaumonomicon. Usually for non-recipe researches or auto-unlocked researches.
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const setResearchTypeRound: (research: string) => (enabled: boolean) => string;
/**
 * Set [Research](https://thaumcraft-4.fandom.com/wiki/Research) type to `spikey`.
 * Research has spikes around its icon. Generally for indicating that a research is important.
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const setResearchTypeSpikey: (research: string) => (enabled: boolean) => string;
/**
 * Set [Research](https://thaumcraft-4.fandom.com/wiki/Research) type to `stub`.
 * Research cannot be researched by the player. Generally for researches that are unlocked other ways such as Siblings or auto-unlock.
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const setResearchTypeStub: (research: string) => (enabled: boolean) => string;
/**
 * Set [Research](https://thaumcraft-4.fandom.com/wiki/Research) type to `secondary`.
 * Research has an octagonal icon in the Thaumonomicon and is purchased with points instead of researched.
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const setResearchTypeSecondary: (research: string) => (enabled: boolean) => string;
/**
 * Set [Research](https://thaumcraft-4.fandom.com/wiki/Research) type to `virtual`.
 * Research does not really exist and cannot be researched. Used as "parent" research that cannot normally be unlocked.
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const setResearchTypeVirtual: (research: string) => (enabled: boolean) => string;
/**
 * Set [Research](https://thaumcraft-4.fandom.com/wiki/Research) type to `auto-unlock`.
 * Research starts out already unlocked.
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const setResearchTypeAuto: (research: string) => (enabled: boolean) => string;
/**
 * Set [Research](https://thaumcraft-4.fandom.com/wiki/Research) type to `concealed`.
 * Research does not appear in the Thaumonomicon until its parent researches are completed. Used for most researches by default.
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const setResearchTypeHidden: (research: string) => (enabled: boolean) => string;
/**
 * Set required [Research](https://thaumcraft-4.fandom.com/wiki/Research) aspects
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const setResearchAspects: (research: string) => (aspects: Stack[]) => string;
/**
 * Set [Research](https://thaumcraft-4.fandom.com/wiki/Research) complexity
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const setResearchComplexity: (research: string) => (complexity: number) => string;
/**
 * Removes all [Research](https://thaumcraft-4.fandom.com/wiki/Research) pages
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const resetResearch: (research: string) => string;
/**
 * Clear [Research](https://thaumcraft-4.fandom.com/wiki/Research) cache
 *
 * **Note**: This only works when the page type is unchanged, otherwise use `resetResearch` and manually add back missing pages.
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const refreshResearch: (research: string) => string;
type RecipeResearchMove = {
    research: string;
    tab: string;
    x: number;
    y: number;
};
/**
 * Move [Research](https://thaumcraft-4.fandom.com/wiki/Research)
 *
 * **Note**: This only works when the page type is unchanged, otherwise use `resetResearch` and manually add back missing pages.
 *
 * **Note**: Will throw `NullPointerException` if called after `addResearchParent`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thaumcraft_4_Support:Research
 */
declare const moveResearch: (recipe: RecipeResearchMove) => string;

export { ASPECT, COLOR, ENCHANTMENT, FOCI, HARVESTER_TYPE, MATERIAL, MODIFIER, RESEARCH, RESEARCH_TAB, STYLE, add, addAlchemy, addAltar, addArcane, addArcaneShaped, addArcaneShapeless, addAspectEntity, addAspectItem, addBiomeRubberTree, addBlacklistAutospawner, addBloodOrb, addBloodOrbShaped, addBloodOrbShapeless, addCarpenter, addCastingBasin, addCastingTable, addCentrifuge, addChestLoot, addComposter, addCompressor, addCrucible, addCrucibleAlchemy, addCrucibleFuel, addDryingRack, addExtreme, addFabricator, addFabricatorGlass, addFermenter, addFermenterFuel, addFurnace, addFurnaceFuel, addGrinder, addHammer, addHarvester, addInductionSmelter, addInfusion, addInfusionEnchantment, addInscriber, addInsolator, addLaserFoci, addLaserOre, addLootCommon, addLootRare, addLootUncommon, addMagmaCrucible, addMirror, addMoistener, addOreDict, addPlanter, addPress, addPulverizer, addQED, addRedstoneFurnace, addRepairMaterial, addResearch, addResearchPage, addResearchPageArcane, addResearchPageCrafting, addResearchPageCrucible, addResearchPageEnchantment, addResearchPageInfusion, addResearchParent, addResearchSibling, addResearchTab, addRitualBinding, addRitualHarvest, addRitualMeteor, addSawmill, addSeed, addShaped, addShapeless, addSieve, addSludgeBoiler, addSmelteryAlloy, addSmelteryFluid, addSmelteryFuel, addSqueezer, addStill, addTransposerExtract, addTransposerFill, addWarpItem, addWarpResearch, createBlock, createItem, createLiquid, createMaterial, research as formatResearch, hide, joinOreDict, mirrorOreDict, moveResearch, orphanResearch, refreshResearch, remove, removeAlchemy, removeAltar, removeArcane, removeAspectEntity, removeAspectItem, removeBiomeRubberTree, removeBlacklistAutospawner, removeCarpenter, removeCastingBasin, removeCastingTable, removeCentrifuge, removeChestLoot, removeComposter, removeCompressor, removeCrucible, removeCrucibleAlchemy, removeCrucibleFuel, removeDryingRack, removeExtreme, removeFabricator, removeFabricatorGlass, removeFermenter, removeFermenterFuel, removeFurnace, removeFurnaceFuel, removeGrinder, removeHammer, removeInductionSmelter, removeInfusion, removeInfusionEnchantment, removeInsolator, removeLaserFoci, removeLaserOre, removeLootCommon, removeLootRare, removeLootUncommon, removeMagmaCrucible, removeModifier, removeMoistener, removeOreDict, removePressInscriber, removePulverizer, removeQED, removeRedstoneFurnace, removeRepairMaterial, removeResearch, removeResearchParent, removeResearchSibling, removeResearchTab, removeRitualBinding, removeRitualMeteor, removeSawmill, removeSeed, removeShaped, removeShapeless, removeSieve, removeSludgeBoiler, removeSmelteryAlloy, removeSmelteryFluid, removeSmelteryFuel, removeSqueezer, removeStill, removeTransposerExtract, removeTransposerFill, removeWarp, removeWarpItem, removeWarpResearch, rename, resetResearch, setArrowAccuracy, setArrowBreakChance, setArrowMass, setArrowStats, setAspectEntity, setAspectItem, setBowMaterialDrawspeed, setBowMaterialDurability, setBowMaterialFlightSpeed, setBowMaterialStats, setLocalisation, setMaterialDamage, setMaterialDurability, setMaterialHandleModifier, setMaterialLevelStonebound, setMaterialMiningLevel, setMaterialName, setMaterialReinforcedLevel, setMaterialSpeed, setMaterialStats, setMaterialStyle, setResearchAspects, setResearchComplexity, setResearchTypeAuto, setResearchTypeHidden, setResearchTypeRound, setResearchTypeSecondary, setResearchTypeSpikey, setResearchTypeStub, setResearchTypeVirtual, show, withEnchantment, withName, withTag, withTooltip, withTooltipShift, withWeight };
export type { ArrowStats, AspectShaped, Bonus, BonusHammer, BowStats, Cast, ChestLoot, Enchantment, Ingredient, Liquid, MaterialStats, RecipeAlchemy, RecipeAltar, RecipeArcane, RecipeArcaneShaped, RecipeArcaneShapeless, RecipeBlock, RecipeCarpenter, RecipeCastingBasin, RecipeCastingTable, RecipeCentrifuge, RecipeComposter, RecipeCompressor, RecipeCrucibleAlchemy, RecipeDryingRack, RecipeFabricator, RecipeFabricatorGlass, RecipeFermenter, RecipeFermenterFuel, RecipeFurnace, RecipeGrinder, RecipeHarvester, RecipeInductionSmelter, RecipeInfusion, RecipeInfusionEnchantment, RecipeInsolator, RecipeItem, RecipeLaser, RecipeLiquid, RecipeMagmaCrucible, RecipeMaterial, RecipeMeteor, RecipeMoistener, RecipePressInscriber, RecipePulverizer, RecipeRedstoneFurnace, RecipeRepairMaterial, RecipeResearch, RecipeResearchMove, RecipeResearchTab, RecipeSawmill, RecipeSmelteryAlloy, RecipeSmelteryFluid, RecipeSmelteryFuel, RecipeSqueezer, RecipeStill, RecipeTransposerExtract, RecipeTransposerFill, Shaped, ShapedExtreme, Shapeless, Stack, Text, TextResearch, TextResearchImage, TextRich, Texture };
