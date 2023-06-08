import { Spacing } from './spacing';

/**
 * Grid Item related types
 */

export interface GridResponsiveData {
	name: BreakpointKey; // e. g. XL or other size
	value: string; // value to be applied to CSS grid-template-columns attribute
	breakpoint: string; // breakpoint boundaries for this rule to happen
}

export const gridColumnDefault = '1fr';

export type GridWidth = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export type GridAlign = 'left' | 'right' | 'center';

export type GridAlignItems = 'start' | 'center' | 'end' | 'stretch';

export type GridMarginSide = 'responsive' | 'none';

export type GridGap = Spacing | 'responsive';

export type BreakpointKey = 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type GridColumnsResponsive = {
	[key in BreakpointKey]?: string | number;
};

export interface GridAttributes {
	width: GridWidth;
	align: GridAlign;
	marginTop: Spacing;
	marginBottom: Spacing;
	rowGap: GridGap;
	columnGap: GridGap;
	marginSides: GridMarginSide;
	classes: string[];
}

/**
 * Grid Item related types
 */

export const gridItemDefault: GridItemDefault = 'auto';

export type GridItemDefault = 'auto';

export type GridItemAlignment = 'start' | 'end' | 'center' | 'stretch';

export type GridItemWidth = number | string | 'stretch' | GridItemDefault;

export type GridItemResponsive = {
	[K in BreakpointKey]?: GridItemWidth;
};
