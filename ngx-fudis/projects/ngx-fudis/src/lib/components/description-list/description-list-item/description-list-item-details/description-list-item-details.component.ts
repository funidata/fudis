import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Host,
  HostBinding,
  Input,
  ViewChild,
  effect,
} from '@angular/core';
import { FudisLanguageAbbr } from '../../../../types/miscellaneous';
import { ActionsDirective } from '../../../../directives/content-projection/actions/actions.directive';
import { DescriptionListItemComponent } from '../description-list-item.component';
import { DescriptionListComponent } from '../../description-list.component';
import { FudisIdService } from '../../../../services/id/id.service';

@Component({
  selector: 'fudis-dd, fudis-description-list-details',
  styleUrls: ['./description-list-item-details.component.scss'],
  templateUrl: './description-list-item-details.component.html',
})
export class DescriptionListItemDetailsComponent implements AfterViewInit {
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
  @ViewChild('ddTextContent') content: ElementRef;

  /**
   * Details element language, possible values 'fi', 'sv' and 'en'.
   */
  @Input() lang: FudisLanguageAbbr;

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

  ngAfterViewInit(): void {
    if (this.lang) {
      this._addNewLanguageToParent();
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

  /**
   * Parse Details text content and set parent Description List Item languages
   */
  private _addNewLanguageToParent(): void {
    if (this.content?.nativeElement) {
      const textContent = this.content.nativeElement.textContent;
      const parsedTextContent =
        textContent && textContent.replace(/\s/g, '') !== '' ? textContent : null;

      this._parentDlItem.addDetailsLanguage(this.lang, parsedTextContent);
      this._languageLoadFinished = true;
    }
  }
}
