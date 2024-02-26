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
     * When screen is resized check and apply new rules for Grid columns
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
       * Set and update values from GridService to the property object
       */
      this._gridInputProperties.serviceValues = _gridService.getGridDefaultValues()();

      if (this._firstLoadFinished) {
        /**
         * Calculate CSS Column attributes if service updates
         */
        this._calculateAndSetGridColumnsCss();

        /**
         * Update properties if Grid defaults update
         */
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
     * Changes are something which required re-calculation of CSS classes
     */
    this._setAppInputValuesToPropertyObject(changes);

    if (this._firstLoadFinished) {
      this._setAllProperties();
    }
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

  private _setAppInputValuesToPropertyObject(changes: FudisComponentChanges<GridDirective>): void {
    const keysToDismiss = ['serviceDefaults', 'ngOnInit', 'ngOnChanges', 'serviceDefaults'];

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

  private _setDefaultValuesToPropertyObject(): void {
    this._gridInputProperties.defaultValues = {
      alignItemsX: this.alignItemsX,
      alignItemsY: this.alignItemsY,
      align: this.align,

      classes: this.classes,
      columnGap: this.columnGap,
      marginBottom: this.marginBottom,
      marginSides: this.marginSides,
      marginTop: this.marginTop,
      rowGap: this.rowGap,
      width: this.width,
    };
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

    this._applyGridCss();
  }

  /**
   * Append changed properties to existing properties and update CSS
   */
  private _updateChangedProperties(changes: FudisComponentChanges<GridDirective>): void {
    let valuesToUpdate: FudisGridProperties = {};

    let updateCss = false;

    Object.keys(changes).forEach((key) => {
      const keyToUpdate: keyof FudisGridProperties = key as keyof FudisGridProperties;
      if (changes[keyToUpdate]?.firstChange === false) {
        const newValue = changes[keyToUpdate]?.currentValue;

        valuesToUpdate = { ...valuesToUpdate, [keyToUpdate]: newValue };

        updateCss = true;
      }
    });

    if (updateCss) {
      this._valuesForCssClasses = { ...this._valuesForCssClasses, ...valuesToUpdate };

      this._applyGridCss();
    }
  }

  /**
   * Apply CSS settings from Inputs
   */
  private _applyGridCss(): void {
    this._element.style.justifyItems = this._valuesForCssClasses.alignItemsX!;

    this._element.style.alignItems = this._valuesForCssClasses.alignItemsY!;

    this._element.classList.value = getGridClasses(this._valuesForCssClasses);
  }
}
