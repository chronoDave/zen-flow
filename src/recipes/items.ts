import {
  formatEnchantment,
  formatList,
  formatName,
  formatTooltip
} from '../format';
import { Enchantment, Text } from '../types';

export const addDict = (dict: string, ingredients: string[]) => ingredients
  .map(ingredient => `${dict}.add(${ingredient});`)
  .join('\n');

export const removeDict = (dict: string, ingredients: string[]) => ingredients
  .map(ingredient => `${dict}.remove(${ingredient});`)
  .join('\n');

export const withName = (ingredient: string, name: Text | Text[]) =>
  `${ingredient}.displayName = ${formatName(name)};`;

export const withTooltip = (ingredient: string, tooltip: Text | Text[]) =>
  `${ingredient}.addTooltip(${formatTooltip(tooltip)});`;

export const withTooltipShift = (ingredient: string, tooltip: Text | Text[]) =>
  `${ingredient}.addShiftTooltip(${formatTooltip(tooltip)});`;

export const withTag = (tag: string) => (ingredient: string) =>
  `${ingredient}.withTag(${tag})`;

export const withEnchantments = (enchantment: Enchantment | Enchantment[]) => {
  const enchantments = Array.isArray(enchantment) ?
    enchantment :
    [enchantment];

  return withTag(`{ ench: ${formatList(enchantments.map(formatEnchantment))} }`);
};
