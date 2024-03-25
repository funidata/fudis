import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Host,
  OnDestroy,
  OnInit,
  QueryList,
  signal,
} from '@angular/core';
import { DescriptionListItemDetailsComponent } from './description-list-item-details/description-list-item-details.component';
import { FudisLanguageBadgeContent } from '../../../types/miscellaneous';
import { FudisIdService } from '../../../services/id/id.service';
import { DescriptionListComponent } from '../description-list.component';

@Component({
  selector: 'fudis-dl-item, fudis-description-list-item',
  templateUrl: './description-list-item.component.html',
})
export class DescriptionListItemComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private _element: ElementRef,
    private _idService: FudisIdService,
    @Host() private _parentDescriptionList: DescriptionListComponent,
  ) {}

  @ContentChildren(DescriptionListItemDetailsComponent)
  ddChildrenElements!: QueryList<DescriptionListItemDetailsComponent>;

  /**
   * Storing list of available languages in dd-elements
   */
  @Host() public existingLanguageOptions = signal<FudisLanguageBadgeContent>({});

  /**
   * Internal id for DL Item
   */
  protected _id: string;

  /**
   * Description List Item length helper
   */
  public descriptionListItems: string[];

  ngAfterViewInit(): void {
    this._checkCurrentChildren();
  }

  ngOnInit(): void {
    this._id = this._idService.getNewId('description-list-item');
    this._parentDescriptionList.addChildId(this._id);
    this.descriptionListItems = this._parentDescriptionList.childIds;
    console.log('DL Item length: ', this.descriptionListItems.length);
  }

  ngOnDestroy(): void {
    this._parentDescriptionList.removeChildId(this._id);
  }

  /**
   * Check for what languages are available as item's children dd-elements
   */
  private _checkCurrentChildren(): void {
    let temp: FudisLanguageBadgeContent = {};

    if (this.ddChildrenElements) {
      this.ddChildrenElements.forEach((item) => {
        const htmlContent = (this._element.nativeElement as HTMLElement).querySelector(
          `.fudis-dl__item__details__${item.lang} .fudis-dl__item__details__content`,
        )?.textContent;

        const textContent =
          htmlContent && htmlContent.replace(/\s/g, '') !== '' ? htmlContent : null;

        temp = { ...temp, [item.lang]: textContent };
      });
    }

    this.existingLanguageOptions.set(temp);
  }
}
