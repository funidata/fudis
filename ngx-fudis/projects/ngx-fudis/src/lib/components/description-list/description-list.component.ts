import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
  signal,
  Signal,
} from '@angular/core';
import { GridApiDirective } from '../../directives/grid/grid-api/grid-api.directive';
import { FudisComponentChanges, FudisDescriptionListVariant } from '../../types/miscellaneous';
import { FudisIdService } from '../../services/id/id.service';
import { FudisGridGap } from '../../types/grid';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'fudis-dl',
  templateUrl: './description-list.component.html',
  styleUrls: ['./description-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionListComponent extends GridApiDirective implements OnInit, OnChanges {
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
   * Signal for variant
   */
  private _dlVariant = signal<FudisDescriptionListVariant>('regular');

  /**
   * Signal for listening disableGrid Input, used in DL Item.
   */
  private _disabledGrid = signal<boolean>(false);

  ngOnInit(): void {
    this._setClasses();
  }

  ngOnChanges(changes: FudisComponentChanges<DescriptionListComponent>): void {
    if (
      changes.variant?.currentValue &&
      changes.variant?.currentValue !== changes.variant?.previousValue
    ) {
      this._dlVariant.set(changes.variant.currentValue);
    }

    if (changes.disableGrid?.currentValue !== changes.disableGrid?.previousValue) {
      this._setClasses();
      const disableGrid = !!changes.disableGrid?.currentValue;
      this._disabledGrid.set(disableGrid);
    }
  }

  /**
   * Read only signal for variant
   */
  public getVariant(): Signal<FudisDescriptionListVariant> {
    return this._dlVariant.asReadonly();
  }

  /**
   * Read only signal for disabledGrid value
   */
  public getDisabledGridStatus(): Signal<boolean> {
    return this._disabledGrid.asReadonly();
  }

  /**
   * Define correct CSS classes
   */
  private _setClasses(): void {
    const cssClasses = [];

    cssClasses.push('fudis-dl');
    cssClasses.push('fudis-my-none'); // Defining none margins with helper class allows overriding through classes input

    if (this.disableGrid) {
      cssClasses.push('fudis-dl__disabled-grid');
    }

    const combined = this.classes ? cssClasses.concat(this.classes) : cssClasses;

    this._classList.next(combined);
  }
}
