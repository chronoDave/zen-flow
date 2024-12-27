import type { Ingredient, Bonus } from '../types';

import { formatArgs, formatIngredient, formatLiteral } from '../lib/format';
import { capitalize } from '../lib/string';
import { clamp } from '../lib/math';

export type RecipeGrinder = {
  input: string;
  turns: number;
  bonus?: {
    primary: Bonus;
    secondary?: Bonus;
  };
};

/**
 * Add [Quartz Grindstone](https://appliedenergistics.org/ae2-site-archive/Quartz-Grindstone/) recipe
 * 
 * Common values:
 *  - Ingot: `2 turns`
 *  - Ore: `4 turns`
 *
 * Bonus `n` must be between 0 and 1
 * 
 * Turns must be larger than 0
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Applied_Energistics_2_Support
 */
export const addGrinder = (id: Ingredient, recipe: RecipeGrinder) => {
  const formatBonus = (bonus: Bonus) => `${bonus.id}, ${clamp(0, 1, bonus.chance)}`;

  const out = formatArgs(
    formatIngredient(recipe.input),
    formatIngredient(id),
    Math.max(1, recipe.turns),
    recipe.bonus && formatBonus(recipe.bonus.primary),
    recipe.bonus?.secondary && formatBonus(recipe.bonus.secondary)
  );

  return `mods.appeng.Grinder.addRecipe(${out});`;
};

/**
 * Removes [Quartz Grindstone](https://appliedenergistics.org/ae2-site-archive/Quartz-Grindstone/) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Applied_Energistics_2_Support
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
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Applied_Energistics_2_Support
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
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Applied_Energistics_2_Support
 */
export const removeInscriber = (id: string) =>
  `mods.appeng.Inscriber.removeRecipe(${id});`;
