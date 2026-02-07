import type { Ingredient, Bonus } from '../lib/format.ts';

import * as format from '../lib/format.ts';
import { clamp } from '../lib/math.ts';

export type RecipeGrinder = {
  input: string;
  output: Ingredient;
  bonus?: [Bonus] | [Bonus, Bonus];
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
    ...(recipe.bonus ?? []).map(bonus => `${bonus.id}, ${clamp(0, 1, bonus.p)}`)
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

export type RecipePressInscriber = {
  input: {
    top: string;
    center: string;
    bottom?: string;
  };
  output: Ingredient;
};

const addPressInscriber = (type: 'Inscribe' | 'Press') =>
  (recipe: RecipePressInscriber) => {
    const out = format.recipe(
      [recipe.input.center],
      recipe.input.top,
      recipe.input.bottom ?? null,
      format.ingredient(recipe.output),
      format.literal(type)
    );

    return `mods.appeng.Inscriber.addRecipe(${out});`;
  };

/**
 * Add [Inscriber (inscribe)](https://appliedenergistics.org/ae2-site-archive/Inscriber/index.html) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Applied_Energistics_2_Support
 */
export const addInscriber = addPressInscriber('Inscribe');

/**
 * Add [Inscriber (press)](https://appliedenergistics.org/ae2-site-archive/Inscriber/index.html) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Applied_Energistics_2_Support
 */
export const addPress = addPressInscriber('Press');

/**
 * Remove [Inscriber](https://appliedenergistics.org/ae2-site-archive/Inscriber/index.html) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Applied_Energistics_2_Support
 */
export const removePressInscriber = (output: string) =>
  `mods.appeng.Inscriber.removeRecipe(${output});`;
