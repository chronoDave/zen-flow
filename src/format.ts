import { Item } from './types';

import { isItem } from './validation';

export const formatItem = (item: Item) => `${item[0]} * ${item[1]}`;
export const formatList = (list: string[] | number[]) => `[${list.join(', ')}]`;
export const formatIngredient = (ingredient?: string) => ingredient ?? 'null';

export const formatFloat = (n: number) => (
  n % 1 === 0 ?
    `${n}.0` :
    `${n}`
);

export const format = (...args: Partial<Array<string | null | number | Item | string[] | number[]>>) => {
  const list = args
    .filter(arg => arg !== undefined)
    .map(arg => {
      if (typeof arg === 'number') return `${arg}`;
      if (isItem(arg)) return formatItem(arg);
      if (Array.isArray(arg)) return formatList(arg);
      return arg;
    });

  return list.length > 3 ?
    `\n\t${list.join(',\n\t')}\n` :
    list.join(', ');
};
