import { Directive, ElementRef, OnChanges, OnInit, Input, effect } from '@angular/core';
import {
  FudisGridItemAlignment,
  FudisGridItemAlignResponsive,
  FudisGridItemWidth,
  gridItemDefault,
  FudisGridItemColumnsResponsive,
} from '../../../types/grid';
import { getGridCssValue } from '../gridUtils';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { FudisBreakpointStyleResponsive } from '../../../types/breakpoints';
import { getBreakpointDataArray } from '../../../utilities/breakpoint/breakpoint-utils';

@Directive({
  selector: '[fudisGridItem]',
})
export class GridItemDirective implements OnInit, OnChanges {
  constructor(
    private _gridItemElement: ElementRef,
    private _breakpointService: FudisBreakpointService,
  ) {
    this._element = _gridItemElement.nativeElement;

    /**
     * When screen is resized check and apply new rules for Grid Item
     */
    effect(() => {
      this._breakpointService.getBreakpointState();

      if (typeof this._columns !== 'string') {
        this._setColumns();
      }
      if (typeof this._alignX !== 'string') {
        this._setAlignX();
      }
      if (typeof this._alignY !== 'string') {
        this._setAlignY();
      }
    });
  }

  /**
   * Apply CSS grid-column values for the Grid Item
   */
  private _columns: string | FudisBreakpointStyleResponsive[] = gridItemDefault;

  /**
   * Apply horizontal CSS values for the Grid Item
   */
  private _alignX: FudisGridItemAlignment | FudisBreakpointStyleResponsive[] = 'stretch';

  /**
   * Apply vertical CSS values for the Grid Item
   */
  private _alignY: FudisGridItemAlignment | FudisBreakpointStyleResponsive[] = 'stretch';

  /**
   * Internal reference for the Grid Item element
   */
  private _element: HTMLElement;

  /**
   * Set columns for single Grid Item
   */
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
      this._columns = getBreakpointDataArray(value, gridItemDefault, true);
    }
  }

  /**
   * Align Grid Item horizontally
   */
  @Input() set alignX(value: FudisGridItemAlignment | FudisGridItemAlignResponsive) {
    if (typeof value === 'string') {
      this._alignX = value;
    } else {
      this._alignX = getBreakpointDataArray(value, 'stretch');
    }
  }

  /**
   * Align Grid Item vertically
   */
  @Input() set alignY(value: FudisGridItemAlignment | FudisGridItemAlignResponsive) {
    if (typeof value === 'string') {
      this._alignY = value;
    } else {
      this._alignY = getBreakpointDataArray(value, 'stretch');
    }
  }

  ngOnInit(): void {
    this._element.classList.add('fudis-grid-item');
    this._applyGridItemCss();
  }

  ngOnChanges(): void {
    this._applyGridItemCss();
  }

  /**
   * Set CSS grid-column attributes for this Grid Item element
   */
  private _setColumns(): void {
    this._breakpointService.setStyleAttributes(this._element, 'grid-column', this._columns);
  }

  /**
   * Set CSS justify-self attributes for this Grid Item element
   */
  private _setAlignX(): void {
    this._breakpointService.setStyleAttributes(this._element, 'justify-self', this._alignX);
  }

  /**
   * Set CSS align-self attributes for this Grid Item element
   */
  private _setAlignY(): void {
    this._breakpointService.setStyleAttributes(this._element, 'align-self', this._alignY);
  }

  /**
   * Apply CSS settings from Inputs
   */
  private _applyGridItemCss(): void {
    this._setColumns();
    this._setAlignX();
    this._setAlignY();
  }
}
