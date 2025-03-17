import { Component, ViewEncapsulation } from '@angular/core';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';

@Component({
  selector: 'fudis-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})

/**
 * Just a wrapper component to be able to use Grid in templates using '<fudis-grid></fudis-grid>'
 * tags. Main functionality is in GridDirective
 */
export class GridComponent extends GridDirective {}
