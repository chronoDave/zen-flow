import { formatArgs, formatIngredient, formatStack } from '../lib/format';
import { Ingredient, Stack } from '../types';

export type RecipeCrucible = {
  rf: number
  in: string
  liquid: Stack
};

export type RecipeFurnace = {
  rf: number
  in: string
  out: Ingredient
};

export type RecipeInsolator = {
  rf: number
  left: Ingredient
  right: Ingredient
  out: Ingredient
  bonus?: Stack
};

export type RecipePulverizer = {
  rf: number
  in: string
  out: Ingredient
  bonus?: Stack
};

export type RecipeSawmill = {
  rf: number
  in: string
  out: Ingredient
  bonus?: Stack
};

export type RecipeSmelter = {
  rf: number
  left: Ingredient
  right: Ingredient
  out: Ingredient
  bonus?: Stack
};

export type RecipeTransposerFill = {
  rf: number
  in: Ingredient,
  out: Ingredient
  liquid: Stack
};

export type RecipeTransposerExtract = {
  rf: number
  in: string,
  liquid: Stack
  bonus: Stack
};

/**
 * Common values:
 *  - Dust: `8000RF, 100mB ~ 250mB`
 *  - Items: `20.000RF, 250mB`
 *  - Rocks: `80.000RF ~ 320.000RF, 1000mB`
 */
export const addCrucible = (recipe: RecipeCrucible) => {
  const out = formatArgs(
    recipe.rf,
    recipe.in,
    formatStack(recipe.liquid)
  );

  return `mods.thermalexpansion.Crucible.addRecipe(${out});`;
};

export const removeCrucible = (id: string) =>
  `mods.thermalexpansion.Crucible.removeRecipe(${id});`;

/**
 * Common values:
 *  - Food: `800RF`
 *  - Dust: `1000RF`
 *  - Blocks: `1600RF`
 */
export const addFurnace = (recipe: RecipeFurnace) => {
  const out = formatArgs(
    recipe.rf,
    recipe.in,
    formatIngredient(recipe.out)
  );

  return `mods.thermalexpansion.Furnace.addRecipe(${out});`;
};

export const removeFurnace = (id: string) =>
  `mods.thermalexpansion.Furnace.removeRecipe(${id});`;

/**
 * Common values:
 *  - Phyto-gro: `7200RF`
 *  - Rich phyto-gro: `9600RF`
 */
export const addInsolator = (recipe: RecipeInsolator) => {
  const out = formatArgs(
    recipe.rf,
    formatIngredient(recipe.left),
    formatIngredient(recipe.right),
    formatIngredient(recipe.out),
    recipe.bonus && recipe.bonus.id,
    recipe.bonus && recipe.bonus.n
  );

  return `mods.thermalexpansion.Insolator.addRecipe(${out});`;
};

export const removeInsolator = (left: Ingredient, right: Ingredient) => {
  const out = formatArgs(
    formatIngredient(left),
    formatIngredient(right)
  );

  return `mods.thermalexpansion.Insolator.removeRecipe(${out});`;
};

/**
 * Common values:
 *  - Plants: `1600RF`
 *  - Items: `1600RF`
 *  - Wool: `1600RF`
 *  - Ingots: `2400RF`
 *  - Ores: `3200RF`
 */
export const addPulverizer = (recipe: RecipePulverizer) => {
  const out = formatArgs(
    recipe.rf,
    recipe.in,
    formatIngredient(recipe.out),
    recipe.bonus && recipe.bonus.id,
    recipe.bonus && recipe.bonus.n
  );

  return `mods.thermalexpansion.Pulverizer.addRecipe(${out});`;
};

export const removePulverizer = (id: string) =>
  `mods.thermalexpansion.Pulverizer.removeRecipe(${id});`;

/**
 * Common values:
 *  - Log: `800RF`
 *  - Tools: `1600RF`
 */
export const addSawmill = (recipe: RecipeSawmill) => {
  const out = formatArgs(
    recipe.rf,
    recipe.in,
    formatIngredient(recipe.out),
    recipe.bonus && recipe.bonus.id,
    recipe.bonus && recipe.bonus.n
  );

  return `mods.thermalexpansion.Sawmill.addRecipe(${out});`;
};

export const removeSawmill = (id: string) =>
  `mods.thermalexpansion.Sawmill.removeRecipe(${id});`;

/**
* Common values (RF):
*  - Dust: `200RF ~ 1600RF`
*  - Ores: `1600RF ~ 3200RF`
*  - Alloys: `2400RF`
*  - Infused Dust: `4000RF ~ 8000RF`
*  - Tools: `5000RF ~ 7400RF`
*  - Slag: `7200RF`
*/
export const addSmelter = (recipe: RecipeSmelter) => {
  const out = formatArgs(
    recipe.rf,
    formatIngredient(recipe.right),
    formatIngredient(recipe.left),
    formatIngredient(recipe.out),
    recipe.bonus && recipe.bonus.id,
    recipe.bonus && recipe.bonus.n
  );

  return `mods.thermalexpansion.Smelter.addRecipe(${out});`;
};

export const removeSmelter = (left: Ingredient, right: Ingredient) => {
  const out = formatArgs(
    formatIngredient(left),
    formatIngredient(right)
  );

  return `mods.thermalexpansion.Smelter.removeRecipe(${out});`;
};

/**
* Common values
*  - Duct: `800RF, 200mB`
*  - Bucket: `800RF, 1000mB`
*  - Florb: `1600RF, 1000mB`
*  - Plate: `2000RF, 1000mB`
*  - Infusion: `4000RF ~ 8000RF, 200mB`
*  - Frame: `16.000RF, 4000mB`
*/
export const addTransposerFill = (recipe: RecipeTransposerFill) => {
  const out = formatArgs(
    recipe.rf,
    formatIngredient(recipe.in),
    formatIngredient(recipe.out),
    formatStack(recipe.liquid)
  );

  return `mods.thermalexpansion.Transposer.addFillRecipe(${out});`;
};

export const removeTransposerFill = (id: string, liquid: string) =>
  `mods.thermalexpansion.Transposer.removeFillRecipe(${formatArgs(id, liquid)});`;

/**
* Common values
*  - Bucket: `800RF, 1000mB`
*  - Bottle: `1600RF, 1000mB`
*/
export const addTransposerExtract = (recipe: RecipeTransposerExtract) => {
  const out = formatArgs(
    recipe.rf,
    recipe.in,
    formatStack(recipe.liquid),
    recipe.bonus.id,
    recipe.bonus.n,
  );

  return `mods.thermalexpansion.Transposer.addExtractRecipe(${out});`;
};

export const removeTransposerExtract = (id: string) =>
  `mods.thermalexpansion.Transposer.removeExtractRecipe(${id});`;
