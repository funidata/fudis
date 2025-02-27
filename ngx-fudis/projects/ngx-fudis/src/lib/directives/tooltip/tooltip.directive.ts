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
    if (this._tooltipElement.nativeElement.hasAttribute('fudisTooltip')) {
      if (!this.tooltipToggle) {
        this._ngMaterialTooltip.show();
      }
    }
  }

  /**
   * When user's mouse leaves either trigger or tooltip HTMLElement
   */
  @HostListener('mouseleave', ['$event']) private _onMouseLeave(event: MouseEvent) {
    if (!this.tooltipToggle) {
      this._closeTooltip(event);
    }
  }

  /**
   * When tooltip's trigger HTMLElement receives mouse down click
   */
  @HostListener('mousedown', ['$event']) private _onMouseDown(event: MouseEvent) {
    console.log('mousedown event');
    if (this.tooltipToggle && this._tooltipElement.nativeElement.hasAttribute('fudisTooltip')) {
      event.preventDefault();
    }
  }

  /**
   * When tooltip's trigger HTMLElement receives focus
   */
  @HostListener('focus') private _onFocus() {
    if (!this.tooltipToggle) {
      this._ngMaterialTooltip.show();
    }
  }

  /**
   * When tooltip's trigger HTMLElement is blurred out
   */
  @HostListener('blur', ['$event']) private _onBlur() {
    console.log('blur event');
    this._ngMaterialTooltip.hide();
  }

  /**
   * When user clicks tooltip's triggering HTMLElement
   */
  @HostListener('click') private _onClick() {
    console.log('click event');
    if (this.tooltipToggle && this._tooltipElement.nativeElement.hasAttribute('fudisTooltip')) {
      this._ngMaterialTooltip.toggle();
    }
  }

  /**
   * When key is pressed on tooltip's triggering HTMLElement
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

    if (event.key === 'Escape') {
      this._ngMaterialTooltip.hide();
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

  /**
   * Close Tooltip only when hovering out of either triggering element or tooltip itself
   */
  private _closeTooltip(event: MouseEvent): void {
    const relatedTarget = event?.relatedTarget as HTMLDivElement;
    if (!relatedTarget?.classList.contains('mdc-tooltip')) {
      this._ngMaterialTooltip.hide();
    }
  }
}
