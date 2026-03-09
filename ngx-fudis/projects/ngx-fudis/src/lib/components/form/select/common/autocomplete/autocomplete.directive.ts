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
  standalone: false,
})
export class SelectAutocompleteBaseDirective {
  constructor(protected _elementRef: ElementRef<HTMLInputElement>) {}

  /**
   * To enable autocomplete
   */
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
  @Output() handleFilterTextUpdate = new EventEmitter<string>();

  /**
   * Output event for opening parent dropdown
   */
  @Output() handleDropdownOpen = new EventEmitter<void>();

  /**
   * Output event for closing parent dropdown
   */
  @Output() handleDropdownClose = new EventEmitter<void>();

  /**
   * Output event for closing parent dropdown
   */
  @Output() handleClearButtonReset = new EventEmitter<void>();

  /**
   * Output event for input focus
   */
  @Output() handleFocus = new EventEmitter<{ event: FocusEvent; focusFromClearButton: boolean }>();

  /**
   * Output event for input blur
   */
  @Output() handleBlur = new EventEmitter<FocusEvent>();

  /**
   * Keyboard button pressed
   */
  private _keyDown: string | null;

  /**
   * If Focus came from related clear button
   */
  private _focusFromClearButton: boolean = false;

  /**
   * Currently typed input text
   */
  private _inputText: string = '';

  /**
   * If input is focused or not
   */
  protected _focused: boolean = false;

  @HostListener('focus', ['$event'])
  protected _handleFocus(event: FocusEvent) {
    this._focused = true;

    if ((event.relatedTarget as HTMLElement)?.getAttribute('id') === `${this.id}-clear-button`) {
      this._focusFromClearButton = true;
    }
    this.handleFocus.emit({ event: event, focusFromClearButton: this._focusFromClearButton });
  }

  @HostListener('blur', ['$event'])
  protected _handleBlur(event: FocusEvent) {
    this._focused = false;
    this.handleBlur.emit(event);
  }

  @HostListener('keydown', ['$event'])
  protected _handleKeyDown(event: KeyboardEvent) {
    if (event.target) {
      this._keyDown = event.key;
    }
  }

  @HostListener('keyup', ['$event'])
  protected _handleKeyUp(event: KeyboardEvent) {
    if (this.enableAutocomplete) {
      if (this._keyDown) {
        const newValue = (event.target as HTMLInputElement).value;

        if (newValue !== this._inputText) {
          this._inputText = newValue;

          if (newValue.length >= this.typeThreshold) {
            this.handleFilterTextUpdate.emit(newValue);
            this.handleDropdownOpen.emit();
          } else {
            this.handleDropdownClose.emit();
            this.handleFilterTextUpdate.emit('');
          }
        }
      } else if (
        this._focused &&
        this._focusFromClearButton &&
        (event.key === 'Enter' || event.key === ' ')
      ) {
        this._elementRef.nativeElement.value = '';
        this.handleFilterTextUpdate.emit('');
        if (this.typeThreshold === 0) {
          this.handleDropdownOpen.emit();
        } else {
          this.handleDropdownClose.emit();
        }
      }
      this._focusFromClearButton = false;
      this._keyDown = null;
    }
  }
}

@Directive({
  selector: '[fudisSelectAutocomplete]',
  standalone: false,
})
export class SelectAutocompleteDirective
  extends SelectAutocompleteBaseDirective
  implements OnChanges
{
  constructor(_elementRef: ElementRef<HTMLInputElement>) {
    super(_elementRef);
  }

  /**
   * Currently selected visible label
   */
  @Input() selectedLabel: string | null;

  ngOnChanges(changes: FudisComponentChanges<SelectAutocompleteDirective>): void {
    if (this.enableAutocomplete) {
      const selectedLabel = changes.selectedLabel?.currentValue;
      const clearButtonClick = changes.clearButtonClick?.currentValue;

      if (clearButtonClick && clearButtonClick !== changes.clearButtonClick?.previousValue) {
        // Clear Button click
        this._elementRef.nativeElement.value = '';
        this.handleClearButtonReset.emit();
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
  standalone: false,
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
        this.handleClearButtonReset.emit();
      }
    }
  }
}
