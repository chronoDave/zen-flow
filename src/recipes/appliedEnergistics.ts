import { Ingredient, Stack } from '../types';
import { formatArgs, formatIngredient } from '../format';
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

/**
 * Common values:
 *  - Ingot: `2 turns`
 *  - Ore: `4 turns`
 *
 * Bonus `n` must be between `0` and `1`
 */
export const addGrinder = (recipe: RecipeGrinder) => {
  const formatBonus = (stack: Stack) => `${stack.id}, ${stack.n}`;

  const out = formatArgs(
    formatIngredient(recipe.in),
    formatIngredient(recipe.out),
    recipe.turns,
    recipe.bonus && formatBonus(recipe.bonus.primary),
    recipe.bonus?.secondary && formatBonus(recipe.bonus.secondary)
  );

  return `mods.appeng.Grinder.addRecipe(${out});`;
};

export const removeGrinder = (id: string) =>
  `mods.appeng.Grinder.removeRecipe(${id});`;

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
