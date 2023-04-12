import { Directive, Input } from '@angular/core';
import {
	TFudisAlign,
	TFudisAlignItems,
	TFudisGridGap,
	TFudisGridMargin,
	TFudisGridWidth,
	TFudisGridMarginSide,
} from './gridUtils';

@Directive({
	selector: '[fudisGridApi]',
})
export class GridApiDirective {
	/**
	 * Maximum width of Grid. When viewport gets narrower, grid automatically adjusts to lower sizes.
	 * XXL = Default value. Viewports of 1600px and larger
	 * XL = Viewports smaller than 1600px
	 * L = Viewports smaller than 1200px
	 * M = Viewports smaller than 992px
	 * S = Viewports smaller than 768px
	 * Xs = Viewports smaller than 576px
	 */
	@Input() width: TFudisGridWidth = 'xxl';

	/**
	 * Alignment of Grid component inside its parent
	 */
	@Input() align: TFudisAlign = 'center';

	/**
	 * Vertical alignment of grid items in a row
	 */
	@Input() alignItemsY: TFudisAlignItems = 'stretch';

	/**
	 * Horizontal alignment of grid items in a row
	 */
	@Input() alignItemsX: TFudisAlignItems = 'stretch';

	@Input() marginTop: TFudisGridMargin = 'none';

	@Input() marginBottom: TFudisGridMargin = 'none';

	@Input() marginSides: TFudisGridMarginSide = 'responsive';

	@Input() classes: string[];

	/**
	 * Default grid-template-columns value applied to all widths. Suggested values for native CSS grid are fr units.
	 */
	@Input() columns: string = '1fr';

	/**
	 * Grid-template-columns when
	 * grid width is 1540px
	 * and viewport width is larger than 1599px
	 */
	@Input() columnsXxl: string;

	/**
	 * Grid-template-columns when
	 * grid width is 1040px
	 * and viewport width is 1200px-1599px
	 */
	@Input() columnsXl: string;

	/**
	 * Grid-template-columns when
	 * grid width is 960px
	 * and viewport width is 992px-1199px
	 */
	@Input() columnsL: string;

	/**
	 * Grid-template-columns when
	 * grid width is 720px
	 * and viewport width is 768px-991px
	 */
	@Input() columnsM: string;

	/**
	 * Grid-template-columns when
	 * grid width is 540px
	 * and viewport width is 576px-767px
	 */
	@Input() columnsS: string;

	/**
	 * Grid-template-columns when
	 * viewport width is smaller than 576px
	 */
	@Input() columnsXs: string;

	/**
	 * Grid column gap. Using Fudis spacing token values of xxs to xxl and 0.
	 */

	@Input() columnGap: TFudisGridGap = 'responsive';

	/**
	 * Grid row gap. Using Fudis spacing token values of xxs to xxl and 0.
	 */

	@Input() rowGap: TFudisGridGap = 'responsive';
}
