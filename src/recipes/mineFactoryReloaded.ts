import { MFR_FOCI } from '../const';
import { formatArgs, formatIngredient, formatWeight } from '../format';
import { Ingredient } from '../types';

/**
 * Requires: `import mods.mfr.MiningLaser;`
 */
export const addLaser = (ingredient: Ingredient, weight?: number) => {
  const out = formatArgs(
    weight ?
      formatWeight(weight)(formatIngredient(ingredient)) :
      formatIngredient(ingredient)
  );

  return `MiningLaser.addOre(${out});`;
};

/**
 *  Requires: `import mods.mfr.MiningLaser;`
 *
 *  - Accepts ore dictionary
 * @param id Ore
 */
export const removeLaser = (id: string) =>
  `MiningLaser.removeOre(${id});`;

/**
 * Requires: `import mods.mfr.MiningLaser;`
 */
export const addFoci = (foci: keyof typeof MFR_FOCI, ids: string[]) => ids
  .map(id => `MiningLaser.addPreferredOre(${formatArgs(MFR_FOCI[foci], id)});`)
  .join('\n');

/**
 * Requires: `import mods.mfr.MiningLaser;`
 * @param ids Ores
 */
export const removeFoci = (foci: keyof typeof MFR_FOCI, ids: string[]) => ids
  .map(id => `MiningLaser.removePreferredOre(${formatArgs(MFR_FOCI[foci], id)});`)
  .join('\n');
