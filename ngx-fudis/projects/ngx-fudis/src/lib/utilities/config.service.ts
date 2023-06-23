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

	private _joo = signal<string>('moi');

	/**
	 * To set from application default values for all components application uses.
	 */
	setConfig(defaultValues: FudisFormConfig): void {
		this._defaultFormConfig.set({ ...defaultValues });
	}

	setJoo(value: string) {
		this._joo.set(value);
	}

	getJoo(): Signal<string> {
		return this._joo.asReadonly();
	}

	/**
	 * Get application's default values
	 */
	getConfig(): Signal<FudisFormConfig> {
		return this._defaultFormConfig.asReadonly();
	}
}
