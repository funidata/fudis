import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { GridApiDirective } from '../../directives/grid/grid-api/grid-api.directive';
import { FudisComponentChanges, FudisDescriptionListVariant } from '../../types/miscellaneous';
import { FudisIdService } from '../../services/id/id.service';
import { FudisGridGap } from '../../types/grid';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'fudis-dl, fudis-description-list',
  templateUrl: './description-list.component.html',
  styleUrls: ['./description-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionListComponent
  extends GridApiDirective
  implements OnInit, OnChanges, OnDestroy
{
  constructor(private _idService: FudisIdService) {
    super();
    this.id = this._idService.getNewGrandParentId('description-list');
  }

  /**
   * Disable Grid behavior for Description List
   */
  @Input() disableGrid: boolean = false;

  /**
   * Variant for Description List structure and layout
   */
  @Input() variant: FudisDescriptionListVariant = 'regular';

  /**
   * Grid row gap. Using Fudis spacing token values of xxs to xxl and none.
   */
  @Input() override rowGap: FudisGridGap = 'sm';

  /**
   * HTML element to render. If your Description List has only one item, use 'p', otherwise 'dl'.
   */
  @Input() tag: 'dl' | 'p' = 'dl';

  /**
   * Id generated with Id Service
   */
  public id: string;

  /**
   * CSS class list
   */
  protected _classList = new BehaviorSubject<string[]>([]);

  /**
   * Observable for variant
   */
  private _dlVariant = new BehaviorSubject<FudisDescriptionListVariant>('regular');

  /**
   * Observable for listening disableGrid Input, used in DL Item.
   */
  private _disabledGrid = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this._setClasses();
  }

  ngOnChanges(changes: FudisComponentChanges<DescriptionListComponent>): void {
    if (
      changes.variant?.currentValue &&
      changes.variant?.currentValue !== changes.variant?.previousValue
    ) {
      this._dlVariant.next(changes.variant.currentValue);
    }

    if (changes.disableGrid?.currentValue !== changes.disableGrid?.previousValue) {
      this._setClasses();

      const disableGrid = !!changes.disableGrid?.currentValue;
      this._disabledGrid.next(disableGrid);
    }
  }

  /**
   * Observable for disabledGrid value
   */
  public getDisabledGridStatus(): BehaviorSubject<boolean> {
    return this._disabledGrid;
  }

  /**
   * Observable for variant
   */
  public getVariant(): BehaviorSubject<FudisDescriptionListVariant> {
    return this._dlVariant;
  }

  /**
   * Define correct CSS classes
   */
  private _setClasses(): void {
    const cssClasses = [];

    cssClasses.push('fudis-dl');

    if (this.disableGrid) {
      cssClasses.push('fudis-dl__disabled-grid');
    }

    const combined = this.classes ? cssClasses.concat(this.classes) : cssClasses;

    this._classList.next(combined);
  }

  ngOnDestroy(): void {
    this._dlVariant.complete();
    this._disabledGrid.complete();
  }
}
