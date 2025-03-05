import { Directive, Input } from '@angular/core';
import {
  FudisGridWidth,
  FudisGridGap,
  FudisGridAlign,
  FudisGridAlignItems,
  FudisGridColumns,
} from '../../../types/grid';

@Directive({
    selector: '[fudisGridApi]',
    standalone: false
})
export class GridApiDirective {
  /**
   * Alignment of Grid component inside its parent. Defines margins for the Grid element
   */
  @Input() align: FudisGridAlign = 'start';

  /**
   * Horizontal alignment of Grid Items in a row.
   */
  @Input() alignItemsX: FudisGridAlignItems = 'stretch';

  /**
   * Vertical alignment of Grid Items in a row.
   */
  @Input() alignItemsY: FudisGridAlignItems = 'stretch';

  /**
   * Custom CSS classes for Grid element.
   */
  @Input() classes: string;

  /**
   * Gutter gap between columns. Using Fudis spacing token values of xxs to xxl, none and
   * responsive.
   */
  @Input() columnGap: FudisGridGap = 'responsive';

  /**
   * Setting of columns for the Grid. Input will be converted to native CSS grid
   * grid-template-columns values.
   */
  @Input() columns: FudisGridColumns = '1fr';

  /**
   * To make Grid ignore default values defined by application and FudisGridService
   */
  @Input() serviceDefaults: boolean = true;

  /**
   * Grid row gap. Using Fudis spacing token values of xxs to xxl and none.
   */
  @Input() rowGap: FudisGridGap = 'none';

  /**
   * Maximum width of Grid. When viewport gets narrower, grid automatically adjusts to lower sizes.
   */
  @Input() width: FudisGridWidth = 'xxl';
}
