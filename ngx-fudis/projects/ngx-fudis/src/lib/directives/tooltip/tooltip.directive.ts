import { Directive, HostListener, OnInit, ElementRef, OnChanges } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { TooltipApiDirective } from './tooltip-api.directive';

@Directive({
  selector: '[fudisTooltip]',
  exportAs: 'tooltip',
  providers: [MatTooltip],
})
export class TooltipDirective extends TooltipApiDirective implements OnInit, OnChanges {
  constructor(
    private _ngMaterialTooltip: MatTooltip,
    private _tooltipElement: ElementRef,
  ) {
    super();
  }

  ngOnInit(): void {
    this._setTooltip();
  }

  ngOnChanges(): void {
    this._setTooltip();
  }

  /**
   * When user's mouse enters to tooltip HTMLElement
   */
  @HostListener('mouseenter') private _onMouseEnter() {
    if (!this.tooltipToggle && this._tooltipElement.nativeElement.hasAttribute('fudisTooltip')) {
      this._ngMaterialTooltip.show();
    }
  }

  /**
   * When user's mouse leaves tooltip HTMLElement
   */
  @HostListener('mouseleave') private _onMouseLeave() {
    if (!this.tooltipToggle) {
      this._ngMaterialTooltip.hide();
    }
  }

  /**
   * When tooltip HTMLElement receives focus
   */
  @HostListener('focus') private onFocus() {
    if (!this.tooltipToggle) {
      this._ngMaterialTooltip.show();
    }
  }

  /**
   * When tooltip HTMLElement is blurred out
   */
  @HostListener('blur') private _onBlur() {
    this._ngMaterialTooltip.hide();
  }

  /**
   * When user clicks tooltip HTMLElement
   */
  @HostListener('click') private _onClick() {
    if (this.tooltipToggle && this._tooltipElement.nativeElement.hasAttribute('fudisTooltip')) {
      this._ngMaterialTooltip.toggle();
    }
  }

  /**
   * When key is pressed on tooltip HTMLElement
   */
  @HostListener('keyup', ['$event']) private _onKeyUp(event: KeyboardEvent) {
    if (
      this.tooltipToggle &&
      (event.key === 'Enter' || event.key === ' ') &&
      this._tooltipElement.nativeElement.hasAttribute('fudisTooltip') &&
      !this.tooltipToggle
    ) {
      event.preventDefault();
      this._ngMaterialTooltip.toggle();
    }
  }

  /**
   * Binding tooltip text and position to ngMaterialTooltip
   */
  private _setTooltip(): void {
    if (this.tooltip) {
      this._ngMaterialTooltip.message = this.tooltip;
    }
    if (this.tooltipPosition) {
      this._ngMaterialTooltip.position = this.tooltipPosition;
    }
  }
}
