import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { FudisIcon, FudisIconColor, FudisIconRotate } from '../../types/icons';
import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';
import { FudisIdService } from '../../services/id/id.service';
import { FudisButtonSize, FudisButtonType, FudisButtonVariant, FudisComponentChanges } from '../../types/miscellaneous';
import { BehaviorSubject } from 'rxjs';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'fudis-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends TooltipApiDirective implements OnChanges, OnInit, OnDestroy {
  constructor(private _idService: FudisIdService) {
    super();

    this._id = _idService.getNewId('button');
  }

  /**
   * Binding host CSS class to component wrapper
   */
  @HostBinding('class') private _classes = 'fudis-button-host';

  /**
   * Reference to native button element
   */
  @ViewChild('buttonElement') public buttonEl: ElementRef<HTMLButtonElement>;

  /**
   * Text content of the button
   */
  @Input({ required: true }) label: string;

  /**
   * Button variant options
   */
  @Input() variant: FudisButtonVariant = 'primary';

  /**
   * Button size options
   */
  @Input() size: FudisButtonSize = 'medium';

  /**
   * Button type options
   */
  @Input() type: FudisButtonType = 'button';

  /**
   * Hide visible label text for icon-only buttons.
   */
  @Input() labelHidden: boolean = false;

  /**
   * Additional aria-label for describing context
   */
  @Input() ariaLabel: string;

  /**
   * Disables the button, keeping it focusable
   */
  @Input() disabled = false;

  /**
   * Icon for button if needed
   */
  @Input() icon: FudisIcon | undefined = undefined;

  /**
   * Icon rotation option
   */
  @Input() iconRotate: FudisIconRotate = 'none';

  /**
   * Assign button as menu button with dropdown
   */
  @Input() asMenuButton: boolean = false;

  /**
   * Click handler
   */
  @Output() handleClick = new EventEmitter<Event>();

  // TODO: write test
  /**
   * Focus handler
   */
  @Output() handleFocus = new EventEmitter<FocusEvent>();

  // TODO: write test
  /**
   * Blur handler
   */
  @Output() handleBlur = new EventEmitter<FocusEvent>();

  // TODO: write test
  /**
   * onDestroy handler emit
   */
  @Output() handleDestroy = new EventEmitter<void>();

  /**
   * Toggle dropdown menu button
   */
  public dropdownOpen = new BehaviorSubject<boolean>(false);

  /**
   * Id of child Dropdown Menu. Passed from child to parent Button.
   */
  public dropdownMenuId: string;

  /**
   * Automatically sets icon color based on button variant
   */
  protected _iconColor = new BehaviorSubject<FudisIconColor>('white');

  /**
   * Button CSS class list
   */
  protected _classList = new BehaviorSubject<string[]>([]);

  /**
   * Aria-label for icon-only buttons
   */
  protected _ariaLabel = new BehaviorSubject<string>('');

  /**
   * Id generated with FudisIdService
   */
  protected _id: string;

  /**
   * Is button focused or not
   */
  private _focused: boolean = false;

  ngOnInit() {
    if (this._classList.value.length === 0) {
      this._classList.next(this._getClasses());
    }
  }

  ngOnChanges(changes: FudisComponentChanges<ButtonComponent>): void {
    const variant = changes.variant?.currentValue !== changes.variant?.previousValue;

    const disabled = changes.disabled?.currentValue !== changes.disabled?.previousValue;

    const size = changes.size?.currentValue !== changes.size?.previousValue;

    const label = changes.label?.currentValue !== changes.label?.previousValue;

    const labelHidden = changes.labelHidden?.currentValue !== changes.labelHidden?.previousValue;

    const ariaLabel = changes.ariaLabel?.currentValue !== changes.ariaLabel?.previousValue;

    if (variant || disabled || size) {
      this._classList.next(this._getClasses());
    }

    if (size || labelHidden || label || ariaLabel) {
      this._ariaLabel.next(this._getAriaLabel());
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
    // Safari issue: button click does not trigger visible focus by default
    // This line is to ensure that Safari users also see visible focus when mouse clicking a button
    // If button does not have focus it will never trigger blur event
    this.buttonEl.nativeElement.focus();

    this.handleClick.emit(event);
  }

  /**
   * Toggling when Button is used as Menu Button
   */
  public toggleMenu(): void {
    const newState = !this.dropdownOpen.value;
    this.dropdownOpen.next(newState);

    DropdownMenuComponent.fireMaxWidthCalcEvent.next(true);
  }

  /**
   * Close dropdown when Button is used as Menu Button
   */
  public closeMenu(focusToButton: boolean = true): void {
    this.dropdownOpen.next(false);

    if (!this._focused && focusToButton) {
      this.buttonEl.nativeElement.focus();
    }

    DropdownMenuComponent.fireMaxWidthCalcEvent.next(true);
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
   * Add aria-label for buttons without visible label
   */
  private _getAriaLabel(): string {
    if (this.labelHidden || this.size === 'icon-only') {
      return this.ariaLabel ? `${this.label} ${this.ariaLabel}` : this.label;
    }
    return this.ariaLabel;
  }

  /**
   * Determine icon color based on button variant. Return CSS classes with size and variant
   */
  private _getClasses(): string[] {
    if (this.disabled) {
      this._iconColor.next('gray-dark');
    } else if (this.variant === 'primary') {
      this._iconColor.next('white');
    } else if (this.variant === 'secondary' || this.variant === 'tertiary') {
      this._iconColor.next('primary');
    }

    return ['fudis-button', `fudis-button__size-${this.size}`, `fudis-button__${this.variant}`];
  }
}
