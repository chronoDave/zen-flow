import { formatArgs } from '../format';
import { Item, Recipe } from '../types';

type RecipeFurnace = {
  in: string,
  out: Item
};

export const add = (item: Item, recipe: Recipe) => {
  const type = Array.isArray(recipe) ? 'Shapeless' : 'Shaped';

  return `recipes.add${type}(${formatArgs(item, recipe)});`;
};

export const remove = (ingredient: string) =>
  `recipes.remove(${ingredient});`;

export const removeShaped = (ingredient: string) =>
  `recipes.removeShaped(${ingredient});`;

export const removeShapeless = (ingredient: string) =>
  `recipes.removeShapeless(${ingredient});`;

export const addFurnace = (recipe: RecipeFurnace) =>
  `furnace.addRecipe(${formatArgs(recipe.out, recipe.in)});`;

export const removeFurnace = (ingredient: string) =>
  `furnace.remove(<*>, ${ingredient});`;

export const removeFurnaceAll = (ingredient: string) =>
  `furnace.remove(${ingredient});`;

export const replace = (item: Item, recipe: Recipe) => {
  const ingredient = Array.isArray(item) ? item[0] : item;

  return [
    Array.isArray(recipe) ? removeShapeless(ingredient) : removeShaped(ingredient),
    add(item, recipe)
  ].join('\n');
};

export const replaceAll = (item: Item, recipe: Recipe) => [
  remove(Array.isArray(item) ? item[0] : item),
  add(item, recipe)
].join('\n');

export const replaceMany = (item: Item, recipes: Recipe[]) => [
  remove(Array.isArray(item) ? item[0] : item),
  ...recipes.map(recipe => add(item, recipe))
].join('\n');
