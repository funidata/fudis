import { WritableSignal } from '@angular/core';

/**
 * To add Error to Error Summary
 */
export type FudisErrorSummaryNewError = {
  formId: string;
  focusId: string;
  id: string;
  message: string;
};

/**
 * To remove Error from Error Summary
 */
export type FudisErrorSummaryRemoveError = {
  formId: string;
  focusId: string;
  id: string;
  message?: string;
};

/**
 * Collection of all errors of each Form.
 */
export type FudisErrorSummaryAllErrors = {
  [formId: string]: FudisErrorSummaryFormErrors;
};

/**
 * Collection of all errors of each Form as nested Signal
 */
export type FudisErrorSummaryAllErrorsSignal = {
  [formId: string]: WritableSignal<FudisErrorSummaryFormErrors>;
};

/**
 * Collection of single Forms errors
 */
export type FudisErrorSummaryFormErrors = {
  [formFieldId: string]: { [errorId: string]: string };
};

export type FudisFormErrorSummaryUpdateStrategy = 'reloadOnly' | 'all' | 'onRemove';
