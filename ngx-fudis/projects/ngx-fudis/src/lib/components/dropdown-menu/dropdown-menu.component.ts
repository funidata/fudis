import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Host,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { FudisIdService } from '../../services/id/id.service';
import { DropdownBaseDirective } from '../../directives/form/dropdown-base/dropdown-base.directive';
import { DOCUMENT } from '@angular/common';
import { FudisInputSize } from '../../types/forms';
import { FudisDropdownMenuAlign } from '../../types/miscellaneous';
import { DropdownEventService } from '../../services/dropdown/dropdown-event.service';
import { Subscription } from 'rxjs';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'fudis-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DropdownMenuComponent extends DropdownBaseDirective implements OnInit, OnDestroy {
  constructor(
    private _idService: FudisIdService,
    private _dropdownEventService: DropdownEventService,
    @Inject(DOCUMENT) private _document: Document,
    @Host() private _parentButton: IconButtonComponent,
  ) {
    super();

    /**
     * Fire maxWidth calculation through Observable call from parent Button
     */
    this._subscription = this._dropdownEventService.triggerCalculation.subscribe(() => {
      this._getMaxWidth();
    });
  }

  /**
   * Template reference for the Dropdown Menu wrapper element
   */
  @ViewChild('dropdownMenuElement') private _dropdownMenuElement: ElementRef<HTMLElement>;

  /**
   * Align Dropdown Menu opening position
   */
  @Input() align: FudisDropdownMenuAlign = 'center';

  /**
   * Dropdown Menu size
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * Determine dropdown max-width
   */
  protected _maxWidth: string = 'initial';

  /**
   * Currently focused option
   */
  private _focusedOption: string | null = null;

  /**
   * Subscription for dropdown width calculation event
   */
  private _subscription: Subscription;

  /**
   * Add or remove currently focused option. Called from DropdownMenuItem.
   */
  public setFocusedOption(id: string, type: 'add' | 'remove', event?: FocusEvent): void {
    if (type === 'add') {
      this._focusedOption = id;
    } else if (event) {
      this._focusedOption = null;
      this._componentFocused(event).then((value) => {
        if (!value) {
          this._parentButton.closeMenu(false);
        }
      });
    }
  }

  /**
   * Check if focus is inside the Dropdown Menu component
   *
   * @param event Focus event
   * @returns Boolean
   */
  private _componentFocused(event: FocusEvent): Promise<boolean> {
    return new Promise((resolve) => {
      let counter = 0;

      const nextTarget = event?.relatedTarget as HTMLElement;

      const focusCheckInterval = setInterval(() => {
        const focused =
          !!this._dropdownMenuElement.nativeElement.contains(this._document.activeElement) ||
          !!this._dropdownMenuElement.nativeElement.contains(nextTarget);

        // If focus has moved to another element inside Dropdown Menu
        if (focused) {
          clearInterval(focusCheckInterval);
          resolve(true);
          // If focus target is null
        } else if (!nextTarget) {
          clearInterval(focusCheckInterval);
          resolve(false);

          // Increase counter, and try again. This is needed usually with click events as between previous element blur and next element focus click event is "somewhere else"
        } else if (counter <= 100) {
          counter = counter + 50;
        } else {
          // Else resolve boolean check after two tries, if any relevant element is focused
          clearInterval(focusCheckInterval);

          resolve(!!this._focusedOption);
        }
      }, 50);
    });
  }

  public closeDropdownMenu(): void {
    this._parentButton.closeMenu();
  }

  /**
   * Host Listener for dropdown's width, it needs to be wider than its Button parent
   */
  @HostListener('window:click')
  protected _getMaxWidth(): void {
    const fontSize = Number(
      window.getComputedStyle(this._document.body).getPropertyValue('font-size').replace('px', ''),
    );

    const elementInViewWidth =
      this._dropdownMenuElement?.nativeElement?.getBoundingClientRect()?.width;

    // Left boundary edge of the element in the viewport
    const elementInViewX = this._dropdownMenuElement?.nativeElement?.getBoundingClientRect()?.x;

    if (elementInViewX && elementInViewWidth && elementInViewWidth !== 0 && this.align === 'left') {
      const viewWidthAndViewXInRem = `${(elementInViewWidth + elementInViewX) / fontSize}rem`;
      this._maxWidth = 'calc(' + viewWidthAndViewXInRem + '/ var(--fudis-rem-multiplier))';
    } else if (window?.visualViewport?.width && elementInViewX) {
      // elementInViewX + 1 is a hack for Firefox. In desktop mode (but in small screen) the dropdown menu's right border did not show.
      // TODO: This could be improved if better solution comes to mind.
      const viewportWidthAndViewXInRem = `${(window.visualViewport.width - (elementInViewX + 1)) / fontSize}rem`;
      this._maxWidth = 'calc(' + viewportWidthAndViewXInRem + '/ var(--fudis-rem-multiplier))';
    } else {
      this._maxWidth = 'initial';
    }
  }

  /**
   * Host Listener for keydown events, especially Arrow Down and Escape from Dropdown Menu
   */
  @HostListener('window:keydown', ['$event'])
  protected _handleDropdownMenuKeyDown(event: KeyboardEvent) {
    if (this._parentButton.dropdownOpen.value) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();

        const firstChildElement = this._dropdownMenuElement.nativeElement.children[0];

        // If focus is on the menu button, only then listen keydown and focus on the first child
        if (
          firstChildElement.closest('fudis-icon-button')?.querySelector('.fudis-button') ===
          document.activeElement
        ) {
          const firstChildButtonElement = firstChildElement.querySelector('button');
          firstChildButtonElement?.focus();
        }
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        this._parentButton.closeMenu();
      }
    }
  }

  ngOnInit(): void {
    this.id = this._idService.getNewGrandParentId('dropdown-menu');
    if (this._parentButton) this._parentButton.dropdownMenuId = this.id;
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
