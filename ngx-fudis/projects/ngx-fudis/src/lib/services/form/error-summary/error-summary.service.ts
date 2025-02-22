import { DestroyRef, inject, Injectable } from '@angular/core';
import { FudisInternalErrorSummaryService } from './internal-error-summary.service';

import {
  FudisErrorSummaryAllErrors,
  FudisErrorSummaryNewError,
  FudisErrorSummaryRemoveError,
  FudisFormErrorSummaryUpdateStrategy,
} from '../../../types/errorSummary';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Error Summary Service public methods and tools
 */
@Injectable()
export class FudisErrorSummaryService {
  constructor(private _errorSummaryService: FudisInternalErrorSummaryService) {}

  private _destroyRef = inject(DestroyRef);

  /**
   * To store Subscriptions for each sent Observable, so it can be unsubscribed on removeError()
   */
  private _subscriptions: { [subscriptionId: string]: Subscription } = {};

  /**
   * To define ID for each subscription
   *
   * @param error With required properties
   * @returns Generated id
   */
  private _getSubscriptionId(error: FudisErrorSummaryRemoveError): string {
    return `${error.formId}_${error.focusId}_${error.id}`;
  }

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
   *
   * @param id Form Id
   * @param focus Focus to Error Summary
   */
  public reloadFormErrors(id: string, focus: boolean = true) {
    this._errorSummaryService.reloadFormErrors(id, focus);
  }

  // TODO: This should be removed and replaced with getter for collection of Signals per individual Forms
  /**
   * Returns an observable of all errors sent to Error Summary. Note, that Observable is updated
   * only when ReloadErrors is called.
   */
  public getErrorsObservable(): BehaviorSubject<FudisErrorSummaryAllErrors> {
    return this._errorSummaryService.errorsObservable;
  }

  /**
   * To add message to spesific Form's Error Summary.
   *
   * @param id Identifier of the message, eg. 'app-custom-error-abc123'
   * @param formId Id of Form component
   * @param focusId HTML element's id, where user focus should be moved when user clicks the
   *   message.
   * @param message Visible message to the user
   */
  public addError(
    id: string,
    formId: string,
    focusId: string,
    message: string | Observable<string>,
  ): void {
    if (typeof message === 'string') {
      const newError: FudisErrorSummaryNewError = { focusId, formId, message, id };

      this._errorSummaryService.addError(newError);
    } else {
      const subscriptionId = this._getSubscriptionId({ id, formId, focusId });

      this._subscriptions[subscriptionId] = message
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((newMessage) => {
          const newError: FudisErrorSummaryNewError = { focusId, formId, message: newMessage, id };

          this._errorSummaryService.addError(newError);
        });
    }
  }

  /**
   * To remove messages from Form's Error Summary
   *
   * @param id Identifier of provided message in 'addError()'
   * @param formId Id of Form component
   * @param focusId HTML element's id, where user focus should be moved when user clicks the
   *   message.
   */
  public removeError(id: string, formId: string, focusId: string): void {
    const removeError: FudisErrorSummaryRemoveError = { focusId, formId, id };

    const subscriptionId = this._getSubscriptionId(removeError);

    if (this._subscriptions[subscriptionId]) {
      this._subscriptions[subscriptionId].unsubscribe();

      delete this._subscriptions[subscriptionId];
    }

    this._errorSummaryService.removeError(removeError);
  }
}
