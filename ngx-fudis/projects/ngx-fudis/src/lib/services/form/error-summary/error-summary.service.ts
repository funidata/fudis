import { Injectable, Signal } from '@angular/core';
import { FudisInternalErrorSummaryService } from './internal-error-summary.service';

import { FudisErrorSummaryParent, FudisFormErrorSummaryUpdateStrategy } from '../../../types/forms';

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
   * Reloads errors and focus to Error Summary
   */
  public reloadErrors(): void {
    this._errorSummaryService.focusToSummaryList = true;
    this._errorSummaryService.reloadErrors();
  }

  /**
   * Returns a readonly list of parent forms of the error summary list
   */
  public getFormsWithErrorSummary(): Signal<FudisErrorSummaryParent[]> {
    return this._errorSummaryService.errorSummaryParentList;
  }
}
