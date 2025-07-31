import type { Cast, Liquid, COLOR } from '../lib/format.ts';

import * as format from '../lib/format.ts';

export type RecipeCastingBasin = {
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
export const addCastingBasin = (recipe: RecipeCastingBasin) => {
  const out = format.recipe(
    recipe.output,
    format.liquid(recipe.input),
    ...format.cast(recipe.cast),
    recipe.ticks
  );

  return `mods.tconstruct.Casting.addBasinRecipe(${out});`;
};

/**
 * Remove [Casting Basin](https://tinkers-construct.fandom.com/wiki/Casting_Basin) recipe
 * 
 * Recipes can be generated using `/mt tconstruct Casting`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const removeCastingBasin = (output: string) =>
  `mods.tconstruct.Casting.removeBasinRecipe(${output});`;

export type RecipeCastingTable = {
  input: Liquid;
  output: string;
  ticks: number;
  cast?: Cast;
};

/**
 * Add [Casting Basin](https://tinkers-construct.fandom.com/wiki/Casting_Basin) recipe
 * 
 * Common values:
 *  - Ticks => `20`
 *  - Liquid (Ingot) => `144`
 * 
 * Recipes can be generated using `/mt tconstruct Casting`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const addCastingTable = (recipe: RecipeCastingTable) => {
  const out = format.recipe(
    recipe.output,
    format.liquid(recipe.input),
    ...format.cast(recipe.cast),
    recipe.ticks
  );

  return `mods.tconstruct.Casting.addTableRecipe(${out});`;
};

/**
 * Remove [Casting Basin](https://tinkers-construct.fandom.com/wiki/Casting_Table) recipe
 * 
 * Recipes can be generated using `/mt tconstruct Casting`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const removeCastingTable = (output: string) =>
  `mods.tconstruct.Casting.removeTableRecipe(${output});`;

export type RecipeDryingRack = {
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
export const addDryingRack = (recipe: RecipeDryingRack) => {
  const out = format.recipe(
    recipe.input,
    recipe.output,
    recipe.ticks
  );

  return `mods.tconstruct.Drying.addRecipe(${out});`;
};

/**
 * Remove [Drying Rack](https://tinkers-construct.fandom.com/wiki/Drying_Rack) recipe
 * 
 * Recipes can be generated using `/mt tconstruct Drying`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const removeDryingRack = (output: string) =>
  `mods.tconstruct.Drying.removeRecipe(${output});`;

export const MODIFIER = {
  lvl1: 'Tier1Free',
  lvl2: 'Tier1.5Free',
  lvl3: 'Tier2Free',
  silkTouch: 'Silk Touch',
  luck: 'Lapis',
  fiery: 'Blaze',
  sharpness: 'ModAttack',
  beheading: 'Beheading',
  diamond: 'Diamond',
  reinforced: 'Reinforced',
  haste: 'Redstone',
  necrotic: 'Necrotic',
  emerald: 'Emerald',
  smite: 'ModSmite',
  knockback: 'Piston',
  baneOfAnthropods: 'ModAntiSpider',
  flux: 'Flux'
} as const;

/**
 * Remove [Modifier](https://tinkers-construct.fandom.com/wiki/Modifiers)
 *
 * A list of modifiers can be generated from `/mt modifiers`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const removeModifier = (id: string) =>
  `mods.tconstruct.Modifiers.remove(${format.literal(id)});`;

export type RecipeSmelteryFluid = {
  input: string;
  output: Liquid;
  temperature: number;
  render?: string;
};

/**
 * Add [Smeltery](https://tinkers-construct.fandom.com/wiki/Smeltery) fluid recipe
 * 
 * Common values:
 *  - Lava => `1000`
 *  - Pyrotheum => `5000`
 * 
 * A list of recipes can be generated from `/mt tconstruct Smeltery`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const addSmelteryFluid = (recipe: RecipeSmelteryFluid) => {
  const out = format.recipe(
    recipe.input,
    format.liquid(recipe.output),
    recipe.temperature,
    recipe.render
  );

  return `mods.tconstruct.Smeltery.addMelting(${out});`;
};

/**
 * Remove [Smeltery](https://tinkers-construct.fandom.com/wiki/Smeltery) fluid recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const removeSmelteryFluid = (input: string) =>
  `mods.tconstruct.Smeltery.removeMelting(${input});`;

export type RecipeSmelteryAlloy = {
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
export const addSmelteryAlloy = (recipe: RecipeSmelteryAlloy) => {
  const output = typeof recipe.output === 'string' ?
    { id: recipe.output, mb: recipe.input.reduce((acc, cur) => acc + cur.mb, 0) } :
    recipe.output;

  const out = format.recipe(
    format.liquid(output),
    recipe.input.map(format.liquid)
  );

  return `mods.tconstruct.Smeltery.addAlloy(${out});`;
};

/**
 * Remove [Smeltery](https://tinkers-construct.fandom.com/wiki/Smeltery) alloy recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const removeSmelteryAlloy = (output: string) =>
  `mods.tconstruct.Smeltery.removeAlloy(${output});`;

export type RecipeSmelteryFuel = {
  temperature: number;
  ticks: number;
};

/**
 * Add [Smeltery](https://tinkers-construct.fandom.com/wiki/Smeltery) fuel
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const addSmelteryFuel = (id: string) =>
  (recipe: RecipeSmelteryFuel) => {
    const out = format.recipe(
      id,
      recipe.temperature,
      recipe.ticks
    );

    return `mods.tconstruct.Smeltery.addFuel(${out});`;
  };

/**
 * Remove [Smeltery](https://tinkers-construct.fandom.com/wiki/Smeltery) fuel
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const removeSmelteryFuel = (id: string) =>
  `mods.tconstruct.Smeltery.removeFuel(${id});`;

export const MATERIAL = {
  wood: 'Wood',
  stone: 'Stone',
  iron: 'Iron',
  flint: 'Flint',
  cactus: 'Cactus',
  bone: 'Bone',
  obsidian: 'Obsidian',
  alumite: 'Alumite',
  netherrack: 'Netherrack',
  slimeBlue: 'Blue Slime',
  slimeGreen: 'Green Slime',
  paper: 'Paper',
  cobalt: 'Cobalt',
  ardite: 'Ardite',
  manyullyn: 'Manyullyn',
  copper: 'Copper',
  bronze: 'Bronze',
  steel: 'Steel',
  pigIron: 'Pig Iron',
  lead: 'Lead',
  silver: 'Silver',
  ferrous: 'Ferrous',
  shiny: 'Shiny',
  electrum: 'Electrum',
  invar: 'Invar',
  woodMagical: 'Magical Wood',
  bedrock: 'Bedrockium',
  unstable: 'Unstable Induced'
} as const;

export type RecipeRepairMaterial = {
  material: string;
  n: number;
};

/**
 * Add repair [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats)
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const addRepairMaterial = (id: string) =>
  (recipe: RecipeRepairMaterial) => {
    const out = format.recipe(
      id,
      format.literal(recipe.material),
      recipe.n
    );

    return `mods.tconstruct.Tweaks.addRepairMaterial(${out});`;
  };

/**
 * Remove repair [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats)
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const removeRepairMaterial = (id: string, material?: string) => {
  const out = format.recipe(
    id,
    typeof material === 'string' && format.literal(material)
  );

  return `mods.tconstruct.Tweaks.removeRepairMaterial(${out});`;
};

export type MaterialStats = {
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
export const setMaterialStats = (id: string) =>
  (stats: MaterialStats) => {
    const out = format.recipe(
      format.literal(id),
      format.literal(stats.name),
      stats.level,
      stats.durability,
      stats.speed * 100,
      stats.damage,
      stats.modifier,
      typeof stats.reinforced === 'number' ?
        stats.reinforced :
        0,
      typeof stats.stonebound === 'number' ?
        stats.stonebound :
        0,
      format.literal(stats.color.name),
      stats.color.tool
    );

    return `mods.tconstruct.ToolStats.setStats(${out});`;
  };

/**
 * Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) display name
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setMaterialName = (id: string) =>
  (name: string) => {
    const out = format.recipe(
      format.literal(id),
      format.literal(name)
    );

    return `mods.tconstruct.ToolStats.setDisplayName(${out});`;
  };

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
export const setMaterialMiningLevel = (id: string) =>
  (n: number) => {
    const out = format.recipe(format.literal(id), n);

    return `mods.tconstruct.ToolStats.setHarvestLevel(${out});`;
  };

/**
 * Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) durability
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setMaterialDurability = (id: string) =>
  (n: number) => {
    const out = format.recipe(format.literal(id), n);

    return `mods.tconstruct.ToolStats.setDurability(${out});`;
  };

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
export const setMaterialSpeed = (id: string) =>
  (n: number) => {
    const out = format.recipe(format.literal(id), n * 100);

    return `mods.tconstruct.ToolStats.setSpeed(${out});`;
  };

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
export const setMaterialDamage = (id: string) =>
  (n: number) => {
    const out = format.recipe(format.literal(id), n);

    return `mods.tconstruct.ToolStats.setDamage(${out});`;
  };

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
export const setMaterialHandleModifier = (id: string) =>
  (n: number) => {
    const out = format.recipe(format.literal(id), n);

    return `mods.tconstruct.ToolStats.setHandleModifier(${out});`;
  };

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
export const setMaterialReinforcedLevel = (id: string) =>
  (n: number) => {
    const out = format.recipe(format.literal(id), n);

    return `mods.tconstruct.ToolStats.setReinforcedLevel(${out});`;
  };

/**
* Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) stonebound level
*
* Common values:
*  - `1` => Stone, Netherrack
*  - `2` => Ardite
* 
* @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
*/
export const setMaterialLevelStonebound = (material: string) =>
  (n: number) => {
    const out = format.recipe(format.literal(material), n);

    return `mods.tconstruct.ToolStats.setStoneboundLevel(${out});`;
  };

/**
* Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) display name colour
*
* @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
*/
export const setMaterialStyle = (material: string) =>
  (style: keyof typeof COLOR) => {
    const out = format.recipe(
      format.literal(material),
      format.literal(style)
    );

    return `mods.tconstruct.ToolStats.setStyle(${out});`;
  };

export type BowStats = {
  durability: number;
  drawSpeed: number;
  flightSpeed: number;
};

/**
 * Set bow [Material](https://github.com/SlimeKnights/TinkersConstruct/blob/9ea7a0e60fe180aff591701b12c89da21da99289/src/main/java/tconstruct/weaponry/TinkerWeaponry.java#L312) stats
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setBowMaterialStats = (id: string) =>
  (stats: BowStats) => {
    const out = format.recipe(
      format.literal(id),
      stats.durability,
      stats.drawSpeed,
      format.float(stats.flightSpeed)
    );

    return `mods.tconstruct.ToolStats.setBowStats(${out});`;
  };

/**
 * Set bow [Material](https://tinkers-construct.fandom.com/wiki/Shortbow) durability
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setBowMaterialDurability = (id: string) =>
  (n: number) => {
    const out = format.recipe(format.literal(id), n);

    return `mods.tconstruct.ToolStats.setBowDurability(${out});`;
  };

/**
 * Set bow [Material](https://tinkers-construct.fandom.com/wiki/Shortbow) draw speed
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setBowMaterialDrawspeed = (id: string) =>
  (n: number) => {
    const out = format.recipe(format.literal(id), n);

    return `mods.tconstruct.ToolStats.setBowDrawspeed(${out});`;
  };

/**
 * Set bow [Material](https://tinkers-construct.fandom.com/wiki/Shortbow) flight speed
 * 
 * Vanilla bow speed is `3`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setBowMaterialFlightSpeed = (id: string) =>
  (n: number) => {
    const out = format.recipe(
      format.literal(id),
      format.float(n)
    );

    return `mods.tconstruct.ToolStats.setBowFlightSpeed(${out});`;
  };

export type ArrowStats = {
  mass: number;
  breakChance: number;
  accuracy: number;
};

/**
 * Set arrow [Material](https://github.com/SlimeKnights/TinkersConstruct/blob/9ea7a0e60fe180aff591701b12c89da21da99289/src/main/java/tconstruct/weaponry/TinkerWeaponry.java#L335) stats
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setArrowStats = (id: string) =>
  (stats: ArrowStats) => {
    const out = format.recipe(
      format.literal(id),
      format.float(stats.mass),
      format.float(stats.breakChance),
      format.float(stats.accuracy)
    );

    return `mods.tconstruct.ToolStats.setArrowStats(${out});`;
  };

/**
 * Set arrow [Material](https://github.com/SlimeKnights/TinkersConstruct/blob/9ea7a0e60fe180aff591701b12c89da21da99289/src/main/java/tconstruct/weaponry/TinkerWeaponry.java#L335) mass
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setArrowMass = (id: string) =>
  (n: number) => {
    const out = format.recipe(
      format.literal(id),
      format.float(n)
    );

    return `mods.tconstruct.ToolStats.setArrowMass(${out});`;
  };

/**
 * Set arrow [Material](https://github.com/SlimeKnights/TinkersConstruct/blob/9ea7a0e60fe180aff591701b12c89da21da99289/src/main/java/tconstruct/weaponry/TinkerWeaponry.java#L335) break chance
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setArrowBreakChance = (id: string) =>
  (n: number) => {
    const out = format.recipe(
      format.literal(id),
      format.float(n)
    );

    return `mods.tconstruct.ToolStats.setArrowBreakChance(${out});`;
  };

/**
 * Set arrow [Material](https://github.com/SlimeKnights/TinkersConstruct/blob/9ea7a0e60fe180aff591701b12c89da21da99289/src/main/java/tconstruct/weaponry/TinkerWeaponry.java#L335) accuracy
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setArrowAccuracy = (id: string) =>
  (n: number) => {
    const out = format.recipe(
      format.literal(id),
      format.float(n)
    );

    return `mods.tconstruct.TooLStats.setArrowAccuracy(${out});`;
  };
