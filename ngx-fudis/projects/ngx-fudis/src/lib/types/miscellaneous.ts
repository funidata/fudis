export type FudisBadgeVariant = 'accent' | 'danger' | 'primary' | 'secondary' | 'success';

export interface FudisDescriptionListItem {
	key: string;
	subHeading?: string;
	value: string;
}

export type FudisExpandableType = 'regular';

export type FudisSpacing = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type FudisTooltipPosition = 'left' | 'right' | 'above' | 'below';

export type FudisLanguageAbbr = 'fi' | 'sv' | 'en';

export interface FudisTranslationConfig {
	// Shown with form inputs
	REQUIRED: string;
	DATEPICKER: {
		// Label for close button
		CLOSE: string;
	};
	DIALOG: {
		// Label for close button
		CLOSE?: string;
	};
	INPUT_WITH_LANGUAGE_OPTIONS: {
		// Label for language selection dropdown
		LANGUAGE: string;
		// Text shown in dropdown options if input for a language is missing
		MISSING: string;
	};
	LINK: {
		// External link icon aria-label
		EXTERNAL_LINK: string;
	};
	// Clear filter button label for screen readers
	AUTOCOMPLETE: {
		CLEAR: string;
	};
	ICON: {
		// Alternative text for screen readers. Used in e. g. Error Summary
		ATTENTION: string;
	};
}
