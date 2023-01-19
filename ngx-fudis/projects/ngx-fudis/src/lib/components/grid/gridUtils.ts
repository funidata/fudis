export interface InputColumnObject {
	name: string; // e. g. XL or other size
	value: string; // value to be applied to CSS grid-template-columns attribute
	breakpoint: string; // breakpoint boundaries for this rule to happen
}

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

const validateColumnInputArray = (inputs: Array<InputColumnObject>) => {
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
	const columnDataForBreakpoints: InputColumnObject[] = [];

	if (defaultValue) {
		columnDataForBreakpoints.push({ name: 'columns', value: defaultValue, breakpoint: gridBreakpoints.default });
	}
	if (xsmall) {
		columnDataForBreakpoints.push({ name: 'columnsXs', value: xsmall, breakpoint: gridBreakpoints.xs });
	}
	if (small) {
		columnDataForBreakpoints.push({ name: 'columnsS', value: small, breakpoint: gridBreakpoints.s });
	}
	if (medium) {
		columnDataForBreakpoints.push({ name: 'columnsM', value: medium, breakpoint: gridBreakpoints.m });
	}
	if (large) {
		columnDataForBreakpoints.push({ name: 'columnsL', value: large, breakpoint: gridBreakpoints.l });
	}
	if (xlarge) {
		columnDataForBreakpoints.push({ name: 'columnsXl', value: xlarge, breakpoint: gridBreakpoints.xl });
	}
	if (xxlarge) {
		columnDataForBreakpoints.push({ name: 'columnsXxl', value: xxlarge, breakpoint: gridBreakpoints.xxl });
	}

	validateColumnInputArray(columnDataForBreakpoints);

	return columnDataForBreakpoints;
};
