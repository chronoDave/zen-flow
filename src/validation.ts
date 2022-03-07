import { Item } from './types';

export const isItem = (x: unknown): x is Item => (
  Array.isArray(x) &&
  x.length === 2 &&
  typeof x[0] === 'string' &&
  typeof x[1] === 'number'
);
