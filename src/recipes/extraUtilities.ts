import { formatArgs } from '../format';
import { Item, RecipeShaped } from '../types';

export const addQED = (item: Item, recipe: RecipeShaped) =>
  `mods.extraUtils.QED.addShapedRecipe(${formatArgs(item, recipe)});`;

export const removeQED = (ingredient: string) =>
  `mods.extraUtils.QED.removeRecipe(${ingredient});`;

export const replaceQED = (item: Item, recipe: RecipeShaped) => [
  removeQED(Array.isArray(item) ? item[0] : item),
  addQED(item, recipe)
].join('\n');
