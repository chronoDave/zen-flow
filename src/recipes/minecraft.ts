import {
  formatArgs,
  formatIngredient,
  formatList,
  formatRecipe
} from '../lib/format';
import {
  Ingredient,
  Recipe,
  RecipeShaped,
  RecipeShapeless
} from '../types';
import { isObject } from '../lib/assert';

type RecipeFurnace = {
  in: string,
  out: Ingredient
  xp?: number
};

/**
 * Add crafting recipe
 *
 * - Recipe: `{}` => Shaped recipe
 * - Recipe: `[]` => Shapeless recipe
 */
export const add = (item: Ingredient, recipe: Recipe) => {
  const type = Array.isArray(recipe) ? 'Shapeless' : 'Shaped';
  const out = formatArgs(
    formatIngredient(item),
    Array.isArray(recipe) ?
      formatList(recipe) :
      formatRecipe(recipe)
  );

  return `recipes.add${type}(${out});`;
};

/**
 * Add shaped crafing recipe with mirror
 */
export const addMirror = (item: Ingredient, recipe: RecipeShaped) => {
  const out = formatArgs(
    formatIngredient(item),
    formatRecipe(recipe)
  );

  return `recipes.addShapedMirrored(${out});`;
};

/**
 * Remove all crafting recipes (shaped & shapeless)
 */
export const remove = (id: string) =>
  `recipes.remove(${id});`;

/**
* Remove all shaped crafting recipes
*/
export const removeShaped = (id: string, recipe?: RecipeShaped) =>
  `recipes.removeShaped(${id}${recipe ? `, ${formatRecipe(recipe)}` : ''});`;

/**
* Remove all shapeless crafting recipes
*/
export const removeShapeless = (id: string, recipe?: RecipeShapeless) =>
  `recipes.removeShapeless(${id}${recipe ? `, ${formatList(recipe)}` : ''});`;

/**
 * Adds furnace recipe
 *
 * - Coal: `0.1xp`
 * - Blocks: `0.1xp`
 * - Food: `0.35xp`
 * - Iron Ingot: `0.7xp`
 * - Gold Ingot: `1xp`
 * - Gems: `1xp`
 */
export const addFurnace = (recipe: RecipeFurnace) => {
  const out = formatArgs(
    formatIngredient(recipe.out),
    recipe.in,
    recipe.xp
  );

  return `furnace.addRecipe(${out});`;
};

/**
 * Remove furnace recipe
 *
 * - Recipe: `string` => Remove all recipes that create this ingredient
 * - Recipe `{}` => Remove this specific recipe
 */
export const removeFurnace = (recipe: string | { in: string, out: string }) => {
  if (typeof recipe === 'string') return `furnace.remove(<*>, ${recipe});`;
  return `furnace.remove(${formatArgs(recipe.out, recipe.in)});`;
};

/**
 * Add furnace fuel
 *
 *  - Coal: `1600`
 *  - Planks: `300`
 *  - Stick: `100`
 */
export const addFurnaceFuel = (id: string, n: number) =>
  `furnace.setFuel(${formatArgs(id, n)});`;

export const removeFurnaceFuel = (id: string) =>
  addFurnaceFuel(id, 0);

/**
 * Replace crafting recipe
 *
 * - Recipe: `{}` => Replaces all shaped recipes
 * - Recipe: `[]` => Replaces all shapeless recipes
 */
export const replace = (ingredient: Ingredient, recipe: Recipe) => {
  const id = isObject(ingredient) ?
    ingredient.id :
    ingredient;

  return [
    Array.isArray(recipe) ?
      removeShapeless(id) :
      removeShaped(id),
    add(ingredient, recipe)
  ].join('\n');
};

/**
 * Replace all crafting recipe
 */
export const replaceAll = (ingredient: Ingredient, recipe: Recipe) => [
  remove(isObject(ingredient) ? ingredient.id : ingredient),
  add(ingredient, recipe)
].join('\n');

export const replaceMany = (ingredient: Ingredient, recipes: Recipe[]) => [
  remove(isObject(ingredient) ? ingredient.id : ingredient),
  ...recipes.map(recipe => add(ingredient, recipe))
].join('\n');
