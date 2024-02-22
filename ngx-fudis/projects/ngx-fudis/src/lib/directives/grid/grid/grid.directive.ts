import { Directive, ElementRef, OnChanges, OnInit, Signal, effect } from '@angular/core';
import { getGridClasses, getGridCssValue, replaceFormInputWidthsToRem } from '../gridUtils';
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

    this._gridDefaults = _gridService.getGridDefaultValues();

    /**
     * Set properties based on default values declared in GriApiDirective
     */
    this._calculateAndSetGridColumnsCss(this.columns);

    this._gridInputProperties = {
      width: this.width,
      align: this.align,
      alignItemsX: this.alignItemsX,
      alignItemsY: this.alignItemsY,
      marginTop: this.marginTop,
      marginBottom: this.marginBottom,
      marginSides: this.marginSides,
      rowGap: this.rowGap,
      columnGap: this.columnGap,
      classes: this.classes,
    };

    /**
     * When screen is resized check and apply new rules for Grid columns
     */
    effect(() => {
      this._breakpointService.getBreakpointState();

      if (
        typeof this._calculatedColumns !== 'string' &&
        typeof this._calculatedColumns !== 'number'
      ) {
        this._setColumnsForBreakpoints(this._calculatedColumns);
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
  private _gridInputProperties: FudisGridProperties;

  /**
   * Grid default values, setting will apply to all grid elements
   */
  private _gridDefaults: Signal<FudisGridProperties | null>;

  private _initDone: boolean = false;

  ngOnInit(): void {
    if (!this.ignoreDefaults) {
      this._gridInputProperties = { ...this._gridInputProperties, ...this._gridDefaults() };
    }
  }

  ngOnChanges(changes: FudisComponentChanges<GridDirective>): void {
    if (changes.columns?.currentValue) {
      this._calculateAndSetGridColumnsCss(changes.columns?.currentValue);
    }

    this._setGridInputProperties(changes);
  }

  private _setGridInputProperties(changes: FudisComponentChanges<GridDirective>): void {
    let valuesToUpdate: FudisGridProperties = {};

    Object.keys(changes).forEach((key) => {
      if (key !== 'columns') {
        const keyToUpdate: keyof FudisGridProperties = key as keyof FudisGridProperties;
        const newValue = changes[keyToUpdate]?.currentValue;

        valuesToUpdate = { ...valuesToUpdate, [keyToUpdate]: newValue };
      }
    });

    this._gridInputProperties = { ...this._gridInputProperties, ...valuesToUpdate };

    this._applyGridCss();
  }

  /**
   * Set and config Grid's attributes from provided input properties
   */
  private _calculateAndSetGridColumnsCss(columnFromInput: FudisGridColumns): void {
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

  /**
   * Apply CSS settings from Inputs
   */
  private _applyGridCss(): void {
    this._element.style.justifyItems = this._gridInputProperties.alignItemsX!;

    this._element.style.alignItems = this._gridInputProperties.alignItemsY!;

    /**
     * Get and apply list of CSS classes to align and position Grid
     */

    this._element.classList.value = getGridClasses(this._gridInputProperties);
  }
}
