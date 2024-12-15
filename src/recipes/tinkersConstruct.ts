import { Stack } from '../types';
import {
  formatArgs,
  formatFloat,
  formatLiteral,
  formatStack
} from '../lib/format';

export type RecipeCast = {
  liquid: Stack;
  out: string;
  catalyst?: {
    id: string;
    consume?: boolean
  };
  ticks: number;
};

export const addCastBasin = (recipe: RecipeCast) => {
  const out = formatArgs(
    recipe.out,
    formatStack(recipe.liquid),
    recipe.catalyst ? recipe.catalyst.id : null,
    !!recipe.catalyst?.consume,
    recipe.ticks
  );

  return `mods.tconstruct.Casting.addBasinRecipe(${out});`;
};

export const removeCastBasin = (id: string) =>
  `mods.tconstruct.Casting.removeBasinRecipe(${id});`;

export const addCastTable = (recipe: RecipeCast) => {
  const out = formatArgs(
    recipe.out,
    formatStack(recipe.liquid),
    recipe.catalyst ? recipe.catalyst.id : null,
    !!recipe.catalyst?.consume,
    recipe.ticks
  );

  return `mods.tconstruct.Casting.addTableRecipe(${out});`;
};

export const removeCastTable = (id: string) =>
  `mods.tconstruct.Casting.removeTableRecipe(${id});`;

export type RecipeDryingRack = {
  in: string;
  out: string;
  ticks: number;
};

export const addDryingRack = (recipe: RecipeDryingRack) => {
  const out = formatArgs(
    recipe.in,
    recipe.out,
    recipe.ticks
  );

  return `mods.tconstruct.Drying.addRecipe(${out});`;
};

export const removeDryingRack = (id: string) =>
  `mods.tconstruct.Drying.removeRecipe(${id});`;

/**
 * List of modifiers can be obtained from `/mt modifiers`
 */
export const removeModifier = (id: string) =>
  `mods.tconstruct.Modifiers.remove("${id}");`;

export type RecipeSmeltery = {
  in: string;
  liquid: Stack;
  temperature: number;
  render?: string
};

export const addSmeltery = (recipe: RecipeSmeltery) => {
  const out = formatArgs(
    recipe.in,
    formatStack(recipe.liquid),
    recipe.temperature,
    recipe.render
  );

  return `mods.tconstruct.Smeltery.addMelting(${out});`;
};

export const removeSmeltery = (id: string) =>
  `mods.tconstruct.Smeltery.removeMelting(${id});`;

export const addSmelteryAlloy = (alloy: Stack, liquids: Stack[]) => {
  const out = formatArgs(
    formatStack(alloy),
    liquids.map(formatStack)
  );

  return `mods.tconstruct.Smeltery.addAlloy(${out});`;
};

export const removeSmelteryAlloy = (id: string) =>
  `mods.tconstruct.Smeltery.removeAlloy(${id});`;

export type RecipeSmelteryFuel = {
  liquid: Stack;
  temperature: number;
  ticks: number;
};

export const addSmelteryFuel = (recipe: RecipeSmelteryFuel) => {
  const out = formatArgs(
    formatStack(recipe.liquid),
    recipe.temperature,
    recipe.ticks
  );

  return `mods.tconstruct.Smeltery.addFuel(${out});`;
};

export const removeSmelteryFuel = (id: string) =>
  `mods.tconstruct.Smeltery.removeFuel(${id});`;

export type RecipeRepair = {
  material: string;
  n: number;
};

export const addRepair = (id: string, recipe: RecipeRepair) => {
  const out = formatArgs(
    id,
    recipe.material,
    recipe.n
  );

  return `mods.tconstruct.Tweaks.addRepairMaterial(${out});`;
};

export const removeRepair = (id: string, material?: string) => {
  const out = formatArgs(id, material);

  return `mods.tconstruct.Tweaks.removeRepairMaterial(${out});`;
};

export type RecipeToolStats = {
  name: string;
  style: string;
  colour: number;
  level: {
    harvest: number;
    reinforced: number;
    stonebound: number;
  }
  value: {
    durability: number;
    speed: number;
    damage: number;
  }
  modifier: {
    handle: number;
  }
};

export const setMaterialStats = (material: string, recipe: RecipeToolStats) => {
  const out = formatArgs(
    formatLiteral(material),
    formatLiteral(recipe.name),
    recipe.level.harvest,
    recipe.value.durability,
    recipe.value.speed,
    recipe.value.damage,
    recipe.modifier.handle,
    recipe.level.reinforced,
    recipe.level.stonebound,
    formatLiteral(recipe.style),
    recipe.colour
  );

  return `mods.tconstruct.ToolStats.setStats(${out});`;
};

