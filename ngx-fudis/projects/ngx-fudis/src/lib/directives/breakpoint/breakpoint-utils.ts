/**
 * Utility object used with breakpointsMinWidthToObserve and BreakpointObserver
 */
export const fudisBreakpointsMinWidth = {
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
export const breakpointsMinWidthToObserve = [
	fudisBreakpointsMinWidth.xxl,
	fudisBreakpointsMinWidth.xl,
	fudisBreakpointsMinWidth.lg,
	fudisBreakpointsMinWidth.md,
	fudisBreakpointsMinWidth.sm,
	fudisBreakpointsMinWidth.xs,
	fudisBreakpointsMinWidth.default,
];
