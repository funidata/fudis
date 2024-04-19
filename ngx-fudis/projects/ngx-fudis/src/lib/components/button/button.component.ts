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
} from '@angular/core';
import { FudisIcon, FudisIconColor, FudisIconRotate } from '../../types/icons';
import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';
import { FudisIdService } from '../../services/id/id.service';
import { FudisComponentChanges } from '../../types/miscellaneous';

@Component({
  selector: 'fudis-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends TooltipApiDirective implements OnChanges, OnInit {
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
  @Input() variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

  /**
   * Button size options
   */
  @Input() size: 'icon-only' | 'small' | 'medium' = 'medium';

  /**
   * Button type options
   */
  @Input() type: 'button' | 'submit' = 'button';

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
   * TODO: Enable when Dropdown Menu is re-enabled
   * Assign button as menu button with dropdown
   * @Input() asMenuButton: boolean = false;
   */

  /**
   * Optional click handler
   */
  @Output() handleClick = new EventEmitter<Event>();

  /**
   * Toggle menu button
   *   public dropdownOpen: boolean = false;
   */

  /**
   * Id of child Dropdown Menu. Passed from child to parent Button.
   *
   *   public dropdownMenuId: string;
   */

  /**
   * Automatically sets icon color based on button variant
   */
  protected _iconColor: FudisIconColor = 'white';

  /**
   * Button CSS class list
   */
  protected _classList: string[] = [];

  /**
   * Aria-label for icon-only buttons
   */
  protected _ariaLabel: string = '';

  /**
   * Id generated with FudisIdService
   */
  protected _id: string;

  /**
   * To prevent ngOnChanges running before initial ngOnInit
   */
  private _initFinished: boolean = false;

  ngOnInit() {
    this._classList = this._getClasses();
    this._ariaLabel = this._getAriaLabel();

    this._initFinished = true;
  }

  ngOnChanges(changes: FudisComponentChanges<ButtonComponent>): void {
    if (this._initFinished) {
      if (changes.variant || changes.disabled || changes.size || changes.disabled) {
        this._classList = this._getClasses();
      }

      if (changes.size || changes.labelHidden || changes.label) {
        this._ariaLabel = this._getAriaLabel();
      }
    }
  }

  /**
   * Button click event
   */
  public buttonClick(event: Event): void {
    // if (this.asMenuButton) {
    //   this.toggleMenu();
    // }
    this.handleClick.emit(event);
  }

  /**
   * Toggling when Button is used as Menu Button
   * public toggleMenu(): void {
   *  this.dropdownOpen = !this.dropdownOpen;
   * }
   *
   */

  /**
   * Open when Button is used as Menu Button
   * public openMenu(): void {
   *  this.dropdownOpen = true;
   * }
   */

  /**
   * Close when Button is used as Menu Button
   * public closeMenu(): void {
   *  this.dropdownOpen = false;
   * }
   */

  /**
   * Handler for blurring out and closing Menu Button dropdown
   */
  public handleBlur(event: FocusEvent): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const targetIsDropdownMenuButton = (event.relatedTarget as HTMLElement)?.classList?.contains(
      'fudis-dropdown-menu-item',
    );

    // if (this.asMenuButton && !targetIsDropdownMenuButton) {
    //   this.dropdownOpen = false;
    // }
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
      this._iconColor = 'gray-dark';
    } else if (this.variant === 'primary') {
      this._iconColor = 'white';
    } else if (this.variant === 'secondary' || this.variant === 'tertiary') {
      this._iconColor = 'primary';
    }

    return ['fudis-button', `fudis-button__size-${this.size}`, `fudis-button__${this.variant}`];
  }
}
