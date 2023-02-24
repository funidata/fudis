import { Directive, Input, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { breakpointsToObserve, InputColumnObject, createColumnInputForBreakpoints } from './gridUtils';

type GridGapValues = 'zero' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'responsive';

@Directive({
	selector: '[fudisGrid]',
})
export class GridDirective implements OnInit {
	constructor(private gridBreakpointObserver: BreakpointObserver) {}

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

	@Input() marginTop: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'zero' = 'zero';

	@Input() marginBottom: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'zero' = 'zero';

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

	@Input() columnGap: GridGapValues = 'responsive';

	/**
	 * Grid row gap. Using Fudis spacing token values of xxs to xxl and 0.
	 */

	@Input() rowGap: GridGapValues = 'responsive';

	/*
	 * Default grid-template-columns value if there is none from @Inputs
	 */

	columnsToApply: string = '1fr';

	/*
	 * Array used for applying breakpoint rules for given columns values
	 */
	columnsFromInput: InputColumnObject[] = [];

	ngOnInit() {
		// Collect and validate grid column @Input values, which are used in ngMaterial BreakpointObserver
		this.columnsFromInput = createColumnInputForBreakpoints(
			this.columns,
			this.columnsXs,
			this.columnsS,
			this.columnsM,
			this.columnsL,
			this.columnsXl,
			this.columnsXxl
		);

		this.gridBreakpointObserver.observe(breakpointsToObserve).subscribe((state: BreakpointState) => {
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
