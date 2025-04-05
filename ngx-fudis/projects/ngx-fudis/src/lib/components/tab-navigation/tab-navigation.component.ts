import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { auditTime, fromEvent, Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { NgxFudisModule } from '../../ngx-fudis.module';

@Component({
  selector: 'fudis-tab-navigation',
  imports: [NgIf, NgxFudisModule],
  providers: [IconComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tab-navigation.component.html',
  styleUrl: './tab-navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[id]': 'id',
    role: 'tablist',
  },
})
export class TabNavigationComponent implements AfterViewInit, OnDestroy {
  @Input() id: string;
  @Input() variant: 'primary' | 'secondary';
  @Input() panel: TabNavigationPanelComponent;

  @ViewChild('tabNavigation') tabNavigation: ElementRef;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  protected _leftContentHidden = signal<boolean>(false);
  protected _rightContentHidden = signal<boolean>(false);

  private _scrollSubscription: Subscription;
  private _resizeObserver: ResizeObserver;
  private readonly _scrollAmount: number = 150;

  ngAfterViewInit() {
    this._resizeObserver = new ResizeObserver((): void => {
      this.assertScroll();
    });
    this._resizeObserver.observe(this.tabNavigation.nativeElement);
    this._scrollSubscription = fromEvent(this.scrollContainer.nativeElement, 'scroll')
      .pipe(auditTime(500))
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

    scrollContainer.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth',
    });
  }

  protected _scrollRight(): void {
    const scrollContainer = this.scrollContainer.nativeElement;
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const targetScrollLeft = Math.min(
      maxScrollLeft,
      scrollContainer.scrollLeft + this._scrollAmount,
    );

    scrollContainer.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth',
    });
  }

  ngOnDestroy() {
    this._resizeObserver.disconnect();
    this._scrollSubscription.unsubscribe();
  }

  _updateActiveLink(id: string) {
    if (this.panel) {
      this.panel._activeTabId = id;
    }
  }
}

@Component({
  selector: '[fudis-tab-navigation-tab]',
  encapsulation: ViewEncapsulation.None,
  template: '<ng-content></ng-content>',
  styleUrl: './tab-navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[id]': 'id',
    role: 'tab',
    '[attr.aria-selected]': 'active',
    '[class]': "'fudis-tab-navigation-tab fudis-tab-navigation-tab--' + _tabNavigation.variant",
    '[class.fudis-tab-navigation-tab--primary--active]':
      "_tabNavigation.variant === 'primary' && _isActive",
    '[class.fudis-tab-navigation-tab--secondary--active]':
      "_tabNavigation.variant === 'secondary' && _isActive",
  },
})
export class TabNavigationTabComponent implements AfterViewInit {
  protected _tabNavigation = inject(TabNavigationComponent);
  protected _isActive: boolean = false;

  @Input() id: string;
  @Input()
  get active(): boolean {
    return this._isActive;
  }

  set active(value: boolean) {
    if (value !== this._isActive) {
      this._isActive = value;
      if (this._isActive) this._tabNavigation._updateActiveLink(this.id);
    }
  }

  ngAfterViewInit() {
    if (this._tabNavigation && this._isActive) this._tabNavigation._updateActiveLink(this.id);
  }
}

@Component({
  selector: 'fudis-tab-navigation-panel',
  encapsulation: ViewEncapsulation.None,
  template: '<ng-content></ng-content>',
  styleUrl: './tab-navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-labelledby]': '_activeTabId',
    '[id]': 'id',
    role: 'tabpanel',
  },
})
export class TabNavigationPanelComponent {
  @Input() id: string;
  _activeTabId: string;
}
