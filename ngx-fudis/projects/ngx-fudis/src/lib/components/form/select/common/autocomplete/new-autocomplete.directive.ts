import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
  OnChanges,
  ElementRef,
} from '@angular/core';
import { FudisComponentChanges } from '../../../../../types/miscellaneous';

@Directive({
  selector: '[fudisSelectAutocompleteBase]',
})
export class SelectAutocompleteBaseDirective {
  constructor(protected _elementRef: ElementRef<HTMLInputElement>) {}

  @Input() selectedLabel: string | null;

  @Input() enableAutocomplete: boolean = false;

  /**
   * Determine how many characters must be typed for autocomplete to open available options
   */
  @Input({ required: true }) typeThreshold: 0 | 3;

  /**
   * Id of binded Select element
   */
  @Input() id: string;

  /**
   * To clear input field when Clear Button is clicked
   */
  @Input() clearButtonClick: boolean | null;

  /**
   * Output event for updating parent's filter text signal
   */
  @Output() triggerFilterTextUpdate = new EventEmitter<string>();

  /**
   * Output event for opening parent dropdown
   */
  @Output() triggerDropdownOpen = new EventEmitter<void>();

  /**
   * Output event for closing parent dropdown
   */
  @Output() triggerDropdownClose = new EventEmitter<void>();

  /**
   * Output event for closing parent dropdown
   */
  @Output() triggerClearButtonReset = new EventEmitter<void>();

  /**
   * Keyboard button pressed
   */
  private _keyDown: string | null;

  private _focusFromClearButton: boolean = false;

  private _inputText: string | null = null;

  protected _focused: boolean = false;

  @HostListener('focus', ['$event'])
  private _handleFocus(event: FocusEvent) {
    this._focused = true;

    if ((event.relatedTarget as HTMLElement)?.getAttribute('id') === `${this.id}-clear-button`) {
      this._focusFromClearButton = true;
    }
  }

  @HostListener('blur', ['$event'])
  private _handleBlur() {
    this._focused = false;
  }

  @HostListener('keydown', ['$event'])
  private _handleKeyDown(event: KeyboardEvent) {
    if (event.target) {
      this._keyDown = event.key;
    }
  }

  @HostListener('keyup', ['$event'])
  private _handleKeyUp(event: KeyboardEvent) {
    if (this.enableAutocomplete) {
      if (this._keyDown) {
        const newValue = (event.target as HTMLInputElement).value;

        if (newValue !== this._inputText) {
          this._inputText = newValue;

          if (newValue.length >= this.typeThreshold) {
            this.triggerFilterTextUpdate.emit(newValue);
            this.triggerDropdownOpen.emit();
          } else {
            this.triggerFilterTextUpdate.emit('');
            this.triggerDropdownClose.emit();
          }
        }
      } else if (
        this._focused &&
        this._focusFromClearButton &&
        (event.key === 'Enter' || event.key === ' ')
      ) {
        this._elementRef.nativeElement.value = '';
        this.triggerFilterTextUpdate.emit('');
        if (this.typeThreshold === 0) {
          this.triggerDropdownOpen.emit();
        } else {
          this.triggerDropdownClose.emit();
        }
      }
      this._focusFromClearButton = false;
      this._keyDown = null;
    }
  }
}

@Directive({
  selector: '[fudisSelectAutocomplete]',
})
export class SelectAutocompleteDirective
  extends SelectAutocompleteBaseDirective
  implements OnChanges
{
  constructor(_elementRef: ElementRef<HTMLInputElement>) {
    super(_elementRef);
  }
  ngOnChanges(changes: FudisComponentChanges<SelectAutocompleteDirective>): void {
    if (this.enableAutocomplete) {
      const selectedLabel = changes.selectedLabel?.currentValue;
      const clearButtonClick = changes.clearButtonClick?.currentValue;

      if (clearButtonClick && clearButtonClick !== changes.clearButtonClick?.previousValue) {
        // Clear Button click
        this._elementRef.nativeElement.value = '';
        this.triggerClearButtonReset.emit();
      } else if (
        // Selected label is proper value
        selectedLabel &&
        changes.selectedLabel?.currentValue !== changes.selectedLabel?.previousValue
      ) {
        this._elementRef.nativeElement.value = selectedLabel;
      } else if (changes.selectedLabel && !selectedLabel && !this._focused) {
        // Selected label is null, but focus is not on input
        this._elementRef.nativeElement.value = '';
      }
    }
  }
}

@Directive({
  selector: '[fudisMultiselectAutocomplete]',
})
export class MultiselectAutocompleteDirective
  extends SelectAutocompleteBaseDirective
  implements OnChanges
{
  constructor(_elementRef: ElementRef<HTMLInputElement>) {
    super(_elementRef);
  }
  ngOnChanges(changes: FudisComponentChanges<SelectAutocompleteDirective>): void {
    if (this.enableAutocomplete) {
      if (
        changes.clearButtonClick?.currentValue &&
        changes.clearButtonClick?.currentValue !== changes.clearButtonClick?.previousValue
      ) {
        // Clear Button click
        this._elementRef.nativeElement.value = '';
        this.triggerClearButtonReset.emit();
      }
    }
  }
}
