export const object = (x: unknown): x is Record<string, unknown> =>
  x !== null &&
  !Array.isArray(x) &&
  typeof x === 'object';
