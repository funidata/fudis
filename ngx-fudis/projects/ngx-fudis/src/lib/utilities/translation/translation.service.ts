import { Injectable, Signal, signal } from '@angular/core';
import { FudisTranslationConfig } from '../../types/forms';
import { FudisLanguage } from '../../types/miscellaneous';

@Injectable({
	providedIn: 'root',
})
export class FudisTranslationService {
	private fi = {
		required: 'Required',
		datepicker: { closeLabel: 'Close calendar' },
		dialog: { closeLabel: 'Close' },
		inputWithLanguageOptions: {
			languageLabel: 'Language',
			missingLanguage: 'Missing',
		},
		autoComplete: {
			clearFilter: 'Clear filter',
		},
		icon: {
			attention: 'Attention',
		},
	};

	private en = {
		required: 'Pakollinen',
		datepicker: { closeLabel: 'Sulje kalenteri' },
		dialog: { closeLabel: 'Sulje' },
		inputWithLanguageOptions: {
			languageLabel: 'Kieli',
			missingLanguage: 'puuttuu',
		},
		autoComplete: {
			clearFilter: 'Tyhjennä filtteri',
		},
		icon: {
			attention: 'Huomio',
		},
	};

	private _config = signal<FudisTranslationConfig>(this.en);

	private _language = signal<FudisLanguage>('fi');

	/**
	 * To set from application values for all components application uses.
	 */
	setConfig(language: FudisLanguage): void {
		if (language === 'en') {
			this._config.set(this.en);
		} else if (language === 'fi') {
			this._config.set(this.fi);
		}

		this._language.set(language);
	}

	getLanguage(): FudisLanguage {
		return this._language();
	}

	/**
	 * Get application's config values
	 */
	getConfig(): Signal<FudisTranslationConfig> {
		return this._config.asReadonly();
	}
}
