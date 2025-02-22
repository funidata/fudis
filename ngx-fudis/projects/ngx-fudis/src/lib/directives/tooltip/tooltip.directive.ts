import {
  Directive,
  HostListener,
  OnInit,
  ElementRef,
  OnChanges,
  AfterViewInit,
  inject,
  DestroyRef,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { TooltipApiDirective } from './tooltip-api.directive';
import { ScrollDispatcher } from '@angular/cdk/overlay';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[fudisTooltip]',
  exportAs: 'tooltip',
  providers: [MatTooltip],
})
export class TooltipDirective
  extends TooltipApiDirective
  implements OnInit, OnChanges, AfterViewInit
{
  constructor(
    private _ngMaterialTooltip: MatTooltip,
    private _tooltipElement: ElementRef,
    private _scrollDispatcher: ScrollDispatcher,
  ) {
    super();
  }

  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._setTooltip();
  }

  ngOnChanges(): void {
    this._setTooltip();
  }

  ngAfterViewInit() {
    /**
     * Scroll tracking with 100s audit time
     */
    this._scrollDispatcher
      .scrolled(100)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        if (
          this._tooltipElement?.nativeElement &&
          this._ngMaterialTooltip._isTooltipVisible() &&
          !this.isTooltipInViewport(this._tooltipElement.nativeElement)
        ) {
          this._ngMaterialTooltip.hide();
        }
      });
  }

  /**
   * This function is for checking if the tooltip is visible
   */
  private isTooltipInViewport(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
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
  @HostListener('focus') private _onFocus() {
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
