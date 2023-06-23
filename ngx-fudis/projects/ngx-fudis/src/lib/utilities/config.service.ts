/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Injectable, Signal, signal } from '@angular/core';
import { FudisFormConfig } from '../types/forms';

@Injectable({
	providedIn: 'root',
})
export class FudisConfigService {
	private _defaultFormConfig = signal<FudisFormConfig>({
		requiredText: 'Required',
		language: 'en',
		datepicker: { closeLabel: 'Close calendar' },
	});

	/**
	 * To set from application default values for all components application uses.
	 */
	setConfig(defaultValues: FudisFormConfig): void {
		this._defaultFormConfig.set({ ...defaultValues });
	}

	/**
	 * Get application's default values
	 */
	getConfig(): Signal<FudisFormConfig> {
		return this._defaultFormConfig.asReadonly();
	}
}
