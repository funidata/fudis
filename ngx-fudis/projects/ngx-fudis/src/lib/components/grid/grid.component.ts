import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { breakpointsToObserve, InputColumnObject, createColumnInputForBreakpoints } from './gridUtils';

@Component({
	selector: 'fudis-grid',
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GridComponent implements OnInit {
	isPhonePortrait = false;

	constructor(public breakpointObserver: BreakpointObserver) {}

	/**
	 * Maximum width of Grid. When viewport gets narrower, grid automatically adjusts to lower sizes.
	 * XXL = Default value. Viewports of 1600px and larger
	 * XL = Viewports smaller than 1600px
	 * L = Viewports smaller than 1200px
	 * M = Viewports smaller than 992px
	 * S = Viewports smaller than 768px
	 * Xs = Viewports smaller than 576px
	 */
	@Input() width: 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs' = 'xxl';

	/**
	 * Alignment of Grid component inside its parent
	 */
	@Input() align: 'left' | 'right' | 'center' = 'center';

	/**
	 * Vertical alignment of grid items in a row
	 */
	@Input() alignItemsY: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

	/**
	 * Horizontal alignment of grid items in a row
	 */
	@Input() alignItemsX: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

	/**
	 * Default grid-template-columns value applied to all widths. Suggested values are fr units, but REM values and repeat are also acceptable.
	 */
	@Input() columns: string = '1fr';

	/**
	 * Grid-template-columns when grid is +1600px wide
	 */
	@Input() columnsXxl: string;

	/**
	 * Grid-template-columns when grid is +1600px wide
	 */
	@Input() columnsXl: string;

	/**
	 * Grid-template-columns when grid is +1600px wide
	 */
	@Input() columnsL: string;

	/**
	 * Grid-template-columns when grid is +1600px wide
	 */
	@Input() columnsM: string;

	/**
	 * Grid-template-columns when grid is +1600px wide
	 */
	@Input() columnsS: string;

	/**
	 * Grid-template-columns when grid is +1600px wide
	 */
	@Input() columnsXs: string;

	/*
	 * Default grid-template-columns value if there is none from @Inputs
	 */

	columnsToApply: string = '1fr';

	/*
	 * Array used for applying breakpoint rules for given columns values
	 */
	columnsFromInput: InputColumnObject[] = [];

	ngOnInit() {
		this.columnsFromInput = createColumnInputForBreakpoints(
			this.columns,
			this.columnsXs,
			this.columnsS,
			this.columnsM,
			this.columnsL,
			this.columnsXl,
			this.columnsXxl
		);

		this.breakpointObserver.observe(breakpointsToObserve).subscribe((state: BreakpointState) => {
			/*
			 * When hitting a breakpoint, Loop through given column values for each breakpoint and if there are no given value e.g. for @Input columnsXs, apply general @Input columns value
			 */
			(this.columnsFromInput as Array<InputColumnObject>).forEach((item) => {
				if (state.breakpoints[item.breakpoint] && item.name !== 'columns') {
					this.columnsToApply = item.value;
				} else if (state.breakpoints[item.breakpoint] && item.name === 'columns') {
					this.columnsToApply = this.columns;
				}
			});
		});
	}
}
