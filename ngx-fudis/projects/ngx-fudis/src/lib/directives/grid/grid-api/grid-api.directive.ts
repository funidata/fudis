import { Directive, Input } from '@angular/core';
import {
	FudisGridWidth,
	FudisGridMarginSide,
	FudisGridGap,
	FudisGridAlign,
	FudisGridAlignItems,
} from '../../../types/grid';
import { FudisSpacing } from '../../../types/spacing';

@Directive({
	selector: '[fudisGridApi]',
})
export class GridApiDirective {
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

	/**
	 * Alignment of Grid component inside its parent
	 */
	@Input() align: FudisGridAlign = 'center';

	/**
	 * Vertical alignment of Grid Items in a row
	 */
	@Input() alignItemsY: FudisGridAlignItems = 'stretch';

	/**
	 * Horizontal alignment of Grid Items in a row
	 */
	@Input() alignItemsX: FudisGridAlignItems = 'stretch';

	/**
	 * Margin top for the Grid
	 */
	@Input() marginTop: FudisSpacing = 'none';

	/**
	 * Margin bottom for the Grid
	 */
	@Input() marginBottom: FudisSpacing = 'none';

	/**
	 * Horizontal margins left and right of the grid
	 */
	@Input() marginSides: FudisGridMarginSide = 'none';

	/**
	 * Custom CSS classes for Grid element
	 */
	@Input() classes: string[];

	/**
	 * Grid column gap. Using Fudis spacing token values of xxs to xxl and 0.
	 */
	@Input() columnGap: FudisGridGap = 'responsive';

	/**
	 * Grid row gap. Using Fudis spacing token values of xxs to xxl and 0.
	 */
	@Input() rowGap: FudisGridGap = 'responsive';

	/**
	 * To make Grid ignore default values defined by application and FudisGridService
	 */
	@Input() ignoreDefaults: boolean = false;
}
