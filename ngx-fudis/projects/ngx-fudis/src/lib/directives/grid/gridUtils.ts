import { GridAttributes, GridInputColumnObject } from '../../types/grid';

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

const gridBreakpoints = {
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

		if (item.value.includes('repeat')) {
			throw new Error(
				`Your fudis-grid column "${item.name}" input contains a "repeat" CSS function for grid-template-columns. Currently fudis-grid doesn't allow it.`
			);
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

export const createColumnInputForBreakpoints = (
	defaultValue: string,
	xsmall: string,
	small: string,
	medium: string,
	large: string,
	xlarge: string,
	xxlarge: string
) => {
	const columnDataForBreakpoints: GridInputColumnObject[] = [];

	const columnsCssDefault = getComputedStyle(document.documentElement).getPropertyValue('--fudis-grid-columns-default');

	const columnsCssXs = getComputedStyle(document.documentElement).getPropertyValue('--fudis-grid-columns-xs');

	const columnsCssSm = getComputedStyle(document.documentElement).getPropertyValue('--fudis-grid-columns-sm');

	const columnsCssMd = getComputedStyle(document.documentElement).getPropertyValue('--fudis-grid-columns-md');

	const columnsCssLg = getComputedStyle(document.documentElement).getPropertyValue('--fudis-grid-columns-lg');

	const columnsCssXl = getComputedStyle(document.documentElement).getPropertyValue('--fudis-grid-columns-xl');

	const columnsCssXxl = getComputedStyle(document.documentElement).getPropertyValue('--fudis-grid-columns-xxl');

	if (defaultValue !== '1fr') {
		columnDataForBreakpoints.push({ name: 'columns', value: defaultValue, breakpoint: gridBreakpoints.default });
	} else if (columnsCssDefault) {
		columnDataForBreakpoints.push({ name: 'columns', value: columnsCssDefault, breakpoint: gridBreakpoints.default });
	} else {
		columnDataForBreakpoints.push({ name: 'columns', value: defaultValue, breakpoint: gridBreakpoints.default });
	}

	if (xsmall) {
		columnDataForBreakpoints.push({ name: 'columnsXs', value: xsmall, breakpoint: gridBreakpoints.xs });
	} else if (columnsCssXs) {
		columnDataForBreakpoints.push({ name: 'columnsXs', value: columnsCssXs, breakpoint: gridBreakpoints.xs });
	}

	if (small) {
		columnDataForBreakpoints.push({ name: 'columnsS', value: small, breakpoint: gridBreakpoints.sm });
	} else if (columnsCssSm) {
		columnDataForBreakpoints.push({ name: 'columnsS', value: columnsCssSm, breakpoint: gridBreakpoints.sm });
	}
	if (medium) {
		columnDataForBreakpoints.push({ name: 'columnsM', value: medium, breakpoint: gridBreakpoints.md });
	} else if (columnsCssMd) {
		columnDataForBreakpoints.push({ name: 'columnsS', value: columnsCssMd, breakpoint: gridBreakpoints.md });
	}
	if (large) {
		columnDataForBreakpoints.push({ name: 'columnsL', value: large, breakpoint: gridBreakpoints.lg });
	} else if (columnsCssLg) {
		columnDataForBreakpoints.push({ name: 'columnsS', value: columnsCssLg, breakpoint: gridBreakpoints.lg });
	}
	if (xlarge) {
		columnDataForBreakpoints.push({ name: 'columnsXl', value: xlarge, breakpoint: gridBreakpoints.xl });
	} else if (columnsCssXl) {
		columnDataForBreakpoints.push({ name: 'columnsS', value: columnsCssXl, breakpoint: gridBreakpoints.xl });
	}
	if (xxlarge) {
		columnDataForBreakpoints.push({ name: 'columnsXxl', value: xxlarge, breakpoint: gridBreakpoints.xxl });
	} else if (columnsCssXxl) {
		columnDataForBreakpoints.push({ name: 'columnsS', value: columnsCssXxl, breakpoint: gridBreakpoints.xxl });
	}

	validateColumnInputArray(columnDataForBreakpoints);

	return columnDataForBreakpoints;
};
