import { FudisBreakpointKey, FudisBreakpointValueResponsive } from './breakpoints';
import { FudisSpacing } from './miscellaneous';

/**
 * -------------------------------------------
 * Grid related types
 * -------------------------------------------
 */

/**
 * Default 'columns' value for Grid component
 */
export const gridColumnDefault = '1fr';

export const gridInputPropertyDefaults: FudisGridProperties = {
  align: 'start',
  alignItemsX: 'stretch',
  alignItemsY: 'stretch',
  classes: [],
  columnGap: 'responsive',
  marginTop: 'none',
  marginBottom: 'none',
  rowGap: 'responsive',
  width: 'xxl',
};

/**
 * Grid Columns property accepted input values
 */
export type FudisGridColumns = string | number | FudisGridColumnsResponsive;

/**
 * Grid widths
 */
export type FudisGridWidth = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'initial';

/**
 * Alignment of whole Grid inside its container. For items inside the Grid use alignItemsX and alignItemsY.
 */
export type FudisGridAlign = 'start' | 'end' | 'center';

/**
 * Alignment of Grid Items inside a Grid
 */
export type FudisGridAlignItems = 'start' | 'center' | 'end' | 'stretch';

/**
 * Spacing between columns and rows inside Grid
 */
export type FudisGridGap = FudisSpacing | 'responsive';

/**
 * Input object from application to provide responsive settings for different breakpoints for Grid
 */
export type FudisGridColumnsResponsive = {
  [key in FudisBreakpointKey]?: string | number;
};

/**
 * Attributes for managing Grid
 */
export interface FudisGridProperties {
  align?: FudisGridAlign;
  alignItemsY?: FudisGridAlignItems;
  alignItemsX?: FudisGridAlignItems;
  classes?: string[];
  columns?: FudisBreakpointValueResponsive;
  columnGap?: FudisGridGap;
  marginBottom?: FudisSpacing;
  marginTop?: FudisSpacing;
  rowGap?: FudisGridGap;
  width?: FudisGridWidth;
}

export interface FudisGridPropertyCollection {
  appValues: FudisGridProperties;
  defaultValues: FudisGridProperties;
  serviceValues: FudisGridProperties;
}

/**
 * -------------------------------------------
 * Grid Item related types
 * -------------------------------------------
 */

/**
 * Default value for 'columns' input of Grid Item
 */
export const gridItemDefault = 'auto';

/**
 * Alignment of Grid Item inside Grid
 */
export type FudisGridItemAlignment = 'start' | 'end' | 'center' | 'stretch';

/**
 * Alignment of Grid Item inside Grid for varying breakpoints
 */
export type FudisGridItemAlignResponsive = {
  [K in FudisBreakpointKey]?: FudisGridItemAlignment;
};

/**
 * Input value for width of Grid Item
 */
export type FudisGridItemWidth = number | string | 'stretch' | 'auto';

/**
 * Input object from application to provide responsive settings for different breakpoints for Grid Item
 */
export type FudisGridItemColumnsResponsive = {
  [K in FudisBreakpointKey]?: FudisGridItemWidth;
};

/**
 * Grid input widths
 */
export type FudisGridFormInputWidth = 'inputXs' | 'inputSm' | 'inputMd' | 'inputLg';
