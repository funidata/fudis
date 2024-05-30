import { ChangeDetectionStrategy, Component, Host, Input } from '@angular/core';
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
    private _translationService: FudisTranslationService,
    private _idService: FudisIdService,
    @Host() protected _parentDlItem: DescriptionListItemComponent,
    @Host() protected _parentDl: DescriptionListComponent,
  ) {
    this._id = this._idService.getNewDlGrandChilId(
      'term',
      this._parentDl.id,
      this._parentDlItem.id,
    );

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

  /**
   * When Language Badge is clicked, update clicked language to parent item
   * @param lang FudisLanguageAbbr
   */
  protected _setSelectedLanguage(lang: FudisLanguageAbbr | null): void {
    if (this.languages) {
      this._parentDlItem.setSelectedLanguage(lang);
    }
  }
}
