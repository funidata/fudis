import { Directive, ElementRef, OnChanges, OnInit, Signal, effect } from '@angular/core';
import { getGridClasses, getGridCssValue, replaceFormInputWidthsToRem } from '../gridUtils';
import { GridApiDirective } from '../grid-api/grid-api.directive';
import {
  FudisGridColumnsResponsive,
  gridColumnDefault,
  FudisGridProperties,
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
    gridService: FudisGridService,
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

      if (
        typeof this._calculatedColumns !== 'string' &&
        typeof this._calculatedColumns !== 'number'
      ) {
        this._setColumnsForBreakpoints();
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
    const {
      align,
      alignItemsX,
      alignItemsY,
      marginTop,
      marginBottom,
      marginSides,
      rowGap,
      columnGap,
      width,
    } = this._gridDefaults()!;

    this._gridInputProperties = {
      width: this.width ?? width,
      align: this.align ?? align,
      alignItemsX: this.alignItemsX ?? alignItemsX,
      alignItemsY: this.alignItemsY ?? alignItemsY,
      marginTop: this.marginTop ?? marginTop,
      marginBottom: this.marginBottom ?? marginBottom,
      marginSides: this.marginSides ?? marginSides,
      rowGap: this.rowGap ?? rowGap,
      columnGap: this.columnGap ?? columnGap,
      classes: this.classes ?? width,
    };

    this._setGridColumnAttributes();
    this._applyGridCss(this._gridInputProperties);

    this._initDone = true;
  }

  ngOnChanges(changes: FudisComponentChanges<GridDirective>): void {
    if (this._initDone) {
      if (changes.columns?.currentValue) {
        this._setGridColumnAttributes();
      }

      let valuesToUpdate: FudisGridProperties = {};

      Object.keys(changes).forEach((key) => {
        if (key !== 'columns') {
          const keyToUpdate: keyof FudisGridProperties = key as keyof FudisGridProperties;
          const newValue = changes[keyToUpdate]?.currentValue;

          valuesToUpdate = { ...valuesToUpdate, [keyToUpdate]: newValue };
        }
      });

      this._applyGridCss(valuesToUpdate);
    }
  }

  /**
   * Set and config Grid's attributes from provided input properties
   */
  private _setGridColumnAttributes(): void {
    this._calculateColumnsCssValue();
    this._setColumnsForBreakpoints();
  }

  private _calculateColumnsCssValue(): void {
    if (typeof this.columns === 'string') {
      this._calculatedColumns = replaceFormInputWidthsToRem(this.columns);
    }
    // If value is number, convert it to grid-template-column value. E. g. number 6 converts to 'repeat(6,1fr)'
    else if (typeof this.columns === 'number') {
      this._calculatedColumns = getGridCssValue(this.columns);
    }
    // Get breakpoint settings with provided default values and Input values
    else if (!this.ignoreDefaults && this._gridDefaults()?.columns) {
      const combinedValues: FudisGridColumnsResponsive = {
        ...this._gridDefaults()!.columns,
        ...this.columns,
      };

      this._calculatedColumns = getBreakpointDataArray(combinedValues, gridColumnDefault);
    } else {
      this._calculatedColumns = getBreakpointDataArray(this.columns, gridColumnDefault);
    }
  }

  /**
   * Set CSS grid-template-column attributes for this Grid element
   */
  private _setColumnsForBreakpoints(): void {
    this._breakpointService.setStyleAttributes(
      this._element,
      'grid-template-columns',
      this._calculatedColumns,
    );
  }

  /**
   * Apply CSS settings from Inputs
   */
  private _applyGridCss(values: FudisGridProperties): void {
    if (values?.alignItemsX) {
      this._element.style.justifyItems = values.alignItemsX!;
    }

    if (values?.alignItemsY) {
      this._element.style.alignItems = values.alignItemsY!;
    }

    this._gridInputProperties = {
      ...this._gridInputProperties,
      ...values,
    };

    /**
     * Get and apply list of CSS classes to align and position Grid
     */
    this._element.classList.value = getGridClasses(this._gridInputProperties);
  }
}
