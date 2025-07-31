import type { Ingredient, Shaped, Shapeless } from '../lib/format.ts';

import { maybe } from '../lib/fn.ts';
import * as format from '../lib/format.ts';

export type RecipeShaped = {
  input: Shaped;
  output: Ingredient;
};

/**
 * Add shaped crafting recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const addShaped = (recipe: RecipeShaped) => {
  const out = format.recipe(
    format.ingredient(recipe.output),
    format.shaped(recipe.input)
  );

  return `recipes.addShaped(${out});`;
};

/**
* Remove shaped crafting recipe
* 
* @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
*/
export const removeShaped = (output: string, input?: Shaped) => {
  const out = format.recipe(
    output,
    maybe(format.shaped)(input)
  );

  return `recipes.removeShaped(${out});`;
};

export type RecipeShapeless = {
  input: Shapeless;
  output: Ingredient;
};

/**
 * Add shapeless crafting recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const addShapeless = (recipe: RecipeShapeless) => {
  const out = format.recipe(
    format.ingredient(recipe.output),
    format.array(3)(recipe.input)
  );

  return `recipes.addShapeless(${out});`;
};

/**
* Remove shapeless crafting recipe
* 
* @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
*/
export const removeShapeless = (output: string, input?: Shapeless) => {
  const out = format.recipe(
    output,
    maybe(format.array(3))(input)
  );

  return `recipes.removeShapeless(${out});`;
};

export type RecipeAdd = {
  input: Shaped | Shapeless;
  output: Ingredient;
};

/**
 * Add crafting recipe
 *
 * - Recipe: `{}` => Shaped recipe
 * - Recipe: `[]` => Shapeless recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const add = (recipe: RecipeAdd) => {
  if (Array.isArray(recipe.input)) return addShapeless(recipe as RecipeShapeless);
  return addShaped(recipe as RecipeShaped);
};

/**
 * Remove all crafting recipes (shaped & shapeless)
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const remove = (output: string) =>
  `recipes.remove(${output});`;

export type RecipeMirror = {
  input: Shaped;
  output: Ingredient;
};

/**
 * Add shaped crafing recipe with mirror
 * 
 * @see @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const addMirror = (recipe: RecipeMirror) => {
  const out = format.recipe(
    format.ingredient(recipe.output),
    format.shaped(recipe.input)
  );

  return `recipes.addShapedMirrored(${out});`;
};

export type RecipeFurnace = {
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
export const addFurnace = (recipe: RecipeFurnace) =>
  `furnace.addRecipe(${format.recipe(recipe.output, recipe.input, recipe.xp)});`;

/**
 * Remove furnace recipe
 *
 * - Recipe: `string` => Remove all recipes that create this ingredient
 * - Recipe `{}` => Remove this specific recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Furnace
 */
export const removeFurnace = (output: string, input?: string) => {
  if (typeof input === 'string') return `furnace.remove(${format.recipe(output, input)});`;
  return `furnace.remove(${format.recipe(output)});`;
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
export const addFurnaceFuel = (fuel: string) =>
  (n: number) =>
    `furnace.setFuel(${format.recipe(fuel, n)});`;

/**
 * Remove furnace fuel, with the exception of vanilla fuels
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Furnace
 */
export const removeFurnaceFuel = (fuel: string) =>
  addFurnaceFuel(fuel)(0);
