export const maybe = <T, K>(fn: (x: T) => K) =>
  (x?: T | null): K | null => {
    if (x === null || x === undefined) return null;
    return fn(x);
  };
