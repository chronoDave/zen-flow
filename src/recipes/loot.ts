import type { Bonus } from '../lib/format.ts';

import * as format from '../lib/format.ts';

import { withWeight } from './tag.ts';

export type ChestLoot = {
  id: string;
  p?: number;
  min?: number;
  max?: number;
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
export const addChestLoot = (id: string) =>
  (loot: ChestLoot): string => {
    const out = format.recipe(
      format.literal(id),
      withWeight(typeof loot.p === 'number' ? loot.p * 100 : 100)(loot.id),
      loot.min,
      loot.max
    );

    return `vanilla.loot.addChestLoot(${out});`;
  };

/**
 * Remove item to dungeon loot
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Loot
 */
export const removeChestLoot = (chest: string) =>
  (id: string): string => {
    const out = format.recipe(format.literal(chest), id);

    return `vanilla.loot.removeChestLoot(${out});`;
  };

/**
 * Add item to tall grass
 * 
 * A loot table can be generated using `/mt seeds`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Loot
 */
export const addSeed = (seed: Bonus) => {
  const out = withWeight(typeof seed.p === 'number' ? seed.p * 100 : 100)(seed.id);

  return `vanilla.seeds.addSeed(${out});`;
};

/**
 * Remove item from tall grass
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Loot
 */
export const removeSeed = (id: string) =>
  `vanilla.seeds.removeSeed(${id});`;
