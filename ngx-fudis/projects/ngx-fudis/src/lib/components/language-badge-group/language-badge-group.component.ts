import {
  Component,
  EventEmitter,
  Output,
  Input,
  effect,
  ChangeDetectionStrategy,
  OnChanges,
} from '@angular/core';
import { FudisComponentChanges, FudisLanguageAbbr } from '../../types/miscellaneous';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';
import { FudisIdService } from '../../services/id/id.service';

import { BehaviorSubject } from 'rxjs';

type LanguageLabel = { key: FudisLanguageAbbr; variant: 'standard' | 'missing' };

type LanguageLabelArray = LanguageLabel[];
@Component({
  selector: 'fudis-language-badge-group',
  templateUrl: './language-badge-group.component.html',
  styleUrls: ['./language-badge-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageBadgeGroupComponent extends TooltipApiDirective implements OnChanges {
  constructor(
    protected _translationService: FudisTranslationService,
    private _idService: FudisIdService,
  ) {
    super();
    this._id = _idService.getNewParentId('language-badge-group');

    effect(() => {
      this._groupAriaLabel.next(
        _translationService.getTranslations()().LANGUAGE_BADGE.ARIA_LABEL.TRANSLATIONS,
      );
    });

    effect(() => {
      this._selectableAppLanguages = _translationService.getSelectableLanguages()();
      this._currentAppLang = _translationService.getLanguageSignal()();

      if (this.translatedLanguages) {
        this._setLanguageOptions(this.translatedLanguages);
        this._determineSelectedBadge(this.translatedLanguages);
      }
    });
  }

  /**
   * Required list of translated languages for Language Badge Group
   */
  @Input({ required: true }) translatedLanguages: FudisLanguageAbbr[];
  /**
   * Output Language abbreviation of clicked Badge
   */
  @Output() handleBadgeClick = new EventEmitter<FudisLanguageAbbr | null>();

  /**
   * App language from service
   */
  private _currentAppLang: FudisLanguageAbbr;

  /**
   * App configured selectable languages from service
   */
  private _selectableAppLanguages: FudisLanguageAbbr[];

  /**
   * Generated HTML id for the group
   */
  protected _id: string;

  /**
   * Translation for aria-label
   */
  protected _groupAriaLabel = new BehaviorSubject<string>('');

  /**
   * Internal variable for matching languages and label texts
   */
  protected _languageLabels: BehaviorSubject<LanguageLabelArray> =
    new BehaviorSubject<LanguageLabelArray>([]);

  protected _selectedLanguage: FudisLanguageAbbr | null = null;

  /**
   * Set selected language and emits clicked language
   */
  protected _updateLanguage(value: FudisLanguageAbbr | null) {
    this._selectedLanguage = value;
    this.handleBadgeClick.emit(value);
  }

  /**
   * Creates an array to loop in template of wanted Language Badges
   */
  private _setLanguageOptions(availableContent: FudisLanguageAbbr[]): void {
    const tempLangLabels: LanguageLabelArray = [];

    this._selectableAppLanguages?.forEach((language) => {
      const variant = availableContent.includes(language) ? 'standard' : 'missing';

      const newItem: LanguageLabel = { key: language, variant };
      tempLangLabels.push(newItem);
    });

    this._languageLabels.next(tempLangLabels);
  }

  /**
   *
   */
  private _determineSelectedBadge(translatedLanguages: FudisLanguageAbbr[]): void {
    let determinedLanguage: FudisLanguageAbbr | null;

    if (
      translatedLanguages?.includes(this._currentAppLang) &&
      this._selectableAppLanguages.includes(this._currentAppLang)
    ) {
      determinedLanguage = this._currentAppLang;
    } else {
      const firstAvailable = this._selectableAppLanguages.find((lang) =>
        translatedLanguages.includes(lang),
      );

      if (firstAvailable) {
        determinedLanguage = firstAvailable as FudisLanguageAbbr;
      } else {
        determinedLanguage = null;
      }
    }
    this._updateLanguage(determinedLanguage);
  }

  ngOnChanges(changes: FudisComponentChanges<LanguageBadgeGroupComponent>) {
    const currentTranslated = changes.translatedLanguages?.currentValue;

    if (currentTranslated && changes.translatedLanguages?.previousValue !== currentTranslated) {
      this._setLanguageOptions(currentTranslated);
    }

    if (
      changes.translatedLanguages?.isFirstChange() &&
      currentTranslated &&
      this._selectableAppLanguages &&
      this._currentAppLang
    ) {
      this._determineSelectedBadge(currentTranslated);
    }
  }
}
