import { Injectable } from '@angular/core';

import { FudisErrorSummaryService } from './error-summary.service';

/**
 * This service extends internal FudisErrorSummaryService's reloadErrors function to public use
 */
@Injectable({ providedIn: 'root' })
export class FudisReloadErrorsErrorSummaryService {
	constructor(private _errorSummaryService: FudisErrorSummaryService) {}

	public reloadErrors(delay: number = 0): void {
		this._errorSummaryService.reloadErrors(delay);
	}
}
