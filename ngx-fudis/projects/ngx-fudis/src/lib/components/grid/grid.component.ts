import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { validateColumnInputArray, InputColumnObject } from './gridUtils';

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
	@Input() columns: string;

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

	gridWidths = {
		xxl: '(min-width: 100em)',
		xl: '(min-width: 75em) and (max-width: 99.99em)',
		l: '(min-width: 62em) and (max-width: 74.99em)',
		m: '(min-width: 48em) and (max-width: 61.99em)',
		s: '(min-width: 36em) and (max-width: 47.99em)',
		xs: '(min-width: 0) and (max-width: 35.99em)',
	};

	/*
	 * Array of brekpoint rules given to ngMaterial breakpoint observer
	 */

	gridWidthsArray = [
		this.gridWidths.xxl,
		this.gridWidths.xl,
		this.gridWidths.l,
		this.gridWidths.m,
		this.gridWidths.s,
		this.gridWidths.xs,
	];

	/*
	 * Default grid-template-columns value if there is none from @Inputs
	 */

	columnsToApply: string = '1fr';

	/*
	 * Array used for applying breakpoint rules for given columns values
	 */
	columnsFromInput: Array<InputColumnObject> = [];

	validateColumnInput() {
		if (this.columns) {
			this.columnsFromInput.push({ name: 'columns', value: this.columns, breakpoint: this.gridWidths.xs });
		}
		if (this.columnsXs) {
			this.columnsFromInput.push({ name: 'columnsXs', value: this.columnsXs, breakpoint: this.gridWidths.xs });
		}
		if (this.columnsS) {
			this.columnsFromInput.push({ name: 'columnsS', value: this.columnsS, breakpoint: this.gridWidths.s });
		}
		if (this.columnsM) {
			this.columnsFromInput.push({ name: 'columnsM', value: this.columnsM, breakpoint: this.gridWidths.m });
		}
		if (this.columnsL) {
			this.columnsFromInput.push({ name: 'columnsL', value: this.columnsL, breakpoint: this.gridWidths.l });
		}
		if (this.columnsXl) {
			this.columnsFromInput.push({ name: 'columnsXl', value: this.columnsXl, breakpoint: this.gridWidths.xl });
		}
		if (this.columnsXxl) {
			this.columnsFromInput.push({ name: 'columnsXxl', value: this.columnsXxl, breakpoint: this.gridWidths.xxl });
		}

		validateColumnInputArray(this.columnsFromInput);
	}

	ngOnInit() {
		this.validateColumnInput();

		this.breakpointObserver.observe(this.gridWidthsArray).subscribe((state: BreakpointState) => {
			/*
			 * Loop through given column values for each breakpoint and if there are no given value e.g. for @Input columnsXs, apply general @Input columns value
			 */
			(this.columnsFromInput as Array<InputColumnObject>).forEach((item) => {
				if (state.breakpoints[item.breakpoint]) {
					this.columnsToApply = item.value;
				} else {
					this.columnsToApply = this.columns ? this.columns : '1fr';
				}
			});
		});
	}
}
