import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Host,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  effect,
} from '@angular/core';
import { FudisComponentChanges, FudisLanguageAbbr } from '../../../../types/miscellaneous';
import { DescriptionListItemComponent } from '../description-list-item.component';
import { DescriptionListComponent } from '../../description-list.component';
import { FudisIdService } from '../../../../services/id/id.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'fudis-dd',
  styleUrls: ['./description-list-item-details.component.scss'],
  templateUrl: './description-list-item-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionListItemDetailsComponent implements OnChanges, OnDestroy {
  constructor(
    private _elementRef: ElementRef,
    private _idService: FudisIdService,
    @Host() protected _parentDlItem: DescriptionListItemComponent,
    @Host() protected _parentDl: DescriptionListComponent,
  ) {
    this._id = this._idService.getNewDlGrandChilId(
      'details',
      this._parentDl.id,
      this._parentDlItem.id,
    );

    effect(() => {
      if (_parentDl.getVariant()() === 'regular') {
        this._mainCssClass.next('fudis-dl-item-details__regular');
      } else {
        this._mainCssClass.next('fudis-dl-item-details__compact');
      }
    });

    effect(() => {
      this._langSelected.next(!!(this.lang && _parentDlItem.getSelectedLanguage()() === this.lang));
    });
  }

  /**
   * Binding host CSS class to component wrapper
   */
  @HostBinding('class') private _hostClass = 'fudis-dl-item-details-host';

  /**
   * Details element language, possible values 'fi', 'sv' and 'en'.
   */
  @Input() lang: FudisLanguageAbbr;

  /**
   * Visible text content for Details
   */
  @Input() contentText: string;

  /**
   * Sub heading in between Term and Details elements
   */
  @Input() subHeading: string | undefined;

  /**
   * Aria-label for classified/hidden Details content
   */
  @Input() ariaLabel: string | undefined;

  /**
   * Id generated with Id Service
   */
  protected _id: string;

  /**
   * Selected language to show respective Details content
   */
  protected _langSelected = new BehaviorSubject<boolean>(false);

  /**
   * If component has language and has sent info to parent
   */
  private _detailsSent: boolean;

  /**
   * Main CSS class
   */
  protected _mainCssClass: BehaviorSubject<string> = new BehaviorSubject<string>(
    'fudis-dl-item-details__regular',
  );

  /**
   * Parse Details text content and set parent Description List Item languages
   */
  private _sendDetailsLanguageToParent(): void {
    const parsedContentText =
      this.contentText && this.contentText.replace(/\s/g, '') !== '' ? this.contentText : null;

    if (parsedContentText && !this._detailsSent) {
      this._parentDlItem.addDetailsLanguage(this.lang, parsedContentText, this._id);

      this._detailsSent = true;

      this._hostClass = `fudis-dl-item-details-host fudis-dl-item-details-host--${this.lang}`;
    }
  }

  private _removeDetailsFromParent(): void {
    if (this._detailsSent) {
      this._parentDlItem.removeDetailsLanguage(this.lang, this._id);
      this._detailsSent = false;
      this._hostClass = `fudis-dl-item-details-host`;
    }
  }

  ngOnChanges(changes: FudisComponentChanges<DescriptionListItemDetailsComponent>): void {
    // If language changes, update it to parent. If language changes to undefined, remove it from parent.
    if (!changes.lang?.firstChange && !!changes.lang?.currentValue) {
      this._removeDetailsFromParent();
      this._sendDetailsLanguageToParent();
    } else if (!changes.lang?.currentValue) {
      this._removeDetailsFromParent();
    }

    // If text content changes, update it to parent
    if (changes.contentText?.currentValue !== changes.contentText?.previousValue && this.lang) {
      this._sendDetailsLanguageToParent();
    }
  }

  ngOnDestroy(): void {
    this._removeDetailsFromParent();
  }
}
