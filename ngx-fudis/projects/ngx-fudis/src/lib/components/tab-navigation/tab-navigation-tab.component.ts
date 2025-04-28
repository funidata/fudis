import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TabNavigationBarComponent } from './tab-navigation-bar.component';

/**
 * Button or a link inside a `fudis-tab-navigation-bar`.
 */
@Component({
  selector: '[fudis-tab-navigation-tab]',
  encapsulation: ViewEncapsulation.None,
  template: '<ng-content></ng-content>',
  styleUrl: './tab-navigation-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[id]': 'id',
    role: 'tab',
    '(keydown)': '_onKeyDown($event)',
    '[attr.tabIndex]': '_isActive ? 0 : -1',
    '[attr.aria-selected]': '_isActive',
    '[attr.aria-controls]': '_ariaControls',
    '[class]': "'fudis-tab-navigation-tab fudis-tab-navigation-tab--' + _tabNavigation.variant",
    '[class.fudis-tab-navigation-tab--primary--active]':
      "_tabNavigation.variant === 'primary' && _isActive",
    '[class.fudis-tab-navigation-tab--secondary--active]':
      "_tabNavigation.variant === 'secondary' && _isActive",
  },
})
export class TabNavigationTabComponent implements AfterViewInit {
  protected _tabNavigation = inject(TabNavigationBarComponent);
  protected _isActive: boolean = false;
  protected _ariaControls: string | undefined;

  /**
   * Unique identifier for the component
   */
  @Input() id: string;

  /**
   * Currently active tab
   */
  @Input()
  get active(): boolean {
    return this._isActive;
  }

  set active(value: boolean) {
    if (value !== this._isActive) {
      this._isActive = value;
      if (this._isActive) this._tabNavigation?.updateActiveLink(this.id);
    }
  }

  constructor() {
    effect(() => {
      this._ariaControls = this._tabNavigation.getAriaControls()();
    });
  }

  ngAfterViewInit() {
    if (this._isActive) this._tabNavigation?.updateActiveLink(this.id);
  }

  protected _onKeyDown = (event: KeyboardEvent) => {
    if (event.key === ' ' && event?.target instanceof HTMLAnchorElement) {
      event.preventDefault();
      const anchorElement = event.target;
      anchorElement.click();
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') this._onArrowNavigation(event);
  };

  private _onArrowNavigation = (event: KeyboardEvent) => {
    event.preventDefault();

    const tabElements = this._getTabs() as HTMLElement[];
    const currentElement: HTMLElement =
      this._tabNavigation?.scrollContainer?.nativeElement?.querySelector(':focus');

    if (currentElement && tabElements.length > 0) {
      const currentIndex = tabElements.indexOf(currentElement);
      let nextIndex: number = currentIndex;
      let focusElement = currentElement;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabElements.length - 1;
        focusElement = tabElements[nextIndex];
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextIndex = currentIndex < tabElements.length - 1 ? currentIndex + 1 : 0;
        focusElement = tabElements[nextIndex];
      }

      focusElement?.focus();

      if (this._tabNavigation.isScrollable()) {
        if (nextIndex === 0) {
          this._tabNavigation?.scrollLeft(true);
        } else if (nextIndex === tabElements.length - 1) {
          this._tabNavigation?.scrollRight(true);
        } else {
          focusElement.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
          });
        }
      }
    }
  };

  private _getTabs = () => {
    const tabNodes = this._tabNavigation.scrollContainer?.nativeElement?.querySelectorAll(
      '[fudis-tab-navigation-tab]',
    );
    return [...tabNodes];
  };
}
