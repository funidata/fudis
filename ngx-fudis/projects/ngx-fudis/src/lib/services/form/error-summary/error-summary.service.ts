import { Injectable } from '@angular/core';

import { FudisInternalErrorSummaryService } from './internal-error-summary.service';

/**
 * This service extends internal Error Summary service's reloadErrors function to public use
 */
@Injectable({ providedIn: 'root' })
export class FudisErrorSummaryService {
	constructor(private _errorSummaryService: FudisInternalErrorSummaryService) {}

	/**
	 * Reloads errors from the internal error summary service
	 * @param delay Optional Number that sets reload delay in milliseconds, defaults to 0ms
	 */
	public reloadErrors(delay: number = 0): void {
		this._errorSummaryService.reloadErrors(delay);
	}
}
