import { getGridCssValue } from '../../directives/grid/gridUtils';
import {
  FudisBreakpointKey,
  FudisBreakpointStyleResponsive,
  FudisBreakpointValueResponsive,
  fudisBreakpointsMinWidth,
} from '../../types/breakpoints';
import { FudisGridColumnsResponsive } from '../../types/grid';
import { FudisSpacing, FudisSpacingResponsive, fudisSpacingValues } from '../../types/spacing';

/**
 * Returns an array of FudisBreakpointStyleResponsive objects that applies FudisSpacingValues for a
 * given breakpoints. Determines if breakpoint data consists FudisSpacing values, fractions or
 * numbers. If fractions or numbers are used, calls grid utility function that returns native grid
 * CSS layout properties as a value.
 */
export const getBreakpointRules = (
  values: FudisSpacingResponsive | FudisGridColumnsResponsive,
  defaultValue: string,
  isGridItem?: boolean,
): FudisBreakpointStyleResponsive[] => {
  const valueArray: FudisBreakpointStyleResponsive[] = [];

  /**
   * If application values do not contain default value, assign defaultValue from Grid components
   * gridColumnDefault type.
   */
  if (!values.default) {
    valueArray.push({
      name: 'default',
      value: defaultValue,
      breakpoint: fudisBreakpointsMinWidth.default,
    });
  }

  Object.keys(values).forEach((key) => {
    const value = values[key as keyof FudisBreakpointValueResponsive]!;

    const spacings: FudisSpacing[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

    // TODO: This if-else logic could probably be improved/refactored?
    // Check if value includes FudisSpacing tokens...
    if (spacings.includes(value as FudisSpacing)) {
      valueArray.push({
        name: key as keyof FudisBreakpointValueResponsive,
        value: fudisSpacingValues[value],
        breakpoint: fudisBreakpointsMinWidth[key as keyof FudisBreakpointValueResponsive],
      });
    }

    // ...else call grid utility function.
    // Grid columns can be set by fractions or by plain numbers so the array push should not get mixed up with spacings.
    // Returns e. g. following object:
    // [
    //   {
    //       "name": "default",
    //       "value": "1fr",
    //       "breakpoint": "(min-width: 0)"
    //   },
    //   {
    //       "name": "md",
    //       "value": "1fr 2fr",
    //       "breakpoint": "(min-width: 48em)"
    //   },
    //   {
    //       "name": "xxl",
    //       "value": "repeat(6, 1fr)",
    //       "breakpoint": "(min-width: 100em)"
    //   }
    // ]
    else {
      const valueToForward = getGridCssValue(value, isGridItem);

      valueArray.push({
        name: key as keyof FudisBreakpointValueResponsive,
        value: valueToForward,
        breakpoint: fudisBreakpointsMinWidth[key as keyof FudisGridColumnsResponsive],
      });
    }
  });

  return valueArray;
};

/**
 * Builds, sorts and validates breakpoint data
 */
export const getBreakpointDataArray = (
  value: FudisSpacingResponsive | FudisGridColumnsResponsive,
  defaultValue: string,
  isGridItem?: boolean,
): FudisBreakpointStyleResponsive[] => {
  const valueArray: FudisBreakpointStyleResponsive[] = getBreakpointRules(
    value,
    defaultValue,
    isGridItem,
  );

  const sortOrder: FudisBreakpointKey[] = ['default', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

  const sortedValueArray = valueArray.sort((a, b) => {
    return sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name);
  });

  return sortedValueArray;
};
