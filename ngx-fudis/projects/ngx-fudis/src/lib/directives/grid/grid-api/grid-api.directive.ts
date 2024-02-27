import { Directive, Input } from '@angular/core';
import {
  FudisGridWidth,
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
   * Alignment of Grid component inside its parent. Defines margins for the Grid element
   */
  @Input() align: FudisGridAlign = 'center';

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
  @Input() classes: string[] = [];

  /**
   * Gutter gap between columns. Using Fudis spacing token values of xxs to xxl, none and responsive.
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
   * And after xl breakpoint 'repeat(3, 1fr)'.
   *
   * If your layout consists of Fudis Form components, e. g. TextInput, Datepicker etc. You can set your columns to width of those components by using columns values of "inputXs", "inputSm", "inputMd" or "inputLg". These can be used in responsive columns as well.
   */
  @Input() columns: FudisGridColumns = '1fr';

  /**
   * To make Grid ignore default values defined by application and FudisGridService
   */
  @Input() serviceDefaults: boolean = true;

  /**
   * Margin bottom for the Grid.
   */
  @Input() marginBottom: FudisSpacing = 'none';

  /**
   * Margin top for the Grid.
   */
  @Input() marginTop: FudisSpacing = 'none';

  /**
   * Grid row gap. Using Fudis spacing token values of xxs to xxl and none.
   */
  @Input() rowGap: FudisGridGap = 'none';

  /**
   * Maximum width of Grid. When viewport gets narrower, grid automatically adjusts to lower sizes.
   * xxl = Default value. Viewports of 1600px and larger
   * xl = Viewports smaller than 1600px
   * lg = Viewports smaller than 1200px
   * md = Viewports smaller than 992px
   * sm = Viewports smaller than 768px
   * xs = Viewports smaller than 576px
   */
  @Input() width: FudisGridWidth = 'xxl';
}
