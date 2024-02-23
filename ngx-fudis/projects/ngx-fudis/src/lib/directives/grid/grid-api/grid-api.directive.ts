import { Directive, Input } from '@angular/core';
import {
  FudisGridWidth,
  FudisGridMarginSide,
  FudisGridGap,
  FudisGridAlign,
  FudisGridAlignItems,
  FudisGridColumns,
} from '../../../types/grid';
import { FudisSpacing } from '../../../types/miscellaneous';

@Directive({
  selector: '[fudisGridApi]',
})
export class GridApiDirective {
  /**
   * Alignment of Grid component inside its parent. After initialisation defaults to: 'center'
   */
  @Input() align: FudisGridAlign;

  /**
   * Horizontal alignment of Grid Items in a row.
   *
   * After initialisation defaults to: 'stretch'
   */
  @Input() alignItemsX: FudisGridAlignItems;

  /**
   * Vertical alignment of Grid Items in a row.
   *
   * After initialisation defaults to: 'stretch'
   */
  @Input() alignItemsY: FudisGridAlignItems;

  /**
   * Custom CSS classes for Grid element.
   */
  @Input() classes: string[];

  /**
   * Grid column gap. Using Fudis spacing token values of xxs to xxl and none.
   *
   * After initialisation defaults to: 'responsive'
   */
  @Input() columnGap: FudisGridGap;

  /**
   * Setting of columns for the grid. Input will be converted to native CSS grid grid-template-columns values.
   * E. g. as native string: [columns]="'1fr 1fr'" or [columns]="'1fr 2fr'"
   * E. g. as number [columns]="6", which converts to 'repeat(6, 1fr)'
   *
   * For responsive grid behavior, provide GridColumns object.
   * E. g. [columns]="{md: 2, xl: 3}".
   * Before md breakpoint Grid has default of '1fr' columns.
   * After md breakpoint it will have two columns 'repeat(2, 1fr)'
   * And after xl breakpoint 'repeat(3, 1fr)'
   *
   * After initialisation defaults to: '1fr'
   *
   */
  @Input() columns: FudisGridColumns;

  /**
   * To make Grid ignore default values defined by application and FudisGridService
   */
  @Input() ignoreDefaults: boolean = false;

  /**
   * Margin bottom for the Grid.
   *
   * After initialisation defaults to: 'none'
   */
  @Input() marginBottom: FudisSpacing;

  /**
   * Horizontal margins left and right of the grid.
   *
   * After initialisation defaults to: 'none'
   */
  @Input() marginSides: FudisGridMarginSide;

  /**
   * Margin top for the Grid.
   *
   * After initialisation defaults to: 'none'
   */
  @Input() marginTop: FudisSpacing;

  /**
   * Grid row gap. Using Fudis spacing token values of xxs to xxl and none.
   *
   * After initialisation defaults to: 'responsive'
   */
  @Input() rowGap: FudisGridGap;

  /**
   * Maximum width of Grid. When viewport gets narrower, grid automatically adjusts to lower sizes.
   * xxl = Default value. Viewports of 1600px and larger
   * xl = Viewports smaller than 1600px
   * lg = Viewports smaller than 1200px
   * md = Viewports smaller than 992px
   * sm = Viewports smaller than 768px
   * xs = Viewports smaller than 576px
   *
   * After initialisation defaults to: 'xxl'
   */
  @Input() width: FudisGridWidth;
}
