import { Injectable, Signal, signal } from '@angular/core';
import { FudisLanguageAbbr } from '../../types/miscellaneous';

@Injectable({
  providedIn: 'root',
})
export class FudisLanguageBadgeGroupService {
  /**
   * Currently available languages in Fudis are Finnish, Swedish and English
   */
  private _languages = signal<FudisLanguageAbbr[]>(['fi', 'sv', 'en']);

  /**
   * Set which languages are visible
   */
  public setLanguages(languages: FudisLanguageAbbr[]): void {
    this._languages.set(languages);
  }

  /**
   * Get visible languages
   */
  public getLanguages(): Signal<FudisLanguageAbbr[]> {
    return this._languages.asReadonly();
  }
}
