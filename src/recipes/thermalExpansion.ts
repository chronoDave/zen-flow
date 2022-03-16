import { formatArgs } from '../format';
import { Ingredients } from '../types';

export type RecipeCrucible = {
  rf: number
  in: string
  liquid: Ingredients
};

export type RecipeFurnace = {
  rf: number
  in: string
  out: Ingredients
};

export type RecipeInsolator = {
  rf: number
  left: Ingredients
  right: Ingredients
  out: Ingredients
  bonus?: Ingredients
};

export type RecipePulverizer = {
  rf: number
  in: string
  out: Ingredients
  bonus?: Ingredients
};

export type RecipeSawmill = {
  rf: number
  in: string
  out: Ingredients
  bonus?: Ingredients
};

export type RecipeSmelter = {
  rf: number
  left: Ingredients
  right: Ingredients
  out: Ingredients
  bonus?: Ingredients
};

export type RecipeTransposerFill = {
  rf: number
  in: string,
  out: string
  liquid: Ingredients
};

export type RecipeTransposerExtract = {
  rf: number
  in: string,
  liquid: Ingredients
  bonus?: Ingredients
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
    recipe.liquid
  );

  return `mods.thermalexpansion.Crucible.addRecipe(${out});`;
};

export const removeCrucible = (ingredient: string) =>
  `mods.thermalexpansion.Crucible.removeRecipe(${ingredient});`;

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
    recipe.out
  );

  return `mods.thermalexpansion.Furnace.addRecipe(${out});`;
};

export const removeFurnace = (ingredient: string) =>
  `mods.thermalexpansion.Furnace.removeRecipe(${ingredient});`;

/**
 * Common values:
 *  - Phyto-gro: `7200RF`
 *  - Rich phyto-gro: `9600RF`
 */
export const addInsolator = (recipe: RecipeInsolator) => {
  const out = formatArgs(
    recipe.rf,
    recipe.left,
    recipe.right,
    recipe.out,
    recipe.bonus
  );

  return `mods.thermalexpansion.Insolator.addRecipe(${out});`;
};

export const removeInsolator = (left: string, right: string) =>
  `mods.thermalexpansion.Insolator.removeRecipe(${formatArgs(left, right)});`;

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
    recipe.out,
    recipe.bonus
  );

  return `mods.thermalexpansion.Pulverizer.addRecipe(${out});`;
};

export const removePulverizer = (ingredient: string) =>
  `mods.thermalexpansion.Pulverizer.removeRecipe(${ingredient});`;

export const addSawmill = (recipe: RecipeSawmill) => {
  const out = formatArgs(
    recipe.rf,
    recipe.in,
    recipe.out,
    recipe.bonus
  );

  return `mods.thermalexpansion.Sawmill.addRecipe(${out});`;
};

export const removeSawmill = (ingredient: string) =>
  `mods.thermalexpansion.Sawmill.removeRecipe(${ingredient});`;

/**
* Common values (RF):
*  - Ores: `1600RF ~ 3200RF`
*  - Tools: `5000RF ~ 7400RF`
*  - Dust: `200RF ~ 1600RF`
*  - Infused Dust: `4000RF ~ 8000RF`
*  - Slag: `7200RF`
*/
export const addSmelter = (recipe: RecipeSmelter) => {
  const out = formatArgs(
    recipe.rf,
    recipe.right,
    recipe.left,
    recipe.out,
    recipe.bonus
  );

  return `mods.thermalexpansion.Smelter.addRecipe(${out});`;
};

export const removeSmelter = (left: string, right: string) =>
  `mods.thermalexpansion.Smelter.removeRecipe(${formatArgs(left, right)});`;

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
    recipe.in,
    recipe.out,
    recipe.liquid
  );

  return `mods.thermalexpansion.Transposer.addFillRecipe(${out});`;
};

export const removeTransposerFill = (ingredient: string, liquid: string) =>
  `mods.thermalexpansion.Transposer.removeFillRecipe(${formatArgs(ingredient, liquid)});`;

/**
* Common values
*  - Bucket: `800RF, 1000mB`
*  - Bottle: `1600RF, 1000mB`
*/
export const addTransposerExtract = (recipe: RecipeTransposerExtract) => {
  const out = formatArgs(
    recipe.rf,
    recipe.in,
    recipe.liquid,
    recipe.bonus
  );

  return `mods.thermalexpansion.Transposer.addExtractRecipe(${out});`;
};

export const removeTransposerExtract = (ingredient: string) =>
  `mods.thermalexpansion.Transposer.removeExtractRecipe(${ingredient});`;
