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
  selector: '[fudisSelectAutocomplete]',
})
export class SelectAutocompleteDirective implements OnChanges {
  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

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
   * Output event for updating parent's filter text signal
   */
  @Output() triggerFilterTextUpdate = new EventEmitter<string>();

  /**
   * Output event for opening parent dropdown
   */
  @Output() triggerDropdownOpen = new EventEmitter<void>();

  /**
   * Keyboard button pressed down
   */
  private _keyDown: string | null = null;

  private _inputText: string | null = null;

  private _focused: boolean;

  ngOnChanges(changes: FudisComponentChanges<SelectAutocompleteDirective>): void {
    if (this.enableAutocomplete) {
      const selectedLabel = changes.selectedLabel?.currentValue;

      if (selectedLabel && selectedLabel !== changes.selectedLabel?.previousValue) {
        this._inputText = selectedLabel;
        this.elementRef.nativeElement.value = selectedLabel;
      } else if (!this._focused) {
        this._inputText = '';
        this.elementRef.nativeElement.value = '';
      }
    }
  }

  @HostListener('focus', ['$event'])
  private _handleFocus() {
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
      if (this._keyDown === event.key) {
        const newValue = (event.target as HTMLInputElement).value;

        if (newValue !== this._inputText && newValue.length >= this.typeThreshold) {
          this._inputText = newValue;

          this.triggerFilterTextUpdate.emit(newValue);
          this.triggerDropdownOpen.emit();
        }
      }

      this._keyDown = null;
    }
  }
}
