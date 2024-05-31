import { SimpleChange } from '@angular/core';

export type FudisBadgeVariant = 'accent' | 'danger' | 'primary' | 'secondary' | 'success';

export type FudisDescriptionListVariant = 'regular' | 'compact';

export type FudisDescriptionListItemDetailInfo = {
  id: string;
  language: FudisLanguageAbbr;
};

export type FudisLanguageBadgeContent = {
  [lang in FudisLanguageAbbr]?: { [id: string]: string | null | undefined };
};

export type FudisLanguageOption =
  | { value: 'finnish'; label: 'FI' }
  | { value: 'swedish'; label: 'SV' }
  | { value: 'english'; label: 'EN' }
  | { value: string | FudisLanguageAbbr; label: string };

export interface FudisLanguageBadgeTranslations {
  en?: string;
  sv?: string;
  fi?: string;
}

export interface FudisAlert {
  message: string;
  type: FudisNotification;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routerLinkUrl?: string | any[] | null;
  linkTitle?: string;
  id: string;
}

export interface FudisAlertElement extends FudisAlert {
  htmlId: string;
  buttonId: string;
  initialFocus: boolean;
}

export type FudisDialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'initial';

export type FudisExpandableType = 'regular' | 'lite';

export const fudisSpacingArray = ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

export type FudisSpacing = (typeof fudisSpacingArray)[number];

export type FudisNotification = 'warning' | 'danger' | 'success' | 'info';

export type FudisTooltipPosition = 'left' | 'right' | 'above' | 'below';

export const fudisTextAlignArray = ['left', 'right', 'center'] as const;

export type FudisTextAlign = (typeof fudisTextAlignArray)[number];

export type FudisLanguageAbbr = 'fi' | 'sv' | 'en';

export type FudisLinkColor = 'primary-dark' | 'gray-dark' | 'white';

export interface FudisTranslationConfig {
  BREADCRUMBS: {
    // Prefix visible to screen reader
    PREFIX: string;
  };
  // Shown with form inputs
  REQUIRED: string;
  // Necessary keys for ngMaterial Datepicker
  DATEPICKER: {
    CALENDAR: string;
    CLOSE: string;
    OPEN: string;
    PREV_MONTH: string;
    NEXT_MONTH: string;
    PREV_YEAR: string;
    NEXT_YEAR: string;
    PREV_MULTIYEAR: string;
    NEXT_MULTIYEAR: string;
    SWITCH_MONTH_VIEW: string;
    SWITCH_MULTIYEAR_VIEW: string;
    // Error message keys for universal Datepicker and Date Range validation
    VALIDATION: {
      START_DATE_INVALID: string;
      END_DATE_INVALID: string;
      DATE_PARSE: string;
    };
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
  SELECT: {
    DISABLED: string;
    OPEN_DROPDOWN: string;
    CLOSE_DROPDOWN: string;
    MULTISELECT: {
      REMOVE_ITEM: string;
    };
    AUTOCOMPLETE: {
      // Clear filter button label for screen readers
      CLEAR: string;
      NO_RESULTS: string;
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

/**
 * Types for extending ngOnChanges SimpleChanges type
 * T = any FudisComponent which have @Input() properties
 * P = property of component. E. g. for Grid columns and rowGap or for Heading level and size.
 * So T[P] translates to e.g. HeadingComponent['level'] --> HeadingComponent.level --> values from 1-6
 */
interface FudisComponentChange<T, P extends keyof T> extends SimpleChange {
  previousValue: T[P] | undefined;
  currentValue: T[P] | undefined;
  firstChange: boolean;
}

export type FudisComponentChanges<T> = {
  [P in keyof T]?: FudisComponentChange<T, P>;
};
