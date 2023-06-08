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
import { getGridCssValue } from './gridUtils';

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
	@Input() width: GridWidth = 'xxl';

	/**
	 * Alignment of Grid component inside its parent
	 */
	@Input() align: GridAlign = 'center';

	/**
	 * Vertical alignment of grid items in a row
	 */
	@Input() alignItemsY: GridAlignItems = 'stretch';

	/**
	 * Horizontal alignment of grid items in a row
	 */
	@Input() alignItemsX: GridAlignItems = 'stretch';

	@Input() marginTop: Spacing = 'none';

	@Input() marginBottom: Spacing = 'none';

	@Input() marginSides: GridMarginSide = 'responsive';

	@Input() classes: string[];

	_columns: string | GridResponsiveData[] = gridColumnDefault;

	_gridService: GridService;

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
		if (!value) {
			this._columns = this._gridService.createGridBreakpointObject();
		} else if (typeof value === 'string') {
			this._columns = value;
		} else if (typeof value === 'number') {
			this._columns = getGridCssValue(value);
		} else {
			this._columns = this._gridService.createGridBreakpointObject(value);
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

	constructor(gridService: GridService) {
		this._gridService = gridService;
	}
}
