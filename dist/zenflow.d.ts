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
type Shapeless = string[];
declare const COLOR: {
    readonly black: "\\u00A70";
    readonly darkBlue: "\\u00A71";
    readonly darkGreen: "\\u00A72";
    readonly darkAqua: "\\u00A73";
    readonly darkRed: "\\u00A74";
    readonly darkPurple: "\\u00A75";
    readonly gold: "\\u00A76";
    readonly gray: "\\u00A77";
    readonly darkGray: "\\u00A78";
    readonly blue: "\\u00A79";
    readonly green: "\\u00A7a";
    readonly aqua: "\\u00A7b";
    readonly red: "\\u00A7c";
    readonly lightPurple: "\\u00A7d";
    readonly yellow: "\\u00A7e";
    readonly white: "\\u00A7f";
};
declare const STYLE: {
    readonly obfuscated: "\\u00A7k";
    readonly bold: "\\u00A7l";
    readonly strikethrough: "\\u00A7m";
    readonly underline: "\\u00A7n";
    readonly italic: "\\u00A7o";
};
type TextRich = {
    text: string;
    color?: keyof typeof COLOR;
    style?: keyof typeof STYLE;
};
type Text = string | TextRich;

type RecipeGrinder = {
    input: string;
    output: Ingredient;
    bonus?: [Bonus] | [Bonus, Bonus];
    /** Integer larger than or equal to 1 */
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
 */
declare const addCompressor: (recipe: RecipeCompressor) => string;
/**
 * Remove [Neutronium Compressor](https://ftb.fandom.com/wiki/Neutronium_Compressor) recipe
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
 */
declare const addExtreme: (output: Ingredient) => (input: ShapedExtreme) => string;
/**
 * Remove [Extreme Crafting Table](https://ftb.fandom.com/wiki/Extreme_Crafting_Table) recipe
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
declare const addChestLoot: (id: string) => (...loots: ChestLoot[]) => string;
/**
 * Remove item to dungeon loot
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Loot
 */
declare const removeChestLoot: (chest: string) => (...ids: string[]) => string;
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
type RecipeLocalisation = {
    id: string;
    value: string;
};
/**
 * Add localisation string
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Localization_164
 */
declare const setLocalisation: (locale: string) => (recipe: RecipeLocalisation) => string;

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
 * Add item to [Laser Drill](https://ftb.fandom.com/wiki/Laser_Drill_(MineFactory_Reloaded)) and Foci. Combines `addLaserOre` and `addLaserFoci`
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
declare const addLaser: (recipe: RecipeLaser) => string;
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

export { COLOR, ENCHANTMENT, FOCI, HARVESTER_TYPE, MATERIAL, MODIFIER, STYLE, add, addAlchemy, addAltar, addBiomeRubberTree, addBlacklistAutospawner, addBloodOrb, addBloodOrbShaped, addBloodOrbShapeless, addCarpenter, addCastingBasin, addCastingTable, addCentrifuge, addChestLoot, addComposter, addCompressor, addCrucible, addCrucibleFuel, addDryingRack, addExtreme, addFabricator, addFabricatorGlass, addFermenter, addFermenterFuel, addFurnace, addFurnaceFuel, addGrinder, addHammer, addHarvester, addInductionSmelter, addInscriber, addInsolator, addLaser, addLaserFoci, addLaserOre, addMagmaCrucible, addMirror, addMoistener, addOreDict, addPlanter, addPress, addPulverizer, addQED, addRedstoneFurnace, addRepairMaterial, addRitualBinding, addRitualHarvest, addRitualMeteor, addSawmill, addSeed, addShaped, addShapeless, addSieve, addSludgeBoiler, addSmelteryAlloy, addSmelteryFluid, addSmelteryFuel, addSqueezer, addStill, addTransposerExtract, addTransposerFill, createBlock, createItem, createLiquid, createMaterial, hide, joinOreDict, mirrorOreDict, remove, removeAlchemy, removeAltar, removeBiomeRubberTree, removeBlacklistAutospawner, removeCarpenter, removeCastingBasin, removeCastingTable, removeCentrifuge, removeChestLoot, removeComposter, removeCompressor, removeCrucible, removeCrucibleFuel, removeDryingRack, removeExtreme, removeFabricator, removeFabricatorGlass, removeFermenter, removeFermenterFuel, removeFurnace, removeFurnaceFuel, removeGrinder, removeHammer, removeInductionSmelter, removeInsolator, removeLaserFoci, removeLaserOre, removeMagmaCrucible, removeModifier, removeMoistener, removeOreDict, removePressInscriber, removePulverizer, removeQED, removeRedstoneFurnace, removeRepairMaterial, removeRitualBinding, removeRitualMeteor, removeSawmill, removeSeed, removeShaped, removeShapeless, removeSieve, removeSludgeBoiler, removeSmelteryAlloy, removeSmelteryFluid, removeSmelteryFuel, removeSqueezer, removeStill, removeTransposerExtract, removeTransposerFill, rename, setArrowAccuracy, setArrowBreakChance, setArrowMass, setArrowStats, setBowMaterialDrawspeed, setBowMaterialDurability, setBowMaterialFlightSpeed, setBowMaterialStats, setLocalisation, setMaterialDamage, setMaterialDurability, setMaterialHandleModifier, setMaterialLevelStonebound, setMaterialMiningLevel, setMaterialName, setMaterialReinforcedLevel, setMaterialSpeed, setMaterialStats, setMaterialStyle, show, withEnchantment, withName, withTag, withTooltip, withTooltipShift, withWeight };
export type { ArrowStats, Bonus, BonusHammer, BowStats, Cast, ChestLoot, Enchantment, Ingredient, Liquid, MaterialStats, RecipeAlchemy, RecipeAltar, RecipeBlock, RecipeCarpenter, RecipeCastingBasin, RecipeCastingTable, RecipeCentrifuge, RecipeComposter, RecipeCompressor, RecipeDryingRack, RecipeFabricator, RecipeFabricatorGlass, RecipeFermenter, RecipeFermenterFuel, RecipeFurnace, RecipeGrinder, RecipeHarvester, RecipeInductionSmelter, RecipeInsolator, RecipeItem, RecipeLaser, RecipeLiquid, RecipeLocalisation, RecipeMagmaCrucible, RecipeMaterial, RecipeMeteor, RecipeMoistener, RecipePressInscriber, RecipePulverizer, RecipeRedstoneFurnace, RecipeRepairMaterial, RecipeSawmill, RecipeSmelteryAlloy, RecipeSmelteryFluid, RecipeSmelteryFuel, RecipeSqueezer, RecipeStill, RecipeTransposerExtract, RecipeTransposerFill, Shaped, ShapedExtreme, Shapeless, Stack, Text, TextRich };
