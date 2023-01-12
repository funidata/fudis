import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { validateColumnInput, InputColumnObject } from './gridUtils';

@Component({
	selector: 'fudis-grid',
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GridComponent implements OnInit {
	isPhonePortrait = false;

	constructor(public breakpointObserver: BreakpointObserver) {}

	@Input() width: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

	@Input() align: 'left' | 'right' | 'center' = 'center';

	@Input() alignItemsY?: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

	@Input() alignItemsX?: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

	@Input() columns: string | undefined = undefined;

	@Input() columnsXxl: string | undefined = undefined;

	@Input() columnsXl: string | undefined = undefined;

	@Input() columnsL: string | undefined = undefined;

	@Input() columnsM: string | undefined = undefined;

	@Input() columnsS: string | undefined = undefined;

	@Input() columnsXs: string | undefined = undefined;

	gridWidths = {
		xxl: '(min-width: 100em)',
		xl: '(min-width: 75em) and (max-width: 99.99em)',
		l: '(min-width: 62em) and (max-width: 74.99em)',
		m: '(min-width: 48em) and (max-width: 61.99em)',
		s: '(min-width: 36em) and (max-width: 47.99em)',
		xs: '(min-width: 0) and (max-width: 35.99em)',
	};

	gridWidthsArray = [
		this.gridWidths.xxl,
		this.gridWidths.xl,
		this.gridWidths.l,
		this.gridWidths.m,
		this.gridWidths.s,
		this.gridWidths.xs,
	];

	columnsToApply: string = '1fr';

	columnsFromInput: Array<InputColumnObject> = [];

	fakeGridArray = new Array(15);

	ngOnInit() {
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

		validateColumnInput(this.columnsFromInput);

		this.breakpointObserver.observe(this.gridWidthsArray).subscribe((state: BreakpointState) => {
			this.columnsFromInput.forEach((item) => {
				if (state.breakpoints[item.breakpoint]) {
					this.columnsToApply = item.value;
				} else {
					this.columnsToApply = this.columns ? this.columns : '1fr';
				}
			});
		});
	}

	// ngOnInit() {
	// 	this.breakpointObserver.observe(this.fudisBreakpointsArray).subscribe((state: BreakpointState) => {
	// 		this.columnsToApply = this.columns;

	// 		if (state.breakpoints[this.fudisBreakpoints.xxs] && this.columnsXxs) {
	// 			this.columnsToApply = this.columnsXxs;
	// 		} else if (state.breakpoints[this.fudisBreakpoints.xs] && this.columnsXs) {
	// 			this.columnsToApply = this.columnsXs;
	// 		} else if (state.breakpoints[this.fudisBreakpoints.s] && this.columnsS) {
	// 			this.columnsToApply = this.columnsS;
	// 		} else if (state.breakpoints[this.fudisBreakpoints.m] && this.columnsM) {
	// 			this.columnsToApply = this.columnsM;
	// 		} else if (state.breakpoints[this.fudisBreakpoints.l] && this.columnsL) {
	// 			this.columnsToApply = this.columnsL;
	// 		} else if (state.breakpoints[this.fudisBreakpoints.xl] && this.columnsXl) {
	// 			this.columnsToApply = this.columnsXl;
	// 		} else {
	// 			this.columnsToApply = this.columns;
	// 		}
	// 	});
	// }
}
