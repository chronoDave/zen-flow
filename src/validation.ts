import { Item, RecipeShaped, TextFormat } from './types';

export const isItem = (x: unknown): x is Item => (
  Array.isArray(x) &&
  x.length === 2 &&
  typeof x[0] === 'string' &&
  typeof x[1] === 'number'
);

export const isRecipeShaped = (x: unknown): x is RecipeShaped => (
  !Array.isArray(x) &&
  typeof x === 'object'
);

export const isTextFormat = (x: unknown): x is TextFormat => (
  Array.isArray(x) &&
  x.length === 2 &&
  (x[1].colour || x[1].format)
);
