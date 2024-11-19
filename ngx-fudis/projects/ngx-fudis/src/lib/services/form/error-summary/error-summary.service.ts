import { Injectable } from '@angular/core';
import { FudisInternalErrorSummaryService } from './internal-error-summary.service';

import {
  FudisErrorSummaryErrors,
  FudisErrorSummaryNewError,
  FudisErrorSummaryRemoveError,
  FudisFormErrorSummaryUpdateStrategy,
} from '../../../types/errorSummary';
import { BehaviorSubject } from 'rxjs';

/**
 * Error Summary Service public methods and tools
 */
@Injectable()
export class FudisErrorSummaryService {
  constructor(private _errorSummaryService: FudisInternalErrorSummaryService) {}

  /**
   * Get current updateStrategy of Error Summary. By default 'reloadOnly'.
   */
  public get updateStrategy(): FudisFormErrorSummaryUpdateStrategy {
    return this._errorSummaryService.updateStrategy;
  }

  /**
   * Set updateStrategy of Error Summary
   */
  public setUpdateStrategy(value: FudisFormErrorSummaryUpdateStrategy) {
    this._errorSummaryService.updateStrategy = value;
  }

  /**
   * Reloads all Forms with Error Summary
   */
  public reloadAllErrors(): void {
    this._errorSummaryService.focusToFormOnReload = null;
    this._errorSummaryService.reloadAllErrors();
  }

  /**
   * Reload a spesific Form Id
   * @param id Form Id
   * @param focus focus to Error Summary
   */
  public reloadFormErrors(id: string, focus: boolean = true) {
    this._errorSummaryService.reloadFormErrors(id, focus);
  }

  // TODO: This should be removed and replaced with getter for collection of Signals per individual Forms
  /**
   * Returns an observable of all errors sent to Error Summary. Note, that Observable is updated only when ReloadErrors is called.
   */
  public getErrorsObservable(): BehaviorSubject<FudisErrorSummaryErrors> {
    return this._errorSummaryService.errorsObservable;
  }

  /**
   * To add message to spesific Form's Error Summary.
   * @param id Identifier of the message, eg. 'app-custom-error-abc123'
   * @param formId Id of Form component
   * @param focusId HTML element's id, where user focus should be moved when user clicks the message.
   * @param message Visible message to the user
   */
  public addError(id: string, formId: string, focusId: string, message: string): void {
    const newError: FudisErrorSummaryNewError = { focusId, formId, message, id };

    this._errorSummaryService.addError(newError);
  }

  /**
   * To remove messages from Form's Error Summary
   * @param id Identifier of provided message in 'addError()'
   * @param formId Id of Form component
   * @param focusId HTML element's id, where user focus should be moved when user clicks the message.
   */
  public removeError(id: string, formId: string, focusId: string): void {
    const removeError: FudisErrorSummaryRemoveError = { focusId, formId, id };
    this._errorSummaryService.removeError(removeError);
  }
}
