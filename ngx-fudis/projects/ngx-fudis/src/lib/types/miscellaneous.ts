import { SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Alert
 */
export const fudisAlertPositionArray = ['static', 'absolute', 'fixed'] as const;
export type FudisAlertPosition = (typeof fudisAlertPositionArray)[number];

export interface FudisAlert {
  message: Observable<string>;
  type: FudisNotification;
  id: string;
}

export interface FudisAlertElement extends FudisAlert {
  htmlId: string;
  buttonId: string;
  initialFocus: boolean;
}

/**
 * Badge
 */
export type FudisBadgeVariant = 'accent' | 'danger' | 'primary' | 'secondary' | 'success';

/**
 * Button
 */
export const fudisButtonVariantArray = ['primary', 'secondary', 'tertiary'] as const;
export type FudisButtonVariant = (typeof fudisButtonVariantArray)[number];

export const fudisButtonSizeArray = ['icon-only', 'small', 'medium'] as const;
export type FudisButtonSize = (typeof fudisButtonSizeArray)[number];

export const fudisButtonTypeArray = ['submit', 'button'] as const;
export type FudisButtonType = (typeof fudisButtonTypeArray)[number];

/**
 * Description List
 */
export type FudisDescriptionListVariant = 'regular' | 'compact';

export type FudisDescriptionListItemDetailLanguageContent = {
  [lang in FudisLanguageAbbr]?: { [id: string]: string | null | undefined };
};

/**
 * Dialog
 */
export const fudisDialogSizeArray = ['sm', 'md', 'lg', 'xl', 'initial'] as const;
export type FudisDialogSize = (typeof fudisDialogSizeArray)[number];

/**
 * Dropdown Menu
 */
export const fudisDropdownMenuAlignArray = ['left', 'center', 'right'] as const;
export type FudisDropdownMenuAlign = (typeof fudisDropdownMenuAlignArray)[number];

/**
 * Expandable
 */
export type FudisExpandableType = 'regular' | 'lite';

/**
 * Language Badge
 */
export type FudisLanguageAbbr = 'fi' | 'sv' | 'en';

/**
 * Notification
 */
export const fudisNotificationVariantArray = ['warning', 'danger', 'success', 'info'] as const;
export type FudisNotification = (typeof fudisNotificationVariantArray)[number];

/**
 * Tooltip
 */
export type FudisTooltipPosition = 'left' | 'right' | 'above' | 'below';

/**
 * Translation
 * TODO: Move to separate file
 */
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
    PLACEHOLDER: string;
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
  DROPDOWNMENU: {
    ITEM: {
      DISABLED: string;
    };
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
      SHOWING: string;
      RESULTS: string;
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
