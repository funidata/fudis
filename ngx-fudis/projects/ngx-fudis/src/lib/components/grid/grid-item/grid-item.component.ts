import { Component, ViewEncapsulation } from '@angular/core';
import { GridItemDirective } from '../../../directives/grid/grid-item/grid-item.directive';

@Component({
  selector: 'fudis-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GridItemComponent extends GridItemDirective {}
