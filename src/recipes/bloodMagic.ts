import type {
  Ingredient,
  Shaped,
  Bonus,
  Shapeless
} from '../lib/format.ts';

import * as format from '../lib/format.ts';

export type RecipeAltar = {
  input: string;
  output: string;
  tier: number;
  lp: number;
  /** LP per tick */
  lpt?: number;
  /** Drain per tick (in LP) */
  dpt?: number;
};

/**
 * Add [Blood Altar](https://ftbwiki.org/Blood_Altar) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support
 */
export const addAltar = (recipe: RecipeAltar) => {
  const out = format.recipe(
    recipe.input,
    recipe.output,
    recipe.tier,
    recipe.lp,
    recipe.lpt,
    recipe.dpt
  );

  return `mods.bloodmagic.Altar.addRecipe(${out});`;
};

/**
 * Remove [Blood Altar](https://ftbwiki.org/Blood_Altar) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support
 */
export const removeAltar = (output: string) =>
  `mods.bloodmagic.Altar.removeRecipe(${output});`;

/**
 * Add shaped [Blood Orb](https://ftbwiki.org/Blood_Orb) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support
 */
export const addBloodOrbShaped = (output: Ingredient) =>
  (input: Shaped) => {
    const out = format.recipe(
      format.ingredient(output),
      format.shaped(input)
    );

    return `mods.bloodmagic.BloodOrb.addShaped(${out});`;
  };

/**
 * Add shapeless [Blood Orb](https://ftbwiki.org/Blood_Orb) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support
 */
export const addBloodOrbShapeless = (output: Ingredient) =>
  (input: Shapeless) => {
    const out = format.recipe(
      format.ingredient(output),
      format.array(3)(input)
    );

    return `mods.bloodmagic.BloodOrb.addShapeless(${out});`;
  };

/**
 * Add [Blood Orb](https://ftbwiki.org/Blood_Orb) recipe
 * 
 * - Input: `{}` => Shaped recipe
 * - Input: `[]` => Shapeless recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support
 */
export const addBloodOrb = (output: Ingredient) =>
  (input: Shaped | Shapeless) => {
    if (Array.isArray(input)) return addBloodOrbShapeless(output)(input);
    return addBloodOrbShaped(output)(input);
  };

export type RecipeAlchemy = {
  input: Shapeless;
  output: Ingredient;
  tier: number;
  lp: number;
};

/** 
 * Add [Alchemic Chemistry Set](https://ftbwiki.org/Alchemic_Chemistry_Set) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support
*/
export const addAlchemy = (recipe: RecipeAlchemy) => {
  const out = format.recipe(
    format.ingredient(recipe.output),
    format.array(3)(recipe.input),
    recipe.tier,
    recipe.lp
  );

  return `mods.bloodmagic.Alchemy.addRecipe(${out});`;
};

/** 
 * Remove [Alchemic Chemistry Set](https://ftbwiki.org/Alchemic_Chemistry_Set) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support
*/
export const removeAlchemy = (output: string) =>
  `mods.bloodmagic.Alchemy.removeRecipe(${output});`;

/**
 * Add [Ritual of Binding](https://ftbwiki.org/Ritual_of_Binding) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support:Rituals
 */
export const addRitualBinding = (output: string) =>
  (input: string) =>
    `mods.bloodmagic.Binding.addRecipe(${format.recipe(input, output)});`;

/**
 * Remove [Ritual of Binding](https://ftbwiki.org/Ritual_of_Binding) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support:Rituals
 */
export const removeRitualBinding = (output: string) =>
  `mods.bloodmagic.Binding.removeRecipe(${output});`;

export type RecipeMeteor = {
  input: string;
  /** OreDict entries */
  output: Bonus[];
  radius: number;
};

/**
 * Add [Mark of the Falling Tower](https://ftbwiki.org/Mark_of_the_Falling_Tower) recipe
 * 
 * For better support, consider using the provided meteor config JSON files
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support:Rituals
 */
export const addRitualMeteor = (recipe: RecipeMeteor) => {
  const out = format.recipe(
    recipe.input,
    recipe.radius,
    `"${recipe.output.map(bonus => `${bonus.id}, ${bonus.p * 100}`).join(', ')}"`
  );

  return `mods.bloodmagic.FallingTower.addFocus(${out});`;
};

/**
 * Remove [Mark of the Falling Tower](https://ftbwiki.org/Mark_of_the_Falling_Tower) recipe
 * 
 * For better support, consider using the provided meteor config JSON files
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support:Rituals
 */
export const removeRitualMeteor = (input: string) =>
  `mods.bloodmagic.FallingTower.removeFocus(${input});`;

/**
 * Add [Reap of the Harvest Moon](https://ftbwiki.org/Reap_of_the_Harvest_Moon) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:Blood_Magic_Support:Rituals
 */
export const addRitualHarvest = (output: string) =>
  (input: string) =>
    `mods.bloodmagic.HarvestMoon.addHarvestable(${format.recipe(output, input)});`;
