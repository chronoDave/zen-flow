import { formatArgs } from '../format';
import { Item, Recipe } from '../types';

type RecipeFurnace = {
  in: string,
  out: Item
};

/**
 * Add crafting recipe
 *
 * - Recipe: `{}` => Shaped recipe
 * - Recipe: `[]` => Shapeless recipe
 */
export const add = (item: Item, recipe: Recipe) => {
  const type = Array.isArray(recipe) ? 'Shapeless' : 'Shaped';

  return `recipes.add${type}(${formatArgs(item, recipe)});`;
};

/**
 * Remove all crafting recipes (shaped & shapeless)
 */
export const remove = (ingredient: string) =>
  `recipes.remove(${ingredient});`;

/**
* Remove all shaped crafting recipes
*/
export const removeShaped = (ingredient: string) =>
  `recipes.removeShaped(${ingredient});`;

/**
* Remove all shapeless crafting recipes
*/
export const removeShapeless = (ingredient: string) =>
  `recipes.removeShapeless(${ingredient});`;

export const addFurnace = (recipe: RecipeFurnace) =>
  `furnace.addRecipe(${formatArgs(recipe.out, recipe.in)});`;

/**
 * Remove furnace recipe
 *
 * - Recipe: `string` => Remove all recipes that create this ingredient
 * - Recipe `{}` => Remove this specific recipe
 */
export const removeFurnace = (recipe: string | { in: string, out: string }) => {
  if (typeof recipe === 'string') return `furnace.remove(<*>, ${recipe});`;
  return `furnace.remove(${formatArgs(recipe.out, recipe.in)})`;
};

/**
 * Replace crafting recipe
 *
 * - Recipe: `{}` => Replaces all shaped recipes
 * - Recipe: `[]` => Replaces all shapeless recipes
 */
export const replace = (item: Item, recipe: Recipe) => {
  const ingredient = Array.isArray(item) ? item[0] : item;

  return [
    Array.isArray(recipe) ? removeShapeless(ingredient) : removeShaped(ingredient),
    add(item, recipe)
  ].join('\n');
};

/**
 * Replace all crafting recipe
 */
export const replaceAll = (item: Item, recipe: Recipe) => [
  remove(Array.isArray(item) ? item[0] : item),
  add(item, recipe)
].join('\n');

export const replaceMany = (item: Item, recipes: Recipe[]) => [
  remove(Array.isArray(item) ? item[0] : item),
  ...recipes.map(recipe => add(item, recipe))
].join('\n');
