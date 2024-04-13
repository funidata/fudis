import { Component, ElementRef, Host, Input, effect } from '@angular/core';
import { FudisLanguageAbbr, FudisLanguageBadgeContent } from '../../../../types/miscellaneous';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { DescriptionListItemComponent } from '../description-list-item.component';
import { DescriptionListComponent } from '../../description-list.component';
import { FudisIdService } from '../../../../services/id/id.service';

@Component({
  selector: 'fudis-dt, fudis-description-list-term',
  templateUrl: './description-list-item-term.component.html',
  styleUrls: ['./description-list-item-term.component.scss'],
})
export class DescriptionListItemTermComponent {
  constructor(
    private _elementRef: ElementRef,
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService,

    @Host() private _parentDlItem: DescriptionListItemComponent,
    @Host() protected _parentDl: DescriptionListComponent,
  ) {
    this._id = this._idService.getNewDlGrandChilId(
      'term',
      this._parentDl.id,
      this._parentDlItem.id,
    );

    effect(() => {
      this._selectableLanguages = _translationService.getSelectableLanguages()();

      this._currentLanguage = _translationService.getLanguage();

      this._parentLanguageOptions = this._parentDlItem.getDetailsLanguageOptions()();

      this._determineSelectedBadge();
    });

    effect(() => {
      const parentVariant = _parentDl.getVariant();

      if (parentVariant() === 'regular') {
        this._mainCssClass = 'fudis-dl-item-term__regular';
      } else {
        this._mainCssClass = 'fudis-dl-item-term__compact';
      }
    });
  }

  /**
   * Renders Fudis Language Badge Group Component for displaying Description List Item Detail values in given languages
   */
  @Input() languages: boolean = true;

  /**
   * Visible text content for term
   */
  @Input() textContent: string;

  /**
   * Available languages of sibling dt elements fetched from the parent dl-item element
   */
  protected _parentLanguageOptions: FudisLanguageBadgeContent;

  /**
   * Selected language
   */
  protected _selectedLanguage: FudisLanguageAbbr | null;

  /**
   * Main CSS class
   */
  protected _mainCssClass: string;

  /**
   * Id generated with Id Service
   */
  protected _id: string;

  /**
   * Fudis config language
   */
  private _currentLanguage: FudisLanguageAbbr;

  /**
   * Selectable Badge Languages from the service
   */
  private _selectableLanguages: FudisLanguageAbbr[];

  protected _setSelectedLanguage(lang: FudisLanguageAbbr): void {
    if (this.languages) {
      this._parentDlItem.selectedLanguage = lang;
    }
    this._selectedLanguage = lang;
  }

  private _determineSelectedBadge(): void {
    if (
      this._parentLanguageOptions[this._currentLanguage] &&
      Object.keys(this._parentLanguageOptions[this._currentLanguage]!).length !== 0 &&
      this._selectableLanguages.includes(this._currentLanguage)
    ) {
      this._selectedLanguage = this._currentLanguage;
    } else {
      const firstAvailable = this._selectableLanguages.find((lang) => {
        const possibleOption = this._parentLanguageOptions[lang];

        let idWithContent;

        if (possibleOption) {
          idWithContent = Object.keys(possibleOption).some((itemId) => {
            return possibleOption[itemId] !== null;
          });
        }

        return idWithContent;
      });

      if (firstAvailable) {
        this._selectedLanguage = firstAvailable as FudisLanguageAbbr;
      } else {
        this._selectedLanguage = null;
      }
    }

    if (this._selectedLanguage) {
      this._parentDlItem.selectedLanguage = this._selectedLanguage;
    }
  }
}
