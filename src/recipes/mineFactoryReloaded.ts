import { MFR_FOCI } from '../const';
import { formatArgs } from '../format';
import { Item } from '../types';

export const addLaser = (item: Item) =>
  `MiningLaser.addOre(${formatArgs(item)});`;

/**
 * @param ingredient - Laser output
 */
export const removeLaser = (ingredient: string) =>
  `MiningLaser.removeOre(${ingredient});`;

export const addFoci = (lens: keyof typeof MFR_FOCI, ingredients: string[]) => ingredients
  .map(ingredient => `MiningLaser.addPreferredOre(${formatArgs(MFR_FOCI[lens], ingredient)});`)
  .join('\n');

/**
* @param ingredient - Laser output
*/
export const removeFoci = (lens: keyof typeof MFR_FOCI, ingredients: string[]) => ingredients
  .map(ingredient => `MiningLaser.removePreferredOre(${formatArgs(MFR_FOCI[lens], ingredient)});`)
  .join('\n');
