import { FudisSelectOption } from '../../../../types/forms';

/**
 * Function to loop array of options and join their labels to a single string
 * @param values array of selected Options
 * @returns
 */
export const joinInputValues = (values: FudisSelectOption<object>[]): string => {
  const label: string[] = [];
  values.forEach((item: FudisSelectOption<object>) => {
    const labelToPush = item.label.includes(',') ? `'${item.label}'` : item.label;

    label.push(labelToPush);
  });

  const joinedValues = label.join(', ');

  return joinedValues;
};

/**
 * Add or remove a value from current list and returned updated one
 * @param currentList
 * @param valueToUpdate
 * @param visible
 * @returns updated List
 */
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
