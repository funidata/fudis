import { FormControl, FormGroup } from '@angular/forms';
import { MatDateFormats, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { FudisLanguageAbbr } from './miscellaneous';

export const fudisInputSizeArray = ['sm', 'md', 'lg'] as const;

export type FudisInputSize = (typeof fudisInputSizeArray)[number];

export type FudisInputType = 'email' | 'number' | 'password' | 'tel' | 'text' | 'url';

export type FudisCheckboxOption<T extends object> = T & {
  /** Unique id for single checkbox option */
  id?: string;
  /** Name for the group of checkboxes */
  groupName?: string;
  /** If using FormGroup, name of the option */
  controlName?: string;
  /** Visible label that is shown in the UI */
  label: string;
  /** Is option selected */
  value?: boolean | null | undefined;
  /** To store additional data */
  [key: string]: unknown;
};

export interface FudisRadioButtonOption {
  /** Unique id for single radio button option */
  id?: string;
  /** Underlying value of the option */
  value: string | boolean | null;
  /** Value that is shown in the UI */
  label: string;
  /** Is option selected */
  checked?: boolean;
}

export type FudisSelectVariant = 'dropdown' | 'autocompleteDropdown' | 'autocompleteType';

export type FudisSelectOption<T extends object> = T & {
  /** Underlying value of the option */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  /** Value that is shown in the UI */
  label: string;
  /** Secondary, optional label for the option */
  subLabel?: string;
  /** Is option disabled in the dropdown */
  disabled?: boolean;
  /** Fudis generates an id for each SelectOption. This is used in internal logic. */
  fudisGeneratedHtmlId?: string;
  /** To store additional data */
  [key: string]: unknown;
};

export type FudisFormErrorSummaryItem = {
  id: string;
  formId: string;
  label: string;
  error: string;
  type: string;
  controlName: string | undefined;
  language: FudisLanguageAbbr;
};

export type FudisFormErrorSummaryRemoveItem = {
  id: string;
  formId: string | null;
  controlName: string | undefined;
  type: string;
};

export type FudisFormErrorSummaryFormsAndErrors = {
  [id: string]: FudisFormErrorSummaryObject;
};

export type FudisFormErrorSummaryError = {
  id: string;
  errors: FudisFormErrorSummaryObjectItemErrors;
  label: string;
  language: FudisLanguageAbbr;
};

export type FudisFormErrorSummaryObject = {
  [id: string]: {
    id: string;
    errors: FudisFormErrorSummaryObjectItemErrors;
    label: string;
    language: FudisLanguageAbbr;
  };
};

export type FudisFormErrorSummarySection = {
  id: string;
  formId: string;
  title: string;
};

export type FudisFormErrorSummarySectionObject = {
  [formId: string]: FudisFormErrorSummarySection[];
};

export type FudisFormErrorSummaryList = {
  id: string;
  message: string;
  element: HTMLElement | null;
};

export type FudisFormErrorSummaryObjectItemErrors = {
  [errorType: string]: string;
};

export type FudisDropdownLanguageOption =
  | { value: 'finnish'; label: 'FI' }
  | { value: 'swedish'; label: 'SV' }
  | { value: 'english'; label: 'EN' }
  | { value: FudisLanguageAbbr; label: string };

export interface FudisInputWithLanguageOptionsFormGroup {
  [language: string]: FormControl<string | null>;
}

export type FudisCheckboxGroupFormGroup<T extends object> = T & {
  [key: string]: FormControl<boolean | null | undefined>;
};

export type FudisCheckboxChangeEvent = {
  checkbox: FudisCheckboxOption<object>;
  control: FormControl<boolean | null | undefined>;
};

export type FudisCheckboxGroupChangeEvent = {
  changedControlName: string;
  formGroup: FormGroup<FudisCheckboxGroupFormGroup<object>>;
};

export interface FudisDateRangeItem {
  control: FormControl<Date | null>;
  label: string;
  helpText?: string;
  tooltip?: string;
}

export const FudisDateInputFormat = {
  dateInput: 'DD.MM.YYYY',
  monthYearLabel: 'MMM YYYY',
};

export const FUDIS_DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: FudisDateInputFormat as Intl.DateTimeFormatOptions,
  },
};

export type FudisFormErrorSummaryUpdateStrategy = 'reloadOnly' | 'all' | 'onRemove';
