import type { Ingredient, Stack, Bonus, Liquid } from '../lib/format.ts';

import * as format from '../lib/format.ts';

const bonus = (bonus?: Bonus): [string, number] | [] => bonus ?
  [bonus.id, Math.round(bonus.p * 100)] :
  [];

export type RecipeMagmaCrucible = {
  input: string;
  output: Stack;
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
export const addMagmaCrucible = (recipe: RecipeMagmaCrucible) => {
  const out = format.recipe(
    recipe.rf,
    recipe.input,
    format.stack(recipe.output)
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
export const removeMagmaCrucible = (recipe: { input: string }) =>
  `mods.thermalexpansion.Crucible.removeRecipe(${recipe.input});`;

export type RecipeRedstoneFurnace = {
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
export const addRedstoneFurnace = (recipe: RecipeRedstoneFurnace) => {
  const out = format.recipe(
    recipe.rf,
    recipe.input,
    format.ingredient(recipe.output)
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
export const removeRedstoneFurnace = (recipe: { input: string }) =>
  `mods.thermalexpansion.Furnace.removeRecipe(${recipe.input});`;

export type RecipeInsolator = {
  input: [left: Ingredient, right: Ingredient];
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
export const addInsolator = (recipe: RecipeInsolator) => {
  const out = format.recipe(
    recipe.rf,
    format.ingredient(recipe.input[0]),
    format.ingredient(recipe.input[1]),
    format.ingredient(recipe.output),
    ...bonus(recipe.bonus)
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
export const removeInsolator = (recipe: { input: [left: string, right: string] }) =>
  `mods.thermalexpansion.Insolator.removeRecipe(${format.recipe(...recipe.input)});`;

export type RecipePulverizer = {
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
export const addPulverizer = (recipe: RecipePulverizer) => {
  const out = format.recipe(
    recipe.rf,
    recipe.input,
    format.ingredient(recipe.output),
    ...bonus(recipe.bonus)
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
export const removePulverizer = (recipe: { input: string }) =>
  `mods.thermalexpansion.Pulverizer.removeRecipe(${recipe.input});`;

export type RecipeSawmill = {
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
export const addSawmill = (recipe: RecipeSawmill) => {
  const out = format.recipe(
    recipe.rf,
    recipe.input,
    format.ingredient(recipe.output),
    ...bonus(recipe.bonus)
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
export const removeSawmill = (recipe: { input: string }) =>
  `mods.thermalexpansion.Sawmill.removeRecipe(${recipe.input});`;

export type RecipeInductionSmelter = {
  input: [Ingredient, Ingredient];
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
export const addInductionSmelter = (recipe: RecipeInductionSmelter) => {
  const out = format.recipe(
    recipe.rf,
    format.ingredient(recipe.input[0]),
    format.ingredient(recipe.input[1]),
    format.ingredient(recipe.output),
    ...bonus(recipe.bonus)
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
export const removeInductionSmelter = (recipe: { input: [left: string, right: string] }) =>
  `mods.thermalexpansion.Smelter.removeRecipe(${format.recipe(...recipe.input)});`;

export type RecipeTransposerFill = {
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
export const addTransposerFill = (recipe: RecipeTransposerFill) => {
  const out = format.recipe(
    recipe.rf,
    recipe.input,
    format.ingredient(recipe.output),
    format.liquid(recipe.liquid)
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
export const removeTransposerFill = (recipe: { input: string; liquid: string }) =>
  `mods.thermalexpansion.Transposer.removeFillRecipe(${format.recipe(recipe.input, recipe.liquid)});`;

export type RecipeTransposerExtract = {
  input: string;
  output?: Bonus;
  liquid: Liquid;
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
export const addTransposerExtract = (recipe: RecipeTransposerExtract) => {
  const out = format.recipe(
    recipe.rf,
    recipe.input,
    format.liquid(recipe.liquid),
    ...bonus(recipe.output)
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
export const removeTransposerExtract = (recipe: { input: string }) =>
  `mods.thermalexpansion.Transposer.removeExtractRecipe(${recipe.input});`;
