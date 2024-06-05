import { Injectable } from '@angular/core';
import { FudisInternalErrorSummaryService } from './internal-error-summary.service';

import {
  FudisFormErrorSummaryFormsAndErrors,
  FudisFormErrorSummaryUpdateStrategy,
} from '../../../types/forms';
import { BehaviorSubject } from 'rxjs';

/**
 * Error Summary Service public methods and tools
 */
@Injectable({ providedIn: 'root' })
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
    this._errorSummaryService.reloadErrorsByFormId(id, focus);
  }

  /**
   * Returns an observable of all errors sent to Error Summary
   */
  public getErrorsObservable(): BehaviorSubject<FudisFormErrorSummaryFormsAndErrors> {
    return this._errorSummaryService.allFormErrorsObservable;
  }
}
