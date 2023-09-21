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
 * Margins on left and right side of the grid
 */
export type FudisGridMarginSide = 'responsive' | 'none';

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
export interface FudisGridAttributes {
	alignItemsY?: FudisGridAlignItems;
	alignItemsX?: FudisGridAlignItems;
	columns?: FudisBreakpointValueResponsive;
	width?: FudisGridWidth;
	align?: FudisGridAlign;
	marginTop?: FudisSpacing;
	marginBottom?: FudisSpacing;
	rowGap?: FudisGridGap;
	columnGap?: FudisGridGap;
	marginSides?: FudisGridMarginSide;
	classes?: string[];
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

export type FudisGridFormInputWidth = 'inputXs' | 'inputSm' | 'inputMd' | 'inputLg';
