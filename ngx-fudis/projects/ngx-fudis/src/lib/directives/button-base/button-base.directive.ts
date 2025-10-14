import { Directive, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FudisIcon, FudisIconColor, FudisIconRotate } from '../../types/icons';
import { FudisButtonSize, FudisButtonVariant } from '../../types/miscellaneous';
import { BehaviorSubject } from 'rxjs';
import { PopoverApiDirective } from '../popover/popover-api.directive';
import { FudisIdService } from '../../services/id/id.service';

@Directive({
  selector: '[fudisButtonBase]',
  standalone: false,
})
export class ButtonBaseDirective extends PopoverApiDirective implements OnInit, OnDestroy {
    constructor(
    protected _idService: FudisIdService,
  ) {
    super();
  }
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
   * Button size options
   */
  @Input() size: FudisButtonSize = 'medium';
  
  /**
   * Button variant options
   */
  @Input() variant: FudisButtonVariant = 'primary';

  /**
   * Disables the button, keeping it focusable
   */
  @Input() disabled = false;

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
   * Automatically sets icon color based on button variant
   */
  protected _iconColor = new BehaviorSubject<FudisIconColor>('white');

  /**
   * Is button focused or not
   */
  protected _focused: boolean = false;

  ngOnInit() {
    if (this.id) {
      this._idService.addNewId('button', this.id);
    } else {
      this.id = this._idService.getNewId('button');
    }
  }

  ngOnDestroy(): void {
    this.handleDestroy.emit();
  }

  /**
   * Button click event
   */
  public buttonClick(event: Event): void {
    this.handleClick.emit(event);
  }

    /**
   * Handler for blurring out and closing Menu Button's dropdown
   */
  protected _handleButtonBlur(event: FocusEvent): void {
    this._focused = false;

    this.handleBlur.emit(event);
  }


  /**
   * Handle button focus
   */
  protected _handleButtonFocus(event: FocusEvent): void {
    this._focused = true;

    this.handleFocus.emit(event);
  }
}
