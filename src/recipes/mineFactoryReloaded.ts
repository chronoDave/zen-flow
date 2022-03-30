import { MFR_LASER_LENSES } from '../const';
import { formatArgs } from '../format';
import { Item } from '../types';

export const addLaser = (item: Item) =>
  `MiningLaser.addOre(${formatArgs(item)});`;

/**
 * @param ingredient - Laser output
 */
export const removeLaser = (ingredient: string) =>
  `MiningLaser.removeOre(${ingredient});`;

export const addLaserPreferred = (lens: keyof typeof MFR_LASER_LENSES, ingredients: string[]) => ingredients
  .map(ingredient => `MiningLaser.addPreferredOre(${formatArgs(MFR_LASER_LENSES[lens], ingredient)});`)
  .join('\n');

/**
* @param ingredient - Laser output
*/
export const removeLaserPreferred = (lens: keyof typeof MFR_LASER_LENSES, ingredients: string[]) => ingredients
  .map(ingredient => `MiningLaser.removePreferredOre(${formatArgs(MFR_LASER_LENSES[lens], ingredient)});`)
  .join('\n');
