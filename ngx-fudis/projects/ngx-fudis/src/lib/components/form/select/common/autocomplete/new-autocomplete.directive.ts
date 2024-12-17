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
export class SelectAutocompleteBaseDirective implements OnChanges {
  constructor(private _elementRef: ElementRef<HTMLInputElement>) {}

  @Input() selectedLabel: string | null;

  @Input() enableAutocomplete: boolean = false;

  /**
   * Determine how many characters must be typed for autocomplete to open available options
   */
  @Input({ required: true }) typeThreshold: 0 | 3;

  /**
   * List of visible options
   */
  @Input() visibleOptions: number | null;

  /**
   * Id of binded Select element
   */
  @Input() id: string;

  /**
   * To clear input field when Clear Button is clicked
   */
  @Input() clearButtonClick: void | null;

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
   * Keyboard button pressed down
   */
  private _keyDown: string | null = null;

  private _inputText: string | null = null;

  private _focused: boolean = false;

  private _tempSelectedLabel: string | null;

  ngOnChanges(changes: FudisComponentChanges<SelectAutocompleteDirective>): void {
    if (this.enableAutocomplete) {
      const selectedLabel = changes.selectedLabel?.currentValue;

      console.log(changes);

      if (changes.clearButtonClick && changes.clearButtonClick?.currentValue !== null) {
        // Clear Button click
        console.log('täällä');

        this._elementRef.nativeElement.value = '';
      } else if (
        selectedLabel &&
        changes.selectedLabel?.currentValue !== changes.selectedLabel?.previousValue
      ) {
        // Selected label is proper value
        console.log('toka if');
        this._elementRef.nativeElement.value = selectedLabel;
      } else if (changes.selectedLabel && !selectedLabel && !this._focused) {
        // Selected label is null, but focus is not on input
        console.log('kolmas if');

        this._elementRef.nativeElement.value = '';
      }
    }
  }

  @HostListener('focus', ['$event'])
  private _handleFocus(event: FocusEvent) {
    if ((event.relatedTarget as HTMLElement)?.getAttribute('id') === this.id + '-clear-button') {
      this._tempSelectedLabel = this.selectedLabel;
    }

    this._focused = true;
  }

  @HostListener('blur', ['$event'])
  private _handleBlur() {
    this._focused = false;
  }

  @HostListener('keydown', ['$event'])
  private _handleKeyDown(event: KeyboardEvent) {
    this._keyDown = event.key;
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
      }

      this._keyDown = null;
    }
  }
}

@Directive({
  selector: '[fudisSelectAutocomplete]',
})
export class SelectAutocompleteDirective extends SelectAutocompleteBaseDirective {
  constructor(_elementRef: ElementRef<HTMLInputElement>) {
    super(_elementRef);
  }
}

@Directive({
  selector: '[fudisMultiselectAutocomplete]',
})
export class MultiselectAutocompleteDirective extends SelectAutocompleteBaseDirective {
  constructor(_elementRef: ElementRef<HTMLInputElement>) {
    super(_elementRef);
  }
}
