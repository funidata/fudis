// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericObject = { [key: string]: any };

/**
 * Utility function to test, if two objects have the exactly same properties
 *
 * @param x First object
 * @param y Second object
 * @returns Boolean
 */

export const areObjectsDeepEquals = (x: GenericObject | null, y: GenericObject | null): boolean => {
  const ok = Object.keys;
  const tx = typeof x;
  const ty = typeof y;
  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length && ok(x).every((key) => areObjectsDeepEquals(x[key], y[key]))
    : x === y;
};
