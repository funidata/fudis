import { Directive, ElementRef, OnChanges, OnInit, effect } from '@angular/core';
import { BreakpointState } from '@angular/cdk/layout';

import { createColumnInputForBreakpoints, getGridClasses } from './gridUtils';
import { GridApiDirective } from './grid-api.directive';
import { GridAttributes, GridInputColumnObject } from '../../types/grid';
import { GridService } from './grid-service/grid.service';

@Directive({
	selector: '[fudisGrid]',
})
export class GridDirective extends GridApiDirective implements OnInit, OnChanges {
	currentBreakpoints: BreakpointState | null;

	constructor(private gridElement: ElementRef, private gridService: GridService) {
		super();

		effect(() => {
			this.setColumns();
		});
	}

	/*
	 * Array used for applying breakpoint rules for given columns values
	 */
	columnsFromInput: GridInputColumnObject[] = [];

	gridInputObject: GridAttributes;

	setColumns(): void {
		this.currentBreakpoints = this.gridService.getBreakpointState();

		/*
		 * When hitting a breakpoint, Loop through given column values for each breakpoint and if there are no given value e.g. for @Input columnsXs, apply general @Input columns value
		 */
		(this.columnsFromInput as Array<GridInputColumnObject>).forEach((item) => {
			if (this.currentBreakpoints?.breakpoints[item.breakpoint] && item.name !== 'columns') {
				(this.gridElement.nativeElement as HTMLElement).style.gridTemplateColumns = item.value;
			} else if (this.currentBreakpoints?.breakpoints[item.breakpoint] && item.name === 'columns') {
				(this.gridElement.nativeElement as HTMLElement).style.gridTemplateColumns = item.value;
			}
		});
	}

	getInputObject(): GridAttributes {
		return {
			width: this.width,
			align: this.align,
			marginTop: this.marginTop,
			marginBottom: this.marginBottom,
			rowGap: this.rowGap,
			columnGap: this.columnGap,
			classes: this.classes,
			marginSides: this.marginSides,
		};
	}

	ngOnInit() {
		// Collect and validate grid column @Input values, which are used in ngMaterial BreakpointObserver

		this.columnsFromInput = createColumnInputForBreakpoints(
			this.columns,
			this.columnsXs,
			this.columnsSm,
			this.columnsMd,
			this.columnsLg,
			this.columnsXl,
			this.columnsXxl,
			this.gridService.getGridDefaultColumns()
		);

		this.setColumns();

		this.gridInputObject = this.getInputObject();

		(this.gridElement.nativeElement as HTMLElement).classList.value = getGridClasses(this.gridInputObject);

		(this.gridElement.nativeElement as HTMLElement).style.alignItems = this.alignItemsY;
		(this.gridElement.nativeElement as HTMLElement).style.justifyItems = this.alignItemsX;
	}

	ngOnChanges(): void {
		this.gridInputObject = this.getInputObject();

		(this.gridElement.nativeElement as HTMLElement).classList.value = getGridClasses(this.gridInputObject);

		(this.gridElement.nativeElement as HTMLElement).style.alignItems = this.alignItemsY;
		(this.gridElement.nativeElement as HTMLElement).style.justifyItems = this.alignItemsX;
	}
}
