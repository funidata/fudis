import {
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
  OnChanges,
  ViewChild,
  ElementRef,
  InjectionToken,
} from '@angular/core';
import { FudisIcon, FudisIconColor, FudisIconRotate } from '../../types/icons';
import {
  FudisButtonSize,
  FudisButtonVariant,
  FudisComponentChanges,
} from '../../types/miscellaneous';
import { BehaviorSubject } from 'rxjs';
import { PopoverApiDirective } from '../popover/popover-api.directive';
import { FudisIdService } from '../../services/id/id.service';
import { IconButtonComponent } from '../../components/icon-button/icon-button.component';
import { ButtonComponent } from '../../components/button/button.component';
import { DropdownEventService } from '../../services/dropdown/dropdown-event.service';
@Directive({
  selector: '[fudisButtonBase]',
  standalone: false,
})
export class ButtonBaseDirective
  extends PopoverApiDirective
  implements OnInit, OnDestroy, OnChanges
{
  constructor(
    protected _idService: FudisIdService,
    private _dropdownEventService: DropdownEventService,
  ) {
    super();
  }
  /**
   * Reference to native button element
   */
  @ViewChild('buttonElement') public buttonEl: ElementRef<HTMLButtonElement>;

  /**
   * Id for HTML button element. By default generated.
   */
  @Input() id: string;

  /**
   * Icon for button
   */
  @Input() icon: FudisIcon | undefined = undefined;

  /**
   * Icon rotation option
   */
  @Input() iconRotate: FudisIconRotate = 'none';

  /**
   * Button variant options
   */
  @Input() variant: FudisButtonVariant = 'primary';

  /**
   * Aria-label for describing context, will override visible label for assistive technology
   */
  @Input() ariaLabel: string;

  /**
   * Disables the button, keeping it focusable
   */
  @Input() disabled = false;

  /**
   * Button size
   */
  @Input() size: FudisButtonSize = 'medium';

  /**
   * Assign button as menu button with dropdown
   */
  @Input() asMenuButton: boolean = false;

  /**
   * Click handler
   */
  @Output() handleClick = new EventEmitter<Event>();

  /**
   * Focus handler
   */
  @Output() handleFocus = new EventEmitter<FocusEvent>();

  /**
   * Blur handler
   */
  @Output() handleBlur = new EventEmitter<FocusEvent>();

  /**
   * OnDestroy handler emit
   */
  @Output() handleDestroy = new EventEmitter<void>();

  /**
   * Default Button size for classes
   */
  protected _size: string = 'medium';

  /**
   * Automatically sets icon color based on button variant
   */
  protected _iconColor = new BehaviorSubject<FudisIconColor>('white');

  /**
   * Is button focused or not
   */
  protected _focused: boolean = false;

  /**
   * Button CSS class list
   */
  protected _classList = new BehaviorSubject<string[]>([]);

  /**
   * Toggle dropdown menu button
   */
  public dropdownOpen = new BehaviorSubject<boolean>(false);

  /**
   * Id of child Dropdown Menu. Passed from child to parent Button.
   */
  public dropdownMenuId: string;

  ngOnInit() {
    if (this.id) {
      this._idService.addNewId('button', this.id);
    } else {
      this.id = this._idService.getNewId('button');
    }

    if (this._classList.value.length === 0) {
      this._classList.next(this._getClasses());
    }
  }

  ngOnChanges(changes: FudisComponentChanges<ButtonComponent | IconButtonComponent>): void {
    const variant = changes.variant?.currentValue !== changes.variant?.previousValue;
    const disabled = changes.disabled?.currentValue !== changes.disabled?.previousValue;
    const size = changes.size?.currentValue !== changes.size?.previousValue;

    if (variant || disabled || size) {
      this._classList.next(this._getClasses());
    }
  }

  ngOnDestroy(): void {
    this.handleDestroy.emit();
  }

  /**
   * Button click event
   */
  public buttonClick(event: Event): void {
    if (this.asMenuButton) {
      this.toggleMenu();
    }

    this.handleClick.emit(event);
  }

  /**
   * Toggling when Button is used as Menu Button
   */
  public toggleMenu(): void {
    const newState = !this.dropdownOpen.value;
    this.dropdownOpen.next(newState);

    this._dropdownEventService.triggerWidthCalculation();
  }

  /**
   * Close dropdown when Button is used as Menu Button
   */
  public closeMenu(focusToButton: boolean = true): void {
    this.dropdownOpen.next(false);

    if (!this._focused && focusToButton) {
      this.buttonEl.nativeElement.focus();
    }

    this._dropdownEventService.triggerWidthCalculation();
  }

  /**
   * Handle Escape key down for Menu Button
   */
  protected _handleMenuButtonKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.closeMenu();
    }
  }

  /**
   * Handler for blurring out and closing Menu Button's dropdown
   */
  protected _handleButtonBlur(event: FocusEvent): void {
    this._focused = false;

    const targetIsDropdownMenuOption = (event.relatedTarget as HTMLElement)?.classList?.contains(
      'fudis-dropdown-menu-item',
    );

    if (this.asMenuButton && !targetIsDropdownMenuOption) {
      this.dropdownOpen.next(false);
    }

    this.handleBlur.emit(event);
  }

  /**
   * Handle button focus
   */
  protected _handleButtonFocus(event: FocusEvent): void {
    this._focused = true;

    this.handleFocus.emit(event);
  }

  /**
   * Determine icon color based on button variant. Return CSS classes with size and variant
   */
  protected _getClasses(): string[] {
    if (this.disabled) {
      this._iconColor.next('gray-dark');
    } else if (this.variant === 'primary') {
      this._iconColor.next('white');
    } else if (this.variant === 'secondary' || this.variant === 'tertiary') {
      this._iconColor.next('primary');
    }

    return ['fudis-button', `fudis-button__size__${this._size}`, `fudis-button__${this.variant}`];
  }
}

export const BUTTON_TOKEN = new InjectionToken<ButtonBaseDirective>('BUTTON_TOKEN');
