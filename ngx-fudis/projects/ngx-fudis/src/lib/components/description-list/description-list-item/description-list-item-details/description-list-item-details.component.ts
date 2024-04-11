import {
  Component,
  ContentChild,
  ElementRef,
  Host,
  HostBinding,
  Input,
  OnChanges,
  ViewChild,
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
})
export class DescriptionListItemDetailsComponent implements OnChanges {
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
      const parentVariant = _parentDl.getVariant();

      if (parentVariant() === 'regular') {
        this._mainCssClass = 'fudis-dl-item-details__regular';
      } else {
        this._mainCssClass = 'fudis-dl-item-details__compact';
      }
    });
  }

  /**
   * Binding host CSS class to component wrapper
   */
  @HostBinding('class') private _hostClass = 'fudis-dl-item-details-host';

  /**
   * Possible action buttons for Details element
   */
  @ContentChild(ActionsDirective) actions: ActionsDirective;

  /**
   * ViewChild for Details element content
   */
  @ViewChild('ddTextContent') private _content: ElementRef;

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

  /**
   * Detect if Details' text content has been loaded for current language
   */
  protected _languageLoadFinished: boolean = false;

  ngOnChanges(changes: FudisComponentChanges<DescriptionListItemDetailsComponent>): void {
    /**
     * Parse Details text content and set parent Description List Item languages
     */
    if (changes.textContent?.currentValue && this.lang) {
      const text = changes.textContent.currentValue;

      const parsedTextContent = text && text.replace(/\s/g, '') !== '' ? text : null;

      this._parentDlItem.addDetailsLanguage(this.lang, parsedTextContent);
    }
  }

  // TODO: rethink this
  // ngOnDestroy(): void {
  //   if (this._languageLoadFinished && this.lang) {
  //     const currentLanguageOptions = this._parentDlItem.detailsLanguageOptions();

  //     if (currentLanguageOptions?.[this.lang]) {
  //       delete currentLanguageOptions[this.lang];
  //     }
  //   }
  // }
}
