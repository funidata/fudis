import { Component, OnInit, EventEmitter, Output, Input, Signal, effect } from '@angular/core';
import {
  FudisLanguageAbbr,
  FudisLanguageBadgeContent,
  FudisTranslationConfig,
  FudisTranslationLanguageBadgeAriaLabel,
} from '../../types/miscellaneous';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';
import { FudisLanguageBadgeGroupService } from '../../services/language-badge-group/language-badge-group.service';

@Component({
  selector: 'fudis-language-badge-group',
  templateUrl: './language-badge-group.component.html',
  styleUrls: ['./language-badge-group.component.scss'],
})
export class LanguageBadgeGroupComponent extends TooltipApiDirective implements OnInit {
  constructor(
    private _translationService: FudisTranslationService,
    private _languageBadgeGroupService: FudisLanguageBadgeGroupService,
  ) {
    super();
    effect(() => {
      this._languageOptions = this._languageBadgeGroupService.getLanguages();
      this._translations = _translationService.getTranslations();
      this._groupLabel = this._translations().LANGUAGE_BADGE.ARIA_LABEL.TRANSLATIONS;
      this.setLanguageOptions();
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
   * Config Signal to determine which Language Badges are wanted to show. By default ['fi','sv','ev'].
   */
  protected _languageOptions: Signal<FudisLanguageAbbr[]>;

  /**
   * Fudis translations
   */
  protected _translations: Signal<FudisTranslationConfig>;

  /**
   * Aria-label for Language Badge Group
   */
  protected _groupLabel: string;

  /**
   * Label of language badge
   */
  protected _label: string;

  /**
   * Internal variable for matching languages and label texts
   */
  protected _languageLabels: { key: FudisLanguageAbbr; label: string }[] = [];

  ngOnInit(): void {
    this.setLanguageOptions();
  }

  updateLanguage(value: FudisLanguageAbbr) {
    this.handleBadgeClick.emit(value);
  }

  /**
   * Fetches proper translated label for corresponding language
   */
  getLabel(language: FudisLanguageAbbr): string {
    const keyValue: string = language.toUpperCase();

    return this._translations().LANGUAGE_BADGE.ARIA_LABEL[
      keyValue as keyof FudisTranslationLanguageBadgeAriaLabel
    ];
  }

  /**
   * Creates an array to loop in template of wanted Language Badges
   */
  setLanguageOptions(): void {
    this._languageLabels = [];

    this._languageOptions().forEach((language) => {
      const newItem = { key: language, label: this.getLabel(language) };
      this._languageLabels.push(newItem);
    });
  }
}
