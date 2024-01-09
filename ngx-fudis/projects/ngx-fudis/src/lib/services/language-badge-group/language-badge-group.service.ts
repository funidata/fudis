import { Injectable, Signal, signal } from '@angular/core';
import { FudisLanguageAbbr } from '../../types/miscellaneous';

@Injectable({
  providedIn: 'root',
})
export class FudisLanguageBadgeGroupService {
  private _languages = signal<FudisLanguageAbbr[]>(['fi', 'sv', 'en']);

  setLanguages(languages: FudisLanguageAbbr[]): void {
    this._languages.set(languages);
  }

  getLanguages(): Signal<FudisLanguageAbbr[]> {
    return this._languages.asReadonly();
  }
}
