import { Component, Input, OnInit, OnChanges, Signal, signal } from '@angular/core';
import { GridApiDirective } from '../../directives/grid/grid-api/grid-api.directive';
import { FudisComponentChanges, FudisDescriptionListVariant } from '../../types/miscellaneous';
import { FudisIdService } from '../../services/id/id.service';

@Component({
  selector: 'fudis-dl, fudis-description-list',
  templateUrl: './description-list.component.html',
  styleUrls: ['./description-list.component.scss'],
})
export class DescriptionListComponent extends GridApiDirective implements OnInit, OnChanges {
  constructor(private _idService: FudisIdService) {
    super();
  }

  /**
   * Disable Fudis Grid behavior for Description List
   */
  @Input() disableGrid: boolean = false;

  /**
   * Variant for Description List structure and layout
   */
  @Input() variant: FudisDescriptionListVariant = 'regular';

  /**
   * Signal for listening disableGrid Input
   */
  public disabledGridSignal = signal<boolean>(false);

  /**
   * Child Description List Item array.
   * If only one DL Item is present, Description List is rendered as paragraph element
   */
  public childDlItems: string[] = [];

  /**
   * CSS class list
   */
  protected _classList: string[] = [];

  /**
   * Internal id
   */
  protected _id: string;

  /**
   * Signal for listening variant Input
   */
  private _dlVariant = signal<FudisDescriptionListVariant>('regular');

  ngOnInit(): void {
    this._setClasses();
    this._id = this._idService.getNewId('description-list');
  }

  ngOnChanges(changes: FudisComponentChanges<DescriptionListComponent>): void {
    if (changes.variant?.currentValue) {
      this._dlVariant.set(changes.variant.currentValue);
    }

    if (changes.variant || changes.disableGrid) {
      this._setClasses();

      if (changes.disableGrid) {
        const disableGrid = !!changes.disableGrid.currentValue;
        this.disabledGridSignal.set(disableGrid);
      }
    }
  }

  /**
   * Add to the child DL Item array
   */
  public addChildId(id: string): void {
    this.childDlItems.push(id);
  }

  /**
   * Remove from the child DL Items array
   */
  public removeChildId(id: string): void {
    const idToRemove = this.childDlItems.indexOf(id);

    if (idToRemove > -1) {
      this.childDlItems.splice(idToRemove, 1);
    }
  }

  /**
   * Read only signal for Description List variant
   */
  public getVariant(): Signal<FudisDescriptionListVariant> {
    return this._dlVariant.asReadonly();
  }

  /**
   * Define correct CSS classes for both variants
   */
  private _setClasses(): void {
    const cssClasses = [];

    if (this.variant === 'regular') {
      cssClasses.push('fudis-dl');

      if (this.disableGrid) {
        cssClasses.push('fudis-dl__disabled-grid');
      }
    }

    if (this.variant === 'compact') {
      cssClasses.push('fudis-dl-compact');
      if (this.disableGrid) {
        cssClasses.push('fudis-dl-compact__disabled-grid');
      }
    }

    const combined = this.classes ? cssClasses.concat(this.classes) : cssClasses;

    this._classList = combined;
  }
}
