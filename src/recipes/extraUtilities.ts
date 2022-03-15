import { formatArgs } from '../format';
import { Item, RecipeShaped } from '../types';

export const addQED = (item: Item, recipe: RecipeShaped) =>
  `mods.extraUtils.QED.addShapedRecipe(${formatArgs(item, recipe)});`;

export const removeQED = (ingredient: string) =>
  `mods.extraUtils.QED.removeRecipe(${ingredient});`;
