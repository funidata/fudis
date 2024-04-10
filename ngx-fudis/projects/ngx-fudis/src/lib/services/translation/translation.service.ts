import { Injectable, Signal, signal } from '@angular/core';
import { FudisTranslationConfig, FudisLanguageAbbr } from '../../types/miscellaneous';
import { fi, sv, en } from './translationKeys';
import { FudisInternalErrorSummaryService } from '../form/error-summary/internal-error-summary.service';

@Injectable({
  providedIn: 'root',
})
export class FudisTranslationService {
  constructor(private _errorSummaryService: FudisInternalErrorSummaryService) {}

  /**
   * Application's translation texts, default language for translations is English
   */
  private _appTranslations = signal<FudisTranslationConfig>(en);

  /**
   * Application language, default language is English
   */
  private _appLanguage = signal<FudisLanguageAbbr>('en');

  /**
   * Set language of repeated texts Fudis uses for its components. E. g. 'required' text of form components or help texts for screen readers for various buttons.
   * Also as Error Summary Component reloads its errors if error's language has changed, here is defined component to NOT focus to the updated list on only language change.
   */
  public setLanguage(language: FudisLanguageAbbr): void {
    this._errorSummaryService.focusToFormOnReload = null;
    this._appLanguage.set(language);
    if (language === 'en') {
      this._appTranslations.set(en);
    } else if (language === 'fi') {
      this._appTranslations.set(fi);
    } else {
      this._appTranslations.set(sv);
    }
  }

  /**
   * Get current language of Fudis configs
   */
  public getLanguage(): FudisLanguageAbbr {
    return this._appLanguage();
  }

  /**
   * Get application's translation config values
   */
  public getTranslations(): Signal<FudisTranslationConfig> {
    return this._appTranslations.asReadonly();
  }

  /**
   * Currently available languages in Fudis are Finnish, Swedish and English
   */
  private _selectableLanguages = signal<FudisLanguageAbbr[]>(['fi', 'sv', 'en']);

  /**
   * Set which languages are visible in Language Badges
   */
  public setSelectableLanguages(languages: FudisLanguageAbbr[]): void {
    this._selectableLanguages.set(languages);
  }

  /**
   * Get visible languages of Language Badges
   */
  public getSelectableLanguages(): Signal<FudisLanguageAbbr[]> {
    return this._selectableLanguages.asReadonly();
  }
}
