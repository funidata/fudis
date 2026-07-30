import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';

/**
 * Provides a responsive grid layout.
 *
 * Use this component to structure page or section layouts visually using columns.
 *
 * @example
 *   ```html
 *   <fudis-grid [columns]="3">
 *     <fudis-text-input [label]="'First name'" [control]="firstNameControl"></fudis-text-input>
 *     <fudis-text-input [label]="'Last name'" [control]="lastNameControl"></fudis-text-input>
 *   </fudis-grid>
 *   ```;
 */
@Component({
  selector: 'fudis-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * Just a wrapper component to be able to use Grid in templates using '<fudis-grid></fudis-grid>'
 * tags. Main functionality is in GridDirective
 */
export class GridComponent extends GridDirective {}
