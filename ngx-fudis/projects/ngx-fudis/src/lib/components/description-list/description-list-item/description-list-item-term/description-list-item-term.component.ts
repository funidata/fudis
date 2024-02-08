import {
  AfterContentInit,
  Component,
  ElementRef,
  Host,
  Input,
  Signal,
  ViewEncapsulation,
  effect,
} from '@angular/core';
import { FudisLanguageAbbr, FudisLanguageBadgeContent } from '../../../../types/miscellaneous';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { DescriptionListItemComponent } from '../description-list-item.component';
import { FudisLanguageBadgeGroupService } from '../../../../services/language-badge-group/language-badge-group.service';

@Component({
  selector: 'fudis-dt, fudis-description-list-term',
  templateUrl: './description-list-item-term.component.html',
  styleUrls: ['./description-list-item-term.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionListItemTermComponent implements AfterContentInit {
  constructor(
    private _elementRef: ElementRef,
    private _translationService: FudisTranslationService,
    private _languageBadgeGroupService: FudisLanguageBadgeGroupService,
    @Host() private _parentDlItem: DescriptionListItemComponent,
  ) {
    effect(() => {
      this._currentLanguage = _translationService.getLanguage();
      this._languageOptions = this._languageBadgeGroupService.getLanguages();
      this._setLanguageOptions();
    });
  }

  /**
   * Renders Fudis Language Badge Component for displaying Description List Item Detail values in given languages
   */
  @Input() languages: boolean = false;

  /**
   * Available languages of sibling dt elements fetched from the parent dl-item element
   */
  protected _parentLanguageOptions: FudisLanguageBadgeContent;

  /**
   * Filtered array, where DOM is compared with Language config set in FudisLanguageBadgeGroupService
   */
  protected _availableLanguages: FudisLanguageAbbr[];

  /**
   * Selected language
   */
  protected _selectedLanguage: FudisLanguageAbbr;

  /**
   * Fudis config language
   */
  private _currentLanguage: FudisLanguageAbbr;

  /**
   * Config array from FudisLanguageBadgeGroupService
   */
  private _languageOptions: Signal<FudisLanguageAbbr[]>;

  /**
   * Used in check to determine which Language Badge is selected by default on first load
   */
  private _firstLoadFinished: boolean = false;

  ngAfterContentInit(): void {
    this._setLanguageOptions();
  }

  /**
   * When Badge button is clicked, adjust host's CSS classes, so in SCSS other languages are set to 'display: none' and selected one is set to 'display: block'
   */
  protected _setSelectedLanguage(lang: FudisLanguageAbbr): void {
    if (this.languages) {
      this._elementRef.nativeElement.classList.value = `fudis-dt-host fudis-dt-host__${lang}`;
    }
    this._selectedLanguage = lang;
  }

  private _setLanguageOptions(): void {
    /**
     * Get from parent dl-element list of available languages in dd-elements
     */
    this._parentLanguageOptions = this._parentDlItem.existingLanguageOptions();

    /**
     * Compare config lang array with available DOM elements
     */
    this._availableLanguages = this._languageOptions().filter(
      (item) => this._parentLanguageOptions[item],
    );

    /**
     * On first load, set current language as selected, else just select first available language as selected.
     */
    if (
      !this._firstLoadFinished &&
      this.languages &&
      this._availableLanguages.includes(this._currentLanguage)
    ) {
      this._firstLoadFinished = true;
      this._setSelectedLanguage(this._currentLanguage);
    } else if (this.languages && this._availableLanguages.length > 0) {
      this._setSelectedLanguage(this._availableLanguages[0]);
    }
  }
}
