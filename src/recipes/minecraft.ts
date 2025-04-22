import type {
  Ingredient,
  Recipe,
  Shaped,
  Shapeless
} from '../lib/format.ts';

import * as format from '../lib/format.ts';

/**
 * Add shaped crafting recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const addShaped = (item: Ingredient, recipe: Shaped) => {
  const out = format.recipe(
    format.ingredient(item),
    format.shaped(recipe)
  );

  return `recipes.addShaped(${out});`;
};

/**
* Remove shaped crafting recipe
* 
* @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
*/
export const removeShaped = (id: string, recipe?: Shaped) => {
  const out = format.recipe(
    id,
    recipe && format.shaped(recipe)
  );

  return `recipes.removeShaped(${out});`;
};

/**
 * Add shapeless crafting recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const addShapeless = (item: Ingredient, recipe: Shapeless) => {
  const out = format.recipe(
    format.ingredient(item),
    format.array(3)(recipe)
  );

  return `recipes.addShapeless(${out});`;
};

/**
* Remove shapeless crafting recipe
* 
* @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
*/
export const removeShapeless = (id: string, recipe?: Shapeless) => {
  const out = format.recipe(
    id,
    recipe && format.array(3)(recipe)
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
export const addMirror = (item: Ingredient, recipe: Shaped) => {
  const out = format.recipe(
    format.ingredient(item),
    format.shaped(recipe)
  );

  return `recipes.addShapedMirrored(${out});`;
};

export type RecipeFurnace = {
  input: string;
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
  `furnace.addRecipe(${format.recipe(id, recipe.input, recipe.xp)});`;

/**
 * Remove furnace recipe
 *
 * - Recipe: `string` => Remove all recipes that create this ingredient
 * - Recipe `{}` => Remove this specific recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Furnace
 */
export const removeFurnace = (id: string, recipe?: string) => {
  if (typeof recipe === 'string') return `furnace.remove(${format.recipe(id, recipe)});`;
  return `furnace.remove(${format.recipe(id)});`;
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
  `furnace.setFuel(${format.recipe(id, n)});`;

/**
 * Remove furnace fuel, with the exception of vanilla fuels
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Furnace
 */
export const removeFurnaceFuel = (id: string) =>
  addFurnaceFuel(id, 0);
