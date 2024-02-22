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
   * Alignment of Grid component inside its parent. Default value from GridService: 'center'
   */
  @Input() align: FudisGridAlign = 'center';

  /**
   * Horizontal alignment of Grid Items in a row. Default value from GridService: 'stretch'
   */
  @Input() alignItemsX: FudisGridAlignItems = 'stretch';

  /**
   * Vertical alignment of Grid Items in a row. Default value from GridService: 'stretch'
   */
  @Input() alignItemsY: FudisGridAlignItems = 'stretch';

  /**
   * Custom CSS classes for Grid element. Default value from GridService: []
   */
  @Input() classes: string[];

  /**
   * Grid column gap. Using Fudis spacing token values of xxs to xxl and none.Default value from GridService: 'responsive'
   */
  @Input() columnGap: FudisGridGap = 'responsive';

  /**
   * Setting of columns for the grid. Input will be converted to native CSS grid grid-template-columns values.
   * E. g. as native string: [columns]="'1fr 1fr'" or [columns]="'1fr 2fr'"
   * E. g. as number [columns]="6", which converts to 'repeat(6, 1fr)'
   *
   * For responsive grid behavior, provide GridColumns object.
   * E. g. [columns]="{md: 2, xl: 3}".
   * Before md breakpoint Grid has default of '1fr' columns.
   * After md breakpoint it will have two columns 'repeat(2, 1fr)'
   * And after xl breakpoint 'repeat(3, 1fr)
   */
  @Input() columns: FudisGridColumns = '1fr';

  /**
   * To make Grid ignore default values defined by application and FudisGridService
   */
  @Input() ignoreDefaults: boolean = false;

  /**
   * Margin bottom for the Grid. Default value from GridService: 'none'
   */
  @Input() marginBottom: FudisSpacing = 'none';

  /**
   * Horizontal margins left and right of the grid. Default value from GridService: 'none'
   */
  @Input() marginSides: FudisGridMarginSide = 'none';

  /**
   * Margin top for the Grid. Default value from GridService: 'none'
   */
  @Input() marginTop: FudisSpacing = 'none';

  /**
   * Grid row gap. Using Fudis spacing token values of xxs to xxl and none. Default value from GridService: 'responsive'
   */
  @Input() rowGap: FudisGridGap = 'responsive';

  /**
   * Maximum width of Grid. When viewport gets narrower, grid automatically adjusts to lower sizes.
   * xxl = Default value. Viewports of 1600px and larger
   * xl = Viewports smaller than 1600px
   * lg = Viewports smaller than 1200px
   * md = Viewports smaller than 992px
   * sm = Viewports smaller than 768px
   * xs = Viewports smaller than 576px
   *
   * Default value from GridService: 'xxl'
   */
  @Input() width: FudisGridWidth = 'xxl';
}
