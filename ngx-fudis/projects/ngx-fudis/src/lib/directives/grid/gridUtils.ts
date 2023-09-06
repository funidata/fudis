import {
	FudisBreakpointKey,
	FudisGridColumnsResponsive,
	FudisGridResponsiveData,
	FudisGridAttributes,
	FudisGridFormInputWidth,
} from '../../types/grid';
import { fudisBreakpointsMinWidth } from '../breakpoint/breakpoint-utils';

/**
 * Utility function used with GridDirective.
 * Takes in object of Input() attributes and creates CSS classlist out of those to be passed to Grid element.
 */
export const getGridClasses = (values: FudisGridAttributes): string => {
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
 * Basic validation, so that given column @Inputs are usable and valid grid-column-template values.
 */
export const validateColumnInputArray = (inputs: Array<FudisGridResponsiveData>) => {
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

export const replaceFormInputWidthsToRem = (value: string): string => {
	const inputXs: FudisGridFormInputWidth = 'inputXs';
	const inputSm: FudisGridFormInputWidth = 'inputSm';
	const inputMd: FudisGridFormInputWidth = 'inputMd';
	const inputLg: FudisGridFormInputWidth = 'inputLg';

	return value
		.replaceAll(inputXs, '4rem')
		.replaceAll(inputSm, '10rem')
		.replaceAll(inputMd, '14rem')
		.replaceAll(inputLg, '23rem');
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
	return replaceFormInputWidthsToRem(value);
};

/**
 * Build an setting array of objects for breakpoint rules from Grid's / GridItem's Input() columns. Returns e. g. following object:
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
export const getGridBreakpointRules = (
	values: FudisGridColumnsResponsive,
	defaultValue: string,
	isGridItem?: boolean
): FudisGridResponsiveData[] => {
	const columnsArray: FudisGridResponsiveData[] = [];

	if (!values.default) {
		columnsArray.push({
			name: 'default',
			value: defaultValue,
			breakpoint: fudisBreakpointsMinWidth.default,
		});
	}

	Object.keys(values).forEach((key) => {
		const value = values[key as keyof FudisGridColumnsResponsive]!;

		const valueToForward = getGridCssValue(value, isGridItem);

		columnsArray.push({
			name: key as keyof FudisGridColumnsResponsive,
			value: valueToForward,
			breakpoint: fudisBreakpointsMinWidth[key as keyof FudisGridColumnsResponsive],
		});
	});

	return columnsArray;
};

/**
 * Builds, sorts and validates Grid's / GridItem's Input() columns.
 */
export const getGridBreakpointDataArray = (
	value: FudisGridColumnsResponsive,
	defaultValue: string,
	isGridItem?: boolean
): FudisGridResponsiveData[] => {
	const columnsArray: FudisGridResponsiveData[] = getGridBreakpointRules(value, defaultValue, isGridItem);

	const sortOrder: FudisBreakpointKey[] = ['default', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

	const sortedColumnsArray = columnsArray.sort((a, b) => {
		return sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name);
	});

	validateColumnInputArray(sortedColumnsArray);

	return sortedColumnsArray;
};
