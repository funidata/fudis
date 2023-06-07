import { GridAttributes, GridColumns, GridInputColumnObject } from '../../types/grid';

export const gridBreakpoints = {
	xxl: '(min-width: 100em)',
	xl: '(min-width: 75em) and (max-width: 99.99em)',
	lg: '(min-width: 62em) and (max-width: 74.99em)',
	md: '(min-width: 48em) and (max-width: 61.99em)',
	sm: '(min-width: 36em) and (max-width: 47.99em)',
	xs: '(min-width: 0) and (max-width: 35.99em)',
	default: '(min-width: 0)',
};

/*
 * Array of brekpoint rules to observe, which is given to ngMaterial BreakpointObserver
 */
export const breakpointsToObserve = [
	gridBreakpoints.xxl,
	gridBreakpoints.xl,
	gridBreakpoints.lg,
	gridBreakpoints.md,
	gridBreakpoints.sm,
	gridBreakpoints.xs,
	gridBreakpoints.default,
];

export const getGridClasses = (values: GridAttributes) => {
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
 * Some validation, so that given column @Inputs are usable and valid grid-column-template values..
 */

const validateColumnInputArray = (inputs: Array<GridInputColumnObject>) => {
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

const defineColumnValue = (value: string | number): string => {
	if (typeof value === 'number') {
		return `repeat(${value}, 1fr)`;
	}
	return value;
};

export const createColumnInputForBreakpoints = (
	defaultValue: string | number,
	xsmall: string | number,
	small: string | number,
	medium: string | number,
	large: string | number,
	xlarge: string | number,
	xxlarge: string | number,
	appDefaults: GridColumns
) => {
	const columnDataForBreakpoints: GridInputColumnObject[] = [];

	if (defaultValue !== 'default') {
		columnDataForBreakpoints.push({
			name: 'columns',
			value: defineColumnValue(defaultValue),
			breakpoint: gridBreakpoints.default,
		});
	} else if (appDefaults.default) {
		columnDataForBreakpoints.push({
			name: 'columns',
			value: defineColumnValue(appDefaults.default),
			breakpoint: gridBreakpoints.default,
		});
	} else {
		columnDataForBreakpoints.push({
			name: 'columns',
			value: '1fr',
			breakpoint: gridBreakpoints.default,
		});
	}

	if (xsmall) {
		columnDataForBreakpoints.push({
			name: 'columnsXs',
			value: defineColumnValue(xsmall),
			breakpoint: gridBreakpoints.xs,
		});
	} else if (appDefaults.xs) {
		columnDataForBreakpoints.push({
			name: 'columnsXs',
			value: defineColumnValue(appDefaults.xs),
			breakpoint: gridBreakpoints.xs,
		});
	}

	if (small) {
		columnDataForBreakpoints.push({
			name: 'columnsSm',
			value: defineColumnValue(small),
			breakpoint: gridBreakpoints.sm,
		});
	} else if (appDefaults.sm) {
		columnDataForBreakpoints.push({
			name: 'columnsSm',
			value: defineColumnValue(appDefaults.sm),
			breakpoint: gridBreakpoints.sm,
		});
	}
	if (medium) {
		columnDataForBreakpoints.push({
			name: 'columnsMd',
			value: defineColumnValue(medium),
			breakpoint: gridBreakpoints.md,
		});
	} else if (appDefaults.md) {
		columnDataForBreakpoints.push({
			name: 'columnsMd',
			value: defineColumnValue(appDefaults.md),
			breakpoint: gridBreakpoints.md,
		});
	}
	if (large) {
		columnDataForBreakpoints.push({
			name: 'columnsLg',
			value: defineColumnValue(large),
			breakpoint: gridBreakpoints.lg,
		});
	} else if (appDefaults.lg) {
		columnDataForBreakpoints.push({
			name: 'columnsLg',
			value: defineColumnValue(appDefaults.lg),
			breakpoint: gridBreakpoints.lg,
		});
	}
	if (xlarge) {
		columnDataForBreakpoints.push({
			name: 'columnsXl',
			value: defineColumnValue(xlarge),
			breakpoint: gridBreakpoints.xl,
		});
	} else if (appDefaults.xl) {
		columnDataForBreakpoints.push({
			name: 'columnsXl',
			value: defineColumnValue(appDefaults.xl),
			breakpoint: gridBreakpoints.xl,
		});
	}
	if (xxlarge) {
		columnDataForBreakpoints.push({
			name: 'columnsXxl',
			value: defineColumnValue(xxlarge),
			breakpoint: gridBreakpoints.xxl,
		});
	} else if (appDefaults.xxl) {
		columnDataForBreakpoints.push({
			name: 'columnsXxl',
			value: defineColumnValue(appDefaults.xxl),
			breakpoint: gridBreakpoints.xxl,
		});
	}

	validateColumnInputArray(columnDataForBreakpoints);

	return columnDataForBreakpoints;
};
