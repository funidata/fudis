import {
	BreakpointKey,
	GridAttributes,
	GridColumnsResponsive,
	GridResponsiveData,
	gridColumnDefault,
	gridItemDefault,
} from '../../types/grid';

/**
 * Utility object used with breakpointsMinWidthToObserve and BreakpointObserver
 */
export const gridBreakpointsMinWidth = {
	xxl: '(min-width: 100em)',
	xl: '(min-width: 75em)',
	lg: '(min-width: 62em)',
	md: '(min-width: 48em)',
	sm: '(min-width: 36em)',
	xs: '(min-width: 0)',
	default: '(min-width: 0)',
};

/*
 * Array of brekpoint rules to observe, which is given to ngMaterial BreakpointObserver
 */
export const breakpointsMinWidthToObserve = [
	gridBreakpointsMinWidth.xxl,
	gridBreakpointsMinWidth.xl,
	gridBreakpointsMinWidth.lg,
	gridBreakpointsMinWidth.md,
	gridBreakpointsMinWidth.sm,
	gridBreakpointsMinWidth.xs,
	gridBreakpointsMinWidth.default,
];

/*

export const gridBreakpoints = {
	xxl: '(min-width: 100em)',
	xl: '(min-width: 75em) and (max-width: 99.99em)',
	lg: '(min-width: 62em) and (max-width: 74.99em)',
	md: '(min-width: 48em) and (max-width: 61.99em)',
	sm: '(min-width: 36em) and (max-width: 47.99em)',
	xs: '(min-width: 0) and (max-width: 35.99em)',
	default: '(min-width: 0)',
};

 // Array of brekpoint rules to observe, which is given to ngMaterial BreakpointObserver
 
export const breakpointsToObserve = [
	gridBreakpoints.xxl,
	gridBreakpoints.xl,
	gridBreakpoints.lg,
	gridBreakpoints.md,
	gridBreakpoints.sm,
	gridBreakpoints.xs,
	gridBreakpoints.default,
];
*/

/**
 *
 * Utility function used with GridDirective.
 * Takes in object of Input() attributes and creates CSS classlist out of those to be passed to Grid element.
 *
 */

export const getGridClasses = (values: GridAttributes): string => {
	let classList = [
		'fudis-grid',
		`fudis-grid__${values.width}`,
		`fudis-grid__align__${values.align}`,
		`fudis-grid__margin__top__${values.marginTop}`,
		`fudis-grid__margin__bottom__${values.marginBottom}`,
		values.rowGap === 'responsive' ? '' : `fudis-grid__row-gap__${values.rowGap}`,
		values.columnGap === 'responsive' ? '' : `fudis-grid__column-gap__${values.columnGap}`,
		values.marginSides === 'responsive' ? '' : `fudis-grid__margin__sides__${values.marginSides}`,
	];

	if (values.classes) {
		classList = classList.concat(values.classes);
	}

	const arrayToString = classList
		.filter((item) => {
			return !!item;
		})
		.join(' ');

	return arrayToString;
};

/*
 * Some validation, so that given column @Inputs are usable and valid grid-column-template values.
 */

export const validateColumnInputArray = (inputs: Array<GridResponsiveData>) => {
	inputs.forEach((item) => {
		if (item.value.trim() === '') {
			throw new Error(
				`Your column input "${item.name}" looks empty. Either remove it or add some proper CSS grid-template-columns values.`
			);
		}

		if (item.value.includes('px')) {
			throw new Error(`Your fudis-grid column input of "${item.name}" should not contain px values.`);
		}

		/*
		 * Check if sum of fr values is larger than 12.
		 */

		const inputStringToArray = item.value.split(' ');

		let sumOfFrValues = 0;

		// RegEx for finding fr values from strings.
		const valueWithFr = /^[\d+]*(fr)$/;

		inputStringToArray.forEach((el) => {
			if (el.match(valueWithFr)) {
				const numberValue = Number(el.slice(0, -2));
				sumOfFrValues += numberValue;
			}
		});

		if (sumOfFrValues > 12) {
			throw new Error(
				`Your fudis-grid's sum of fr values for column input of "${item.name}" is over 12. Our grid is designed to be used only with maximum sum of 12 fr columns.`
			);
		}
	});
};

/**
 * Utility function to convert parameters to either Grid CSS value 'grid-column-template' or CSS grid item value 'grid-column'
 */
export const getGridCssValue = (value: number | string, isGridItem?: boolean): string => {
	if (typeof value === 'number') {
		if (!isGridItem) {
			return `repeat(${value}, 1fr)`;
		}
		return `span ${value}`;
	}
	if (value === 'stretch' && isGridItem) {
		return '1/-1';
	}
	return value;
};

/**
 * Build an setting array of objects for breakpoint rules from Grid's / GridItem's Input() columns. Returns e. g. following object.
 * [
    {
        "name": "default",
        "value": "1fr",
        "breakpoint": "(min-width: 0)"
    },
    {
        "name": "md",
        "value": "1fr 2fr",
        "breakpoint": "(min-width: 48em)"
    },
    {
        "name": "xxl",
        "value": "repeat(6, 1fr)",
        "breakpoint": "(min-width: 100em)"
    }
]
 */
export const getGridBreakpointRules = (values: GridColumnsResponsive, isGridItem?: boolean): GridResponsiveData[] => {
	const columnsArray: GridResponsiveData[] = [];

	if (!values.default) {
		columnsArray.push({
			name: 'default',
			value: isGridItem ? gridItemDefault : gridColumnDefault,
			breakpoint: gridBreakpointsMinWidth.default,
		});
	}

	Object.keys(values).forEach((key) => {
		const value = values[key as keyof GridColumnsResponsive]!;

		const valueToForward = getGridCssValue(value, isGridItem);

		columnsArray.push({
			name: key as keyof GridColumnsResponsive,
			value: valueToForward,
			breakpoint: gridBreakpointsMinWidth[key as keyof GridColumnsResponsive],
		});
	});

	return columnsArray;
};

/**
 * Builds, sorts and validates Grid's / GridItem's Input() columns.
 */
export const getGridBreakpointDataArray = (
	value: GridColumnsResponsive,
	isGridItem?: boolean
): GridResponsiveData[] => {
	const columnsArray: GridResponsiveData[] = getGridBreakpointRules(value, isGridItem);

	const sortOrder: BreakpointKey[] = ['default', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

	const sortedColumnsArray = columnsArray.sort((a, b) => {
		return sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name);
	});

	validateColumnInputArray(sortedColumnsArray);

	return sortedColumnsArray;
};
