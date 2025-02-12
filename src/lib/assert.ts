export const isObject = (x: unknown): x is Record<string, unknown> => 
  typeof x === 'object' &&
  !Array.isArray(x);
