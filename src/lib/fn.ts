export const maybe = <T, K>(fn: (x: T) => K) =>
  (x?: T | null): K | undefined => {
    if (x === null || x === undefined) return undefined;
    return fn(x);
  };
