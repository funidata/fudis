export interface IFudisInputColumnObject {
	name: string; // e. g. XL or other size
	value: string; // value to be applied to CSS grid-template-columns attribute
	breakpoint: string; // breakpoint boundaries for this rule to happen
}

export type TFudisGridWidth = 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs';

export type TFudisAlign = 'left' | 'right' | 'center';

export type TFudisAlignItems = 'start' | 'center' | 'end' | 'stretch';

export type TFudisGridMargin = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'none';

export type TFudisGridMarginSide = 'responsive' | 'none';

export type TFudisSpacing = 'none' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export type TFudisGridGap = TFudisSpacing | 'responsive';

export interface IFudisGridAttributes {
	width: TFudisGridWidth;
	align: TFudisAlign;
	marginTop: TFudisGridMargin;
	marginBottom: TFudisGridMargin;
	rowGap: TFudisGridGap;
	columnGap: TFudisGridGap;
	marginSides: TFudisGridMarginSide;
	classes: string[];
}

export const getGridClasses = (gridElement: IFudisGridAttributes) => {
	let classList = [
		'fudis-grid',
		`fudis-grid__${gridElement.width}`,
		`fudis-grid__align__${gridElement.align}`,
		`fudis-grid__margin__top__${gridElement.marginTop}`,
		`fudis-grid__margin__bottom__${gridElement.marginBottom}`,
		gridElement.rowGap === 'responsive' ? '' : `fudis-grid__row-gap__${gridElement.rowGap}`,
		gridElement.columnGap === 'responsive' ? '' : `fudis-grid__column-gap__${gridElement.columnGap}`,
		gridElement.marginSides === 'responsive' ? '' : `fudis-grid__margin__sides__${gridElement.marginSides}`,
	];

	if (gridElement.classes) {
		classList = classList.concat(gridElement.classes);
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
	l: '(min-width: 62em) and (max-width: 74.99em)',
	m: '(min-width: 48em) and (max-width: 61.99em)',
	s: '(min-width: 36em) and (max-width: 47.99em)',
	xs: '(min-width: 0) and (max-width: 35.99em)',
	default: '(min-width: 0)',
};

/*
 * Array of brekpoint rules to observe, which is given to ngMaterial BreakpointObserver
 */

export const breakpointsToObserve = [
	gridBreakpoints.xxl,
	gridBreakpoints.xl,
	gridBreakpoints.l,
	gridBreakpoints.m,
	gridBreakpoints.s,
	gridBreakpoints.xs,
	gridBreakpoints.default,
];

/*
 * Some validation, so that given column @Inputs are usable and valid grid-column-template values..
 */

const validateColumnInputArray = (inputs: Array<IFudisInputColumnObject>) => {
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
	const columnDataForBreakpoints: IFudisInputColumnObject[] = [];

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
		columnDataForBreakpoints.push({ name: 'columnsS', value: small, breakpoint: gridBreakpoints.s });
	} else if (columnsCssSm) {
		columnDataForBreakpoints.push({ name: 'columnsS', value: columnsCssSm, breakpoint: gridBreakpoints.s });
	}
	if (medium) {
		columnDataForBreakpoints.push({ name: 'columnsM', value: medium, breakpoint: gridBreakpoints.m });
	} else if (columnsCssMd) {
		columnDataForBreakpoints.push({ name: 'columnsS', value: columnsCssMd, breakpoint: gridBreakpoints.s });
	}
	if (large) {
		columnDataForBreakpoints.push({ name: 'columnsL', value: large, breakpoint: gridBreakpoints.l });
	} else if (columnsCssLg) {
		columnDataForBreakpoints.push({ name: 'columnsS', value: columnsCssLg, breakpoint: gridBreakpoints.s });
	}
	if (xlarge) {
		columnDataForBreakpoints.push({ name: 'columnsXl', value: xlarge, breakpoint: gridBreakpoints.xl });
	} else if (columnsCssXl) {
		columnDataForBreakpoints.push({ name: 'columnsS', value: columnsCssXl, breakpoint: gridBreakpoints.s });
	}
	if (xxlarge) {
		columnDataForBreakpoints.push({ name: 'columnsXxl', value: xxlarge, breakpoint: gridBreakpoints.xxl });
	} else if (columnsCssXxl) {
		columnDataForBreakpoints.push({ name: 'columnsS', value: columnsCssXxl, breakpoint: gridBreakpoints.s });
	}

	validateColumnInputArray(columnDataForBreakpoints);

	return columnDataForBreakpoints;
};
