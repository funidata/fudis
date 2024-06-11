import { FudisSpacing } from './spacing';

type FudisBreakpointsMinWidths = {
  [key in FudisBreakpointKey]: FudisBreakpointBoundary;
};

/**
 * Utility object used with breakpointsMinWidthToObserve and BreakpointObserver
 */
export const fudisBreakpointsMinWidth: FudisBreakpointsMinWidths = {
  xxl: '(min-width: 100em)',
  xl: '(min-width: 75em)',
  lg: '(min-width: 62em)',
  md: '(min-width: 48em)',
  sm: '(min-width: 36em)',
  xs: '(min-width: 0)',
  default: '(min-width: 0)',
};

/*
 * Array of breakpoint rules to observe, which is given to ngMaterial BreakpointObserver
 */
export const breakpointsMinWidthToObserve: FudisBreakpointBoundary[] = [
  fudisBreakpointsMinWidth.xxl,
  fudisBreakpointsMinWidth.xl,
  fudisBreakpointsMinWidth.lg,
  fudisBreakpointsMinWidth.md,
  fudisBreakpointsMinWidth.sm,
  fudisBreakpointsMinWidth.xs,
  fudisBreakpointsMinWidth.default,
];

/**
 * All the allowed style attributes that can be given to Grid or Spacing
 */
export type FudisBreakpointStyleProperty =
  | 'margin-top'
  | 'margin-bottom'
  | 'margin-right'
  | 'margin-left'
  | 'grid-column'
  | 'grid-template-columns'
  | 'justify-self'
  | 'align-self';

/**
 * Object used to apply styles for certain breakpoints
 */
export interface FudisBreakpointStyleResponsive {
  name: FudisBreakpointKey; // breakpoint e.g md, xl etc.
  value: string; // value to be applied to spacing attribute
  breakpoint: string; // breakpoint boundaries for this rule
}

/**
 * Responsive settings for different breakpoints
 */
export type FudisBreakpointValueResponsive = {
  [key in FudisBreakpointKey]?: FudisSpacing | string | number;
};

/**
 * Breakpoint keys to watch
 */
export type FudisBreakpointKey = 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type FudisBreakpointBoundary =
  | '(min-width: 100em)'
  | '(min-width: 75em)'
  | '(min-width: 62em)'
  | '(min-width: 48em)'
  | '(min-width: 36em)'
  | '(min-width: 0)';
