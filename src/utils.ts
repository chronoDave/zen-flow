export const clamp = (min: number, max: number, n: number) =>
  Math.max(min, Math.min(max, n));

export const fill = <T = number>(n: number, x?: T) => Array
  .from({ length: n })
  .map((_, i) => x ?? i);
