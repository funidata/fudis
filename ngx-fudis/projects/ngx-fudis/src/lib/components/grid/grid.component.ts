import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { validateColumnInput } from './gridUtils';

@Component({
	selector: 'fudis-grid',
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GridComponent implements OnInit {
	isPhonePortrait = false;

	constructor(public breakpointObserver: BreakpointObserver) {}

	@Input() variant: 'regular' | 'wide' = 'regular';

	@Input() align: 'left' | 'right' | 'center' = 'center';

	@Input() alignItemsY?: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

	@Input() alignItemsX?: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

	@Input() columns: string = '6fr 6fr';

	@Input() columnsXl: string = '6fr 6fr';

	@Input() columnsL: string = '6fr 6fr';

	@Input() columnsM: string = '6fr 6fr';

	@Input() columnsS: string = '6fr 6fr';

	@Input() columnsXs: string = '6fr 6fr';

	@Input() columnsXxs: string = '1fr 1fr 1fr';

	fudisBreakpoints = {
		xl: '(max-width: 100em)',
		l: '(max-width: 75em)',
		m: '(max-width: 62em)',
		s: '(max-width: 48em)',
		xs: '(max-width: 30em)',
		xxs: '(max-width: 20em)',
	};

	fudisBreakpointsArray = [
		this.fudisBreakpoints.xl,
		this.fudisBreakpoints.l,
		this.fudisBreakpoints.m,
		this.fudisBreakpoints.s,
		this.fudisBreakpoints.xs,
		this.fudisBreakpoints.xxs,
	];

	columnsToApply: string = '6fr 6fr';

	fakeGridArray = new Array(15);

	ngOnInit() {
		validateColumnInput(this.columns, 'columns');
		validateColumnInput(this.columnsXxs, 'columnsXxs');
		validateColumnInput(this.columnsXs, 'columnsXs');
		validateColumnInput(this.columnsS, 'columnsS');
		validateColumnInput(this.columnsM, 'columnsM');
		validateColumnInput(this.columnsL, 'columnsL');
		validateColumnInput(this.columnsXl, 'columnsXl');

		this.breakpointObserver.observe(this.fudisBreakpointsArray).subscribe((state: BreakpointState) => {
			this.columnsToApply = this.columns;

			if (state.breakpoints[this.fudisBreakpoints.xxs] && this.columnsXxs) {
				this.columnsToApply = this.columnsXxs;
			} else if (state.breakpoints[this.fudisBreakpoints.xs] && this.columnsXs) {
				this.columnsToApply = this.columnsXs;
			} else if (state.breakpoints[this.fudisBreakpoints.s] && this.columnsS) {
				this.columnsToApply = this.columnsS;
			} else if (state.breakpoints[this.fudisBreakpoints.m] && this.columnsM) {
				this.columnsToApply = this.columnsM;
			} else if (state.breakpoints[this.fudisBreakpoints.l] && this.columnsL) {
				this.columnsToApply = this.columnsL;
			} else if (state.breakpoints[this.fudisBreakpoints.xl] && this.columnsXl) {
				this.columnsToApply = this.columnsXl;
			} else {
				this.columnsToApply = this.columns;
			}
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
