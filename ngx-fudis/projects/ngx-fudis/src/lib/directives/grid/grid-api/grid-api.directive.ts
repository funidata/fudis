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
  standalone: false,
})
export class GridApiDirective {
  /**
   * Alignment of Grid component inside its parent: 'start' | 'end' | 'center'
   */
  @Input() align: FudisGridAlign = 'start';

  /**
   * Horizontal alignment of Grid Items in a row: 'start' | 'center' | 'end' | 'stretch' |
   * 'baseline'
   */
  @Input() alignItemsX: FudisGridAlignItems = 'stretch';

  /**
   * Vertical alignment of Grid Items in a row: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
   */
  @Input() alignItemsY: FudisGridAlignItems = 'stretch';

  /**
   * Custom CSS classes for Grid element.
   */
  @Input() classes: string;

  /**
   * Gutter gap between columns: 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' |
   * 'responsive'
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
   * Grid row gap: 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'responsive'
   */
  @Input() rowGap: FudisGridGap = 'none';

  /**
   * Maximum width of Grid: 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'initial'. When viewport gets
   * narrower, grid automatically adjusts to lower sizes.
   */
  @Input() width: FudisGridWidth = 'xxl';
}
