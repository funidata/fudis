/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Injectable, Signal, signal } from '@angular/core';
import { of } from 'rxjs';
import { FudisTranslationConfig } from '../types/forms';

@Injectable({
	providedIn: 'root',
})
export class FudisTranslationConfigService {
	/**
	 * Default config values
	 */
	private _defaultsValues: FudisTranslationConfig = {
		appLanguage: 'en',
		required: of('Required'),
		datepicker: { closeLabel: of('Close calendar') },
		dialog: { closeLabel: of('Close') },
		inputWithLanguageOptions: {
			languageLabel: of('Language'),
			missingLanguage: of('Missing'),
		},
		autoComplete: {
			clearFilter: of('Clear filter'),
		},
		icon: {
			attention: of('Attention'),
		},
	};

	private _config = signal<FudisTranslationConfig>(this._defaultsValues);

	/**
	 * To set from application values for all components application uses.
	 */
	setConfig(defaultValues: FudisTranslationConfig): void {
		this._config.set({ ...this._config(), ...defaultValues });
	}

	/**
	 * Get application's config values
	 */
	getConfig(): Signal<FudisTranslationConfig> {
		return this._config.asReadonly();
	}
}
