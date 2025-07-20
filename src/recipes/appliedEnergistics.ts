import type { Ingredient, Bonus } from '../lib/format.ts';

import * as format from '../lib/format.ts';
import { capitalise } from '../lib/string.ts';
import { clamp } from '../lib/math.ts';

export type RecipeGrinder = {
  input: string;
  output: Ingredient;
  bonus?: [Bonus, Bonus];
  /** Integer larger than or equal to 1 */
  turns: number;
};

/**
 * Add [Quartz Grindstone](https://appliedenergistics.org/ae2-site-archive/Quartz-Grindstone/) recipe
 * 
 * Common values:
 *  - Ingot: `2 turns`
 *  - Ore: `4 turns`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Applied_Energistics_2_Support
 */
export const addGrinder = (recipe: RecipeGrinder) => {
  const out = format.recipe(
    format.ingredient(recipe.input),
    format.ingredient(recipe.output),
    Math.max(1, Math.round(recipe.turns)),
    ...recipe.bonus?.map(bonus => `${bonus.id}, ${clamp(0, 1, bonus.p)}`) ?? []
  );

  return `mods.appeng.Grinder.addRecipe(${out});`;
};

/**
 * Removes [Quartz Grindstone](https://appliedenergistics.org/ae2-site-archive/Quartz-Grindstone/) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Applied_Energistics_2_Support
 */
export const removeGrinder = (input: string) =>
  `mods.appeng.Grinder.removeRecipe(${input});`;

export type RecipeInscriber = {
  input: {
    top: string;
    center: string;
    bottom?: string;
  };
  output: Ingredient;
  type: 'inscribe' | 'press';
};

/**
 * Add [Inscriber](https://appliedenergistics.org/ae2-site-archive/Inscriber/index.html) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Applied_Energistics_2_Support
 */
export const addInscriber = (recipe: RecipeInscriber) => {
  const out = format.recipe(
    [recipe.input.center],
    recipe.input.top,
    recipe.input.bottom ?? null,
    format.ingredient(recipe.output),
    format.literal(capitalise(recipe.type))
  );

  return `mods.appeng.Inscriber.addRecipe(${out});`;
};

/**
 * Remove [Inscriber](https://appliedenergistics.org/ae2-site-archive/Inscriber/index.html) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Applied_Energistics_2_Support
 */
export const removeInscriber = (output: string) =>
  `mods.appeng.Inscriber.removeRecipe(${output});`;
