import { FudisBreakpointStyleResponsive } from '../../types/breakpoints';
import { FudisGridAttributes, FudisGridFormInputWidth } from '../../types/grid';
import { convertToRemValue } from '../../utilities/rem-converter';

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
export const validateColumnInputArray = (inputs: Array<FudisBreakpointStyleResponsive>) => {
  inputs.forEach((item) => {
    if (item.value.trim() === '') {
      throw new Error(
        `Your column input "${item.name}" looks empty. Either remove it or add some proper CSS grid-template-columns values.`,
      );
    }

    if (item.value.includes('px')) {
      throw new Error(
        `Your fudis-grid column input of "${item.name}" should not contain px values.`,
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
        `Your fudis-grid's sum of fr values for column input of "${item.name}" is over 12. Our grid is designed to be used only with maximum sum of 12 fr columns.`,
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
    .replaceAll(inputXs, convertToRemValue(4))
    .replaceAll(inputSm, convertToRemValue(10))
    .replaceAll(inputMd, convertToRemValue(14))
    .replaceAll(inputLg, convertToRemValue(23));
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
