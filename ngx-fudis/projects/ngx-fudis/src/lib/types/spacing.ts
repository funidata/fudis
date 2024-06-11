import { FudisBreakpointKey, FudisBreakpointValueResponsive } from './breakpoints';
import { convertToRemValue } from '../utilities/rem-converter';

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
  xxs: convertToRemValue(0.25),
  xs: convertToRemValue(0.5),
  sm: convertToRemValue(1),
  md: convertToRemValue(1.5),
  lg: convertToRemValue(2),
  xl: convertToRemValue(2.5),
  xxl: convertToRemValue(4),
  none: '0',
  default: defaultSpacingValue,
};

/**
 * Attributes for managing spacings
 */
export interface FudisSpacingAttributes {
  marginTop?: FudisSpacing | FudisBreakpointValueResponsive;
  marginBottom?: FudisSpacing | FudisBreakpointValueResponsive;
  marginRight?: FudisSpacing | FudisBreakpointValueResponsive;
  marginLeft?: FudisSpacing | FudisBreakpointValueResponsive;
}
