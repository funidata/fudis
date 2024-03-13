import { Injectable, Signal, signal } from '@angular/core';
import {
  FudisFormErrorSummaryObject,
  FudisFormErrorSummaryItem,
  FudisFormErrorSummarySection,
  FudisFormErrorSummaryRemoveItem,
  FudisFormErrorSummaryUpdateStrategy,
  FudisFormErrorSummaryFormsAndErrors,
  FudisFormErrorSummarySectionObject,
} from '../../../types/forms';

/**
 * Internal Error Summary tools not exposed to public
 */
@Injectable({ providedIn: 'root' })
export class FudisInternalErrorSummaryService {
  constructor() {}

  /**
   * Current errors
   */
  private _allFormErrors: FudisFormErrorSummaryFormsAndErrors = {};

  /**
   * Collection of errors as a Signal categorised by parent Form id.
   *
   * Ideally this should be an object consisting of sub-signals, but unfortunately effect() hook in ErrorSummaryComponent couldn't detect a change, if a nested signal inside this object was updated.
   *  
   So now although effect() hooks in all Error Summary Components trigger if one of them is reloaded, there is safeguard logic that only the targeted one will update visible errors even if the whole signal is updated.
   */

  private _signalAllFormErrors = signal<FudisFormErrorSummaryFormsAndErrors>({});

  /**
   * Current fieldsets
   */
  private _fieldsets: FudisFormErrorSummarySectionObject = {};

  /**
   * Current sections
   */
  private _sections: FudisFormErrorSummarySectionObject = {};

  /**
   * Info to Error Summary Component if it should move user focus to updated list or not
   */
  private _focusToFormOnReload: string | null = null;

  /**
   * Update strategy of Error Summary
   */
  private _updateStrategy: FudisFormErrorSummaryUpdateStrategy = 'reloadOnly';

  /**
   * To control that only form with spesific ID is reloaded in corresponding ErrorSummaryComponent effect() when signal is updated.
   */
  private _formIdToUpdate: string;

  /**
   * Getter for _formIdToUpdate. Used in ErrorSummaryComponent.
   */
  get formIdToUpdate(): string {
    return this._formIdToUpdate;
  }

  /**
   * Getter for _updateStrategy. Used by public Error Summary service.
   */
  get updateStrategy(): FudisFormErrorSummaryUpdateStrategy {
    return this._updateStrategy;
  }

  /**
   * Setter for _updateStrategy. Used by public Error Summary service.
   */
  set updateStrategy(value: FudisFormErrorSummaryUpdateStrategy) {
    this._updateStrategy = value;
  }

  /**
   * Getter for _focusToFormOnReload
   */
  get focusToFormOnReload(): string | null {
    return this._focusToFormOnReload;
  }

  /**
   * Setter for _focusToFormOnReload
   */
  set focusToFormOnReload(value: string | null) {
    this._focusToFormOnReload = value;
  }

  /**
   * Returns a list of current fieldsets
   */
  public get fieldsets(): FudisFormErrorSummarySectionObject {
    return this._fieldsets;
  }

  /**
   * Returns a list of current sections
   */
  public get sections(): FudisFormErrorSummarySectionObject {
    return this._sections;
  }

  /**
   * Returns a signal of readonly list of all errors
   */
  public getErrorsOnReload(): Signal<FudisFormErrorSummaryFormsAndErrors> {
    return this._signalAllFormErrors.asReadonly();
  }

  public getErrors(): FudisFormErrorSummaryFormsAndErrors {
    return this._allFormErrors;
  }

  /**
   * Returns a readonly list of visible errors
   */
  public getFormErrorsById(formId: string): FudisFormErrorSummaryObject {
    return this._allFormErrors[formId];
  }

  public addNewFormId(formId: string): void {
    this._allFormErrors[formId] = {};

    this._sections[formId] = [];

    this._fieldsets[formId] = [];
  }

  public removeFormId(formId: string): void {
    if (this._allFormErrors[formId]) {
      delete this._allFormErrors[formId];
    }

    if (this._sections[formId]) {
      delete this._sections[formId];
    }

    if (this._fieldsets[formId]) {
      delete this._fieldsets[formId];
    }
  }

  // TODO: Currently all errors are just one big blob and each added error do not have information about the Form it is actually related to. This is currently checked in Form, which loops through all the errors and checks if #error-id exists as a child. It would be better if added errors are categorised by their Form parent.

  /**
   * Adds a new error to the list of current errors
   * If new error item has a matching id on the list, new error is tied to that error list object
   * @param newError Form error summary item
   */
  public addNewError(newError: FudisFormErrorSummaryItem): void {
    if (!this._allFormErrors[newError.formId]) {
      this.addNewFormId(newError.formId);
    }

    let currentErrors = this._allFormErrors;

    const langUpdated =
      currentErrors?.[newError.formId]?.[newError.id] &&
      currentErrors?.[newError.formId]?.[newError.id]?.language !== newError.language;

    currentErrors = {
      ...currentErrors,
      [newError.formId]: this.getUpdatedErrorsByFormId(newError, currentErrors[newError.formId]),
    };

    this._allFormErrors = currentErrors;

    if (langUpdated || this._updateStrategy === 'all') {
      this._focusToFormOnReload = null;
      this.reloadErrorsByFormId(newError.formId);
    }
  }

