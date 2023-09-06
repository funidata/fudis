import { FudisBreakpointKey } from '../../types/grid';
import { FudisSpacing } from '../../types/miscellaneous';
import { FudisSpacingResponsive, FudisSpacingResponsiveData } from '../../types/spacing';
import { fudisBreakpointsMinWidth } from '../breakpoint/breakpoint-utils';

/**
 * Convert spacing tokens to rem values
 */
export const convertSpacingTokenToRem = (value: FudisSpacing): string => {
	const tokenXxs: FudisSpacing = 'xxs';
	const tokenXs: FudisSpacing = 'xs';
	const tokenSm: FudisSpacing = 'sm';
	const tokenMd: FudisSpacing = 'md';
	const tokenLg: FudisSpacing = 'lg';
	const tokenXl: FudisSpacing = 'xl';
	const tokenXxl: FudisSpacing = 'xxl';

	let convertedValue: string = '';
	switch (value) {
		case 'xxs': {
			convertedValue = value.replace(tokenXxs, '0.25rem');
			break;
		}
		case 'xs': {
			convertedValue = value.replace(tokenXs, '0.5rem');
			break;
		}
		case 'sm': {
			convertedValue = value.replace(tokenSm, '1rem');
			break;
		}
		case 'md': {
			convertedValue = value.replace(tokenMd, '1.5rem');
			break;
		}
		case 'lg': {
			convertedValue = value.replace(tokenLg, '2rem');
			break;
		}
		case 'xl': {
			convertedValue = value.replace(tokenXl, '2.5rem');
			break;
		}
		case 'xxl': {
			convertedValue = value.replace(tokenXxl, '4rem');
			break;
		}
		default:
			convertedValue = '0';
	}

	return convertedValue;
};

export const getSpacingBreakpointRules = (
	values: FudisSpacingResponsive,
	defaultValue: string
): FudisSpacingResponsiveData[] => {
	const spacingsArray: FudisSpacingResponsiveData[] = [];

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
			value: convertSpacingTokenToRem(spacingValue),
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
): FudisSpacingResponsiveData[] => {
	const spacingsArray: FudisSpacingResponsiveData[] = getSpacingBreakpointRules(value, defaultValue);

	const sortOrder: FudisBreakpointKey[] = ['default', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

	const sortedSpacingsArray = spacingsArray.sort((a, b) => {
		return sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name);
	});

	return sortedSpacingsArray;
};
