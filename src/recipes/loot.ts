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
  (...loots: ChestLoot[]): string => loots
    .map(loot => {
      const out = format.recipe(
        format.literal(id),
        withWeight(loot.p ?? 100)(loot.id),
        loot.min,
        loot.max
      );
  
      return `vanilla.loot.addChestLoot(${out});`;
    })
    .join('\n');

/**
 * Remove item to dungeon loot
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Loot
 */
export const removeChestLoot = (chest: string) =>
  (...ids: string[]): string => ids
    .map(id => `vanilla.loot.removeChestLoot(${format.recipe(format.literal(chest), id)});`)
    .join('\n');


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
