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
  private preventBlur: boolean = false;

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
          !this._isTooltipInViewport(this._tooltipElement.nativeElement)
        ) {
          this._ngMaterialTooltip.hide();
        }
      });
  }

  /**
   * When user's mouse enters to tooltip's triggering HTMLElement
   */
  @HostListener('mouseenter') private _onMouseEnter() {
    if (!this.tooltipToggle && this._tooltipElement.nativeElement.hasAttribute('fudisTooltip')) {
      this._showTooltip();
    }
  }

  /**
   * When user's mouse leaves either tooltip or tooltip's triggering HTMLElement
   */
  @HostListener('mouseleave', ['$event']) private _onMouseLeave(event: MouseEvent) {
    const targetElement = event?.relatedTarget as HTMLElement;
    if (!this.tooltipToggle && !this._targetOnToolTip(targetElement)) {
      this._ngMaterialTooltip.hide();
    }
  }

  /**
   * When tooltip's triggering HTMLElement receives focus
   */
  @HostListener('focus') private _onFocus() {
    if (!this.tooltipToggle) {
      this._showTooltip();
    }
  }

  /**
   * When tooltip's triggering HTMLElement is blurred out
   */
  @HostListener('blur') private _onBlur() {
    if (!this.preventBlur) this._ngMaterialTooltip.hide();
    this.preventBlur = false;
  }

  /**
   * When user clicks tooltip's triggering HTMLElement
   */
  @HostListener('click') private _onClick() {
    if (this.tooltipToggle && this._tooltipElement.nativeElement.hasAttribute('fudisTooltip')) {
      this._toggleTooltip();
    }
  }

  /**
   * When key is pressed on tooltip's triggering HTMLElement
   */
  @HostListener('keyup', ['$event']) private _onKeyUp(event: KeyboardEvent) {
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
   * This function is for checking if the tooltip is visible
   */
  private _isTooltipInViewport(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }

  /**
   * Toggle tooltip visibility
   */
  private _toggleTooltip = () => {
    if (!this._ngMaterialTooltip._isTooltipVisible()) {
      this._showTooltip();
    } else {
      this._ngMaterialTooltip.hide();
    }
  };

  /**
   * Helper to detect hover on tooltip element
   */
  private _targetOnToolTip(element: HTMLElement) {
    return element?.classList?.contains('mdc-tooltip');
  }

  private _showTooltip() {
    this._ngMaterialTooltip.show();

    if (this.tooltipToggle) {
      const el = document.querySelector('mat-tooltip-component');
      el?.addEventListener('pointerdown', this._createTooltipEventListener.bind(this));
    }
  }

  /**
   * Helper for preventing blur when interacting with text content inside tooltip
   */
  private _createTooltipEventListener() {
    this.preventBlur = true;
  }
}
