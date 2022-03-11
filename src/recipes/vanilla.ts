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
  `furnace.remove(${ingredient});`;
