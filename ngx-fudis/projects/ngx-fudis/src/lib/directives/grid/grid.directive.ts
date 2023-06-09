/* eslint-disable no-underscore-dangle */
import { Directive, ElementRef, Input, OnChanges, OnInit, effect } from '@angular/core';

import { getGridBreakpointDataArray, getGridClasses, getGridCssValue } from './gridUtils';
import { GridApiDirective } from './grid-api.directive';
import { GridAttributes, GridColumnsResponsive, GridResponsiveData, gridColumnDefault } from '../../types/grid';
import { GridService } from './grid-service/grid.service';

@Directive({
	selector: '[fudisGrid]',
})
export class GridDirective extends GridApiDirective implements OnInit, OnChanges {
	/**
	 * Used to apply grid-template-columns values for the Grid
	 */
	protected _columns: string | GridResponsiveData[] = gridColumnDefault;

	/**
	 * Internal reference for the this Grid element
	 */
	private _element: HTMLElement;

	/**
	 * Object to define
	 */
	private _gridInputObject: GridAttributes;

	/**
	 * Grid service to run utilities
	 */
	private _gridService: GridService;

	/**
	 * Setting of columns for the grid. Input will be converted to native CSS grid grid-template-columns values
	 * E. g. as native string: [columns]="'1fr 1fr'" or [columns]="'1fr 2fr'"
	 * E. g. as number [columns]="6", which converts to 'repeat(6, 1fr)'
	 *
	 * For responsive grid behavior, provide GridColumns object.
	 * E. g. [columns]="{md: 2, xl: 3}".
	 * Before md breakpoint Grid has default of '1fr' columns.
	 * After md breakpoint it will have two columns 'repeat(2, 1fr)'
	 * And after xl breakpoint 'repeat(3, 1fr)'
	 */
	@Input() set columns(value: string | number | GridColumnsResponsive) {
		const defaultValues = this._gridService.getGridDefaultColumns();
		// If no value provided, still check from the service, if application has provided default Grid values
		if (!value && defaultValues) {
			this._columns = getGridBreakpointDataArray(defaultValues);
		}
		// If value is normal string. E. g. '1fr 2fr 1fr'
		else if (typeof value === 'string') {
			this._columns = value;
		}
		// If value is number, convert it to grid-template-column value. E. g. number 6 converts to 'repeat(6,1fr)'
		else if (typeof value === 'number') {
			this._columns = getGridCssValue(value);
		}
		// Get breakpoint settings with provided default values and Input values
		else {
			const combinedValues: GridColumnsResponsive = { ...defaultValues, ...value };
			this._columns = getGridBreakpointDataArray(combinedValues);
		}
	}

	constructor(private _gridElement: ElementRef, gridService: GridService) {
		super();
		this._gridService = gridService;
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
