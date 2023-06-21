import { FudisSpacing } from './spacing';

/**
 * -------------------------------------------
 * Common types shared with Grid and Grid Item
 * -------------------------------------------
 */

/**
 * Object used to apply styles for certain breakpoints
 */
export interface GridResponsiveData {
	name: BreakpointKey; // e. g. XL or other size
	value: string; // value to be applied to CSS grid-template-columns or grid-column attribute
	breakpoint: string; // breakpoint boundaries for this rule.
}

/**
 * Breakpoint keys to watch
 */
export type BreakpointKey = 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

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
export type GridWidth = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'initial';

/**
 * Alignment of whole Grid inside its container. For items inside the Grid use alignItemsX and alignItemsY.
 */
export type GridAlign = 'start' | 'end' | 'center';

/**
 * Alignment of Grid Items inside a Grid
 */
export type GridAlignItems = 'start' | 'center' | 'end' | 'stretch';

/**
 * Margins on left and right side of the grid
 */
export type GridMarginSide = 'responsive' | 'none';

/**
 * Spacing between columns and rows inside Grid
 */
export type GridGap = FudisSpacing | 'responsive';

/**
 * Input object from application to provide responsive settings for different breakpoints for Grid
 */
export type GridColumnsResponsive = {
	[key in BreakpointKey]?: string | number;
};

/**
 * Attributes for managing Grid
 */
export interface GridAttributes {
	width: GridWidth;
	align: GridAlign;
	marginTop: FudisSpacing;
	marginBottom: FudisSpacing;
	rowGap: GridGap;
	columnGap: GridGap;
	marginSides: GridMarginSide;
	classes: string[];
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
export type GridItemAlignment = 'start' | 'end' | 'center' | 'stretch';

/**
 * Input value for width of Grid Item
 */
export type GridItemWidth = number | string | 'stretch' | 'auto';

/**
 * Input object from application to provide responsive settings for different breakpoints for Grid Item
 */
export type GridItemResponsive = {
	[K in BreakpointKey]?: GridItemWidth;
};
