import { Spacing } from './spacing';

export interface GridInputColumnObject {
	name: string; // e. g. XL or other size
	value: string; // value to be applied to CSS grid-template-columns attribute
	breakpoint: string; // breakpoint boundaries for this rule to happen
}

export type GridWidth = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export type GridAlign = 'left' | 'right' | 'center';

export type GridAlignItems = 'start' | 'center' | 'end' | 'stretch';

export type GridMarginSide = 'responsive' | 'none';

export type GridGap = Spacing | 'responsive';

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
