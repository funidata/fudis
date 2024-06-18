import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Host,
  HostListener,
  Inject,
  Input,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { FudisIdService } from '../../services/id/id.service';
import { DropdownBaseDirective } from '../../directives/form/dropdown-base/dropdown-base.directive';
import { ButtonComponent } from '../button/button.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'fudis-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuComponent
  extends DropdownBaseDirective
  implements OnInit, AfterContentInit
{
  private _mouseDownTargetInsideComponent: boolean;
  constructor(
    private _idService: FudisIdService,
    @Inject(DOCUMENT) private _document: Document,
    @Host() @Optional() private _parentButton: ButtonComponent,
  ) {
    super();
  }

  /**
   * Template reference for the Dropdown Menu wrapper element
   */
  @ViewChild('dropdownMenuElement') dropdownMenuElement: ElementRef<HTMLElement>;

  /**
   * Dropdown-menu is aligned to open left side of the button by default but can be aligned to open right side if necessary
   */
  @Input() align: 'left' | 'right' | 'center' = 'left';

  protected _dropdownOpen: boolean = true;

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
          this._parentButton.closeMenu();
        }
      });
    }
  }

  /**
   * Check if focus is inside the Dropdown Menu component
   * @param event focus event
   * @returns boolean
   */
  private _componentFocused(event: FocusEvent): Promise<boolean> {
    return new Promise((resolve) => {
      let counter = 0;

      const nextTarget = event?.relatedTarget as HTMLElement;

      const focusCheckInterval = setInterval(() => {
        const focused =
          !!this.dropdownMenuElement.nativeElement.contains(this._document.activeElement) ||
          !!this.dropdownMenuElement.nativeElement.contains(nextTarget);

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
    this._dropdownOpen = false;
  }

  @HostListener('mousedown', ['$event.target'])
  private _handleMouseDown() {
    this._mouseDownTargetInsideComponent = true;
  }

  /**
   * Host Listener for dropdown's width, it needs to be wider than its Button parent
   */
  @HostListener('window:click', ['$event'])
  private _getMaxWidth(): void {
    const elementInViewWidth =
      this.dropdownMenuElement?.nativeElement?.getBoundingClientRect()?.width;

    const elementInViewX = this.dropdownMenuElement?.nativeElement?.getBoundingClientRect()?.x;

    if (elementInViewX && elementInViewWidth && elementInViewWidth !== 0 && this.align === 'left') {
      this._maxWidth = `${elementInViewWidth + elementInViewX}px`;
    } else if (window?.innerWidth && elementInViewX) {
      this._maxWidth = `${window.innerWidth - elementInViewX}px`;
    } else {
      this._maxWidth = 'initial';
    }
  }

  /**
   * Host Listener for keydown events, especially Arrow Down and Escape from Menu Button
   */
  @HostListener('window:keydown', ['$event'])
  private _handleDropdownMenuButtonKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();

      const firstChildElement = this.dropdownMenuElement.nativeElement.children[0];

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
      this._parentButton.closeMenu();
    }
  }

  ngOnInit(): void {
    this.id = this._idService.getNewParentId('dropdown-menu');
  }

  ngAfterContentInit(): void {
    this._getMaxWidth();
  }
}
