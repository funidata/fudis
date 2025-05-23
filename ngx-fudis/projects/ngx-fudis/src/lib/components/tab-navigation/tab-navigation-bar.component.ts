import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { NgxFudisModule } from '../../ngx-fudis.module';
import { IconComponent } from '../icon/icon.component';
import { auditTime, fromEvent, Subscription } from 'rxjs';
import { TabNavigationPanelComponent } from './tab-navigation-panel.component';

/**
 * A Tab navigation bar component.
 */
@Component({
  selector: 'fudis-tab-navigation-bar',
  imports: [NgIf, NgxFudisModule],
  providers: [IconComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tab-navigation-bar.component.html',
  styleUrl: './tab-navigation-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[id]': 'id',
    role: 'tablist',
  },
})
export class TabNavigationBarComponent implements AfterViewInit, OnDestroy {
  /**
   * Unique identifier for the component
   */
  @Input() id: string;

  /**
   * Reference to the TabNavigationPanelComponent
   */
  @Input()
  get panel(): TabNavigationPanelComponent {
    return this._tabPanel;
  }

  set panel(value: TabNavigationPanelComponent) {
    this._tabPanel = value;
    this._updatePanel();
  }

  /**
   * If panel is not defined you can define the element id where the tab content is projected
   */
  @Input() ariaControls?: string;

  /**
   * Variant option
   */
  @Input() variant?: 'primary' | 'secondary' = 'primary';

  @ViewChild('tabNavigation') tabNavigation: ElementRef;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  protected _leftContentHidden = signal<boolean>(false);
  protected _rightContentHidden = signal<boolean>(false);

  private _ariaControls = signal<string | undefined>(undefined);

  private _tabPanel: TabNavigationPanelComponent;
  private _currentActiveTabId: string;

  private _scrollSubscription: Subscription;
  private _resizeObserver: ResizeObserver;
  private readonly _scrollAmount: number = 150;

  ngAfterViewInit() {
    this._resizeObserver = new ResizeObserver((): void => {
      this.assertScroll();
    });

    if (this.tabNavigation) this._resizeObserver.observe(this.tabNavigation.nativeElement);

    if (this.scrollContainer) {
      this._scrollSubscription = fromEvent(this.scrollContainer.nativeElement, 'scroll')
        .pipe(auditTime(300))
        .subscribe(() => this.assertScroll());
    }
    if (this.ariaControls && !this._ariaControls()) this._ariaControls.set(this.ariaControls);
  }

  getAriaControls = () => this._ariaControls;

  isScrollable = () => {
    return this._leftContentHidden() || this._rightContentHidden();
  };

  assertScroll() {
    const scrollContainer = this.scrollContainer?.nativeElement;

    if (scrollContainer) {
      const isLeftHidden = scrollContainer.scrollLeft > 0;
      const isRightHidden =
        Math.round(scrollContainer.scrollLeft + scrollContainer.clientWidth) <
        scrollContainer.scrollWidth;

      this._rightContentHidden.set(isRightHidden);
      this._leftContentHidden.set(isLeftHidden);
    }
  }

  scrollLeft(scrollToStart?: boolean): void {
    const scrollContainer = this.scrollContainer?.nativeElement;

    if (scrollContainer) {
      if (scrollToStart) {
        this._scrollTo(scrollContainer, 0, 'instant');
      } else {
        const targetScrollLeft = Math.max(0, scrollContainer.scrollLeft - this._scrollAmount);
        this._scrollTo(scrollContainer, targetScrollLeft);
      }
    }
  }

  scrollRight(scrollToEnd?: boolean): void {
    const scrollContainer = this.scrollContainer.nativeElement;

    if (scrollContainer) {
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

      if (scrollToEnd) {
        this._scrollTo(scrollContainer, maxScrollLeft, 'instant');
      } else {
        const targetScrollLeft = Math.min(
          maxScrollLeft,
          scrollContainer.scrollLeft + this._scrollAmount,
        );
        this._scrollTo(scrollContainer, targetScrollLeft);
      }
    }
  }

  private _scrollTo = (
    element: HTMLElement,
    scrollAmount: number,
    behavior: 'smooth' | 'instant' = 'smooth',
  ): void => {
    element.scrollTo({
      left: scrollAmount,
      behavior: behavior,
    });
  };

  private _updatePanel = () => {
    if (this._tabPanel) {
      if (this._currentActiveTabId) this._tabPanel.setActiveTabId(this._currentActiveTabId);
      if (!this._ariaControls()) this._ariaControls.set(this._tabPanel.id);
    }
  };

  updateActiveLink(id: string) {
    this._currentActiveTabId = id;
    this._updatePanel();
  }

  ngOnDestroy() {
    this._resizeObserver?.disconnect();
    this._scrollSubscription?.unsubscribe();
  }
}
