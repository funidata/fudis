import {
  FudisGridProperties,
  FudisGridFormInputWidth,
  FudisGridPropertyCollection,
} from '../../types/grid';
import { convertToRemValue } from '../../utilities/rem-converter';

/**
 * Utility function used with GridDirective.
 * Takes in object of Input() attributes and creates CSS classlist out of those to be passed to Grid element.
 */
export const getGridClasses = (values: FudisGridProperties): string => {
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

/**
 * Determine Grid Input Properties based on if Service defaults should be ignored or if application has provided values
 */

export const getValuesForCSSClasses = (
  properties: FudisGridPropertyCollection,
  serviceDefaults: boolean,
): FudisGridProperties => {
  const { defaultValues, serviceValues, appValues } = properties;

  if (!serviceDefaults) {
    /**
     * Set values from Inputs, if not provided, use default values. Ignore default values from FudisGridService
     */
    return {
      width: appValues.width ?? defaultValues.width,
      align: appValues.align ?? defaultValues.align,
      alignItemsX: appValues.alignItemsX ?? defaultValues.alignItemsX,
      alignItemsY: appValues.alignItemsY ?? defaultValues.alignItemsY,
      marginTop: appValues.marginTop ?? defaultValues.marginTop,
      marginBottom: appValues.marginBottom ?? defaultValues.marginBottom,
      marginSides: appValues.marginSides ?? defaultValues.marginSides,
      rowGap: appValues.rowGap ?? defaultValues.rowGap,
      columnGap: appValues.columnGap ?? defaultValues.columnGap,
      classes: appValues.classes ?? defaultValues.classes,
    };
  } else {
    /**
     * Set values from Inputs, if not provided, check if FudisGridService has defaults, if not, use defaults.
     */
    return {
      width: appValues.width ?? serviceValues.width ?? defaultValues.width,
      align: appValues.align ?? serviceValues.align ?? defaultValues.align,
      alignItemsX: appValues.alignItemsX ?? serviceValues.alignItemsX ?? defaultValues.alignItemsX,
      alignItemsY: appValues.alignItemsY ?? serviceValues.alignItemsY ?? defaultValues.alignItemsY,
      marginTop: appValues.marginTop ?? serviceValues.marginTop ?? defaultValues.marginTop,
      marginBottom:
        appValues.marginBottom ?? serviceValues.marginBottom ?? defaultValues.marginBottom,
      marginSides: appValues.marginSides ?? serviceValues.marginSides ?? defaultValues.marginSides,
      rowGap: appValues.rowGap ?? serviceValues.rowGap ?? defaultValues.rowGap,
      columnGap: appValues.columnGap ?? serviceValues.columnGap ?? defaultValues.columnGap,
      classes: appValues.classes ?? serviceValues.classes ?? defaultValues.classes,
    };
  }
};
