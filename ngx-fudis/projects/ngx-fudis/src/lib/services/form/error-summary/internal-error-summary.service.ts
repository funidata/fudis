import { Injectable, OnDestroy, signal, WritableSignal } from '@angular/core';
import {
  FudisErrorSummaryObject,
  FudisErrorSummaryNewError,
  FudisErrorSummaryRemoveError,
  FudisFormErrorSummaryUpdateStrategy,
  FudisErrorSummaryErrors,
  FudisErrorSummaryErrorsSignal,
} from '../../../types/errorSummary';
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
   * ------------------
   *
   * CLASS VARIABLES
   *
   * ------------------
   */

  /**
   * Collection of all registered errors categorised by parent Form id. Used as "temporary" storage and value will be passed to Observable when ReloadErrors is called.
   */
  private _errorsStore: FudisErrorSummaryErrors = {};

  /**
   * Collection of all registered categorised by parent Form id. This Observable is updated with new value only when ReloadErrors is called.
   */
  private _errorsObservable = new BehaviorSubject<FudisErrorSummaryErrors>({});

  private _errorsSignal: FudisErrorSummaryErrorsSignal = {};

  /**
   * Current Form ids with their Error Summary Visibility status
   */
  private _errorSummaryVisibilityStatus: { [formId: string]: WritableSignal<boolean> } = {};

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
   * Used prevent unnecessary frequent Signal updates
   */
  private _reloadGuard: string[] = [];

  /**
   * ------------------
   *
   * GETTERS & SETTERS FOR CLASS VARIABLES
   *
   * ------------------
   */

  /**
   * Used in Components to listen to Reload updates
   */
  get errorsObservable(): BehaviorSubject<FudisErrorSummaryErrors> {
    return this._errorsObservable;
  }

  /**
   * For unit testing purposes
   */
  get errors(): FudisErrorSummaryErrors {
    return this._errorsStore;
  }

  /**
   * For unit testing purposes
   */
  get errorsSignal(): FudisErrorSummaryErrorsSignal {
    return this._errorsSignal;
  }

  /**
   * Observable to store each Form's Error Summary's visibility status. Form component will listen to these changes, if visiblity changes elsewhere than the @Input() prop
   */
  get errorSummaryVisibilityStatus(): { [formId: string]: WritableSignal<boolean> } {
    return this._errorSummaryVisibilityStatus;
  }

  get updateStrategy(): FudisFormErrorSummaryUpdateStrategy {
    return this._updateStrategy;
  }

  set updateStrategy(value: FudisFormErrorSummaryUpdateStrategy) {
    this._updateStrategy = value;
  }

  get focusToFormOnReload(): string | null {
    return this._focusToFormOnReload;
  }

  get formStructure(): FudisFormErrorSummaryStructure {
    return this._formStructure;
  }

  set focusToFormOnReload(value: string | null) {
    this._focusToFormOnReload = value;
  }

  /**
   * Hide or show Error Summary of spesific Form Component
   * @param formId Form to target
   * @param visible hide or show Error Summary
   */
  public setErrorSummaryVisibility(formId: string, visible: boolean) {
    if (!this._errorSummaryVisibilityStatus[formId]) {
      this._errorSummaryVisibilityStatus[formId] = signal(visible);
    } else if (this._errorSummaryVisibilityStatus[formId]() !== visible) {
      this._errorSummaryVisibilityStatus[formId].set(visible);
    }
  }

  /**
   * -------------------------
   *
   * ADD AND REMOVE ERRORS
   *
   * -------------------------
   */

  /**
   * Adds a new error to the list of current errors
   * If new error item has a matching id on the list, new error is tied to that error list object
   * @param newError Form error summary item
   */
  public addNewError(newError: FudisErrorSummaryNewError): void {
    if (!this._errorsStore[newError.formId]) {
      this.registerNewForm(newError.formId);
    }

    const currentErrors = this._errorsStore?.[newError.formId];

    const currentMessage = currentErrors?.[newError.focusId]?.errors[newError.type];

    const messageChanged = currentMessage && currentMessage !== newError.message;

    const contentChanged = currentErrors?.[newError.focusId] && messageChanged;

    this._errorsStore[newError.formId] = this.getUpdatedErrorsByFormId(newError, currentErrors);

    const reloadErrors =
      (contentChanged || this._updateStrategy === 'all') &&
      !!this._errorSummaryVisibilityStatus?.[newError.formId]();

    if (reloadErrors) {
      this._focusToFormOnReload = null;

      this.reloadErrorsByFormId(newError.formId, false);
    }
  }

  /**
   * Utility function used by addNewError()
   * @param newError
   * @param currentErrors
   * @returns
   */
  private getUpdatedErrorsByFormId(
    newError: FudisErrorSummaryNewError,
    currentErrors: FudisErrorSummaryObject,
  ): FudisErrorSummaryObject {
    if (!currentErrors[newError.focusId]) {
      currentErrors = {
        ...currentErrors,
        [newError.focusId]: {
          id: newError.focusId,
          errors: { [newError.type]: newError.message },
        },
      };
    } else {
      currentErrors = {
        ...currentErrors,
        [newError.focusId]: {
          id: newError.focusId,
          errors: { ...currentErrors[newError.focusId].errors, [newError.type]: newError.message },
        },
      };
    }

    return currentErrors;
  }

  /**
   * Removes error object from the current errors list if it contains matching error id
   * @param error Error object
   */
  public removeError(error: FudisErrorSummaryRemoveError, formId: string): void {
    const currentErrorsOfForm = { ...this._errorsStore[formId] };

    if (currentErrorsOfForm[error.focusId]?.errors[error.type]) {
      delete currentErrorsOfForm[error.focusId].errors[error.type];

      const otherErrors = Object.keys(currentErrorsOfForm[error.focusId].errors).length;

      if (otherErrors === 0) {
        delete currentErrorsOfForm[error.focusId];
      }

      this._errorsStore[formId] = currentErrorsOfForm;

      if (this._updateStrategy === 'all' || this._updateStrategy === 'onRemove') {
        this._focusToFormOnReload = null;
        this.reloadErrorsByFormId(formId);
      }
    }
  }

  /**
   * ------------
   *
   * RELOADING LIST OF ERRORS TO HTML DOM
   *
   * Functions to actually update Components which listen to Error changes. These will update the Observables components are listening to.
   *
   * ------------
   */

  /**
   * Updates the visible and dynamic lists of all form and errors with the current error list
   */
  public reloadAllErrors(): void {
    Object.keys(this._errorsStore).forEach((key) => {
      this.reloadErrorsByFormId(key, false);
    });
  }

  /**
   *
   * @param formId
   * @param focus
   */
  public reloadErrorsByFormId(formId: string, focus?: boolean): void {
    if (focus) {
      this._focusToFormOnReload = formId;
    } else {
      this._focusToFormOnReload = null;
    }

    if (!this._reloadGuard.includes(formId) && this._errorsStore[formId]) {
      this._reloadGuard.push(formId);
      setTimeout(() => {
        this._errorsSignal[formId].set(this._errorsStore[formId]);
        this._errorsObservable.next({ ...this._errorsStore });

        this._reloadGuard.splice(this._reloadGuard.indexOf(formId), 1);
      }, 50);
    }
  }

  /**
   * ----------------------
   *
   * DOM RELATED FUNCTIONS
   *
   * usually called by Components when they are initialized and they register themselves to Error Summary Service
   *
   * ----------------------
   */

  /**
   *
   * @param element HTMLElement to check, if it has Form Component as ancestor
   * @returns if ancestor found, returns id of that Form and visibility status of Form's Error Summary
   */
  public getFormAncestor(
    element: HTMLElement,
  ): null | { id: string; errorSummaryVisible: boolean } {
    let foundId: string | null = null;

    Object.keys(this._errorSummaryVisibilityStatus).find((id) => {
      if (element.closest(`#${id}`)) {
        foundId = id;
      }
    });

    if (foundId) {
      return {
        id: foundId,
        errorSummaryVisible: this._errorSummaryVisibilityStatus[foundId](),
      };
    }

    return null;
  }

  /**
   * When new Form Component is initialized, it will register itself for child components and error messages related to it
   * @param formId
   */
  public registerNewForm(formId: string, errorSummaryVisible: boolean = false): void {
    this._formStructure = {
      ...this._formStructure,
      [formId]: {
        sections: {},
        fieldsets: {},
      },
    };

    this._errorSummaryVisibilityStatus[formId] = signal(errorSummaryVisible);

    this._errorsSignal[formId] = signal({});

    this._errorsStore[formId] = {};
  }

  public removeForm(formId: string): void {
    if (this._errorsStore[formId]) {
      delete this._errorsStore[formId];
    }

    if (this._formStructure[formId]) {
      delete this._formStructure[formId];
    }

    const currentVisibilityStatus = { ...this._errorSummaryVisibilityStatus };

    if (currentVisibilityStatus[formId]) {
      delete currentVisibilityStatus[formId];

      this._errorSummaryVisibilityStatus = currentVisibilityStatus;
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
    delete this._formStructure?.[formId]?.sections[sectionId];
  }

  /**
   * -------------
   *
   * MISC
   *
   * -------------
   */

  ngOnDestroy(): void {
    this._errorsObservable.complete();
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
