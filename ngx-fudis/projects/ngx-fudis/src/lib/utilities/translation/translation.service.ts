import { Injectable, Signal, signal } from '@angular/core';
import { FudisTranslationConfig, FudisLanguageAbbr } from '../../types/miscellaneous';

import { fi, sv, en } from './translationKeys';

@Injectable({
	providedIn: 'root',
})
export class FudisTranslationService {
	private _translations = signal<FudisTranslationConfig>(en);

	private _language = signal<FudisLanguageAbbr>('en');

	/**
	 * To set from application values for all components application uses.
	 */
	setLanguage(language: FudisLanguageAbbr): void {
		this._language.set(language);
		if (language === 'en') {
			this._translations.set(en);
		} else if (language === 'fi') {
			this._translations.set(fi);
		} else {
			this._translations.set(sv);
		}
	}

	/**
	 * Get current language of Fudis configs
	 */
	getLanguage(): FudisLanguageAbbr {
		return this._language();
	}

	/**
	 * Get application's tranlastion config values
	 */
	getTranslations(): Signal<FudisTranslationConfig> {
		return this._translations.asReadonly();
	}
}
