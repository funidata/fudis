import { Injectable } from '@angular/core';

import { FudisInternalErrorSummaryService } from './internal-error-summary.service';

/**
 * This service is for Error Summary service's public methods and tools
 */
@Injectable({ providedIn: 'root' })
export class FudisErrorSummaryService {
	constructor(private _errorSummaryService: FudisInternalErrorSummaryService) {}

	/**
	 * Reloads errors from the internal error summary service
	 */
	public reloadErrors(): void {
		this._errorSummaryService.reloadErrors();
	}
}
