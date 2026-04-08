import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { GridItemDirective } from '../../../directives/grid/grid-item/grid-item.directive';

/**
 * Represents a single item within a grid layout.
 *
 * Use this component to define column span and placement inside a grid container.
 */
@Component({
  selector: 'fudis-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridItemComponent extends GridItemDirective {}
