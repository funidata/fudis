import { Component, EventEmitter, Output, Input, ChangeDetectorRef, effect } from '@angular/core';
import {
  FudisLanguageAbbr,
  FudisLanguageBadgeContent,
  FudisTranslationConfig,
  FudisTranslationLanguageBadgeAriaLabel,
} from '../../types/miscellaneous';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';
import { FudisIdService } from '../../services/id/id.service';

import { BehaviorSubject } from 'rxjs';

type LanguageLabelArray = { key: FudisLanguageAbbr; label: string }[];
@Component({
  selector: 'fudis-language-badge-group',
  templateUrl: './language-badge-group.component.html',
  styleUrls: ['./language-badge-group.component.scss'],
})
export class LanguageBadgeGroupComponent extends TooltipApiDirective {
  constructor(
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService,
    private _cdr: ChangeDetectorRef,
  ) {
    super();
    this._id = _idService.getNewParentId('language-badge-group');

    effect(() => {
      this._languageOptions = _translationService.getSelectableLanguages()();
      this._translations = _translationService.getTranslations()();
      this._groupLabel = this._translations.LANGUAGE_BADGE.ARIA_LABEL.TRANSLATIONS;
      this._setLanguageOptions();
    });
  }

  /**
   * Selected language
   */
  @Input({ required: true }) selectedLanguage: FudisLanguageAbbr;

  /**
   * Required language options for Language Badge Group
   */
  @Input({ required: true }) languages: FudisLanguageBadgeContent;

  /**
   * Output Language abbreviation of clicked Badge
   */
  @Output() handleBadgeClick = new EventEmitter<FudisLanguageAbbr>();

  /**
   * Determine hich Language Badges are wanted to show. By default ['fi','sv','ev'].
   */
  protected _languageOptions: FudisLanguageAbbr[] = ['fi', 'sv', 'en'];

  /**
   * Fudis translations
   */
  protected _translations: FudisTranslationConfig;

  /**
   * Aria-label for Language Badge Group
   */
  protected _groupLabel: string;

  /**
   * Label of language badge
   */
  protected _label: string;

  /**
   * Generated HTML id for the group
   */
  protected _id: string;

  /**
   * Internal variable for matching languages and label texts
   */
  protected _languageLabels: BehaviorSubject<LanguageLabelArray> =
    new BehaviorSubject<LanguageLabelArray>([]);

  /**
   * Set selected language and emits clicked language
   */
  protected _updateLanguage(value: FudisLanguageAbbr) {
    this.selectedLanguage = value;
    this.handleBadgeClick.emit(value);
  }

  /**
   * Fetches proper translated label for corresponding language
   */
  private _getLabel(language: FudisLanguageAbbr): string {
    const keyValue: string = language.toUpperCase();

    return this._translations.LANGUAGE_BADGE.ARIA_LABEL[
      keyValue as keyof FudisTranslationLanguageBadgeAriaLabel
    ];
  }

  /**
   * Creates an array to loop in template of wanted Language Badges
   */
  private _setLanguageOptions(): void {
    const tempLangLabels: LanguageLabelArray = [];

    this._languageOptions.forEach((language) => {
      const newItem = { key: language, label: this._getLabel(language) };
      tempLangLabels.push(newItem);
    });

    this._languageLabels.next(tempLangLabels);
  }
}
