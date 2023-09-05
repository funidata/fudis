import { FudisSpacing } from '../../types/miscellaneous';

/**
 * Convert spacing tokens to rem values
 * TODO: Try out with switch case
 */
export const convertSpacingTokenToRem = (value: string): string => {
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
