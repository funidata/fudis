import { FormControl, FormGroup } from '@angular/forms';
import { MatDateFormats, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';

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

export type FudisRadioButtonOption<T extends object> = T & {
  /** Generated id for single radio option */
  id?: string;
  /** Underlying value of the option */
  value: string | boolean | null | unknown;
  /** Value that is shown in the UI */
  label: string;
  /** To store additional data */
  [key: string]: unknown;
};

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

export type FudisLocalizedTextGroupOptions =
  | { controlName: 'fi'; label: 'FI' }
  | { controlName: 'sv'; label: 'SV' }
  | { controlName: 'en'; label: 'EN' }
  | { controlName: string; label: string };

export type FudisLocalizedTextGroup<T extends object> = T & {
  [lang: string | 'fi' | 'sv' | 'en']: FormControl<string | null>;
};

export type FudisCheckboxGroupFormGroup = {
  [key: string]: FormControl<boolean | null | undefined>;
};

export type FudisCheckboxChangeEvent = {
  checkbox: FudisCheckboxOption<object>;
  control: FormControl<boolean | null | undefined>;
};

export type FudisCheckboxGroupChangeEvent = {
  changedControlName: string;
  formGroup: FormGroup<FudisCheckboxGroupFormGroup>;
};

export type FudisRadioButtonChangeEvent = {
  option: FudisRadioButtonOption<object>;
  control: FormControl<unknown>;
};

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
