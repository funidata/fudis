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
   * Reloads all Forms with Error Summary
   */
  public reloadErrors(): void {
    this._errorSummaryService.focusToFormOnReload = null;
    this._errorSummaryService.reloadErrors();
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
   * Returns a readonly list of parent forms of the error summary list
   */
  public getFormsWithErrorSummary(): Signal<FudisErrorSummaryParent[]> {
    return this._errorSummaryService.errorSummaryParentList;
  }
}
