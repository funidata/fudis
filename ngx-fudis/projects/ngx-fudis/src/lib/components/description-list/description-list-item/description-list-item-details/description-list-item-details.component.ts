import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  ViewChild,
  effect,
} from '@angular/core';
import { FudisLanguageAbbr } from '../../../../types/miscellaneous';
import { ActionsDirective } from '../../../../directives/content-projection/actions/actions.directive';
import { DescriptionListItemComponent } from '../description-list-item.component';
import { DescriptionListComponent } from '../../description-list.component';

@Component({
  selector: 'fudis-dd, fudis-description-list-details',
  styleUrls: ['./description-list-item-details.component.scss'],
  templateUrl: './description-list-item-details.component.html',
})
export class DescriptionListItemDetailsComponent implements AfterViewInit, OnDestroy {
  constructor(
    @Host() protected _parentDlItem: DescriptionListItemComponent,
    @Host() protected _parentDl: DescriptionListComponent,
  ) {
    effect(() => {
      const parentVariant = _parentDl.getVariant();

      if (parentVariant() === 'regular') {
        this._mainCssClass = 'fudis-dl-item-details__regular';
      } else {
        this._mainCssClass = 'fudis-dl-item-details__compact';
      }
    });
  }
  @ContentChild(ActionsDirective) actions: ActionsDirective;

  @ViewChild('ddTextContent') content: ElementRef;

  @Input() lang: FudisLanguageAbbr;

  @Input() subHeading: string | undefined;

  protected _mainCssClass: string;

  protected _languageLoadFinished: boolean = false;

  ngAfterViewInit(): void {
    if (this.lang) {
      this._addNewLanguageToParent();
    }
  }

  ngOnDestroy(): void {
    if (this._languageLoadFinished && this.lang) {
      const currentLanguageOptions = this._parentDlItem.detailsLanguageOptions();

      if (currentLanguageOptions?.[this.lang]) {
        delete currentLanguageOptions[this.lang];
      }
    }
  }

  private _addNewLanguageToParent(): void {
    if (this.content?.nativeElement) {
      const textContent = this.content.nativeElement.textContent;
      const parsedTextContent =
        textContent && textContent.replace(/\s/g, '') !== '' ? textContent : null;

      this._parentDlItem.detailsLanguageOptions.set({
        ...this._parentDlItem.detailsLanguageOptions(),
        [this.lang]: parsedTextContent,
      });
      this._languageLoadFinished = true;
    }
  }
}
