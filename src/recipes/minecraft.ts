import type {
  Ingredient,
  Recipe,
  RecipeShaped,
  RecipeShapeless
} from '../types';

import {
  formatArgs,
  formatIngredient,
  formatArray,
  formatRecipeShaped
} from '../lib/format';

/**
 * Add shaped crafting recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const addShaped = (item: Ingredient, recipe: RecipeShaped) => {
  const out = formatArgs(
    formatIngredient(item),
    formatRecipeShaped(recipe)
  );

  return `recipes.addShaped(${out});`;
};

/**
* Remove shaped crafting recipe
* 
* @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
*/
export const removeShaped = (id: string, recipe?: RecipeShaped) => {
  const out = formatArgs(
    id,
    recipe && formatRecipeShaped(recipe)
  );

  return `recipes.removeShaped(${out});`;
};

/**
 * Add shapeless crafting recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const addShapeless = (item: Ingredient, recipe: RecipeShapeless) => {
  const out = formatArgs(
    formatIngredient(item),
    formatArray(recipe, 3)
  );

  return `recipes.addShapeless(${out});`;
};

/**
* Remove shapeless crafting recipe
* 
* @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
*/
export const removeShapeless = (id: string, recipe?: RecipeShapeless) => {
  const out = formatArgs(
    id,
    recipe && formatArray(recipe, 3)
  );

  return `recipes.removeShapeless(${out});`;
};

/**
 * Add crafting recipe
 *
 * - Recipe: `{}` => Shaped recipe
 * - Recipe: `[]` => Shapeless recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const add = (item: Ingredient, recipe: Recipe) => {
  if (Array.isArray(recipe)) return addShapeless(item, recipe);
  return addShaped(item, recipe);
};

/**
 * Remove all crafting recipes (shaped & shapeless)
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const remove = (id: string) =>
  `recipes.remove(${id});`;

/**
 * Add shaped crafing recipe with mirror
 * 
 * @see @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const addMirror = (item: Ingredient, recipe: RecipeShaped) => {
  const out = formatArgs(
    formatIngredient(item),
    formatRecipeShaped(recipe)
  );

  return `recipes.addShapedMirrored(${out});`;
};

export type RecipeFurnace = {
  in: string;
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
export const addFurnace = (id: string, recipe: RecipeFurnace) =>
  `furnace.addRecipe(${formatArgs(id, recipe.in, recipe.xp)});`;

/**
 * Remove furnace recipe
 *
 * - Recipe: `string` => Remove all recipes that create this ingredient
 * - Recipe `{}` => Remove this specific recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Furnace
 */
export const removeFurnace = (id: string, recipe?: string) => {
  if (typeof recipe === 'string') return `furnace.remove(${formatArgs(id, recipe)});`;
  return `furnace.remove(${formatArgs(id)});`;
};

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
export const addFurnaceFuel = (id: string, n: number) =>
  `furnace.setFuel(${formatArgs(id, n)});`;

/**
 * Remove furnace fuel, with the exception of vanilla fuels
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Furnace
 */
export const removeFurnaceFuel = (id: string) =>
  addFurnaceFuel(id, 0);
