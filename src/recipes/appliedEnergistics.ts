import type { Ingredient, Stack } from '../types';
import { formatArgs, formatIngredient, formatLiteral } from '../lib/format';
import { capitalize } from '../lib/string';

export type RecipeGrinder = {
  in: string;
  turns: number;
  bonus?: {
    primary: Stack;
    secondary?: Stack;
  };
};

/**
 * Add [Quartz Grindstone](https://appliedenergistics.org/ae2-site-archive/Quartz-Grindstone/) recipe
 * 
 * Common values:
 *  - Ingot: `2 turns`
 *  - Ore: `4 turns`
 *
 * Bonus `n` must be between `0` and `1`
 */
export const addGrinder = (id: Ingredient, recipe: RecipeGrinder) => {
  if (
    typeof recipe.bonus?.primary.n === 'number' &&
    (recipe.bonus.primary.n < 0 || recipe.bonus.primary.n > 1)
  ) throw new Error('Primary bonus must be between 0 and 1');
  if (
    typeof recipe.bonus?.secondary?.n === 'number' &&
    (recipe.bonus.secondary.n < 0 || recipe.bonus.secondary.n > 1)
  ) throw new Error('Secondary bonus must be between 0 and 1');
  if (recipe.turns < 0) throw new Error('Turns must be larger or equal to 0');

  const formatBonus = (stack: Stack) => `${stack.id}, ${stack.n}`;

  const out = formatArgs(
    formatIngredient(recipe.in),
    formatIngredient(id),
    recipe.turns,
    recipe.bonus && formatBonus(recipe.bonus.primary),
    recipe.bonus?.secondary && formatBonus(recipe.bonus.secondary)
  );

  return `mods.appeng.Grinder.addRecipe(${out});`;
};

/**
 * Removes [Quartz Grindstone](https://appliedenergistics.org/ae2-site-archive/Quartz-Grindstone/) recipe
 */
export const removeGrinder = (id: string) =>
  `mods.appeng.Grinder.removeRecipe(${id});`;

export type RecipeInscriber = {
  top: string;
  center: string;
  bottom?: string;
  type: 'inscribe' | 'press';
};

/**
 * Add [Inscriber](https://appliedenergistics.org/ae2-site-archive/Inscriber/index.html) recipe
 */
export const addInscriber = (id: Ingredient, recipe: RecipeInscriber) => {
  const out = formatArgs(
    [recipe.center],
    recipe.top,
    recipe.bottom ?? null,
    formatIngredient(id),
    formatLiteral(capitalize(recipe.type))
  );

  return `mods.appeng.Inscriber.addRecipe(${out});`;
};

/**
 * Remove [Inscriber](https://appliedenergistics.org/ae2-site-archive/Inscriber/index.html) recipe
 */
export const removeInscriber = (id: string) =>
  `mods.appeng.Inscriber.removeRecipe(${id});`;
