export type FudisBadgeVariant = 'accent' | 'danger' | 'primary' | 'secondary' | 'success';

export type FudisDescriptionListVariant = 'regular' | 'compact';

export interface FudisDescriptionListItem {
	key: string;
	subHeading?: string;
	value: string;
}

export type FudisDescriptionListItemDetailInfo = {
	id: string;
	language: FudisLanguageAbbr;
};

export type FudisLanguageOption =
	| { value: 'finnish'; viewValue: 'FI' }
	| { value: 'swedish'; viewValue: 'SV' }
	| { value: 'english'; viewValue: 'EN' }
	| { value: string | FudisLanguageAbbr; viewValue: string };

export interface FudisLanguageBadgeTranslations {
	en?: string;
	sv?: string;
	fi?: string;
}

export interface FudisAlert {
	message: string;
	type: FudisNotification;
	routerLinkUrl?: string | any[] | null;
	linkTitle?: string;
	id: string;
}

export interface FudisAlertElement extends FudisAlert {
	htmlId: string;
	buttonId: string;
	initialFocus: boolean;
}

export type FudisExpandableType = 'regular' | 'lite';

export type FudisSpacing = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type FudisNotification = 'warning' | 'danger' | 'success' | 'info';

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
		CLOSE: string;
	};
	INPUT_WITH_LANGUAGE_OPTIONS: {
		// Label for language selection dropdown
		LANGUAGE: string;
		// Text shown in dropdown options if input for a language is missing
		MISSING: string;
		// Assistive text of max character count for screen readers
		MAX_LENGTH: string;
	};
	LINK: {
		// External link icon aria-label
		EXTERNAL_LINK: string;
	};
	AUTOCOMPLETE: {
		// Clear filter button label for screen readers
		CLEAR: string;
		MULTISELECT: {
			OPEN_DROPDOWN: string;
			CLOSE_DROPDOWN: string;
			NO_RESULTS: string;
			REMOVE_ITEM: string;
		};
	};
	IMAGE: {
		// Alternative text for screen readers.
		FUNIDATA_LOGO: string;
	};
	ICON: {
		// Alternative text for screen readers. Used in e. g. Error Summary
		ATTENTION: string;
	};
	LANGUAGE_BADGE: {
		ARIA_LABEL: FudisTranslationLanguageBadgeAriaLabel;
	};
	TEXTAREA: {
		// Assistive text of max character count for screen readers
		MAX_LENGTH: string;
	};
	TEXTINPUT: {
		// Assistive text of max character count for screen readers
		MAX_LENGTH: string;
	};
	ALERT: {
		HEADING_LABEL: string;
	};
}

export interface FudisTranslationLanguageBadgeAriaLabel {
	FI: string;
	SV: string;
	EN: string;
	TRANSLATIONS: string;
	SELECTED: string;
	MISSING_TRANSLATION: string;
}
