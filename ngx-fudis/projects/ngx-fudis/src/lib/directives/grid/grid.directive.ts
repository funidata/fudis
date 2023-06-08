/* eslint-disable no-underscore-dangle */
import { Directive, ElementRef, OnChanges, OnInit, effect } from '@angular/core';

import { getGridClasses } from './gridUtils';
import { GridApiDirective } from './grid-api.directive';
import { GridAttributes } from '../../types/grid';
import { GridService } from './grid-service/grid.service';

@Directive({
	selector: '[fudisGrid]',
})
export class GridDirective extends GridApiDirective implements OnInit, OnChanges {
	/**
	 * Internal reference for the this Grid element
	 */
	private _element: HTMLElement;

	/**
	 * Object to define
	 */
	private _gridInputObject: GridAttributes;

	constructor(private _gridElement: ElementRef, gridService: GridService) {
		super(gridService);

		this._element = _gridElement.nativeElement;

		/**
		 * When screen is resized check and apply new rules for Grid columns
		 */
		effect(() => {
			this._gridService.getBreakpointState();
			this.setColumns();
		});
	}

	/**
	 * Set CSS grid-template-column attributes for this Grid element
	 */
	private setColumns(): void {
		this._gridService.setGridAttributes(this._element, this._columns);
	}

	/**
	 * Apply CSS settings from Inputs
	 */
	private applyGridCss(): void {
		this.setColumns();

		/**
		 * Align all Grid items inside grid
		 */
		this._element.style.alignItems = this.alignItemsY;
		this._element.style.justifyItems = this.alignItemsX;

		/**
		 * Collection of Grid attributes from Inputs()
		 */
		this._gridInputObject = {
			width: this.width,
			align: this.align,
			marginTop: this.marginTop,
			marginBottom: this.marginBottom,
			rowGap: this.rowGap,
			columnGap: this.columnGap,
			classes: this.classes,
			marginSides: this.marginSides,
		};

		/**
		 * Get and apply list of CSS classes to align and position Grid
		 */
		this._element.classList.value = getGridClasses(this._gridInputObject);
	}

	ngOnInit() {
		this.applyGridCss();
	}

	ngOnChanges(): void {
		this.applyGridCss();
	}
}
