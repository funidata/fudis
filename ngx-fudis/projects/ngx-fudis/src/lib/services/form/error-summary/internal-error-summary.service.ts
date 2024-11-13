import { Injectable, OnDestroy } from '@angular/core';
import {
  FudisFormErrorSummaryObject,
  FudisFormErrorSummaryItem,
  FudisFormErrorSummaryRemoveItem,
  FudisFormErrorSummaryUpdateStrategy,
  FudisFormErrorSummaryFormsAndErrors,
} from '../../../types/forms';
import { BehaviorSubject } from 'rxjs';
import { FudisTranslationService } from '../../translation/translation.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

type FudisFormErrorSummarySection = {
  id: string;
  formId: string;
  title: string;
};

type FudisFormErrorSummaryFormChild = {
  [childId: string]: string;
};

type FudisFormErrorSummaryStructure = {
  [formId: string]: {
    sections: FudisFormErrorSummaryFormChild;
    fieldsets: FudisFormErrorSummaryFormChild;
  };
};
/**
 * Internal Error Summary tools not exposed to public
 */
@Injectable()
export class FudisInternalErrorSummaryService implements OnDestroy {
  constructor(private _translationService: FudisTranslationService) {
    toObservable(_translationService.getLanguageSignal())
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.focusToFormOnReload = null;
      });
  }

  /**
   * Current errors
   */
  private _allFormErrors: FudisFormErrorSummaryFormsAndErrors = {};

  /**
   * Current Form ids with their Error Summary Visibility status
   */
  private _formErrorSummaryVisibilityStatus = new BehaviorSubject<{ [formId: string]: boolean }>(
    {},
  );

  /**
   * Collection of errors categorised by parent Form id.
   */
  private _allFormErrorsObservable = new BehaviorSubject<FudisFormErrorSummaryFormsAndErrors>({});

  /**
   * Collection of child Sections, Expandables and Fieldsets of each Form Component
   */
  private _formStructure: FudisFormErrorSummaryStructure = {};

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

  get allFormErrorsObservable(): BehaviorSubject<FudisFormErrorSummaryFormsAndErrors> {
    return this._allFormErrorsObservable;
  }

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

  get formStructure(): FudisFormErrorSummaryStructure {
    return this._formStructure;
  }

  /**
   * Setter for _focusToFormOnReload
   */
  set focusToFormOnReload(value: string | null) {
    this._focusToFormOnReload = value;
  }

  public getErrors(): FudisFormErrorSummaryFormsAndErrors {
    return this._allFormErrors;
  }

  get formErrorSummaryVisibilityStatus(): BehaviorSubject<{ [formId: string]: boolean }> {
    return this._formErrorSummaryVisibilityStatus;
  }

  /**
   * Returns a readonly list of visible errors
   */
  public getFormErrorsById(formId: string): FudisFormErrorSummaryObject {
    return this._allFormErrors[formId];
  }

  /**
   *
   * @param formId Form to update
   * @param visibility Set Error Summary visilibity to true or false
   */
  public setFormErrorSummaryVisiblity(formId: string, visibility: boolean) {
    const currentValues = { ...this._formErrorSummaryVisibilityStatus.value };
    let valueUpdated = false;

    Object.keys(currentValues).forEach((id) => {
      if (id === formId && currentValues[id] !== visibility) {
        currentValues[id] = visibility;
        valueUpdated = true;
      }
    });
    if (valueUpdated) {
      this._formErrorSummaryVisibilityStatus.next(currentValues);
    }
  }

  /**
   *
   * @param element HTMLElement to check, if it has Form Component as ancestor
   * @returns if ancestor found, returns id of that Form and visibility status of Form's Error Summary
   */
  public getFormAncestor(
    element: HTMLElement,
  ): null | { id: string; errorSummaryVisible: boolean } {
    let foundId: string | null = null;

    Object.keys(this._formErrorSummaryVisibilityStatus.value).find((id) => {
      if (element.closest(`#${id}`)) {
        foundId = id;
      }
    });

    if (foundId) {
      return {
        id: foundId,
        errorSummaryVisible: this._formErrorSummaryVisibilityStatus.value[foundId],
      };
    }

    return null;
  }

  /**
   *
   * @param formId Form to target
   * @param visible hide or show Error Summary
   */
  public setErrorSummaryVisibilityStatus(formId: string, visible: boolean) {
    let currentValue = this._formErrorSummaryVisibilityStatus.value;

    if (!currentValue[formId]) {
      currentValue = { ...currentValue, [formId]: visible };
    } else {
      currentValue[formId] = visible;
    }

    this._formErrorSummaryVisibilityStatus.next(currentValue);
  }

  public registerNewForm(formId: string): void {
    this._formStructure = {
      ...this._formStructure,
      [formId]: {
        sections: {},
        fieldsets: {},
      },
    };

    this._allFormErrors[formId] = {};
  }

  public removeForm(formId: string): void {
    if (this._allFormErrors[formId]) {
      delete this._allFormErrors[formId];
    }

    if (
      this._formErrorSummaryVisibilityStatus.value[formId] !== null ||
      this._formErrorSummaryVisibilityStatus.value[formId] !== undefined
    ) {
      const currentValue = { ...this._formErrorSummaryVisibilityStatus.value };
      delete currentValue[formId];

      this._formErrorSummaryVisibilityStatus.next(currentValue);
    }

    if (this._formStructure[formId]) {
      delete this._formStructure[formId];
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
      this.registerNewForm(newError.formId);
    }

    let currentErrors = this._allFormErrors;

    const currentMessage = currentErrors?.[newError.formId]?.[newError.id]?.errors[newError.type];

    const currentLabel = currentErrors?.[newError.formId]?.[newError.id]?.label;

    const messageChanged = currentMessage && currentMessage !== newError.error;

    const labelChanged = currentLabel && currentLabel !== newError.label;

    const contentChanged =
      currentErrors?.[newError.formId]?.[newError.id] && (messageChanged || labelChanged);

    currentErrors = {
      ...currentErrors,
      [newError.formId]: this.getUpdatedErrorsByFormId(newError, currentErrors[newError.formId]),
    };

    this._allFormErrors = currentErrors;

    if (contentChanged || this._updateStrategy === 'all') {
      this._focusToFormOnReload = null;

      this.reloadErrorsByFormId(newError.formId, false, false, true);
    }
  }

  private getUpdatedErrorsByFormId(
    newError: FudisFormErrorSummaryItem,
    currentErrors: FudisFormErrorSummaryObject,
  ): FudisFormErrorSummaryObject {
    const errorId = this.defineErrorId(newError.id, newError.controlName);

    if (!currentErrors[errorId]) {
      currentErrors = {
        ...currentErrors,
        [errorId]: {
          id: newError.id,
          errors: { [newError.type]: newError.error },
          label: newError.label,
        },
      };
    } else {
      currentErrors = {
        ...currentErrors,
        [errorId]: {
          id: newError.id,
          errors: { ...currentErrors[errorId].errors, [newError.type]: newError.error },

          label: newError.label,
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
    const currentErrorsOfForm = { ...this._allFormErrors[formId] };

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
    if (this._formStructure?.[fieldset.formId]) {
      this._formStructure[fieldset.formId].fieldsets[fieldset.id] = fieldset.title;
    }
  }

  /**
   * Removes the fieldset from the current fieldsets
   * @param fieldset Form error summary fieldset
   */
  public removeFieldset(formId: string, fieldsetId: string): void {
    delete this._formStructure?.[formId]?.fieldsets[fieldsetId];
  }

  /**
   * Adds new section to the list of current sections
   * If a section with a matching id exists, replace the old section with the new one
   * @param section Form error summary section
   */
  public addSection(section: FudisFormErrorSummarySection): void {
    if (this._formStructure?.[section.formId]) {
      this._formStructure[section.formId].sections[section.id] = section.title;
    }
  }

  /**
   * Removes the section from the current sections
   * @param section Form error summary section
   */
  public removeSection(formId: string, sectionId: string): void {
    delete this._formStructure?.[formId]?.fieldsets[sectionId];
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

  public reloadErrorsByFormId(
    formId: string,
    focus?: boolean,
    allErrorsReloaded?: boolean,
    contentChanged?: boolean,
  ): void {
    if (focus) {
      this._focusToFormOnReload = formId;
    } else {
      this._focusToFormOnReload = null;
    }

    const currentFormsErrorSummaryStatus = { ...this._formErrorSummaryVisibilityStatus.value };

    // If content has changed (usually because lang has changed) AND this ErrorSummary is already visible, or content hasn't changed but this ErrorSummary is hidden --> Update and set visible
    const reloadOnContentChange =
      (contentChanged && currentFormsErrorSummaryStatus[formId]) || !contentChanged;

    if (!allErrorsReloaded) {
      this._formIdToUpdate = formId;
      currentFormsErrorSummaryStatus[formId] = true;
    } else {
      Object.keys(currentFormsErrorSummaryStatus).forEach((id) => {
        currentFormsErrorSummaryStatus[id] = true;
      });
    }

    if (reloadOnContentChange) {
      this._formErrorSummaryVisibilityStatus.next(currentFormsErrorSummaryStatus);

      this._allFormErrorsObservable.next({ ...this._allFormErrors });
    }
  }

  ngOnDestroy(): void {
    this._allFormErrorsObservable.complete();
  }

  /**
   * Returns an error id including a control name if one is given
   * @param id Id of the form error summary item
   * @param controlName Control name of the form error summary item
   */

  public defineErrorId(id: string, controlName: string | undefined): string {
    return controlName ? `${id}_${controlName}` : id;
  }
}
