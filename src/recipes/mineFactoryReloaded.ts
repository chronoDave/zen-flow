import type { Bonus, Stack } from '../lib/format.ts';

import * as format from '../lib/format.ts';

/**
 * Add an entity to the [Auto-Spawner](https://feed-the-beast.fandom.com/wiki/Auto-Spawner) blacklist, disabling spawning
 * 
 * A list of entities can be generated using `/mt entities`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
export const addBlacklistAutospawner = (id: string) =>
  `mods.mfr.AutoSpawner.addBlacklist(${format.literal(id)});`;

/**
 * Remove an entity to the [Auto-Spawner](https://feed-the-beast.fandom.com/wiki/Auto-Spawner) blacklist, enabling spawning
 * 
 * A list of entities can be generated using `/mt entities`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
export const removeBlacklistAutospawner = (id: string) =>
  `mods.mfr.AutoSpawner.removeBlacklist(${format.literal(id)});`;

export const HARVESTER_TYPE = {
  tree: 'tree',
  leaf: 'treeLeaf',
  block: 'normal',
  column: 'column',
  treeInverse: 'treeFlipped'
};

export type RecipeHarvester = {
  type: keyof typeof HARVESTER_TYPE;
  id: string;
  bonus?: Array<string | Stack | Bonus>;
};

/**
 * Add harvestable blocks to the [Harvester](https://feed-the-beast.fandom.com/wiki/Harvester)
 * 
 * Types:
 *  - `tree` => Tree cutting algorithm. Leaves first, then logs
 *  - `leaf` => Only cut leaves
 *  - `block` => Single block, such as pumpkins and melons
 *  - `column` => Stacked blocks, such as reeds and cacti
 *  - `treeInverse` => Upside-down trees, such as Natura's Bloodwood
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
export const addHarvester = (recipe: RecipeHarvester) => {
  const out = format.recipe(
    recipe.id,
    recipe.bonus && format.array(3)(recipe.bonus.map(x => {
      if (typeof x === 'string') return x;
      if ('n' in x) return format.stack(x);
      return format.bonus(x);
    })),
    format.literal(HARVESTER_TYPE[recipe.type])
  );

  return `mods.mfr.Harvester.addHarvestable(${out});`;
};

/**
 * Add item to [Laser Drill](https://ftb.fandom.com/wiki/Laser_Drill_(MineFactory_Reloaded))
 * 
 * Common values:
 *  - Coal => `175`
 *  - Iron => `150`
 *  - Redstone => `100`
 *  - Copper => `90`
 *  - Tin => `85`
 *  - Glowstone => `80`
 *  - Lapis => `80`
 *  - Gold => `70`
 *  - Lead => `60`
 *  - Diamond => `55`
 *  - Sulfur => `40`
 *  - Salpeter => `40`
 *  - Emerald => `35`
 *  - Silver => `30`
 *  - Platinum => `15`
 * 
 * A list of laser ores can be generated using `/mt mfr laserores`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
export const addLaserOre = (id: string) =>
  (n: number) =>
    `mods.mfr.MiningLaser.addOre(${format.recipe(format.weight(n)(id))});`;

/**
 * Remove item from [Laser Drill](https://ftb.fandom.com/wiki/Laser_Drill_(MineFactory_Reloaded))
 * 
 * A list of laser ores can be generated using `/mt mfr laserores`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
export const removeLaserOre = (id: string) =>
  `mods.mfr.MiningLaser.removeOre(${format.recipe(id)});`;

export const FOCI = {
  white: 0,
  orange: 1,
  magenta: 2,
  lightBlue: 3,
  yellow: 4,
  lime: 5,
  pink: 6,
  gray: 7,
  lightGray: 8,
  cyan: 9,
  purple: 10,
  blue: 11,
  brown: 12,
  green: 13,
  red: 14,
  black: 15
} as const;

/**
 * Add item to [Laser Drill](https://ftb.fandom.com/wiki/Laser_Drill_(MineFactory_Reloaded)) Foci
 * 
 * Common values:
 *  - Coal => `175 (black)`
 *  - Iron => `150 (brown)`
 *  - Redstone => `100 (red)`
 *  - Copper => `90 (orange)`
 *  - Tin => `85 (silver)`
 *  - Glowstone => `80 (yellow)`
 *  - Lapis => `80 (blue)`
 *  - Gold => `70 (yellow)`
 *  - Lead => `60 (purple)`
 *  - Diamond => `55 (lightBlue)`
 *  - Sulfur => `40 (yellow)`
 *  - Salpeter => `40 (white)`
 *  - Emerald => `35 (lime)`
 *  - Silver => `30 (gray)`
 *  - Platinum => `15 (lightBlue)`
 * 
 * A list of laser ores can be generated using `/mt mfr laserores`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
export const addLaserFoci = (id: string) =>
  (foci: keyof typeof FOCI) =>
    `mods.mfr.MiningLaser.addPreferredOre(${format.recipe(FOCI[foci], id)});`;

/**
 * Remove item from [Laser Drill](https://ftb.fandom.com/wiki/Laser_Drill_(MineFactory_Reloaded)) Foci
 *
 * A list of laser ores can be generated using `/mt mfr laserores`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
export const removeLaserFoci = (id: string) =>
  (foci: keyof typeof FOCI) =>
    `mods.mfr.MiningLaser.removePreferredOre(${format.recipe(FOCI[foci], id)});`;

export type RecipeLaser = {
  id: string;
  foci: keyof typeof FOCI;
  weight: number;
};

/**
 * Add item to [Laser Drill](https://ftb.fandom.com/wiki/Laser_Drill_(MineFactory_Reloaded)) and Foci. Combines `addLaserOre` and `addLaserFoci`
 * 
 * Common values:
 *  - Coal => `175 (black)`
 *  - Iron => `150 (brown)`
 *  - Redstone => `100 (red)`
 *  - Copper => `90 (orange)`
 *  - Tin => `85 (silver)`
 *  - Glowstone => `80 (yellow)`
 *  - Lapis => `80 (blue)`
 *  - Gold => `70 (yellow)`
 *  - Lead => `60 (purple)`
 *  - Diamond => `55 (lightBlue)`
 *  - Sulfur => `40 (yellow)`
 *  - Salpeter => `40 (white)`
 *  - Emerald => `35 (lime)`
 *  - Silver => `30 (gray)`
 *  - Platinum => `15 (lightBlue)`
 * 
 * A list of laser ores can be generated using `/mt mfr laserores`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
export const addLaser = (recipe: RecipeLaser) => [
  addLaserOre(recipe.id)(recipe.weight),
  addLaserFoci(recipe.id)(recipe.foci)
].join('\n');

/**
 * Add [Planter](https://ftb.fandom.com/wiki/Planter_(MineFactory_Reloaded)) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
export const addPlanter = (id: string) =>
  `mods.mfr.Planter.addPlantable(${id});`;

/**
 * Add [Rubber Tree](https://ftb.fandom.com/wiki/Rubber_Tree_(MineFactory_Reloaded)) to biome, allowing rubber trees to be generated in that biome
 * 
 * A list of biomes can be generated using `/mt biomes`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
export const addBiomeRubberTree = (id: string) =>
  `mods.mfr.RubberTree.addBiome(${format.recipe(format.literal(id))});`;

/**
 * Remove [Rubber Tree](https://ftb.fandom.com/wiki/Rubber_Tree_(MineFactory_Reloaded)) from biome, disabling rubber trees from being generated in that biome
 * 
 * A list of biomes can be generated using `/mt biomes`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
export const removeBiomeRubberTree = (id: string) =>
  `mods.mfr.RubberTree.removeBiome(${format.recipe(format.literal(id))});`;

/**
 * Add item to [Sludge Boiler](https://ftb.fandom.com/wiki/Sludge_Boiler)
 * 
 * Common values:
 *  - Peat => `10`
 *  - Decaying Wheat => `20`
 *  - Sand => `50`
 *  - Clay Block => `30`
 *  - Dirt => `10`
 *  - Gravel => `10`
 *  - Red Sand => `5`
 *  - Soul Sand => `5`
 *  - Mycelium => `3`
 *  - Podzol => `2`
 *  - Netherrack => `1`
 * 
 * A list of sludge drops can be generated using `/mt mfr sludgedrops`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
export const addSludgeBoiler = (id: string) =>
  (weight: number) =>
    `mods.mfr.SludgeBoiler.addDrop(${format.recipe(format.weight(weight)(id))});`;

/**
 * Remove item from [Sludge Boiler](https://ftb.fandom.com/wiki/Sludge_Boiler)
 * 
 * A list of sludge drops can be generated using `/mt mfr sludgedrops`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:MFR_Support
 */
export const removeSludgeBoiler = (id: string) =>
  `mods.mfr.SludgeBoiler.removeDrop(${format.recipe(id)});`;
