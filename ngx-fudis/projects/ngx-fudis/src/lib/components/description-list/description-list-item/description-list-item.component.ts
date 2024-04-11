import { Component, ElementRef, Host, OnDestroy, OnInit, effect, signal } from '@angular/core';
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
    this.id = _idService.getNewGroupId('description-list', this._parentDl.id);

    effect(() => {
      /**
       * Listens to parent's changes and updates CSS classes.
       */
      this._setClasses(_parentDl.getDisabledGridStatus()(), _parentDl.getVariant()());
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
   * Id generated with Id Service
   */
  public id: string;

  /**
   * Main CSS class
   */
  protected _mainCssClass: string;

  ngOnInit(): void {
    /** Registers itself to the parent */
    this._parentDl.addChildId(this.id);
  }

  ngOnDestroy(): void {
    /** Removes itself from the parent */
    this._parentDl.removeChildId(this.id);
  }

  /**
   * DL Item has combined styles for both regular and compact versions but some styles only apply to regular version if parent's disableGrid is true.
   */
  private _setClasses(disabledGrid: boolean, parentVariant: FudisDescriptionListVariant): void {
    if (disabledGrid && parentVariant !== 'compact') {
      this._mainCssClass = 'fudis-dl-item__disabled-grid';
    } else {
      this._mainCssClass = 'fudis-dl-item';
    }
  }
}
