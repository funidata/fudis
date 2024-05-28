import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Host,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  effect,
} from '@angular/core';
import { FudisComponentChanges, FudisLanguageAbbr } from '../../../../types/miscellaneous';
import { ActionsDirective } from '../../../../directives/content-projection/actions/actions.directive';
import { DescriptionListItemComponent } from '../description-list-item.component';
import { DescriptionListComponent } from '../../description-list.component';
import { FudisIdService } from '../../../../services/id/id.service';

@Component({
  selector: 'fudis-dd, fudis-description-list-details',
  styleUrls: ['./description-list-item-details.component.scss'],
  templateUrl: './description-list-item-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionListItemDetailsComponent implements OnChanges, OnDestroy {
  constructor(
    private _elementRef: ElementRef,
    private _idService: FudisIdService,
    private _cdr: ChangeDetectorRef,
    @Host() protected _parentDlItem: DescriptionListItemComponent,
    @Host() protected _parentDl: DescriptionListComponent,
  ) {
    this._id = this._idService.getNewDlGrandChilId(
      'details',
      this._parentDl.id,
      this._parentDlItem.id,
    );

    _parentDlItem.selectedLanguage.subscribe((value) => {
      this._parentItemSelectedLanguage = value;
      _cdr.detectChanges();
    });

    effect(() => {
      const parentVariant = _parentDl.getVariant();

      if (parentVariant() === 'regular') {
        this._mainCssClass = 'fudis-dl-item-details__regular';
      } else {
        this._mainCssClass = 'fudis-dl-item-details__compact';
      }
      _cdr.detectChanges();
    });
  }

  /**
   * Binding host CSS class to component wrapper
   */
  @HostBinding('class') private _hostClass = 'fudis-dl-item-details-host';

  /**
   * Possible action buttons for Details element
   */
  @ContentChild(ActionsDirective) protected _actions: ActionsDirective;

  /**
   * Details element language, possible values 'fi', 'sv' and 'en'.
   */
  @Input() lang: FudisLanguageAbbr;

  /**
   * Visible text content for details
   */
  @Input() textContent: string;

  /**
   * Sub heading in between Term and Details elements
   */
  @Input() subHeading: string | undefined;

  /**
   * Id generated with Id Service
   */
  protected _id: string;

  /**
   * Main CSS class
   */
  protected _mainCssClass: string;

  protected _parentItemSelectedLanguage: FudisLanguageAbbr | null;

  /**
   * Parse Details text content and set parent Description List Item languages
   */
  private _sendDetailsLanguageToParent(): void {
    const parsedTextContent =
      this.textContent && this.textContent.replace(/\s/g, '') !== '' ? this.textContent : null;

    if (parsedTextContent) {
      this._parentDlItem.addDetailsLanguage(this.lang, parsedTextContent, this._id);

      this._hostClass = `fudis-dl-item-details-host fudis-dl-item-details-host--${this.lang}`;
    }
  }

  private _removeDetailsFromParent(): void {
    this._parentDlItem.removeDetailsLanguage(this.lang, this._id);
    this._hostClass = `fudis-dl-item-details-host`;
  }

  ngOnChanges(changes: FudisComponentChanges<DescriptionListItemDetailsComponent>): void {
    // If language changes, update it to parent. If language changes to undefined, remove it from parent.
    if (!changes.lang?.firstChange && this.lang) {
      this._removeDetailsFromParent();
      this._sendDetailsLanguageToParent();
    } else if (!changes.lang?.currentValue) {
      this._removeDetailsFromParent();
    }

    // If text content changes, update it to parent
    if (changes.textContent?.currentValue !== changes.textContent?.previousValue && this.lang) {
      this._sendDetailsLanguageToParent();
    }
  }

  ngOnDestroy(): void {
    this._removeDetailsFromParent();
  }
}
