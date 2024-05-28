import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  Input,
  effect,
} from '@angular/core';
import { FudisLanguageAbbr, FudisLanguageBadgeContent } from '../../../../types/miscellaneous';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { DescriptionListItemComponent } from '../description-list-item.component';
import { DescriptionListComponent } from '../../description-list.component';
import { FudisIdService } from '../../../../services/id/id.service';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fudis-dt, fudis-description-list-term',
  templateUrl: './description-list-item-term.component.html',
  styleUrls: ['./description-list-item-term.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionListItemTermComponent {
  constructor(
    private _elementRef: ElementRef,
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService,
    private _cdr: ChangeDetectorRef,
    @Host() protected _parentDlItem: DescriptionListItemComponent,
    @Host() protected _parentDl: DescriptionListComponent,
  ) {
    this._id = this._idService.getNewDlGrandChilId(
      'term',
      this._parentDl.id,
      this._parentDlItem.id,
    );

    effect(() => {
      if (this._parentLanguageOptions) {
        const updatedSelectableLanguages = _translationService.getSelectableLanguages()();

        this._determineSelectedBadge(this._parentLanguageOptions, updatedSelectableLanguages);
      }
    });

    _parentDlItem
      .getDetailsLanguageOptions()
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this._parentLanguageOptions = value;

        this._determineSelectedBadge(
          this._parentLanguageOptions,
          _translationService.getSelectableLanguages()(),
        );
      });

    _parentDl
      .getVariant()
      .pipe(takeUntilDestroyed())
      .subscribe((variant) => {
        if (variant === 'regular') {
          this._mainCssClass.next('fudis-dl-item-term__regular');
        } else {
          this._mainCssClass.next('fudis-dl-item-term__compact');
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
   * Main CSS class
   */
  protected _mainCssClass: BehaviorSubject<string> = new BehaviorSubject<string>(
    'fudis-dl-item-term__regular',
  );

  /**
   * Id generated with Id Service
   */
  protected _id: string;

  protected _setSelectedLanguage(lang: FudisLanguageAbbr): void {
    if (this.languages) {
      this._parentDlItem.setSelectedLanguage(lang);
    }
  }

  private _determineSelectedBadge(
    parentOptions: FudisLanguageBadgeContent,
    selectableLanguages: FudisLanguageAbbr[],
  ): void {
    const currentLang = this._translationService.getLanguage();

    let determinedLanguage: FudisLanguageAbbr | null;

    if (
      parentOptions[currentLang] &&
      Object.keys(parentOptions[currentLang]!).length !== 0 &&
      selectableLanguages.includes(currentLang)
    ) {
      determinedLanguage = currentLang;
    } else {
      const firstAvailable = selectableLanguages.find((lang) => {
        const possibleOption = parentOptions[lang];

        let idWithContent;

        if (possibleOption) {
          idWithContent = Object.keys(possibleOption).some((itemId) => {
            return possibleOption[itemId] !== null;
          });
        }

        return idWithContent;
      });

      if (firstAvailable) {
        determinedLanguage = firstAvailable as FudisLanguageAbbr;
      } else {
        determinedLanguage = null;
      }
    }

    this._parentDlItem.setSelectedLanguage(determinedLanguage);
  }
}
