import { Directive, Input } from '@angular/core';
import { GridWidth, GridMarginSide, GridGap, GridAlign, GridAlignItems } from '../../../types/grid';
import { Spacing } from '../../../types/spacing';

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
	@Input() width: GridWidth = 'xxl';

	/**
	 * Alignment of Grid component inside its parent
	 */
	@Input() align: GridAlign = 'center';

	/**
	 * Vertical alignment of Grid Items in a row
	 */
	@Input() alignItemsY: GridAlignItems = 'stretch';

	/**
	 * Horizontal alignment of Grid Items in a row
	 */
	@Input() alignItemsX: GridAlignItems = 'stretch';

	/**
	 * Margin top for the Grid
	 */
	@Input() marginTop: Spacing = 'none';

	/**
	 * Margin bottom for the Grid
	 */
	@Input() marginBottom: Spacing = 'none';

	/**
	 * Horizontal margins left and right of the grid
	 */
	@Input() marginSides: GridMarginSide = 'none';

	/**
	 * Custom CSS classes for Grid element
	 */
	@Input() classes: string[];

	/**
	 * Grid column gap. Using Fudis spacing token values of xxs to xxl and 0.
	 */
	@Input() columnGap: GridGap = 'responsive';

	/**
	 * Grid row gap. Using Fudis spacing token values of xxs to xxl and 0.
	 */
	@Input() rowGap: GridGap = 'responsive';
}
