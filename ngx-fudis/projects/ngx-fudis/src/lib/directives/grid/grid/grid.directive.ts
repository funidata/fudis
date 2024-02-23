import { Directive, ElementRef, OnChanges, OnInit, Signal, effect } from '@angular/core';
import {
  getGridClasses,
  getGridCssValue,
  getGridInputPropertyObject,
  replaceFormInputWidthsToRem,
} from '../gridUtils';
import { GridApiDirective } from '../grid-api/grid-api.directive';
import {
  FudisGridColumnsResponsive,
  gridColumnDefault,
  FudisGridProperties,
  FudisGridColumns,
} from '../../../types/grid';
import { FudisGridService } from '../../../services/grid/grid.service';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { FudisBreakpointStyleResponsive } from '../../../types/breakpoints';
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
     * Calculate CSS Column attribute using default values
     */
    this._calculateAndSetGridColumnsCss();

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

    effect(() => {
      /** Fetch defaulfs from service */
      this._gridDefaults = _gridService.getGridDefaultValues();

      /**
       * Update properties if Grid defaults update
       */
      this._setAllProperties();
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
  private _gridInputProperties: FudisGridProperties;

  /**
   * Grid default values, setting will apply to all grid elements
   */
  private _gridDefaults: Signal<FudisGridProperties>;

  ngOnInit(): void {
    this._setAllProperties();
  }

  ngOnChanges(changes: FudisComponentChanges<GridDirective>): void {
    /**
     * Calculate new grid-column-template values if this.columns or this.ignoreDefaults changes
     */
    if (changes.columns?.currentValue || changes.ignoreDefaults?.currentValue) {
      this._calculateAndSetGridColumnsCss(changes.columns?.currentValue);
    } else {
      /**
       * Else changes are something which required re-calculation of CSS classes
       */
      this._updateChangedProperties(changes);
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
  private _calculateAndSetGridColumnsCss(
    columnFromInput: FudisGridColumns = gridColumnDefault,
  ): void {
    this._calculatedColumns = this._calculateColumnsCssValue(columnFromInput);
    this._setColumnsForBreakpoints(this._calculatedColumns);
  }

  private _calculateColumnsCssValue(
    columnFromInput: FudisGridColumns,
  ): string | FudisBreakpointStyleResponsive[] {
    if (typeof columnFromInput === 'string') {
      return replaceFormInputWidthsToRem(columnFromInput);
    }
    // If value is number, convert it to grid-template-column value. E. g. number 6 converts to 'repeat(6,1fr)'
    else if (typeof columnFromInput === 'number') {
      return getGridCssValue(columnFromInput);
    }
    // Get breakpoint settings with provided default values and Input values
    else if (!this.ignoreDefaults && this._gridDefaults()?.columns) {
      const combinedValues: FudisGridColumnsResponsive = {
        ...this._gridDefaults()!.columns,
        ...columnFromInput,
      };

      return getBreakpointDataArray(combinedValues, gridColumnDefault);
    } else {
      return getBreakpointDataArray(columnFromInput, gridColumnDefault);
    }
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
    this._gridInputProperties = getGridInputPropertyObject(this, this._gridDefaults());

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
      this._gridInputProperties = { ...this._gridInputProperties, ...valuesToUpdate };

      this._applyGridCss();
    }
  }

  /**
   * Apply CSS settings from Inputs
   */
  private _applyGridCss(): void {
    this._element.style.justifyItems = this._gridInputProperties.alignItemsX!;

    this._element.style.alignItems = this._gridInputProperties.alignItemsY!;

    this._element.classList.value = getGridClasses(this._gridInputProperties);
  }
}
