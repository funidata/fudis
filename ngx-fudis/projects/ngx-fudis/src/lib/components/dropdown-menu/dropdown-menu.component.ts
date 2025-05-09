import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  Host,
  HostListener,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { FudisIdService } from '../../services/id/id.service';
import { DropdownBaseDirective } from '../../directives/form/dropdown-base/dropdown-base.directive';
import { ButtonComponent } from '../button/button.component';
import { DOCUMENT } from '@angular/common';
import { FudisInputSize } from '../../types/forms';
import { Subject } from 'rxjs';
import { FudisDropdownMenuAlign } from '../../types/miscellaneous';

@Component({
  selector: 'fudis-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DropdownMenuComponent extends DropdownBaseDirective implements OnInit {
  constructor(
    private _idService: FudisIdService,
    @Inject(DOCUMENT) private _document: Document,
    // HOTFIX: ForwardRef does not resolve root cause of circular dependecy, but fixes issue in standalone project with Jest unit tests where this circularity was detected (Rane)
    // TODO: Fix underlying circular dependency
    @Host() @Inject(forwardRef(() => ButtonComponent)) private _parentButton: ButtonComponent,
  ) {
    super();

    /**
     * Fire maxWidth calculation through Observable call from parent Button
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DropdownMenuComponent.fireMaxWidthCalcEvent.subscribe((res) => {
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
   * Dropdown Menu's max width calculation observable
   */
  public static fireMaxWidthCalcEvent: Subject<boolean> = new Subject();

  /**
   * Determine dropdown max-width
   */
  protected _maxWidth: string = 'initial';

  /**
   * Currently focused option
   */
  private _focusedOption: string | null = null;

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
  @HostListener('window:click', ['$event'])
  private _getMaxWidth(): void {
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
  private _handleDropdownMenuKeyDown(event: KeyboardEvent) {
    if (this._parentButton.dropdownOpen.value) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();

        const firstChildElement = this._dropdownMenuElement.nativeElement.children[0];

        // If focus is on the menu button, only then listen keydown and focus on the first child
        if (
          firstChildElement.closest('fudis-button')?.querySelector('.fudis-button') ===
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
  }
}
