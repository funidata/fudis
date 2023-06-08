/* eslint-disable no-underscore-dangle */
import { Directive, ElementRef, OnChanges, OnInit, effect } from '@angular/core';
import { BreakpointState } from '@angular/cdk/layout';

import { getGridClasses } from './gridUtils';
import { GridApiDirective } from './grid-api.directive';
import { GridAttributes, GridResponsiveData } from '../../types/grid';
import { GridService } from './grid-service/grid.service';

@Directive({
	selector: '[fudisGrid]',
})
export class GridDirective extends GridApiDirective implements OnInit, OnChanges {
	private _breakpointState: BreakpointState | null;

	private _element: HTMLElement;

	constructor(private _gridElement: ElementRef, private gridService: GridService) {
		super(gridService);

		this._element = _gridElement.nativeElement;
		effect(() => {
			this._gridService.getBreakpointState();
			this.setColumns();
		});
	}

	/*
	 * Array used for applying breakpoint rules for given columns values
	 */
	columnsFromInput: GridResponsiveData[] = [];

	gridInputObject: GridAttributes;

	setColumns(): void {
		this._gridService.setGridAttributes(this._element, this._columns);
	}

	setAlign(): void {
		this._element.style.alignItems = this.alignItemsY;
		this._element.style.justifyItems = this.alignItemsX;
	}

	/*
	 * When hitting a breakpoint, Loop through given column values for each breakpoint and if there are no given value e.g. for @Input columnsXs, apply general @Input columns value
	 */

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
		this.setAlign();
		this.setColumns();

		this.gridInputObject = this.getInputObject();

		this._element.classList.value = getGridClasses(this.gridInputObject);
	}

	ngOnChanges(): void {
		this.setAlign();
		this.setColumns();
		this.gridInputObject = this.getInputObject();

		this._element.classList.value = getGridClasses(this.gridInputObject);
	}
}
