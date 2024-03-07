export const toArray = <T>(x: T | T[]) =>
  Array.isArray(x) ? x : [x];

export const fill = <T = number>(n: number, x?: T) => Array
  .from({ length: n })
  .map((_, i) => x ?? i);
