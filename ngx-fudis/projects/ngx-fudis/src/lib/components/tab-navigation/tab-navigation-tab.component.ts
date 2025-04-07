import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TabNavigationBarComponent } from './tab-navigation-bar.component';

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
    '[attr.aria-selected]': 'active',
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

  @Input() id: string;
  @Input()
  get active(): boolean {
    return this._isActive;
  }

  set active(value: boolean) {
    if (value !== this._isActive) {
      this._isActive = value;
      if (this._isActive) {
        this._tabNavigation._updateActiveLink(this.id);
      }
    }
  }

  ngAfterViewInit() {
    if (this._tabNavigation && this._isActive) this._tabNavigation._updateActiveLink(this.id);
  }

  protected _onKeyDown = (event: KeyboardEvent) => {
    const tabElements = this._getTabs() as HTMLElement[];
    const currentElement: HTMLElement =
      this._tabNavigation.scrollContainer?.nativeElement?.querySelector(':focus');
    const currentIndex = tabElements.indexOf(currentElement);
    let focusElement = currentElement;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusElement = tabElements[currentIndex > 0 ? currentIndex - 1 : tabElements.length - 1];
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusElement = tabElements[currentIndex < tabElements.length - 1 ? currentIndex + 1 : 0];
    }

    if (focusElement) {
      focusElement?.focus();
      if (focusElement) focusElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  private _getTabs = () => {
    const tabNodes = this._tabNavigation.scrollContainer?.nativeElement?.querySelectorAll(
      '[fudis-tab-navigation-tab]',
    );
    return [...tabNodes];
  };
}
