import { MFR_FOCI } from '../const';
import { formatArgs, formatIngredient } from '../format';
import { Ingredient } from '../types';

/**
 * Requires: `import mods.mfr.MiningLaser;`
 */
export const addLaser = (ingredient: Ingredient) =>
  `MiningLaser.addOre(${formatArgs(formatIngredient(ingredient))});`;

/**
 *  - Requires: `import mods.mfr.MiningLaser;`
 *  - Accepts ore dictionary
 * @param id - Laser output
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
 * @param ids - Laser output
 */
export const removeFoci = (foci: keyof typeof MFR_FOCI, ids: string[]) => ids
  .map(id => `MiningLaser.removePreferredOre(${formatArgs(MFR_FOCI[foci], id)});`)
  .join('\n');
