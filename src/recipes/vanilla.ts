import {
  formatArgs,
  formatIngredient,
  formatList,
  formatRecipe
} from '../format';
import { Ingredient, Recipe } from '../types';
import { isObject } from '../utils';

type RecipeFurnace = {
  in: string,
  out: Ingredient
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
 * Remove all crafting recipes (shaped & shapeless)
 */
export const remove = (id: string) =>
  `recipes.remove(${id});`;

/**
* Remove all shaped crafting recipes
*/
export const removeShaped = (id: string) =>
  `recipes.removeShaped(${id});`;

/**
* Remove all shapeless crafting recipes
*/
export const removeShapeless = (id: string) =>
  `recipes.removeShapeless(${id});`;

export const addFurnace = (recipe: RecipeFurnace) => {
  const out = formatArgs(
    formatIngredient(recipe.out),
    recipe.in
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
  return `furnace.remove(${formatArgs(recipe.out, recipe.in)})`;
};

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
