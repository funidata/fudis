import { Spacing } from './spacing';

export interface GridInputColumnObject {
	name: string; // e. g. XL or other size
	value: string; // value to be applied to CSS grid-template-columns attribute
	breakpoint: string; // breakpoint boundaries for this rule to happen
}

export type GridWidth = 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs';

export type GridAlign = 'left' | 'right' | 'center';

export type GridAlignItems = 'start' | 'center' | 'end' | 'stretch';

export type GridMargin = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'none';

export type GridMarginSide = 'responsive' | 'none';

export type GridGap = Spacing | 'responsive';

export interface GridAttributes {
	width: GridWidth;
	align: GridAlign;
	marginTop: GridMargin;
	marginBottom: GridMargin;
	rowGap: GridGap;
	columnGap: GridGap;
	marginSides: GridMarginSide;
	classes: string[];
}
