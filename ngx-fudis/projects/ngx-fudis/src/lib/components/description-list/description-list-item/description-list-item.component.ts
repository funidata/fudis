import {
  Component,
  ContentChildren,
  ElementRef,
  Host,
  OnDestroy,
  OnInit,
  QueryList,
  Signal,
  effect,
  signal,
} from '@angular/core';
import { DescriptionListItemDetailsComponent } from './description-list-item-details/description-list-item-details.component';
import {
  FudisDescriptionListVariant,
  FudisLanguageAbbr,
  FudisLanguageBadgeContent,
} from '../../../types/miscellaneous';
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
      this._parentDlVariant = _parentDl.getVariant();

      if (this._parentDlVariant() === 'regular') {
        this._classes = 'fudis-dl-item__regular';
      } else {
        this._classes = 'fudis-dl-item__compact';
      }
    });
  }

  @ContentChildren(DescriptionListItemDetailsComponent)
  ddChildrenElements!: QueryList<DescriptionListItemDetailsComponent>;

  /**
   * Storing list of available languages in dd-elements
   */
  @Host() public detailsLanguageOptions = signal<FudisLanguageBadgeContent>({});

  /**
   * Internal id for DL Item
   */
  protected _id: string;

  protected _classes: string;

  /**
   * Parent Description List variant
   */
  private _parentDlVariant: Signal<FudisDescriptionListVariant>;

  public selectedLanguage: FudisLanguageAbbr;

  ngOnInit(): void {
    this._id = this._idService.getNewId('description-list-item');
    this._parentDl.addChildId(this._id);
  }

  ngOnDestroy(): void {
    this._parentDl.removeChildId(this._id);
  }
}
