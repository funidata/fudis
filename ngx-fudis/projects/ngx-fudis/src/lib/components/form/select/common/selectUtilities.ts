import { FudisSelectOption } from '../../../../types/forms';

// TODO: write unit tests and internal documentation

/**
 * Arranges selected options in an order they are present in the DOM
 * @param value list of options to be sorted and patched
 * @param sort used if there more than one option selected
 */
export const sortValues = (value: FudisSelectOption<object>[]): FudisSelectOption<object>[] => {
  let valueToSort: FudisSelectOption<object>[] = value;

  valueToSort = value.sort((a: FudisSelectOption<object>, b: FudisSelectOption<object>) => {
    if (
      a['fudisGeneratedHtmlId']?.includes('-group-') &&
      !b['fudisGeneratedHtmlId']?.includes('-group-')
    ) {
      return 1;
    }

    if (
      !a['fudisGeneratedHtmlId']?.includes('-group-') &&
      b['fudisGeneratedHtmlId']?.includes('-group-')
    ) {
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

export const joinInputValues = (values: FudisSelectOption<object>[]): string => {
  const label: string[] = [];
  values.forEach((item: FudisSelectOption<object>) => {
    const labelToPush = item.label.includes(',') ? `'${item.label}'` : item.label;

    label.push(labelToPush);
  });

  const joinedValues = label.join(', ');

  return joinedValues;
};

export const setVisibleOptionsList = (
  currentList: string[],
  valueToUpdate: string,
  visible: boolean,
): string[] => {
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
