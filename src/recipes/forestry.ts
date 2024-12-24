import {
  formatArgs,
  formatBonus,
  formatIngredient,
  formatRecipeShaped,
  formatStack
} from '../lib/format';
import type { Stack, Ingredient, RecipeShaped, Bonus } from '../types';

export type RecipeCarpenter = {
  recipe: RecipeShaped;
  ticks: number;
  top?: string;
  liquid?: Stack;
};

/**
 * Add [Carpenter](https://feed-the-beast.fandom.com/wiki/Carpenter) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addCarpenter = (id: Ingredient, recipe: RecipeCarpenter) => {
  const out = formatArgs(
    formatIngredient(id),
    formatRecipeShaped(recipe.recipe),
    recipe.liquid && formatStack(recipe.liquid),
    Math.max(1, Math.round(recipe.ticks)),
    recipe.top
  );

  return `mods.forestry.Carpenter.addRecipe(${out});`;
};

/**
 * Remove [Carpenter](https://feed-the-beast.fandom.com/wiki/Carpenter) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const removeCarpenter = (id: string, liquid?: string) =>
  `mods.forestry.Carpenter.removeRecipe(${formatArgs(id, liquid)});`;

export type RecipeCentrifuge = {
  out: Record<string, number>;
  ticks: number;
};

/**
 * Add [Centrifuge](https://feed-the-beast.fandom.com/wiki/Centrifuge) recipe
 * 
 * `out` in `float`, .e.g `0.8` is 80% chance
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addCentrifuge = (id: string, recipe: RecipeCentrifuge) => {
  const out = formatArgs(
    Object.entries(recipe.out).map(([id, chance]) => formatBonus({ id, chance })),
    id,
    recipe.ticks
  );

  return `mods.forestry.Centrifuge.addRecipe(${out});`;
};

/**
 * Remove [Centrifuge](https://feed-the-beast.fandom.com/wiki/Centrifuge) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const removeCentrifuge = (id: string) =>
  `mods.forestry.Centrifuge.removeRecipe(${id});`;

export type RecipeFermenter = {
  liquid: Stack;
  catalyst: string;
};

/**
 * Add [Fermenter](https://feed-the-beast.fandom.com/wiki/Fermenter) recipe
 * 
 * Recipe.liquid + recipe.catalyst => Liquid
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addFermenter = (liquid: Stack, recipe: RecipeFermenter) => {
  const out = formatArgs(
    liquid.id,
    recipe.catalyst,
    recipe.liquid.id,
    recipe.liquid.n,
    liquid.n / recipe.liquid.n
  );

  return `mods.forestry.Fermenter.addRecipe(${out});`;
};

/**
 * Remove [Fermenter](https://feed-the-beast.fandom.com/wiki/Fermenter) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const removeFermenter = (id: string) =>
  `mods.forestry.Fermenter.removeRecipe(${id});`;

export type RecipeFermenterFuel = {
  cycles: number;
  burn: number;
};

/**
 * Add [Fermenter](https://feed-the-beast.fandom.com/wiki/Fermenter) fuel recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addFermenterFuel = (id: string, recipe: RecipeFermenterFuel) => {
  const out = formatArgs(
    id,
    recipe.cycles,
    recipe.burn
  );

  return `mods.forestry.Fermenter.addFuel(${out});`;
};

/**
 * Remove [Fermenter](https://feed-the-beast.fandom.com/wiki/Fermenter) fuel recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const removeFermenterFuel = (id: string) =>
  `mods.forestry.Fermenter.removeFuel(${id});`;

export type RecipeMoistener = {
  in: string;
  ticks: number;
};

/**
 * Add [Moistener](https://feed-the-beast.fandom.com/wiki/Moistener) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addMoistener = (id: string, recipe: RecipeMoistener) => {
  const out = formatArgs(
    id,
    recipe.in,
    recipe.ticks
  );

  return `mods.forestry.Moistener.addRecipe(${out});`;
};

/**
 * Remove [Moistener](https://feed-the-beast.fandom.com/wiki/Moistener) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const removeMoistener = (id: string) =>
  `mods.forestry.Moistener.removeRecipe(${id});`;

export type RecipeSqueezer = {
  in: Ingredient[];
  ticks: number;
  bonus: Bonus;
};

/**
 * Add [Squeezer](https://ftb.fandom.com/wiki/Squeezer_(Forestry)) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addSqueezer = (liquid: Stack, recipe: RecipeSqueezer) => {
  const out = formatArgs(
    formatStack(liquid),
    formatBonus(recipe.bonus),
    recipe.in.map(formatIngredient),
    recipe.ticks
  );

  return `mods.forestry.Squeezer.addRecipe(${out});`;
};

/**
 * Remove [Squeezer](https://ftb.fandom.com/wiki/Squeezer_(Forestry)) recipe
 * 
 * - Recipe: `undefined` => Remove all recipes
 * - Recipe: `string[]` => Remove specific recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const removeSqueezer = (id: string, recipe?: string[]) =>
  `mods.forestry.Squeezer.removeRecipe(${formatArgs(id, recipe)});`;

export type RecipeStill = {
  liquid: Stack;
  ticks: number;
};

/**
 * Add [Still](https://ftb.fandom.com/wiki/Still) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addStill = (liquid: Stack, recipe: RecipeStill) => {
  const out = formatArgs(
    formatStack(liquid),
    formatStack(recipe.liquid),
    recipe.ticks
  );

  return `mods.forestry.Still.addRecipe(${out});`;
};

/**
 * Remove [Still](https://ftb.fandom.com/wiki/Still) recipe
 * 
 * - Recipe: `undefined` => Remove all recipes
 * - Recipe: `string[]` => Remove specific recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const removeStill = (liquid: string, recipe?: string) =>
  `mods.forestry.Still.removeRecipe(${formatArgs(liquid, recipe)});`;

export type RecipeFabricator = {
  recipe: RecipeShaped;
  n: number;
  cast?: string;
};

/**
 * Add [Thermionic Fabricator](https://feed-the-beast.fandom.com/wiki/Thermionic_Fabricator) recipe
 * 
 * `n` is the amount of liquid glass in mb
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addFabricator = (id: string, recipe: RecipeFabricator) => {
  const out = formatArgs(
    id,
    formatRecipeShaped(recipe.recipe),
    recipe.n,
    recipe.cast
  );

  return `mods.forestry.ThermionicFabricator.addCast(${out});`;
};

/**
 * Remove [Thermionic Fabricator](https://feed-the-beast.fandom.com/wiki/Thermionic_Fabricator) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const removeFabricator = (id: string) =>
  `mods.forestry.ThermionicFabricator.removeCast(${id});`;

export type RecipeFabricatorGlass = {
  n: number;
  temp: number;
};

/**
 * Add [Thermionic Fabricator](https://feed-the-beast.fandom.com/wiki/Thermionic_Fabricator) glass recipe
 * 
 * Common values:
 * - Glass = 1000mB, 1000C
 * - Sand = 1000mB, 3000C
 * - Glass Pane = 375mB, 1000C
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addFabricatorGlass = (id: string, recipe: RecipeFabricatorGlass) => {
  const out = formatArgs(
    recipe.n,
    id,
    recipe.temp
  );

  return `mods.forestry.ThermionicFabricator.addSmelting(${out});`;
};

/**
 * Remove [Thermionic Fabricator](https://feed-the-beast.fandom.com/wiki/Thermionic_Fabricator) glass recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const removeFabricatorGlass = (id: string) =>
  `mods.forestry.ThermionicFabricator.removeSmelting(${id});`;
