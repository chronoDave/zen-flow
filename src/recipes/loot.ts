import { formatArgs, formatLiteral } from '../lib/format';

export type RecipeChestLoot = {
  chest: string;
  n?: number;
  chance?: number;
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
export const addChestLoot = (id: string, recipe: RecipeChestLoot) => {
  const out = formatArgs(
    formatLiteral(recipe.chest),
    id,
    recipe.chance,
    recipe.n
  );

  return `vanilla.loot.addChestLoot(${out});`;
};

/**
 * Remove item to dungeon loot
 *
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Loot
 */
export const removeChestLoot = (id: string, chest: string) =>
  `vanilla.loot.removeChestLoot(${formatArgs(formatLiteral(chest), id)});`;

/**
 * Add item to tall grass
 * 
 * A loot table can be generated using `/mt seeds`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Loot
 */
export const addSeed = (id: string) =>
  `vanilla.seeds.addSeed(${id});`;

/**
 * Remove item from tall grass
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Loot
 */
export const removeSeed = (id: string) =>
  `vanilla.seeds.removeSeed(${id});`;
