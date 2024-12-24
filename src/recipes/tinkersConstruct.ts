import type { Stack, Cast } from '../types';

import {
  formatArgs,
  formatCast,
  formatStack,
  formatLiteral,
  formatFloat
} from '../lib/format';

export type RecipeCastingBasin = {
  liquid: Stack;
  ticks: number;
  cast?: Cast;
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
export const addCastingBasin = (id: string, recipe: RecipeCastingBasin) => {
  const out = formatArgs(
    id,
    formatStack(recipe.liquid),
    ...formatCast(recipe.cast),
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
export const removeCastingBasin = (id: string) =>
  `mods.tconstruct.Casting.removeBasinRecipe(${id});`;

export type RecipeCastingTable = {
  liquid: Stack;
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
export const addCastingTable = (id: string, recipe: RecipeCastingTable) => {
  const out = formatArgs(
    id,
    formatStack(recipe.liquid),
    ...formatCast(recipe.cast),
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
export const removeCastingTable = (id: string) =>
  `mods.tconstruct.Casting.removeTableRecipe(${id});`;

export type RecipeDryingRack = {
  input: string;
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
export const addDryingRack = (id: string, recipe: RecipeDryingRack) => {
  const out = formatArgs(
    recipe.input,
    id,
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
export const removeDryingRack = (id: string) =>
  `mods.tconstruct.Drying.removeRecipe(${id});`;

export const MODIFIERS = {
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
  `mods.tconstruct.Modifiers.remove(${formatLiteral(id)});`;

export type RecipeSmelteryFluid = {
  input: string;
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
export const addSmelteryFluid = (liquid: Stack, recipe: RecipeSmelteryFluid) => {
  const out = formatArgs(
    recipe.input,
    formatStack(liquid),
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
export const removeSmelteryFluid = (id: string) =>
  `mods.tconstruct.Smeltery.removeMelting(${id});`;

/**
 * Add [Smeltery](https://tinkers-construct.fandom.com/wiki/Smeltery) alloy recipe
 * 
 * A list of recipes can be generated from `/mt tconstruct Smeltery`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const addSmelteryAlloy = (alloy: Stack, recipe: Stack[]) => {
  const out = formatArgs(
    formatStack(alloy),
    recipe.map(formatStack)
  );

  return `mods.tconstruct.Smeltery.addAlloy(${out});`;
};

/**
 * Remove [Smeltery](https://tinkers-construct.fandom.com/wiki/Smeltery) alloy recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const removeSmelteryAlloy = (id: string) =>
  `mods.tconstruct.Smeltery.removeAlloy(${id});`;

export type RecipeSmelteryFuel = {
  temperature: number;
  ticks: number;
};

/**
 * Add [Smeltery](https://tinkers-construct.fandom.com/wiki/Smeltery) fuel
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const addSmelteryFuel = (id: string, recipe: RecipeSmelteryFuel) => {
  const out = formatArgs(
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

export const MATERIALS = {
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
export const addRepairMaterial = (id: string, recipe: RecipeRepairMaterial) => {
  const out = formatArgs(
    id,
    formatLiteral(recipe.material),
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
  const out = formatArgs(
    id,
    typeof material === 'string' && formatLiteral(material)
  );

  return `mods.tconstruct.Tweaks.removeRepairMaterial(${out});`;
};

export type RecipeToolStats = {
  name: string;
  style: string;
  colour: string;
  durability: number;
  speed: number;
  damage: number;
  level: {
    mining: number;
    reinforced: number;
    stonebound: number;
  };
  modifier: {
    handle: number;
  };
};

/**
 * Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) stats
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setMaterialStats = (material: string, recipe: RecipeToolStats) => {
  const out = formatArgs(
    formatLiteral(material),
    formatLiteral(recipe.name),
    recipe.level.mining,
    recipe.durability,
    recipe.speed,
    recipe.damage,
    recipe.modifier.handle,
    recipe.level.reinforced,
    recipe.level.stonebound,
    formatLiteral(recipe.style),
    recipe.colour
  );

  return `mods.tconstruct.ToolStats.setStats(${out});`;
};

/**
 * Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) name
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setMaterialName = (material: string, name: string) => {
  const out = formatArgs(
    formatLiteral(material),
    formatLiteral(name)
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
export const setMaterialMiningLevel = (material: string, n: number) => {
  const out = formatArgs(formatLiteral(material), n);

  return `mods.tconstruct.ToolStats.setHarvestLevel(${out});`;
};


/**
 * Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) durability
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setMaterialDurability = (material: string, n: number) => {
  const out = formatArgs(formatLiteral(material), n);

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
export const setMaterialSpeed = (material: string, n: number) => {
  const out = formatArgs(formatLiteral(material), n);

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
export const setMaterialDamage = (material: string, n: number) => {
  const out = formatArgs(formatLiteral(material), n);

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
export const setMaterialHandleModifier = (material: string, n: number) => {
  const out = formatArgs(formatLiteral(material), n);

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
export const setMaterialReinforcedLevel = (material: string, n: number) => {
  const out = formatArgs(formatLiteral(material), n);

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
export const setMaterialLevelStonebound = (material: string, n: number) => {
  const out = formatArgs(formatLiteral(material), n);

  return `mods.tconstruct.ToolStats.setStoneboundLevel(${out});`;
};

/**
 * Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) name style
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setMaterialStyle = (material: string, style: string) => {
  const out = formatArgs(
    formatLiteral(material),
    formatLiteral(style)
  );

  return `mods.tconstruct.ToolStats.setStyle(${out});`;
};

/**
 * Set [Material](https://tinkers-construct.fandom.com/wiki/Material_Stats) ability
 *
 * Common values:
 *  - Stonebound
 *  - Reinforced
 *  - Jagged
 *  - Slimy
 *  - Writeable
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setMaterialAbility = (material: string, ability: string) => {
  const out = formatArgs(
    formatLiteral(material),
    formatLiteral(ability)
  );

  return `mods.tconstruct.ToolStats.setAbility(${out});`;
};

export type RecipeBowMaterialStats = {
  durability: number;
  drawSpeed: number;
  flightSpeed: number;
};

/**
 * Set bow [Material](https://github.com/SlimeKnights/TinkersConstruct/blob/9ea7a0e60fe180aff591701b12c89da21da99289/src/main/java/tconstruct/weaponry/TinkerWeaponry.java#L312) stats
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setBowMaterialStats = (material: string, recipe: RecipeBowMaterialStats) => {
  const out = formatArgs(
    formatLiteral(material),
    recipe.durability,
    recipe.drawSpeed,
    formatFloat(recipe.flightSpeed)
  );

  return `mods.tconstruct.ToolStats.setBowStats(${out});`;
};

/**
 * Set bow [Material](https://tinkers-construct.fandom.com/wiki/Shortbow) durability
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setBowMaterialDurability = (material: string, durability: number) => {
  const out = formatArgs(formatLiteral(material), durability);

  return `mods.tconstruct.ToolStats.setBowDurability(${out});`;
};

/**
 * Set bow [Material](https://tinkers-construct.fandom.com/wiki/Shortbow) draw speed
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setBowMaterialDrawspeed = (material: string, drawspeed: number) => {
  const out = formatArgs(formatLiteral(material), drawspeed);

  return `mods.tconstruct.ToolStats.setBowDrawspeed(${out});`;
};

/**
 * Set bow [Material](https://tinkers-construct.fandom.com/wiki/Shortbow) flight speed
 * 
 * Vanilla bow speed is `3`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setBowMaterialFlightSpeed = (material: string, flightSpeed: number) => {
  const out = formatArgs(
    formatLiteral(material),
    formatFloat(flightSpeed)
  );

  return `mods.tconstruct.ToolStats.setBowFlightSpeed(${out});`;
};

export type RecipeArrowStats = {
  mass: number;
  breakChance: number;
  accuracy: number;
};

/**
 * Set arrow [Material](https://github.com/SlimeKnights/TinkersConstruct/blob/9ea7a0e60fe180aff591701b12c89da21da99289/src/main/java/tconstruct/weaponry/TinkerWeaponry.java#L335) stats
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setArrowStats = (material: string, recipe: RecipeArrowStats) => {
  const out = formatArgs(
    formatLiteral(material),
    formatFloat(recipe.mass),
    formatFloat(recipe.breakChance),
    formatFloat(recipe.accuracy)
  );

  return `mods.tconstruct.ToolStats.setArrowStats(${out});`;
};

/**
 * Set arrow [Material](https://github.com/SlimeKnights/TinkersConstruct/blob/9ea7a0e60fe180aff591701b12c89da21da99289/src/main/java/tconstruct/weaponry/TinkerWeaponry.java#L335) mass
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setArrowMass = (material: string, mass: number) => {
  const out = formatArgs(
    formatLiteral(material),
    formatFloat(mass)
  );

  return `mods.tconstruct.ToolStats.setArrowMass(${out});`;
};

/**
 * Set arrow [Material](https://github.com/SlimeKnights/TinkersConstruct/blob/9ea7a0e60fe180aff591701b12c89da21da99289/src/main/java/tconstruct/weaponry/TinkerWeaponry.java#L335) break chance
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setArrowBreakChance = (material: string, breakChance: number) => {
  const out = formatArgs(
    formatLiteral(material),
    formatFloat(breakChance)
  );

  return `mods.tconstruct.ToolStats.setArrowBreakChance(${out});`;
};

/**
 * Set arrow [Material](https://github.com/SlimeKnights/TinkersConstruct/blob/9ea7a0e60fe180aff591701b12c89da21da99289/src/main/java/tconstruct/weaponry/TinkerWeaponry.java#L335) accuracy
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:TConstruct_Support
 */
export const setArrowAccuracy = (material: string, accuracy: number) => {
  const out = formatArgs(
    formatLiteral(material),
    formatFloat(accuracy)
  );

  return `mods.tconstruct.TooLStats.setArrowAccuracy(${out});`;
};
