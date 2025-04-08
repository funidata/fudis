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
   * Variant option
   */
  @Input() variant?: 'primary' | 'secondary' = 'primary';

  @ViewChild('tabNavigation') tabNavigation: ElementRef;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  protected _leftContentHidden = signal<boolean>(false);
  protected _rightContentHidden = signal<boolean>(false);

  private _tabPanel: TabNavigationPanelComponent;
  private _currentActiveTabId: string;

  private _scrollSubscription: Subscription;
  private _resizeObserver: ResizeObserver;
  private readonly _scrollAmount: number = 150;

  ngAfterViewInit() {
    this._resizeObserver = new ResizeObserver((): void => {
      this.assertScroll();
    });
    this._resizeObserver.observe(this.tabNavigation.nativeElement);
    this._scrollSubscription = fromEvent(this.scrollContainer.nativeElement, 'scroll')
      .pipe(auditTime(300))
      .subscribe(() => this.assertScroll());
  }

  private assertScroll() {
    const scrollContainer = this.scrollContainer.nativeElement;

    const isLeftHidden = scrollContainer.scrollLeft > 0;
    const isRightHidden =
      Math.round(scrollContainer.scrollLeft + scrollContainer.clientWidth) <
      scrollContainer.scrollWidth;

    this._rightContentHidden.set(isRightHidden);
    this._leftContentHidden.set(isLeftHidden);
  }

  protected _scrollLeft(): void {
    const scrollContainer = this.scrollContainer.nativeElement;
    const targetScrollLeft = Math.max(0, scrollContainer.scrollLeft - this._scrollAmount);
    this._scrollTo(scrollContainer, targetScrollLeft);
  }

  protected _scrollRight(): void {
    const scrollContainer = this.scrollContainer.nativeElement;
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const targetScrollLeft = Math.min(
      maxScrollLeft,
      scrollContainer.scrollLeft + this._scrollAmount,
    );
    this._scrollTo(scrollContainer, targetScrollLeft);
  }

  private _scrollTo = (element: HTMLElement, scrollAmount: number): void => {
    element.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  private _updatePanel = () => {
    if (this._tabPanel && this._currentActiveTabId) {
      this._tabPanel._activeTabId = this._currentActiveTabId;
    }
  };

  _updateActiveLink(id: string) {
    this._currentActiveTabId = id;
    this._updatePanel();
  }

  ngOnDestroy() {
    this._resizeObserver.disconnect();
    this._scrollSubscription.unsubscribe();
  }
}
