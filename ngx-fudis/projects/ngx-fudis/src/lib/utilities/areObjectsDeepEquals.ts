type GenericObject = { [key: string]: any };

export const areObjectsDeepEquals = (x: GenericObject, y: GenericObject): boolean => {
	const ok = Object.keys;
	const tx = typeof x;
	const ty = typeof y;
	return x && y && tx === 'object' && tx === ty
		? ok(x).length === ok(y).length && ok(x).every((key) => areObjectsDeepEquals(x[key], y[key]))
		: x === y;
};
