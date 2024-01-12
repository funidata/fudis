import { Injectable, Signal, signal } from '@angular/core';
import {
  FudisFormErrorSummaryObject,
  FudisFormErrorSummaryItem,
  FudisFormErrorSummarySection,
  FudisErrorSummaryParent,
  FudisFormErrorSummaryRemoveItem,
  FudisFormErrorSummaryUpdateStrategy,
} from '../../../types/forms';

/**
 * Internal ErrorSummary tools not exposed to public
 */
@Injectable({ providedIn: 'root' })
export class FudisInternalErrorSummaryService {
  /**
   * Current errors
   */
  private _currentErrorList: FudisFormErrorSummaryObject = {};

  /**
   * Visible errors
   */
  private _signalCurrentErrorList = signal<FudisFormErrorSummaryObject>({});

  /**
   * List of parent forms of the error summary list
   */
  private _errorSummaryParentList = signal<FudisErrorSummaryParent[]>([]);

  /**
   * Current fieldsets
   */
  private _currentFieldsets: FudisFormErrorSummarySection[] = [];

  /**
   * Current sections
   */
  private _currentSections: FudisFormErrorSummarySection[] = [];

  /**
   * Info to Error Summary Component if it should move user focus to updated list or not
   */
  private _focusToSummaryList: boolean = false;

  private _updateStrategy: FudisFormErrorSummaryUpdateStrategy = 'reloadOnly';

  /**
   * Getter for _updateStrategy
   */
  get updateStrategy(): FudisFormErrorSummaryUpdateStrategy {
    return this._updateStrategy;
  }

  /**
   * Setter for _updateStrategy
   */
  set updateStrategy(value: FudisFormErrorSummaryUpdateStrategy) {
    this._updateStrategy = value;
  }

  /**
   * Getter for _focusToSummaryList
   */
  get focusToSummaryList(): boolean {
    return this._focusToSummaryList;
  }

  /**
   * Setter for _focusToSummaryList
   */
  set focusToSummaryList(value: boolean) {
    this._focusToSummaryList = value;
  }

  /**
   * Returns a list of current fieldsets
   */
  getFieldsetList(): FudisFormErrorSummarySection[] {
    return this._currentFieldsets;
  }

  /**
   * Returns a readonly list of parent forms of the error summary list
   */
  getFormsWithErrorSummary(): Signal<FudisErrorSummaryParent[]> {
    return this._errorSummaryParentList.asReadonly();
  }

  /**
   * Returns a list of current sections
   */
  getSectionList(): FudisFormErrorSummarySection[] {
    return this._currentSections;
  }

  /**
   * Returns a readonly list of visible errors
   */
  getVisibleErrors(): Signal<FudisFormErrorSummaryObject> {
    return this._signalCurrentErrorList.asReadonly();
  }

  /**
   * Adds a new error to the list of current errors
   * If new error item has a matching id on the list, new error is tied to that error list object
   * @param newError Form error summary item
   */
  public addNewError(newError: FudisFormErrorSummaryItem): void {
    let currentErrors = this._currentErrorList;

    const errorId = this._defineErrorId(newError.id, newError.controlName);

    const langUpdated =
      currentErrors[errorId] && currentErrors[errorId]?.language !== newError.language;

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

    this._currentErrorList = currentErrors;

    if (langUpdated || this._updateStrategy === 'all') {
      this._focusToSummaryList = false;
      this.reloadErrors();
    }
  }

  /**
   * Removes error object from the current errors list if it contains matching error id
   * @param error Error object
   */
  public removeError(error: FudisFormErrorSummaryRemoveItem): void {
    const currentErrors = this._currentErrorList;

    const errorId = error.controlName ? `${error.id}_${error.controlName}` : error.id;

    if (currentErrors?.[errorId]?.errors[error.type]) {
      delete currentErrors[errorId].errors[error.type];

      this._currentErrorList = currentErrors;

      if (this._updateStrategy === 'all' || this._updateStrategy === 'onRemove') {
        this._focusToSummaryList = false;
        this._signalCurrentErrorList.set(this._currentErrorList);
      }
    }
  }

  /**
   * Adds new fieldset to the list of current fieldsets
   * If a fieldset with a matching id exists, replace the old fieldset with the new one
   * @param fieldset Form error summary section
   */
  public addFieldset(fieldset: FudisFormErrorSummarySection): void {
    const existingItem = this._currentFieldsets.find((item) => {
      return item.id === fieldset.id;
    });

    if (existingItem) {
      const index = this._currentFieldsets.indexOf(existingItem);
      this._currentFieldsets[index] = fieldset;
    } else {
      this._currentFieldsets.push(fieldset);
    }
  }

  /**
   * Removes the fieldset from the current fieldsets
   * @param fieldset Form error summary section
   */
  public removeFieldset(fieldset: FudisFormErrorSummarySection): void {
    const indexToRemove = this._currentFieldsets.indexOf(fieldset);

    this._currentFieldsets.splice(indexToRemove, 1);
  }

  /**
   * Adds new section to the list of current sections
   * If a section with a matching id exists, replace the old section with the new one
   * @param section Form error summary section
   */
  public addSection(section: FudisFormErrorSummarySection): void {
    const existingItem = this._currentSections.find((item) => {
      return item.id === section.id;
    });

    if (existingItem) {
      const index = this._currentSections.indexOf(existingItem);
      this._currentSections[index] = section;
    } else {
      this._currentSections.push(section);
    }
  }

  /**
   * Removes the section from the current sections
   * @param section Form error summary section
   */
  public removeSection(section: FudisFormErrorSummarySection): void {
    const indexToRemove = this._currentSections.indexOf(section);

    this._currentSections.splice(indexToRemove, 1);
  }

  /**
   * Updates the visible and dynamic lists of errors with the current error list
   */
  public reloadErrors(): void {
    this._signalCurrentErrorList.set(this._currentErrorList);
  }

  /**
   * Adds a parent form to the error summary parent list
   * If a parent with a matching id exists, replace the old parent with the new one
   * @param parent Parent form of the error summary list
   */
  public addErrorSummaryParent(parent: FudisErrorSummaryParent): void {
    const currentParents = this._errorSummaryParentList();

    const existingItem = currentParents.find((item) => {
      return item.formId === parent.formId;
    });

    if (existingItem) {
      const index = currentParents.indexOf(existingItem);
      currentParents[index] = parent;
    } else {
      currentParents.push(parent);
    }

    this._errorSummaryParentList.set(currentParents);
  }

  /**
   * Removes a parent form from the error summary parent list
   * @param parent Parent form of the error summary list
   */
  public removeErrorSummaryParent(parent: FudisErrorSummaryParent): void {
    const currentParents = this._errorSummaryParentList();

    const filtered = currentParents.filter((item) => {
      return item.formId !== parent.formId;
    });

    this._errorSummaryParentList.set(filtered);
  }

  /**
   * Returns an error id including a control name if one is given
   * @param id Id of the form error summary item
   * @param controlName Optional control name of the form error summary item
   */
  // eslint-disable-next-line class-methods-use-this
  private _defineErrorId(id: string, controlName: string | undefined): string {
    return controlName ? `${id}_${controlName}` : id;
  }
}
