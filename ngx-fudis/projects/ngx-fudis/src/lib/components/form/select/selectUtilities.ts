/* eslint-disable @typescript-eslint/dot-notation */
import { FudisSelectOption } from '../../../types/forms';

/**
 * Arranges selected options in an order they are present in the DOM
 * @param value list of options to be sorted and patched
 * @param sort used if there more than one option selected
 */
export const sortValues = (value: FudisSelectOption[]): FudisSelectOption[] => {
	let valueToSort: FudisSelectOption[] = value;

	// console.log(valueToSort);

	valueToSort = value.sort((a: FudisSelectOption, b: FudisSelectOption) => {
		if (a['fudisGeneratedHtmlId']?.includes('-group-') && !b['fudisGeneratedHtmlId']?.includes('-group-')) {
			return 1;
		}

		if (!a['fudisGeneratedHtmlId']?.includes('-group-') && b['fudisGeneratedHtmlId']?.includes('-group-')) {
			return -1;
		}

		if (a['fudisGeneratedHtmlId'] < b['fudisGeneratedHtmlId']) {
			return -1;
		}
		if (a['fudisGeneratedHtmlId'] > b['fudisGeneratedHtmlId']) {
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

export const setVisibleOptionsList = (currentList: string[], valueToUpdate: string, visible: boolean): string[] => {
	const listToReturn = currentList;

	const valueExists = listToReturn.includes(valueToUpdate);

	if (visible && !valueExists) {
		listToReturn.push(valueToUpdate);
	} else if (valueExists && !visible) {
		const index = listToReturn.indexOf(valueToUpdate);

		listToReturn.splice(index, 1);
	}

	return listToReturn;
};
