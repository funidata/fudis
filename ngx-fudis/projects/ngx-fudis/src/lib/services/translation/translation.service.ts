import { Injectable, Signal, signal } from '@angular/core';
import { FudisTranslationConfig, FudisLanguageAbbr } from '../../types/miscellaneous';
import { fi, sv, en } from './translationKeys';
import { FudisInternalErrorSummaryService } from '../form/error-summary/internal-error-summary.service';

@Injectable({
  providedIn: 'root',
})
export class FudisTranslationService {
  constructor(private _errorSummaryService: FudisInternalErrorSummaryService) {}

  private _translations = signal<FudisTranslationConfig>(en);

  private _language = signal<FudisLanguageAbbr>('en');

  /**
   * Set language of repeated texts Fudis uses for its components. E. g. 'required' text of form components or help texts for screen readers for various buttons.
   *
   * Also as Error Summary Component reloads it's errors if error's language has changed, here is defined component to NOT focus to the updated list on only language change.
   */
  setLanguage(language: FudisLanguageAbbr): void {
    this._errorSummaryService.focusToSummaryList = false;
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
   * Get application's translation config values
   */
  getTranslations(): Signal<FudisTranslationConfig> {
    return this._translations.asReadonly();
  }
}
