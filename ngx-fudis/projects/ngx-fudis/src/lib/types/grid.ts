import { FudisBreakpointKey } from './breakpoint-keys';
import { FudisBreakpointValueResponsive } from './breakpoints';
import { FudisSpacing } from './spacing';

// --------------------
//
// Grid related types
//
// --------------------

/**
 * Default 'columns' value for Grid component
 */
export const gridColumnDefault = '1fr';

export const gridInputPropertyDefaults: FudisDefaultGridProperties = {
  align: 'start',
  alignItemsX: 'stretch',
  alignItemsY: 'stretch',
  classes: undefined,
  columnGap: 'responsive',
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
 * Alignment of whole Grid inside its container. For items inside the Grid use alignItemsX and
 * alignItemsY.
 */
export type FudisGridAlign = 'start' | 'end' | 'center';

/**
 * Alignment of Grid Items inside a Grid
 */
export const fudisGridAlignItemsArray = ['start', 'center', 'end', 'stretch', 'baseline'] as const;
export type FudisGridAlignItems = (typeof fudisGridAlignItemsArray)[number];

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
 * Base attributes for managing Grid
 */
interface FudisGridBase {
  align?: FudisGridAlign;
  alignItemsY?: FudisGridAlignItems;
  alignItemsX?: FudisGridAlignItems;
  classes?: string;
  columnGap?: FudisGridGap;
  rowGap?: FudisGridGap;
  width?: FudisGridWidth;
}

/**
 * Attributes for managing Grid properties
 */
export interface FudisGridProperties extends FudisGridBase {
  columns?: FudisBreakpointValueResponsive | string | number;
}

/**
 * Attributes for managing Grid defaults
 */
export interface FudisDefaultGridProperties extends FudisGridBase {
  columns?: FudisBreakpointValueResponsive;
}

export interface FudisGridPropertyCollection {
  appValues: FudisGridProperties;
  defaultValues: FudisDefaultGridProperties;
  serviceValues: FudisDefaultGridProperties;
}

// --------------------
//
// Grid Item related types
//
// --------------------

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
 * Input object from application to provide responsive settings for different breakpoints for Grid
 * Item
 */
export type FudisGridItemColumnsResponsive = {
  [K in FudisBreakpointKey]?: FudisGridItemWidth;
};

/**
 * Grid input widths
 */
export type FudisGridFormInputWidth = 'inputXs' | 'inputSm' | 'inputMd' | 'inputLg';
