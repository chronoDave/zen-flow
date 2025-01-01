import type { Bonus, Ingredient, Stack } from '../types';

import { formatArgs, formatIngredient, formatStack } from '../lib/format';

const formatBonus = (bonus?: Bonus): Array<string | number> => bonus ? [
  bonus.id,
  Math.round(bonus.chance * 100)
] : [];

export type RecipeMagmaCrucible = {
  rf: number;
  input: string;
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
export const addMagmaCrucible = (liquid: Stack, recipe: RecipeMagmaCrucible) => {
  const out = formatArgs(
    recipe.rf,
    recipe.input,
    formatStack(liquid)
  );

  return `mods.thermalexpansion.Crucible.addRecipe(${out});`;
};

/**
 * Remove [Magma Crucible](https://oldcofh.github.io/docs/thermal-expansion/machines/magma-crucible/) recipe
 * 
 * A list of recipes can be generated using `/mt thermalexpansion Crucible`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
export const removeMagmaCrucible = (id: string) =>
  `mods.thermalexpansion.Crucible.removeRecipe(${id});`;

export type RecipeRedstoneFurnace = {
  rf: number;
  input: string;
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
export const addRedstoneFurnace = (item: Ingredient, recipe: RecipeRedstoneFurnace) => {
  const out = formatArgs(
    recipe.rf,
    recipe.input,
    formatIngredient(item)
  );

  return `mods.thermalexpansion.Furnace.addRecipe(${out});`;
};

/**
 * Remove [Redstone Furnace](https://oldcofh.github.io/docs/thermal-expansion/machines/redstone-furnace/) recipe
 * 
 * A list of recipes can be generated using `/mt thermalexpansion Furnace`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
export const removeRedstoneFurnace = (id: string) =>
  `mods.thermalexpansion.Furnace.removeRecipe(${id});`;

export type RecipeInsolator = {
  rf: number;
  input: {
    left: Ingredient;
    right: Ingredient;
  };
  bonus?: Bonus;
};

/**
 * Add [Phytogenic Insolator](https://oldcofh.github.io/docs/thermal-expansion/machines/phytogenic-insolator/) recipe
 * 
 * A list of recipes can be generated using `/mt thermalexpansion Insolator`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
export const addInsolator = (item: Ingredient, recipe: RecipeInsolator) => {
  const out = formatArgs(
    recipe.rf,
    formatIngredient(recipe.input.left),
    formatIngredient(recipe.input.right),
    formatIngredient(item),
    ...formatBonus(recipe.bonus)
  );

  return `mods.thermalexpansion.Insolator.addRecipe(${out});`;
};

/**
 * Remove [Phytogenic Insolator](https://oldcofh.github.io/docs/thermal-expansion/machines/phytogenic-insolator/) recipe
 * 
 * A list of recipes can be generated using `/mt thermalexpansion Insolator`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
export const removeInsolator = (input: { left: string; right: string }) =>
  `mods.thermalexpansion.Insolator.removeRecipe(${formatArgs(input.left, input.right)});`;

export type RecipePulverizer = {
  rf: number;
  input: string;
  bonus?: Bonus;
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
export const addPulverizer = (item: Ingredient, recipe: RecipePulverizer) => {
  const out = formatArgs(
    recipe.rf,
    recipe.input,
    formatIngredient(item),
    ...formatBonus(recipe.bonus)
  );

  return `mods.thermalexpansion.Pulverizer.addRecipe(${out});`;
};

/**
 * Remove [Pulverizer](https://oldcofh.github.io/docs/thermal-expansion/machines/pulverizer/) recipe
 * 
 * A list of recipes can be generated using `/mt thermalexpansion Pulverizer`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
export const removePulverizer = (id: string) =>
  `mods.thermalexpansion.Pulverizer.removeRecipe(${id});`;

export type RecipeSawmill = {
  rf: number;
  input: string;
  bonus?: Bonus;
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
export const addSawmill = (item: Ingredient, recipe: RecipeSawmill) => {
  const out = formatArgs(
    recipe.rf,
    recipe.input,
    formatIngredient(item),
    ...formatBonus(recipe.bonus)
  );

  return `mods.thermalexpansion.Sawmill.addRecipe(${out});`;
};

/**
 * Remove [Sawmill](https://oldcofh.github.io/docs/thermal-expansion/machines/sawmill/) recipe
 * 
 * A list of recipes can be generated using `/mt thermalexpansion Sawmill`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
export const removeSawmill = (id: string) =>
  `mods.thermalexpansion.Sawmill.removeRecipe(${id});`;

export type RecipeInductionSmelter = {
  rf: number;
  input: [Ingredient, Ingredient];
  bonus?: Bonus;
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
export const addInductionSmelter = (item: Ingredient, recipe: RecipeInductionSmelter) => {
  const out = formatArgs(
    recipe.rf,
    formatIngredient(recipe.input[1]),
    formatIngredient(recipe.input[0]),
    formatIngredient(item),
    ...formatBonus(recipe.bonus)
  );

  return `mods.thermalexpansion.Smelter.addRecipe(${out});`;
};

/**
 * Remove [Induction Smelter](https://oldcofh.github.io/docs/thermal-expansion/machines/induction-smelter/) recipe
 * 
 * A list of recipes can be generated using `/mt thermalexpansion Smelter`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
export const removeInductionSmelter = (input: { left: string; right: string }) =>
  `mods.thermalexpansion.Smelter.removeRecipe(${formatArgs(input.left, input.right)});`;

export type RecipeTransposerFill = {
  rf: number;
  input: string;
  liquid: Stack;
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
export const addTransposerFill = (item: Ingredient, recipe: RecipeTransposerFill) => {
  const out = formatArgs(
    recipe.rf,
    recipe.input,
    formatIngredient(item),
    formatStack(recipe.liquid)
  );

  return `mods.thermalexpansion.Transposer.addFillRecipe(${out});`;
};

/**
 * Remove [Fluid Transposer](https://oldcofh.github.io/docs/thermal-expansion/machines/fluid-transposer/) fill recipe
 * 
 * A list of recipes can be generated using `/mt thermalexpansion Transposer`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
export const removeTransposerFill = (input: { id: string; liquid: string }) =>
  `mods.thermalexpansion.Transposer.removeFillRecipe(${formatArgs(input.id, input.liquid)});`;

export type RecipeTransposerExtract = {
  rf: number;
  input: string;
  bonus: Bonus;
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
export const addTransposerExtract = (liquid: Stack, recipe: RecipeTransposerExtract) => {
  const out = formatArgs(
    recipe.rf,
    recipe.input,
    formatStack(liquid),
    ...formatBonus(recipe.bonus)
  );

  return `mods.thermalexpansion.Transposer.addExtractRecipe(${out});`;
};

/**
 * Remove [Fluid Transposer](https://oldcofh.github.io/docs/thermal-expansion/machines/fluid-transposer/) extract recipe
 * 
 * A list of recipes can be generated using `/mt thermalexpansion Transposer`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Thermal_Expansion_Support
 */
export const removeTransposerExtract = (id: string) =>
  `mods.thermalexpansion.Transposer.removeExtractRecipe(${id});`;
