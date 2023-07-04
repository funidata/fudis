export type FudisBadgeVariant = 'accent' | 'danger' | 'primary' | 'secondary' | 'success';

export interface FudisDescriptionListItem {
	key: string;
	subHeading?: string;
	value: string;
	language?: FudisLanguageOptions;
}

export interface FudisLanguageOptions {
	language: string[];
}

export type FudisExpandableType = 'regular';

export type FudisSpacing = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type FudisTooltipPosition = 'left' | 'right' | 'above' | 'below';
