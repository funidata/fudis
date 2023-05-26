import { Directive, ElementRef, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
	breakpointsToObserve,
	IFudisInputColumnObject,
	createColumnInputForBreakpoints,
	getGridClasses,
	IFudisGridAttributes,
} from './gridUtils';
import { GridApiDirective } from './grid-api.directive';

@Directive({
	selector: '[fudisGrid]',
})
export class GridDirective extends GridApiDirective implements OnInit, OnChanges, OnDestroy {
	constructor(private gridBreakpointObserver: BreakpointObserver, private gridElement: ElementRef) {
		super();
	}

	/*
	 * Default grid-template-columns value if there is none from @Inputs
	 */

	columnsToApply: string = '1fr';

	/*
	 * Array used for applying breakpoint rules for given columns values
	 */
	columnsFromInput: IFudisInputColumnObject[] = [];

	gridInputObject: IFudisGridAttributes;

	ngOnInit() {
		this.gridInputObject = {
			width: this.width,
			align: this.align,
			marginTop: this.marginTop,
			marginBottom: this.marginBottom,
			rowGap: this.rowGap,
			columnGap: this.columnGap,
			classes: this.classes,
			marginSides: this.marginSides,
		};
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
			(this.columnsFromInput as Array<IFudisInputColumnObject>).forEach((item) => {
				if (state.breakpoints[item.breakpoint] && item.name !== 'columns') {
					this.columnsToApply = item.value;
					(this.gridElement.nativeElement as HTMLElement).style.gridTemplateColumns = item.value;
				} else if (state.breakpoints[item.breakpoint] && item.name === 'columns') {
					this.columnsToApply = item.value;
					(this.gridElement.nativeElement as HTMLElement).style.gridTemplateColumns = item.value;
				}
			});
		});

		(this.gridElement.nativeElement as HTMLElement).classList.value = getGridClasses(this.gridInputObject);

		(this.gridElement.nativeElement as HTMLElement).style.alignItems = this.alignItemsY;
		(this.gridElement.nativeElement as HTMLElement).style.justifyItems = this.alignItemsX;
	}

	ngOnChanges(): void {
		this.gridInputObject = {
			width: this.width,
			align: this.align,
			marginTop: this.marginTop,
			marginBottom: this.marginBottom,
			rowGap: this.rowGap,
			columnGap: this.columnGap,
			classes: this.classes,
			marginSides: this.marginSides,
		};

		(this.gridElement.nativeElement as HTMLElement).classList.value = getGridClasses(this.gridInputObject);

		(this.gridElement.nativeElement as HTMLElement).style.alignItems = this.alignItemsY;
		(this.gridElement.nativeElement as HTMLElement).style.justifyItems = this.alignItemsX;
	}

	ngOnDestroy(): void {
		this.gridBreakpointObserver.ngOnDestroy();
	}
}
