import { Directive, ElementRef, OnChanges, OnInit, Input, effect } from '@angular/core';
import { FudisGridService } from '../../../services/grid/grid.service';
import {
	FudisGridItemAlignment,
	FudisGridItemAlignResponsive,
	FudisGridItemWidth,
	gridItemDefault,
	FudisGridItemColumnsResponsive,
} from '../../../types/grid';
import { getGridBreakpointDataArray, getGridCssValue } from '../gridUtils';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { FudisBreakpointStyleResponsive } from '../../../types/breakpoints';

@Directive({
	selector: '[fudisGridItem]',
})
export class GridItemDirective implements OnInit, OnChanges {
	constructor(
		private _gridItemElement: ElementRef,
		private _gridService: FudisGridService,
		private _breakpointService: FudisBreakpointService
	) {
		this._element = _gridItemElement.nativeElement;

		/**
		 * When screen is resized check and apply new rules for Grid Item
		 */
		effect(() => {
			this._breakpointService.getBreakpointState();

			if (typeof this._columns !== 'string') {
				this.setColumns();
			}
			if (typeof this._alignX !== 'string') {
				this.setAlignX();
			}
			if (typeof this._alignY !== 'string') {
				this.setAlignY();
			}
		});
	}

	/**
	 * Used to apply CSS grid-column values for the Grid Item
	 */
	private _columns: string | FudisBreakpointStyleResponsive[] = gridItemDefault;

	private _alignX: FudisGridItemAlignment | FudisBreakpointStyleResponsive[] = 'stretch';

	private _alignY: FudisGridItemAlignment | FudisBreakpointStyleResponsive[] = 'stretch';

	/**
	 * Internal reference for the this Grid Item element
	 */
	private _element: HTMLElement;

	@Input() set columns(value: FudisGridItemWidth | FudisGridItemColumnsResponsive) {
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
	 * Align Grid Item horizontally
	 */
	@Input() set alignX(value: FudisGridItemAlignment | FudisGridItemAlignResponsive) {
		if (typeof value === 'string') {
			this._alignX = value;
		} else {
			this._alignX = getGridBreakpointDataArray(value, 'stretch');
		}
	}

	/**
	 * Align Grid Item vertically
	 */
	@Input() set alignY(value: FudisGridItemAlignment | FudisGridItemAlignResponsive) {
		if (typeof value === 'string') {
			this._alignY = value;
		} else {
			this._alignY = getGridBreakpointDataArray(value, 'stretch');
		}
	}

	/**
	 * Set CSS grid-column attributes for this Grid Item element
	 */
	setColumns(): void {
		this._breakpointService.setStyleAttributes(this._element, 'grid-column', this._columns);
	}

	setAlignX(): void {
		this._breakpointService.setStyleAttributes(this._element, 'justify-self', this._alignX);
	}

	setAlignY(): void {
		this._breakpointService.setStyleAttributes(this._element, 'align-self', this._alignY);
	}

	/**
	 * Apply CSS settings from Inputs
	 */
	applyGridItemCss(): void {
		this.setColumns();
		this.setAlignX();
		this.setAlignY();
	}

	ngOnInit(): void {
		this._element.classList.add('fudis-grid-item');
		this.applyGridItemCss();
	}

	ngOnChanges(): void {
		this.applyGridItemCss();
	}
}
