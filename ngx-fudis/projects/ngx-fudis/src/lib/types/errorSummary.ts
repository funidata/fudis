import { WritableSignal } from '@angular/core';

/**
 * To add Error to Error Summary
 */
export type FudisErrorSummaryNewError = {
  id: string;
  formId: string;
  label: string;
  error: string;
  type: string;
  controlName: string | undefined;
};

/**
 * To remove Error from Error Summary
 */
export type FudisErrorSummaryRemoveError = {
  id: string;
  formId: string | null;
  controlName: string | undefined;
  type: string;
};

/**
 * Collection of all Errors by th
 */
export type FudisErrorSummaryErrors = {
  [id: string]: FudisErrorSummaryObject;
};

export type FudisErrorSummaryErrorsSignal = {
  [id: string]: FudisErrorSummaryObjectSignal;
};

export type FudisErrorSummaryObjectSignal = WritableSignal<FudisErrorSummaryObject>;

export type FudisErrorSummaryObject = {
  [id: string]: {
    id: string;
    errors: FudisErrorSummaryObjectItemErrors;
    label: string;
  };
};

export type FudisErrorSummaryObjectItemErrors = {
  [errorType: string]: string;
};

export type FudisFormErrorSummaryUpdateStrategy = 'reloadOnly' | 'all' | 'onRemove';
