import { Directive, ElementRef, OnChanges, OnInit, Signal, effect } from '@angular/core';
import { getGridBreakpointDataArray, getGridClasses, getGridCssValue, replaceFormInputWidthsToRem } from '../gridUtils';
import { GridApiDirective } from '../grid-api/grid-api.directive';
import {
	FudisGridColumnsResponsive,
	FudisGridResponsiveData,
	gridColumnDefault,
	FudisGridAttributes,
} from '../../../types/grid';
import { FudisGridService } from '../../../services/grid/grid.service';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';

@Directive({
	selector: '[fudisGrid]',
})
export class GridDirective extends GridApiDirective implements OnInit, OnChanges {
	constructor(
		private _gridElement: ElementRef,
		private _breakpointService: FudisBreakpointService,
		gridService: FudisGridService
	) {
		super();
		this._gridService = gridService;
		this._element = _gridElement.nativeElement;
		this._gridDefaults = this._gridService.getGridDefaultValues();

		/**
		 * When screen is resized check and apply new rules for Grid columns
		 */
		effect(() => {
			this._breakpointService.getBreakpointState();

			if (typeof this._columns !== 'string' && typeof this._columns !== 'number') {
				this._setColumns();
			}
		});
	}

	/**
	 * Used to apply grid-template-columns values for the Grid
	 */
	protected _columns: string | FudisGridResponsiveData[] = gridColumnDefault;

	/**
	 * Internal reference for the this Grid element
	 */
	private _element: HTMLElement;

	/**
	 * Object to define
	 */
	private _gridInputObject: FudisGridAttributes;

	/**
	 * Grid service to run utilities
	 */
	private _gridService: FudisGridService;

	private _gridDefaults: Signal<FudisGridAttributes | null>;

	ngOnInit(): void {
		if (this.columns) {
			this._defineColumns();
		} else if (!this.ignoreDefaults && this._gridDefaults()?.columns) {
			this._columns = getGridBreakpointDataArray(this._gridDefaults()!.columns!, gridColumnDefault);
		}
		this._applyGridCss();
	}

	ngOnChanges(): void {
		if (this.columns) {
			this._defineColumns();
		} else if (!this.ignoreDefaults && this._gridDefaults()?.columns) {
			this._columns = getGridBreakpointDataArray(this._gridDefaults()?.columns!, gridColumnDefault);
		}
		this._applyGridCss();
	}

	private _defineColumns(): void {
		if (typeof this.columns === 'string') {
			this._columns = replaceFormInputWidthsToRem(this.columns);
		}
		// If value is number, convert it to grid-template-column value. E. g. number 6 converts to 'repeat(6,1fr)'
		else if (typeof this.columns === 'number') {
			this._columns = getGridCssValue(this.columns);
		}
		// Get breakpoint settings with provided default values and Input values
		else if (!this.ignoreDefaults && this._gridDefaults()?.columns !== null) {
			const combinedValues: FudisGridColumnsResponsive = { ...this._gridDefaults()!.columns, ...this.columns };

			this._columns = getGridBreakpointDataArray(combinedValues, gridColumnDefault);
		} else {
			this._columns = getGridBreakpointDataArray(this.columns, gridColumnDefault);
		}
	}

	/**
	 * Set CSS grid-template-column attributes for this Grid element
	 */
	private _setColumns(): void {
		this._gridService.setGridAttributes(this._element, this._columns);
	}

	/**
	 * Apply CSS settings from Inputs
	 */
	private _applyGridCss(): void {
		this._setColumns();

		/**
		 * Collection of Grid attributes from Inputs() updated with possible default values provided from application
		 * TODO: This could be improved
		 */
		if (this.ignoreDefaults) {
			this._gridInputObject = {
				width: this.width ?? 'xxl',
				align: this.align ?? 'center',
				alignItemsX: this.alignItemsX ?? 'stretch',
				alignItemsY: this.alignItemsY ?? 'stretch',
				marginTop: this.marginTop ?? 'none',
				marginBottom: this.marginBottom ?? 'none',
				marginSides: this.marginSides ?? 'none',
				rowGap: this.rowGap ?? 'responsive',
				columnGap: this.columnGap ?? 'responsive',
				classes: this.classes,
			};
		} else {
			this._gridInputObject = {
				width: this.width ?? this._gridDefaults()?.width ?? 'xxl',
				align: this.align ?? this._gridDefaults()?.align ?? 'center',
				alignItemsX: this.alignItemsX ?? this._gridDefaults()?.alignItemsX ?? 'stretch',
				alignItemsY: this.alignItemsY ?? this._gridDefaults()?.alignItemsY ?? 'stretch',
				marginTop: this.marginTop ?? this._gridDefaults()?.marginTop ?? 'none',
				marginBottom: this.marginBottom ?? this._gridDefaults()?.marginBottom ?? 'none',
				marginSides: this.marginSides ?? this._gridDefaults()?.marginSides ?? 'none',
				rowGap: this.rowGap ?? this._gridDefaults()?.rowGap ?? 'responsive',
				columnGap: this.columnGap ?? this._gridDefaults()?.columnGap ?? 'responsive',
				classes: this.classes ?? this._gridDefaults()?.classes,
			};
		}

		this._element.style.justifyItems = this._gridInputObject.alignItemsX!;
		this._element.style.alignItems = this._gridInputObject.alignItemsY!;

		/**
		 * Get and apply list of CSS classes to align and position Grid
		 */
		this._element.classList.value = getGridClasses(this._gridInputObject);
	}
}
