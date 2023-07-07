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
	private _defaultsEn: FudisTranslationConfig = {
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

	private _defaultsFi: FudisTranslationConfig = {
		appLanguage: 'fi',
		required: of('Pakollinen'),
		datepicker: { closeLabel: of('Sulje kalenteri') },
		dialog: { closeLabel: of('Sulje') },
		inputWithLanguageOptions: {
			languageLabel: of('Kieli'),
			missingLanguage: of('Puuttuu'),
		},
		autoComplete: {
			clearFilter: of('Tyhjennä kenttä'),
		},
		icon: {
			attention: of('Huomio'),
		},
	};

	private _config = signal<FudisTranslationConfig>(this._defaultsEn);

	/**
	 * To set from application values for all components application uses.
	 */
	setConfig(defaultValues: 'en' | 'fi' | FudisTranslationConfig): void {
		if (defaultValues === 'fi') {
			this._config.set(this._defaultsFi);
		} else if (defaultValues === 'en') {
			this._config.set(this._defaultsEn);
		} else {
			this._config.set(defaultValues);
		}
	}

	/**
	 * Get application's config values
	 */
	getConfig(): Signal<FudisTranslationConfig> {
		return this._config.asReadonly();
	}
}
