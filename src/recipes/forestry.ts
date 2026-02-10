import type {
  Ingredient,
  Shaped,
  Bonus,
  Liquid
} from '../lib/format.ts';

import { maybe } from '../lib/fn.ts';
import * as format from '../lib/format.ts';

export type RecipeCarpenter = {
  input: Shaped;
  output: Ingredient;
  ticks: number;
  top?: string;
  liquid?: Liquid;
};

/**
 * Add [Carpenter](https://feed-the-beast.fandom.com/wiki/Carpenter) recipe
 * 
 * Common values:
 *  - Beealyzer / Treealyzer => `100`
 *  - Hardened Casing => `75`
 *  - Scented Panelling / Impregnated Casing => `50`
 *  - Candle => `10`
 *  - Circuit boards => `20`, `40`, `80`
 * 
 * RF cost is equal to `204 * ticks`, assuming `1` energy modifier (Forestry config)
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addCarpenter = (recipe: RecipeCarpenter) => {
  const out = format.recipe(
    format.ingredient(recipe.output),
    format.shaped(recipe.input),
    maybe(format.liquid)(recipe.liquid),
    recipe.ticks,
    recipe.top
  );

  return `mods.forestry.Carpenter.addRecipe(${out});`;
};

/**
 * Remove [Carpenter](https://feed-the-beast.fandom.com/wiki/Carpenter) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const removeCarpenter = (output: string, liquid?: string) =>
  `mods.forestry.Carpenter.removeRecipe(${format.recipe(output, liquid)});`;

export type RecipeCentrifuge = {
  input: string;
  output: Bonus[];
  ticks: number;
};

/**
 * Add [Centrifuge](https://feed-the-beast.fandom.com/wiki/Centrifuge) recipe
 * 
 * Common values:
 *  - Combs => `20`
 *  - Propolis => `5`
 * 
 * RF cost is equal to `320 * ticks`, assuming `1` energy modifier (Forestry config)
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addCentrifuge = (recipe: RecipeCentrifuge) => {
  const out = format.recipe(
    recipe.output.map(format.bonus),
    recipe.input,
    recipe.ticks
  );

  return `mods.forestry.Centrifuge.addRecipe(${out});`;
};

/**
 * Remove [Centrifuge](https://feed-the-beast.fandom.com/wiki/Centrifuge) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const removeCentrifuge = (input: string) =>
  `mods.forestry.Centrifuge.removeRecipe(${input});`;

export type RecipeFermenter = {
  input: Liquid;
  output: Liquid;
  catalyst: string;
};

/**
 * Add [Fermenter](https://feed-the-beast.fandom.com/wiki/Fermenter) recipe
 * 
 * `Recipe.liquid + Recipe.catalyst => Liquid`
 * 
 * RF cost is equal to `420 * ticks`, assuming `1` energy modifier (Forestry config)
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addFermenter = (recipe: RecipeFermenter) => {
  const out = format.recipe(
    recipe.output.id,
    recipe.catalyst,
    recipe.input.id,
    recipe.input.mb,
    recipe.output.mb / recipe.input.mb
  );

  return `mods.forestry.Fermenter.addRecipe(${out});`;
};

/**
 * Remove [Fermenter](https://feed-the-beast.fandom.com/wiki/Fermenter) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const removeFermenter = (input: string) =>
  `mods.forestry.Fermenter.removeRecipe(${input});`;

export type RecipeFermenterFuel = {
  id: string;
  cycles: number;
  burn: number;
};

/**
 * Add [Fermenter](https://feed-the-beast.fandom.com/wiki/Fermenter) fuel recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addFermenterFuel = (recipe: RecipeFermenterFuel) => {
  const out = format.recipe(
    recipe.id,
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
export const removeFermenterFuel = (input: string) =>
  `mods.forestry.Fermenter.removeFuel(${input});`;

export type RecipeMoistener = {
  input: string;
  output: string;
  ticks: number;
};

/**
 * Add [Moistener](https://feed-the-beast.fandom.com/wiki/Moistener) recipe
 * 
 * Common values:
 *  - Mycelium => `5000`
 *  - Mossy Cobblestone => `20.000`
 *  - Mossy Stone Bricks => `20.000`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addMoistener = (recipe: RecipeMoistener) => {
  const out = format.recipe(
    recipe.output,
    recipe.input,
    recipe.ticks
  );

  return `mods.forestry.Moistener.addRecipe(${out});`;
};

/**
 * Remove [Moistener](https://feed-the-beast.fandom.com/wiki/Moistener) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const removeMoistener = (output: string) =>
  `mods.forestry.Moistener.removeRecipe(${output});`;

export type RecipeSqueezer = {
  input: Ingredient[];
  output: Liquid;
  ticks: number;
  bonus: Bonus;
};

/**
 * Add [Squeezer](https://ftb.fandom.com/wiki/Squeezer_(Forestry)) recipe
 * 
 * Common values:
 *  - Honeydrop => `10`
 *  - Phosphor => `10`
 *  - Fruits => `10`, `20`, `60`, `70`
 *  - Plants => `10`
 *  - Capsules => `10`
 * 
 * RF cost is equal to `200 * ticks`, assuming `1` energy modifier (Forestry config)
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addSqueezer = (recipe: RecipeSqueezer) => {
  const out = format.recipe(
    format.liquid(recipe.output),
    format.bonus(recipe.bonus),
    recipe.input.map(format.ingredient),
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
export const removeSqueezer = (output: string, input?: string[]) =>
  `mods.forestry.Squeezer.removeRecipe(${format.recipe(output, input)});`;

export type RecipeStill = {
  input: Liquid;
  output: Liquid;
  ticks: number;
};

/**
 * Add [Still](https://ftb.fandom.com/wiki/Still) recipe
 * 
 * Common values:
 *  - All => `100`
 * 
 * RF cost is equal to `200 * ticks`, assuming `1` energy modifier (Forestry config)
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addStill = (recipe: RecipeStill) => {
  const out = format.recipe(
    format.liquid(recipe.output),
    format.liquid(recipe.input),
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
export const removeStill = (output: string, input?: string) =>
  `mods.forestry.Still.removeRecipe(${format.recipe(output, input)});`;

export type RecipeFabricator = {
  input: Shaped;
  output: Ingredient;
  glass: number;
  cast?: string;
};

/**
 * Add [Thermionic Fabricator](https://feed-the-beast.fandom.com/wiki/Thermionic_Fabricator) recipe
 * 
 * RF cost is equal to `200 * ticks`, assuming `1` energy modifier (Forestry config)
 * 
 * Common glass values:
 *  - Electron Tube => `500` 
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addFabricator = (recipe: RecipeFabricator) => {
  const out = format.recipe(
    format.ingredient(recipe.output),
    format.shaped(recipe.input),
    recipe.glass,
    recipe.cast
  );

  return `mods.forestry.ThermionicFabricator.addCast(${out});`;
};

/**
 * Remove [Thermionic Fabricator](https://feed-the-beast.fandom.com/wiki/Thermionic_Fabricator) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const removeFabricator = (output: string) =>
  `mods.forestry.ThermionicFabricator.removeCast(${output});`;

export type RecipeFabricatorGlass = {
  mb: number;
  id: string;
  temperature: number;
};

/**
 * Add [Thermionic Fabricator](https://feed-the-beast.fandom.com/wiki/Thermionic_Fabricator) glass recipe
 * 
 * Common values:
 * - Glass => `1000mB`, `1000C`
 * - Sand => `1000mB`, `3000C`
 * - Glass Pane => `375mB`, `1000C`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const addFabricatorGlass = (recipe: RecipeFabricatorGlass) => {
  const out = format.recipe(
    recipe.mb,
    recipe.id,
    recipe.temperature
  );

  return `mods.forestry.ThermionicFabricator.addSmelting(${out});`;
};

/**
 * Remove [Thermionic Fabricator](https://feed-the-beast.fandom.com/wiki/Thermionic_Fabricator) glass recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Forestry_Support
 */
export const removeFabricatorGlass = (input: string) =>
  `mods.forestry.ThermionicFabricator.removeSmelting(${input});`;