  private getUpdatedErrorsByFormId(
    newError: FudisFormErrorSummaryItem,
    currentErrors: FudisFormErrorSummaryObject,
  ): FudisFormErrorSummaryObject {
    const errorId = this._defineErrorId(newError.id, newError.controlName);

    if (!currentErrors[errorId]) {
      currentErrors = {
        ...currentErrors,
        [errorId]: {
          id: newError.id,
          errors: { [newError.type]: newError.error },
          label: newError.label,
          language: newError.language,
        },
      };
    } else {
      currentErrors = {
        ...currentErrors,
        [errorId]: {
          id: newError.id,
          errors: { ...currentErrors[errorId].errors, [newError.type]: newError.error },
          label: newError.label,
          language: newError.language,
        },
      };
    }

    return currentErrors;
  }

  /**
   * Removes error object from the current errors list if it contains matching error id
   * @param error Error object
   */
  public removeError(error: FudisFormErrorSummaryRemoveItem, formId: string): void {
    const currentErrorsOfForm = this._allFormErrors[formId];

    const errorId = error.controlName ? `${error.id}_${error.controlName}` : error.id;

    if (currentErrorsOfForm[errorId]?.errors[error.type]) {
      delete currentErrorsOfForm[errorId].errors[error.type];

      const otherErrors = Object.keys(currentErrorsOfForm[errorId].errors).length;

      if (otherErrors === 0) {
        delete currentErrorsOfForm[errorId];
      }

      this._allFormErrors[formId] = currentErrorsOfForm;

      if (this._updateStrategy === 'all' || this._updateStrategy === 'onRemove') {
        this._focusToFormOnReload = null;

        this.reloadErrorsByFormId(formId);
      }
    }
  }

  /**
   * Adds new fieldset to the list of current fieldsets
   * If a fieldset with a matching id exists, replace the old fieldset with the new one
   * @param fieldset Form error summary fieldset
   */
  public addFieldset(fieldset: FudisFormErrorSummarySection): void {
    this._fieldsets = this.updateSectionsOrFieldsets(this._fieldsets, fieldset);
  }

  /**
   * Removes the fieldset from the current fieldsets
   * @param fieldset Form error summary fieldset
   */
  public removeFieldset(fieldset: FudisFormErrorSummarySection): void {
    const indexToRemove = this._fieldsets[fieldset.formId].indexOf(fieldset);

    this._fieldsets[fieldset.formId].splice(indexToRemove, 1);
  }

  /**
   * Adds new section to the list of current sections
   * If a section with a matching id exists, replace the old section with the new one
   * @param section Form error summary section
   */
  public addSection(section: FudisFormErrorSummarySection): void {
    this._sections = this.updateSectionsOrFieldsets(this._sections, section);
  }

  private updateSectionsOrFieldsets(
    previousValues: FudisFormErrorSummarySectionObject,
    newValue: FudisFormErrorSummarySection,
  ): FudisFormErrorSummarySectionObject {
    const valuesToReturn = previousValues;

    const existingItem = valuesToReturn[newValue.formId]?.find((item) => {
      return item.id === newValue.id;
    });

    if (existingItem) {
      const index = valuesToReturn[newValue.formId].indexOf(existingItem);
      valuesToReturn[newValue.formId][index] = newValue;
    } else {
      valuesToReturn[newValue.formId].push(newValue);
    }

    return valuesToReturn;
  }

  /**
   * Removes the section from the current sections
   * @param section Form error summary section
   */
  public removeSection(section: FudisFormErrorSummarySection): void {
    const indexToRemove = this._sections[section.formId].indexOf(section);

    this._sections[section.formId].splice(indexToRemove, 1);
  }

  /**
   * Updates the visible and dynamic lists of all form and errors with the current error list
   */
  public reloadAllErrors(): void {
    this._formIdToUpdate = 'all';

    Object.keys(this._allFormErrors).forEach((key) => {
      this.reloadErrorsByFormId(key, false, true);
    });
  }

  public reloadErrorsByFormId(formId: string, focus?: boolean, allErrorsReloaded?: boolean): void {
    if (focus) {
      this._focusToFormOnReload = formId;
    } else {
      this._focusToFormOnReload = null;
    }

    if (!allErrorsReloaded) {
      this._formIdToUpdate = formId;
    }

    this._signalAllFormErrors.set(this._allFormErrors);
  }

  /**
   * Returns an error id including a control name if one is given
   * @param id Id of the form error summary item
   * @param controlName Control name of the form error summary item
   */
  // eslint-disable-next-line class-methods-use-this
  private _defineErrorId(id: string, controlName: string | undefined): string {
    return controlName ? `${id}_${controlName}` : id;
  }
}
