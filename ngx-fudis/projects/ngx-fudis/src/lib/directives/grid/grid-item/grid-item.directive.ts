import { Directive, ElementRef, OnChanges, OnInit, Input, effect } from '@angular/core';
import { FudisGridService } from '../grid-service/grid.service';
import {
	FudisGridResponsiveData,
	GridItemAlignment,
	GridItemAlignmentResponsive,
	GridItemResponsive,
	GridItemWidth,
	gridItemDefault,
} from '../../../types/grid';
import { getGridBreakpointDataArray, getGridCssValue } from '../gridUtils';

@Directive({
	selector: '[fudisGridItem]',
})
export class GridItemDirective implements OnInit, OnChanges {
	constructor(private _gridItemElement: ElementRef, private _gridService: FudisGridService) {
		this._element = _gridItemElement.nativeElement;

		/**
		 * When screen is resized check and apply new rules for Grid Item
		 */
		effect(() => {
			this._gridService.getBreakpointState();

			if (typeof this._columns !== 'string') {
				this.setColumns();
			}
			if (typeof this._alignX !== 'string') {
				this.setAlignX();
			}
		});
	}

	/**
	 * Used to apply CSS grid-column values for the Grid Item
	 */
	private _columns: string | FudisGridResponsiveData[] = gridItemDefault;

	private _alignX: GridItemAlignment | FudisGridResponsiveData[] = 'stretch';

	/**
	 * Internal reference for the this Grid Item element
	 */
	private _element: HTMLElement;

	@Input() set columns(value: GridItemWidth | GridItemResponsive) {
		// Convert given string value to proper CSS grid-column value
		if (typeof value === 'string') {
			this._columns = getGridCssValue(value, true);
		}
		// Convert given number value to proper CSS grid-column value. E.g. number 6 converts to 'span 6'.
		else if (typeof value === 'number') {
			this._columns = getGridCssValue(value, true);
		}
		// Get breakpoint settings with provided values
		else {
			this._columns = getGridBreakpointDataArray(value, gridItemDefault, true);
		}
	}

	/**
	 * Align Grid Item vertically
	 */
	@Input() alignY: GridItemAlignment = 'stretch';

	/**
	 * Align Grid Item horizontally
	 */
	@Input() set alignX(value: GridItemAlignment | GridItemAlignmentResponsive) {
		if (typeof value === 'string') {
			this._alignX = value;
		} else {
			this._alignX = getGridBreakpointDataArray(value, 'stretch');
		}
	}

	/**
	 * Set CSS grid-column attributes for this Grid Item element
	 */
	setColumns(): void {
		this._gridService.setGridAttributes(this._element, this._columns, true);
	}

	setAlignX(): void {
		this._gridService.setGridItemAlignX(this._element, this._alignX);
	}

	/**
	 * Apply CSS settings from Inputs
	 */
	applyGridItemCss(): void {
		this._element.classList.add(`fudis-grid-item__align-self__${this.alignY}`);

		this.setColumns();
		this.setAlignX();
	}

	ngOnInit(): void {
		this._element.classList.add('fudis-grid-item');
		this.applyGridItemCss();
	}

	ngOnChanges(): void {
		this.applyGridItemCss();
	}
}