export const setMaterialName = (material: string, name: string) => {
  const out = formatArgs(
    formatLiteral(material),
    formatLiteral(name)
  );

  return `mods.tconstruct.ToolStats.setDisplayName(${out});`;
};

export const setMaterialLevelHarvest = (material: string, n: number) => {
  const out = formatArgs(
    formatLiteral(material),
    n
  );

  return `mods.tconstruct.ToolStats.setHarvestLevel(${out});`;
};

export const setMaterialDurability = (material: string, n: number) => {
  const out = formatArgs(
    formatLiteral(material),
    n
  );

  return `mods.tconstruct.ToolStats.setDurability(${out});`;
};

export const setMaterialSpeed = (material: string, n: number) => {
  const out = formatArgs(
    formatLiteral(material),
    n
  );

  return `mods.tconstruct.ToolStats.setSpeed(${out});`;
};

export const setMaterialDamage = (material: string, n: number) => {
  const out = formatArgs(
    formatLiteral(material),
    n
  );

  return `mods.tconstruct.ToolStats.setDamage(${out});`;
};

export const setMaterialModifierHandle = (material: string, n: number) => {
  const out = formatArgs(
    formatLiteral(material),
    n
  );

  return `mods.tconstruct.ToolStats.setHandleModifier(${out});`;
};

export const setMaterialLevelReinforced = (material: string, n: number) => {
  const out = formatArgs(
    formatLiteral(material),
    n
  );

  return `mods.tconstruct.ToolStats.setReinforcedLevel(${out});`;
};

export const setMaterialLevelStonebound = (material: string, n: number) => {
  const out = formatArgs(
    formatLiteral(material),
    n
  );

  return `mods.tconstruct.ToolStats.setStoneboundLevel(${out});`;
};

export const setMaterialStyle = (material: string, style: string) => {
  const out = formatArgs(
    formatLiteral(material),
    formatLiteral(style)
  );

  return `mods.tconstruct.ToolStats.setStyle(${out});`;
};

export const setMaterialAbility = (material: string, ability: string) => {
  const out = formatArgs(
    formatLiteral(material),
    formatLiteral(ability)
  );

  return `mods.tconstruct.ToolStats.setAbility(${out});`;
};

export type RecipeBowStats = {
  durability: number;
  speed: {
    draw: number;
    flight: number;
  }
};

export const setBowStats = (material: string, recipe: RecipeBowStats) => {
  const out = formatArgs(
    formatLiteral(material),
    recipe.durability,
    recipe.speed.draw,
    formatFloat(recipe.speed.flight)
  );

  return `mods.tconstruct.ToolStats.setBowStats(${out});`;
};

export const setBowDurability = (material: string, n: number) => {
  const out = formatArgs(
    formatLiteral(material),
    n
  );

  return `mods.tconstruct.ToolStats.setBowDurability(${out});`;
};

export const setBowDrawSpeed = (material: string, n: number) => {
  const out = formatArgs(
    formatLiteral(material),
    n
  );

  return `mods.tconstruct.ToolStats.setBowDrawspeed(${out});`;
};

export const setBowFlightSpeed = (material: string, n: number) => {
  const out = formatArgs(
    formatLiteral(material),
    formatFloat(n)
  );

  return `mods.tconstruct.ToolStats.setBowFlightSpeed(${out});`;
};

export type RecipeArrowStats = {
  mass: number;
  break: number;
  accuracy: number;
};

export const setArrowStats = (material: string, recipe: RecipeArrowStats) => {
  const out = formatArgs(
    formatLiteral(material),
    formatFloat(recipe.mass),
    formatFloat(recipe.break),
    formatFloat(recipe.accuracy)
  );

  return `mods.tconstruct.ToolStats.setArrowStats(${out});`;
};

export const setArrowMass = (material: string, n: number) => {
  const out = formatArgs(
    formatLiteral(material),
    formatFloat(n)
  );

  return `mods.tconstruct.ToolStats.setArrowMass(${out});`;
};

export const setArrowBreak = (material: string, n: number) => {
  const out = formatArgs(
    formatLiteral(material),
    formatFloat(n)
  );

  return `mods.tconstruct.ToolStats.setArrowBreakChance(${out});`;
};

export const setArrowAccuracy = (material: string, n: number) => {
  const out = formatArgs(
    formatLiteral(material),
    formatFloat(n)
  );

  return `mods.tconstruct.TooLStats.setArrowAccuracy(${out});`;
};
