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
  };
};

export type FudisErrorSummaryObjectItemErrors = {
  [errorType: string]: string;
};

export type FudisFormErrorSummaryUpdateStrategy = 'reloadOnly' | 'all' | 'onRemove';
