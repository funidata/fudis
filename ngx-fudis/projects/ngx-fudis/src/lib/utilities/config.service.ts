/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Injectable, Signal, signal } from '@angular/core';
import { of } from 'rxjs';
import { FudisFormConfig } from '../types/forms';

@Injectable({
	providedIn: 'root',
})
export class FudisTranslationConfigService {
	_closeLabel = of('Close calendar');

	_requiredText = of('Required');

	private _config = signal<FudisFormConfig>({
		requiredText: this._requiredText,
		appLanguage: 'en',
		datepicker: { closeLabel: this._closeLabel },
	});

	/**
	 * To set from application default values for all components application uses.
	 */
	setConfig(defaultValues: FudisFormConfig): void {
		this._config.set({ ...this._config(), ...defaultValues });
	}

	updateConfig(values: FudisFormConfig): void {
		this._config.set({ ...this._config(), ...values });
	}

	/**
	 * Get application's default values
	 */
	getConfig(): Signal<FudisFormConfig> {
		return this._config.asReadonly();
	}
}
