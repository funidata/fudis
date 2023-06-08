/* eslint-disable no-underscore-dangle */
import { Directive, Input } from '@angular/core';
import {
	GridWidth,
	GridMarginSide,
	GridGap,
	GridAlign,
	GridAlignItems,
	GridColumnsResponsive,
	GridResponsiveData,
	gridColumnDefault,
} from '../../types/grid';
import { Spacing } from '../../types/spacing';

import { GridService } from './grid-service/grid.service';
import { getGridBreakpointDataArray, getGridCssValue } from './gridUtils';

@Directive({
	selector: '[fudisGridApi]',
})
export class GridApiDirective {
	/**
	 * Used to apply grid-template-columns values for the Grid
	 */
	protected _columns: string | GridResponsiveData[] = gridColumnDefault;

	/**
	 * Grid service to run utilities
	 */
	protected _gridService: GridService;

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
	@Input() marginSides: GridMarginSide = 'responsive';

	/**
	 * Custom CSS classes for Grid element
	 */
	@Input() classes: string[];

	/**
	 * Setting of columns for the grid. Input will be converted to native CSS grid grid-template-columns values
	 * E. g. as native string: [columns]="'1fr 1fr'" or [columns]="'1fr 2fr'"
	 * E. g. as number [columns]="6", which converts to 'repeat(6, 1fr)'
	 *
	 * For responsive grid behavior, provide GridColumns object.
	 * E. g. [columns]="{md: 2, xl: 3}".
	 * Before md breakpoint Grid has default of '1fr' columns.
	 * After md breakpoint it will have two columns 'repeat(2, 1fr)'
	 * And after xl breakpoint 'repeat(3, 1fr)'
	 */
	@Input() set columns(value: string | number | GridColumnsResponsive) {
		const defaultValues = this._gridService.getGridDefaultColumns();
		// If no value provided, still check from the service, if application has provided default Grid values
		if (!value && defaultValues) {
			this._columns = getGridBreakpointDataArray(defaultValues);
		}
		// If value is normal string. E. g. '1fr 2fr 1fr'
		else if (typeof value === 'string') {
			this._columns = value;
		}
		// If value is number, convert it to grid-template-column value. E. g. number 6 converts to 'repeat(6,1fr)'
		else if (typeof value === 'number') {
			this._columns = getGridCssValue(value);
		}
		// Get breakpoint settings with provided default values and Input values
		else {
			const combinedValues: GridColumnsResponsive = { ...defaultValues, ...value };
			this._columns = getGridBreakpointDataArray(combinedValues);
		}
	}

	/**
	 * Grid column gap. Using Fudis spacing token values of xxs to xxl and 0.
	 */
	@Input() columnGap: GridGap = 'responsive';

	/**
	 * Grid row gap. Using Fudis spacing token values of xxs to xxl and 0.
	 */
	@Input() rowGap: GridGap = 'responsive';

	constructor(protected gridService: GridService) {
		this._gridService = gridService;
	}
}
