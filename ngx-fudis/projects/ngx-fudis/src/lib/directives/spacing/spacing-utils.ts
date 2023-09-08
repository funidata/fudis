import { FudisBreakpointKey, FudisBreakpointStyleResponsive, fudisBreakpointsMinWidth } from '../../types/breakpoints';
import { FudisSpacing } from '../../types/miscellaneous';
import { FudisSpacingResponsive, fudisSpacingValues } from '../../types/spacing';

export const getSpacingBreakpointRules = (
	values: FudisSpacingResponsive,
	defaultValue: string
): FudisBreakpointStyleResponsive[] => {
	const spacingsArray: FudisBreakpointStyleResponsive[] = [];

	if (!values.default) {
		spacingsArray.push({
			name: 'default',
			value: defaultValue,
			breakpoint: fudisBreakpointsMinWidth.default,
		});
	}

	Object.keys(values).forEach((key) => {
		const spacingValue: FudisSpacing = values[key as keyof FudisSpacingResponsive]!;

		spacingsArray.push({
			name: key as keyof FudisSpacingResponsive,
			value: fudisSpacingValues[spacingValue],
			breakpoint: fudisBreakpointsMinWidth[key as keyof FudisSpacingResponsive],
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
): FudisBreakpointStyleResponsive[] => {
	const spacingsArray: FudisBreakpointStyleResponsive[] = getSpacingBreakpointRules(value, defaultValue);

	const sortOrder: FudisBreakpointKey[] = ['default', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

	const sortedSpacingsArray = spacingsArray.sort((a, b) => {
		return sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name);
	});

	return sortedSpacingsArray;
};
