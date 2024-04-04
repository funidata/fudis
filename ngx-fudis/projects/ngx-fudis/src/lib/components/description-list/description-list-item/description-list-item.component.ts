import {
  Component,
  ContentChildren,
  ElementRef,
  Host,
  OnDestroy,
  OnInit,
  QueryList,
  effect,
  signal,
} from '@angular/core';
import { DescriptionListItemDetailsComponent } from './description-list-item-details/description-list-item-details.component';
import { FudisLanguageAbbr, FudisLanguageBadgeContent } from '../../../types/miscellaneous';
import { FudisIdService } from '../../../services/id/id.service';
import { DescriptionListComponent } from '../description-list.component';

@Component({
  selector: 'fudis-dl-item, fudis-description-list-item',
  styleUrls: ['./description-list-item.component.scss'],
  templateUrl: './description-list-item.component.html',
})
export class DescriptionListItemComponent implements OnInit, OnDestroy {
  constructor(
    private _element: ElementRef,
    private _idService: FudisIdService,
    @Host() protected _parentDl: DescriptionListComponent,
  ) {
    effect(() => {
      _parentDl.disabledGridSignal();

      this._setClasses();
    });
  }

  @ContentChildren(DescriptionListItemDetailsComponent)
  ddChildrenElements!: QueryList<DescriptionListItemDetailsComponent>;

  /**
   * Storing list of available languages in dd-elements
   */
  public detailsLanguageOptions = signal<FudisLanguageBadgeContent>({});

  /**
   * Internal id for DL Item
   */
  protected _id: string;

  protected _mainCssClass: string;

  public selectedLanguage: FudisLanguageAbbr;

  ngOnInit(): void {
    this._id = this._idService.getNewId('description-list-item');
    this._parentDl.addChildId(this._id);
  }

  ngOnDestroy(): void {
    this._parentDl.removeChildId(this._id);
  }

  private _setClasses(): void {
    if (this._parentDl.disableGrid && this._parentDl.variant !== 'compact') {
      this._mainCssClass = 'fudis-dl-item__disabled-grid';
    } else {
      this._mainCssClass = 'fudis-dl-item';
    }
  }
}
