import { FudisBreakpointKey } from './grid';
import { FudisSpacing } from './miscellaneous';

/**
 * Responsive settings for different breakpoints for spacing
 */
export type FudisSpacingResponsive = {
	[key in FudisBreakpointKey]?: FudisSpacing;
};

/**
 * Default spacing value if none is given
 */
export const defaultSpacingValue = '0';

/**
 * Object used to apply spacing for certain breakpoints
 */
export interface FudisSpacingResponsiveData {
	name: FudisBreakpointKey; // breakpoint e.g md, xl etc.
	value: string; // value to be applied to spacing attribute
	breakpoint: string; // breakpoint boundaries for this rule
}

type FudisSpacingValues = {
	[key in FudisSpacing | 'default']: string;
};

export const fudisSpacingValues: FudisSpacingValues = {
	xxs: '0.25rem',
	xs: '0.5rem',
	sm: '1rem',
	md: '1.5rem',
	lg: '2rem',
	xl: '2.5rem',
	xxl: '4rem',
	none: '0',
	default: defaultSpacingValue,
};

/**
 * Attributes for managing spacings
 */
export interface FudisSpacingAttributes {
	marginTop?: FudisSpacing | FudisSpacingResponsive;
	marginBottom?: FudisSpacing | FudisSpacingResponsive;
	marginRight?: FudisSpacing | FudisSpacingResponsive;
	marginLeft?: FudisSpacing | FudisSpacingResponsive;
}
