/**
 * To add Error to Error Summary
 */
export type FudisErrorSummaryAddItem = {
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
export type FudisErrorSummaryRemoveItem = {
  id: string;
  formId: string | null;
  controlName: string | undefined;
  type: string;
};

/**
 * Collection of all Errors
 */
export type FudisErrorSummaryErrors = {
  [id: string]: FudisFormErrorSummaryObject;
};

export type FudisFormErrorSummaryObject = {
  [id: string]: {
    id: string;
    errors: FudisFormErrorSummaryObjectItemErrors;
    label: string;
  };
};

export type FudisFormErrorSummaryObjectItemErrors = {
  [errorType: string]: string;
};

export type FudisFormErrorSummaryUpdateStrategy = 'reloadOnly' | 'all' | 'onRemove';
