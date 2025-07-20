import type { Bonus } from '../lib/format.ts';

import * as format from '../lib/format.ts';
import { withWeight } from './tag.ts';

export type RecipeChestLoot = {
  chest: string;
  loot: {
    id: string;
    p?: number;
    min?: number;
    max?: number;
  };
};

/**
 * Add item to dungeon loot
 * 
 * Common values:
 *  - `dungeonChest`
 *  - `mineshaftChest`
 * 
 * A loot table can be generated using `/mt loot`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Loot
 */
export const addChestLoot = (recipe: RecipeChestLoot) => {
  const out = format.recipe(
    format.literal(recipe.chest),
    withWeight(recipe.loot.p ?? 100)(recipe.loot.id),
    recipe.loot.min,
    recipe.loot.max
  );

  return `vanilla.loot.addChestLoot(${out});`;
};

/**
 * Remove item to dungeon loot
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Loot
 */
export const removeChestLoot = (recipe: { chest: string; id: string }) =>
  `vanilla.loot.removeChestLoot(${format.recipe(format.literal(recipe.chest), recipe.id)});`;

/**
 * Add item to tall grass
 * 
 * A loot table can be generated using `/mt seeds`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Loot
 */
export const addSeed = (seed: Bonus) =>
  `vanilla.seeds.addSeed(${withWeight(seed.p)(seed.id)});`;

/**
 * Remove item from tall grass
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Loot
 */
export const removeSeed = (id: string) =>
  `vanilla.seeds.removeSeed(${id});`;
