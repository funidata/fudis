import { FudisBreakpointKey } from './breakpoints';

export const fudisSpacingArray = ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

export type FudisSpacing = (typeof fudisSpacingArray)[number];

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
 * Spacing tokens
 * TODO: Would be better to not allow string type since we only want to allow spacing directive to take in predefined spacing token values.
 * This affects in breakpoint-utils.ts when pushing new spacing value to FudisBreakpointStyleResponsive array
 */
type FudisSpacingValues = {
  [key in FudisSpacing | 'default' | string]: string;
};

/**
 * Fudis spacing tokens converted to rem values
 */
export const fudisSpacingValues: FudisSpacingValues = {
  xxs: 'calc(0.25rem / var(--fudis-rem-multiplier))',
  xs: 'calc(0.5rem / var(--fudis-rem-multiplier))',
  sm: 'calc(1rem / var(--fudis-rem-multiplier))',
  md: 'calc(1.5rem / var(--fudis-rem-multiplier))',
  lg: 'calc(2rem / var(--fudis-rem-multiplier))',
  xl: 'calc(2.5rem / var(--fudis-rem-multiplier))',
  xxl: 'calc(4rem / var(--fudis-rem-multiplier))',
  none: '0',
  default: defaultSpacingValue,
};
