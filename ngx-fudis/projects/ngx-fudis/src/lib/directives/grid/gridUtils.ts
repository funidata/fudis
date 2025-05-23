import { FudisGridProperties, FudisGridPropertyCollection } from '../../types/grid';

/**
 * Utility function used with GridDirective. Takes in object of Input() attributes and creates CSS
 * classlist out of those to be passed to Grid element.
 */
export const getGridClasses = (values: FudisGridProperties): string => {
  const classList = [
    'fudis-grid',
    `fudis-grid__${values.width}`,
    `fudis-grid__align__${values.align}`,
    values.rowGap === 'responsive' ? '' : `fudis-grid__row-gap__${values.rowGap}`,
    values.columnGap === 'responsive' ? '' : `fudis-grid__column-gap__${values.columnGap}`,
  ];

  if (values.classes) {
    classList.push(values.classes);
  }

  return classList
    .filter((item) => {
      return !!item;
    })
    .join(' ');
};

export const replaceFormInputWidthsToRem = (value: string): string => {
  const convertMap: { [key: string]: string } = {
    inputXs: 'calc(4rem / var(--fudis-rem-multiplier))',
    inputSm: 'calc(10rem / var(--fudis-rem-multiplier))',
    inputMd: 'calc(14rem / var(--fudis-rem-multiplier))',
    inputLg: 'calc(23rem / var(--fudis-rem-multiplier))',
  };

  const valueArray = value.split(' ');

  valueArray.forEach((value, index) => {
    valueArray[index] = convertMap?.[value] ? convertMap[value] : value;
  });

  return valueArray.join(' ');
};

/**
 * Utility function to convert parameters to either Grid CSS value 'grid-column-template' or CSS
 * grid item value 'grid-column'
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

  if (value !== 'start' && value !== 'stretch' && value !== 'end' && value !== 'center') {
    return replaceFormInputWidthsToRem(value);
  }

  return value;
};

/**
 * Determine Grid Input Properties based on if Service defaults should be ignored or if application
 * has provided values
 */
export const getValuesForCSSClasses = (
  properties: FudisGridPropertyCollection,
  serviceDefaults: boolean,
): FudisGridProperties => {
  const { defaultValues, serviceValues, appValues } = properties;

  if (!serviceDefaults) {
    /**
     * Set values from Inputs, if not provided, use default values. Ignore default values from
     * FudisGridService
     */
    return {
      width: appValues.width ?? defaultValues.width,
      align: appValues.align ?? defaultValues.align,
      alignItemsX: appValues.alignItemsX ?? defaultValues.alignItemsX,
      alignItemsY: appValues.alignItemsY ?? defaultValues.alignItemsY,
      rowGap: appValues.rowGap ?? defaultValues.rowGap,
      columnGap: appValues.columnGap ?? defaultValues.columnGap,
      classes: appValues.classes ?? defaultValues.classes,
    };
  } else {
    /**
     * Set values from Inputs, if not provided, check if FudisGridService has defaults, if not, use
     * defaults.
     */
    return {
      width: appValues.width ?? serviceValues.width ?? defaultValues.width,
      align: appValues.align ?? serviceValues.align ?? defaultValues.align,
      alignItemsX: appValues.alignItemsX ?? serviceValues.alignItemsX ?? defaultValues.alignItemsX,
      alignItemsY: appValues.alignItemsY ?? serviceValues.alignItemsY ?? defaultValues.alignItemsY,
      rowGap: appValues.rowGap ?? serviceValues.rowGap ?? defaultValues.rowGap,
      columnGap: appValues.columnGap ?? serviceValues.columnGap ?? defaultValues.columnGap,
      classes: appValues.classes ?? serviceValues.classes ?? defaultValues.classes,
    };
  }
};
