import { Component, ElementRef, Host, OnDestroy, OnInit, effect, signal } from '@angular/core';
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

  /**
   * Storing list of available languages in Details elements
   */
  public detailsLanguageOptions = signal<FudisLanguageBadgeContent>({});

  /**
   * Selected language to pass to child components
   */
  public selectedLanguage: FudisLanguageAbbr;

  /**
   * Internal id to pass to parent DL
   */
  protected _id: string;

  /**
   * Main CSS class
   */
  protected _mainCssClass: string;

  ngOnInit(): void {
    this._id = this._idService.getNewId('description-list-item');
    this._parentDl.addChildId(this._id);
  }

  ngOnDestroy(): void {
    this._parentDl.removeChildId(this._id);
  }

  /**
   * DL Item has combined styles for both regular and compact versions but some styles only apply to regular version if parent's disableGrid is true.
   */
  private _setClasses(): void {
    if (this._parentDl.disableGrid && this._parentDl.variant !== 'compact') {
      this._mainCssClass = 'fudis-dl-item__disabled-grid';
    } else {
      this._mainCssClass = 'fudis-dl-item';
    }
  }
}
