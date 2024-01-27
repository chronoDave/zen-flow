import { Ingredient, Stack } from '../types';
import { formatArgs, formatIngredient, formatStack } from '../format';
import { capitalize } from '../utils';

export type RecipeGrinder = {
  in: Ingredient,
  out: Ingredient,
  turns: number,
  bonus?: {
    primary: Stack
    secondary?: Stack
  }
};

export type RecipeInscriber = {
  in: Ingredient
  plate: {
    top: string
    bottom?: string
  }
  out: Ingredient
  type: 'inscribe' | 'press'
};

export const addGrinder = (recipe: RecipeGrinder) => {
  const out = formatArgs(
    formatIngredient(recipe.in),
    formatIngredient(recipe.out),
    recipe.turns,
    recipe.bonus && formatStack(recipe.bonus.primary),
    recipe.bonus?.secondary && formatStack(recipe.bonus.secondary)
  );

  return `mods.appeng.Grinder.addRecipe(${out});`;
};

export const removeGrinder = (id: string) =>
  `mods.appeng.Grinder.removeRecipe(${id})`;

export const addInscriber = (recipe: RecipeInscriber) => {
  const out = formatArgs(
    [formatIngredient(recipe.in)],
    recipe.plate.top,
    recipe.plate.bottom,
    formatIngredient(recipe.out),
    capitalize(recipe.type)
  );

  return `mods.appeng.Inscriber.addRecipe(${out});`;
};

export const removeInscriber = (id: string) =>
  `mods.appeng.Inscriber.removeRecipe(${id});`;
