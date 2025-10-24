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
@Directive({
  selector: '[fudisButtonBase]',
  standalone: false,
})
export class ButtonBaseDirective
  extends PopoverApiDirective
  implements OnInit, OnDestroy, OnChanges
{
  constructor(protected _idService: FudisIdService) {
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
   * Disables the button, keeping it focusable
   */
  @Input() disabled = false;

  /**
   * Button size
   */
  @Input() size: FudisButtonSize = 'medium';

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
