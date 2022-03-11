import { formatArgs } from '../format';
import { Item, Recipe } from '../types';

export const addQED = (item: Item, recipe: Recipe) =>
  `mods.extraUtils.QED.addShapedRecipe(${formatArgs(item, recipe)});`;

export const removeQED = (ingredient: string) =>
  `mods.extraUtils.QED.removeRecipe(${ingredient});`;
