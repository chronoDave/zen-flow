export const clamp = (min: number, max: number, n: number) =>
  Math.max(min, Math.min(max, n));

export const fill = <T = number>(n: number, x?: T) => Array
  .from({ length: n })
  .map((_, i) => x ?? i);

export const toArray = <T>(x: T | T[]) => Array.isArray(x) ? x : [x];

export const isObject = (x: unknown): x is Record<string, unknown> => (
  typeof x === 'object' &&
  !Array.isArray(x)
);
