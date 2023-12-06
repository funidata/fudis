/* eslint-disable @typescript-eslint/dot-notation */
import { FudisSelectOption } from '../../../types/forms';

/**
 * Arranges selected options in an order they are present in the DOM
 * @param value list of options to be sorted and patched
 * @param sort used if there more than one option selected
 */
export const sortValues = (value: FudisSelectOption[]): FudisSelectOption[] => {
	let valueToSort: FudisSelectOption | FudisSelectOption[] = value;

	valueToSort = value.sort((a: FudisSelectOption, b: FudisSelectOption) => {
		if (a['htmlId'] < b['htmlId']) {
			return -1;
		}
		if (a['htmlId'] > b['htmlId']) {
			return 1;
		}
		return 0;
	});

	return valueToSort;
};

export const joinInputValues = (values: FudisSelectOption[]): string => {
	const label: string[] = [];
	values.forEach((item: FudisSelectOption) => {
		label.push(item.label);
	});

	const joinedValues = label.join(', ');

	return joinedValues;
};
