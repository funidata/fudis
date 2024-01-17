import { Injectable } from '@angular/core';

import { FudisInternalErrorSummaryService } from './internal-error-summary.service';
import { FudisFormErrorSummaryUpdateStrategy } from '../../../types/forms';

/**
 * This service is for Error Summary service's public methods and tools
 */
@Injectable({ providedIn: 'root' })
export class FudisErrorSummaryService {
  constructor(private _errorSummaryService: FudisInternalErrorSummaryService) {}

  /**
   * Get current updateStrategy of Error Summaries. By default 'reloadOnly'
   */
  public get updateStrategy(): FudisFormErrorSummaryUpdateStrategy {
    return this._errorSummaryService.updateStrategy;
  }

  /**
   * Set updateStrategy of Error Summaries
   */
  public setUpdateStrategy(value: FudisFormErrorSummaryUpdateStrategy) {
    this._errorSummaryService.updateStrategy = value;
  }

  /**
   * Reloads errors from the internal error summary service and tell component to focus to it on error reload
   */
  public reloadErrors(): void {
    this._errorSummaryService.focusToSummaryList = true;
    this._errorSummaryService.reloadErrors();
  }
}
