import { Directive, ElementRef, OnChanges, OnInit, effect } from '@angular/core';
import {
  getGridClasses,
  getGridCssValue,
  getValuesForCSSClasses,
  replaceFormInputWidthsToRem,
} from '../gridUtils';
import { GridApiDirective } from '../grid-api/grid-api.directive';
import {
  gridColumnDefault,
  FudisGridProperties,
  FudisGridPropertyCollection,
  gridInputPropertyDefaults,
} from '../../../types/grid';
import { FudisGridService } from '../../../services/grid/grid.service';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import {
  FudisBreakpointStyleResponsive,
  FudisBreakpointValueResponsive,
} from '../../../types/breakpoints';
import { getBreakpointDataArray } from '../../../utilities/breakpoint/breakpoint-utils';

import { FudisComponentChanges } from '../../../types/miscellaneous';

@Directive({
  selector: '[fudisGrid]',
})
export class GridDirective extends GridApiDirective implements OnInit, OnChanges {
  constructor(
    private _gridElement: ElementRef,
    private _gridService: FudisGridService,
    private _breakpointService: FudisBreakpointService,
  ) {
    super();

    this._element = _gridElement.nativeElement;

    /**
     * Set default values to property collection object
     */
    this._setDefaultValuesToPropertyObject();

    /**
     * When screen is resized, check and apply new rules for Grid columns
     */
    effect(() => {
      _breakpointService.getBreakpointState();

      if (
        typeof this._calculatedColumns !== 'string' &&
        typeof this._calculatedColumns !== 'number'
      ) {
        this._setColumnsForBreakpoints(this._calculatedColumns);
      }
    });

    /**
     * Update columns and CSS classes, if GridService values update
     */
    effect(() => {
      /**
       * Get GridServices values
       */
      this._gridInputProperties.serviceValues = _gridService.getDefaultValues()();

      /**
       * Re-run Columns and CSS class calculations if GridService's values udpate
       */
      if (this._firstLoadFinished) {
        this._calculateAndSetGridColumnsCss();
        this._setAllProperties();
      }
    });
  }

  /**
   * Used to apply grid-template-columns CSS values for the Grid
   */
  protected _calculatedColumns: string | FudisBreakpointStyleResponsive[] = gridColumnDefault;

  /**
   * Internal reference for the this Grid element
   */
  private _element: HTMLElement;

  /**
   * Collection of properties collected from Input props and GridService defaults to be applied as CSS values for the Grid
   */
  private _valuesForCssClasses: FudisGridProperties;

  /**
   * Object to store various values from defaults, GridService and Inputs from application
   */
  private _gridInputProperties: FudisGridPropertyCollection = {
    appValues: {},
    defaultValues: {},
    serviceValues: {},
  };

  private _firstLoadFinished: boolean = false;

  ngOnInit(): void {
    this._firstLoadFinished = true;
    this._calculateAndSetGridColumnsCss();
    this._setAllProperties();
  }

  ngOnChanges(changes: FudisComponentChanges<GridDirective>): void {
    /**
     * From changed values, update property object
     */
    this._setAppInputValuesToPropertyObject(changes);

    if (this._firstLoadFinished) {
      if (changes.columns?.currentValue) {
        this._calculateAndSetGridColumnsCss();
      }
      this._setAllProperties();
    }
  }

  /**
   * Add or update values from application. This does not apply any values for CSS.
   */
  private _setAppInputValuesToPropertyObject(changes: FudisComponentChanges<GridDirective>): void {
    const keysToDismiss = ['serviceDefaults', 'ngOnInit', 'ngOnChanges'];

    Object.keys(changes).forEach((key) => {
      if (!keysToDismiss.includes(key)) {
        const keyToUse = key as keyof FudisGridProperties;
        const newValue = changes[keyToUse]!.currentValue;

        this._gridInputProperties.appValues = {
          ...this._gridInputProperties.appValues,
          [keyToUse]: newValue,
        };
      }
    });
  }

  /**
   * Set default values. These are used as back up, if application does not provide any input properties.
   */
  private _setDefaultValuesToPropertyObject(): void {
    this._gridInputProperties.defaultValues = gridInputPropertyDefaults;
  }

  /* ---------------------------------------------
   *
   * Class functions for defining Grid's 'grid-template-columns' CSS value
   *
   * ---------------------------------------------
   */

  /**
   * Set and config Grid's attributes from provided input properties
   */
  private _calculateAndSetGridColumnsCss(): void {
    this._calculatedColumns = this._calculateColumnsCssValue();
    this._setColumnsForBreakpoints(this._calculatedColumns);
  }

  private _calculateColumnsCssValue(): string | FudisBreakpointStyleResponsive[] {
    const columnsToApply = this._gridInputProperties.appValues?.columns;
    const columnsFromService =
      this.serviceDefaults && this._gridInputProperties.serviceValues?.columns
        ? this._gridInputProperties.serviceValues?.columns
        : undefined;

    if (typeof columnsToApply === 'string') {
      return replaceFormInputWidthsToRem(columnsToApply);
    }
    // If value is number, convert it to grid-template-column value. E. g. number 6 converts to 'repeat(6,1fr)'
    if (typeof columnsToApply === 'number') {
      return getGridCssValue(columnsToApply);
    }

    let combinedValues: FudisBreakpointValueResponsive | undefined;

    if (columnsFromService && columnsToApply) {
      combinedValues = { ...columnsFromService, ...columnsToApply };
      return getBreakpointDataArray(combinedValues, gridColumnDefault);
    }

    if (columnsToApply) {
      return getBreakpointDataArray(columnsToApply, gridColumnDefault);
    }

    if (columnsFromService) {
      return getBreakpointDataArray(columnsFromService, gridColumnDefault);
    }

    return gridColumnDefault;
  }

  /**
   * Set CSS grid-template-column attributes for this Grid element
   */
  private _setColumnsForBreakpoints(
    columnsCssValue: string | FudisBreakpointStyleResponsive[],
  ): void {
    this._breakpointService.setStyleAttributes(
      this._element,
      'grid-template-columns',
      columnsCssValue,
    );
  }

  /* ---------------------------------------------
   *
   * Class functions for defining Grid's other than 'grid-template-columns' CSS values
   *
   * ---------------------------------------------
   */

  private _setAllProperties(): void {
    this._valuesForCssClasses = getValuesForCSSClasses(
      this._gridInputProperties,
      this.serviceDefaults,
    );

    this._element.style.justifyItems = this._valuesForCssClasses.alignItemsX!;

    this._element.style.alignItems = this._valuesForCssClasses.alignItemsY!;

    this._element.classList.value = getGridClasses(this._valuesForCssClasses);
  }
}
