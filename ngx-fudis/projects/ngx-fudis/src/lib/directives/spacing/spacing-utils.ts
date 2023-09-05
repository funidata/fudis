import { FudisBreakpointKey } from '../../types/grid';
import { FudisSpacing } from '../../types/miscellaneous';
import { FudisSpacingResponsive, FudisSpacingResponsiveData } from '../../types/spacing';

/**
 * Convert spacing tokens to rem values
 * TODO: Try out with switch case
 */
export const convertSpacingTokenToRem = (value: FudisSpacing): string => {
	const tokenXxs: FudisSpacing = 'xxs';
	const tokenXs: FudisSpacing = 'xs';
	const tokenSm: FudisSpacing = 'sm';
	const tokenMd: FudisSpacing = 'md';
	const tokenLg: FudisSpacing = 'lg';
	const tokenXl: FudisSpacing = 'xl';
	const tokenXxl: FudisSpacing = 'xxl';

	return value
		.replaceAll(tokenXxs, '0.25rem')
		.replaceAll(tokenXs, '0.5rem')
		.replaceAll(tokenSm, '1rem')
		.replaceAll(tokenMd, '1.5rem')
		.replaceAll(tokenLg, '2rem')
		.replaceAll(tokenXxl, '4rem')
		.replaceAll(tokenXl, '2.5rem');
};

// TODO: Below is duplicate code from gridUtils --> refactor
/**
 * Utility object used with breakpointsMinWidthToObserve and BreakpointObserver
 */
export const spacingBreakpointsMinWidth = {
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
	spacingBreakpointsMinWidth.xxl,
	spacingBreakpointsMinWidth.xl,
	spacingBreakpointsMinWidth.lg,
	spacingBreakpointsMinWidth.md,
	spacingBreakpointsMinWidth.sm,
	spacingBreakpointsMinWidth.xs,
	spacingBreakpointsMinWidth.default,
];

export const getSpacingBreakpointRules = (
	values: FudisSpacingResponsive,
	defaultValue: string
): FudisSpacingResponsiveData[] => {
	const spacingsArray: FudisSpacingResponsiveData[] = [];

	if (!values.default) {
		spacingsArray.push({
			name: 'default',
			value: defaultValue,
			breakpoint: spacingBreakpointsMinWidth.default,
		});
	}

	Object.keys(values).forEach((key) => {
		const spacingValue: FudisSpacing = values[key as keyof FudisSpacingResponsive]!;

		spacingsArray.push({
			name: key as keyof FudisSpacingResponsive,
			value: convertSpacingTokenToRem(spacingValue),
			breakpoint: spacingBreakpointsMinWidth[key as keyof FudisSpacingResponsive],
		});
	});

	return spacingsArray;
};

/**
 * Builds, sorts and validates spacings
 */
export const getSpacingBreakpointDataArray = (
	value: FudisSpacingResponsive,
	defaultValue: string
): FudisSpacingResponsiveData[] => {
	const spacingsArray: FudisSpacingResponsiveData[] = getSpacingBreakpointRules(value, defaultValue);

	const sortOrder: FudisBreakpointKey[] = ['default', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

	const sortedSpacingsArray = spacingsArray.sort((a, b) => {
		return sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name);
	});

	return sortedSpacingsArray;
};
