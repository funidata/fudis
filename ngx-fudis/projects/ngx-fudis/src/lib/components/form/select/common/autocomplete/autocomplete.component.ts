import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Signal,
  ViewChild,
  ChangeDetectionStrategy,
  OnChanges,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { FudisComponentChanges, FudisTranslationConfig } from '../../../../../types/miscellaneous';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fudis-select-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectAutocompleteComponent implements OnChanges, OnInit {
  constructor() {
    this._autocompleteControl.valueChanges.pipe(takeUntilDestroyed()).subscribe((newValue) => {
      this._checkValueAndEmit(newValue);
    });
  }

  /**
   * Template reference for input. Used in e. g. initialFocus
   */
  @ViewChild('inputRef') public inputRef: ElementRef<HTMLInputElement>;

  /**
   * Id for autocomplete input form field
   */
  @Input({ required: true }) id: string;

  /**
   * Set input fields required attribute
   */
  @Input() required: boolean | null;

  /**
   * If parent's dropdown is open or not
   */
  @Input() dropdownOpen: boolean = false;

  /**
   * For single select label when control has value on init
   */
  @Input() selectedLabel: string | null;

  /**
   * Manually set input as invalid
   */
  @Input() invalidState: boolean = false;

  /**
   * If autocomplete is used with multiselect
   */
  @Input() multiselect: boolean = false;

  /**
   * Placeholder text when there's no filter text
   */
  @Input() placeholder: string;

  /**
   * To disable the input.
   */
  @Input() disabled: boolean = false;

  /**
   * Enable / disable autocomplete variant's Clear button. When 'false' autocomplete acts like a dropdown and opens on focus and hides 'Clear' icon button.
   */
  @Input() selectionClearButton: boolean = true;

  /**
   * Determine how many characters must be typed for autocomplete to open available options
   */
  @Input({ required: true }) typeThreshold: 0 | 3;

  /**
   * List of visible options
   */
  @Input() visibleOptions: string[] = [];

  /**
   * Output event for input field blur
   */
  @Output() triggerBlur = new EventEmitter<FocusEvent>();

  /**
   * Output event for input field focus
   */
  @Output() triggerFocus = new EventEmitter<FocusEvent>();

  /**
   * Output event for enter press on autocomplete, when there is only one option visible
   */
  @Output() triggerInputClick = new EventEmitter<Event>();

  /**
   * Output event for toggling parent dropdown
   */
  @Output() triggerDropdownToggle = new EventEmitter<void>();

  /**
   * Output event for closing parent dropdown
   */
  @Output() triggerDropdownClose = new EventEmitter<void>();

  /**
   * Output event for opening parent dropdown
   */
  @Output() triggerDropdownOpen = new EventEmitter<void>();

  /**
   * Output event for updating parent's filter text signal
   */
  @Output() triggerFilterTextUpdate = new EventEmitter<string>();

  /**
   * Output event for updating parent's focus to first option signal
   */
  @Output() triggerFocusToFirstOption = new EventEmitter<void>();

  /**
   * Output event for enter press on autocomplete, when there is only one option visible
   */
  @Output() triggerSelectOnlyVisibleOption = new EventEmitter<void>();

  /**
   * Used to prevent case when user selects an option from dropdown with Space key, which would add an extra space to filter text and "breaking" the selection.
   */
  public preventSpaceKeypress: boolean = false;

  /**
   * Input form field focus status
   */
  protected _focused: boolean = false;

  /**
   * Basic Fudis translation keys
   */
  protected _translations: Signal<FudisTranslationConfig>;

  /**
   * Internal FormControl to manage typed filter text
   */
  protected _autocompleteControl: FormControl<string | null> = new FormControl<string | null>('');

  /**
   * Prevent dropdown reopen on focus
   */
  private _preventDropdownReOpen: boolean = false;

  /**
   * To check if keydown event originated from input element and not e. g. clear button
   */
  private _keyDownFromInput: boolean = false;

  ngOnInit(): void {
    if (!this.multiselect && this.selectedLabel) {
      this.updateInputValue(this.selectedLabel);
    }
  }

  ngOnChanges(changes: FudisComponentChanges<SelectAutocompleteComponent>): void {
    if (changes.disabled?.currentValue !== changes.disabled?.previousValue) {
      if (this.disabled && this.selectedLabel) {
        this.updateInputValue(this.selectedLabel);
      } else if (!changes.disabled?.firstChange) {
        this.updateInputValue('');
      }
    }
  }

  /**
   * To update Autocomplete's internal control value
   * @param newValue
   */
  public updateInputValue(newValue: string): void {
    this._autocompleteControl.patchValue(newValue);
  }

  /**
   * Check if new value is longer than threshold and emit
   * @param newValue Value to update
   */
  private _checkValueAndEmit(newValue: string | null): void {
    if (newValue && newValue.length >= this.typeThreshold) {
      this.triggerFilterTextUpdate.emit(newValue);
    } else {
      this.triggerFilterTextUpdate.emit('');
    }

    if (
      this.dropdownOpen &&
      ((!newValue && this.typeThreshold !== 0) ||
        (newValue && newValue?.length < this.typeThreshold))
    ) {
      this.triggerDropdownClose.emit();
    }
  }

  /**
   * Blur event function for input form field blur
   * @param event FocusEvent
   */
  protected _inputBlur(event: FocusEvent): void {
    this._focused = false;
    this.triggerBlur.emit(event);
  }

  /**
   * Focus event function for input form field focus
   * @param event FocusEvent
   */
  protected _inputFocus(event: FocusEvent): void {
    this._focused = true;
    this.triggerFocus.emit(event);
    const inputValue = (event.target as HTMLInputElement).value;

    this._checkValueAndEmit(inputValue);
  }

  /**
   * To handle click events for input
   * @param event click event
   */
  protected _inputClick(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;

    if (inputValue.length >= this.typeThreshold) {
      this.triggerInputClick.emit(event);
    }
  }

  /**
   * Keypress handler to prevent selection exception case with space key press. Can happen if user press Space on selection or Clear button, which moves focus back to Autocomplete input
   * @param event KeyboardEvent
   */
  protected _keyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      this._keyDownFromInput = true;
    }
  }

  /**
   * Keypress handler to prevent selection exception case with space key press. Can happen if user press Space on selection or Clear button, which moves focus back to Autocomplete input
   * @param event KeyboardEvent
   */
  protected _keyPress(): void {
    this._keyDownFromInput = true;
  }

  /**
   * Key up handler function which emits outputs to parent Select / Multiselect
   * @param event KeyboardEvent
   */
  protected _keyUp(event: KeyboardEvent): void {
    const { key } = event;
    const inputValue = (event.target as HTMLInputElement).value;

    this.preventSpaceKeypress = false;

    if (this._keyDownFromInput && this._focused) {
      this._keyDownFromInput = false;

      /**
       * Enter key
       */
      if (key === 'Enter') {
        if (this.dropdownOpen && this.visibleOptions?.length === 1 && !!inputValue) {
          this.triggerSelectOnlyVisibleOption.emit();
        } else if (!this._preventDropdownReOpen && inputValue.length >= this.typeThreshold) {
          this.triggerDropdownToggle.emit();
        }
        /**
         * Escape key
         */
      } else if (key === 'Escape') {
        if (this.dropdownOpen) {
          this.triggerDropdownClose.emit();
        }
        /**
         * ArrowDown key
         */
      } else if (key === 'ArrowDown') {
        event.preventDefault();
        if (inputValue.length >= this.typeThreshold) {
          this.triggerDropdownOpen.emit();
          this.triggerFocusToFirstOption.emit();
        }

        /**
         * Close
         */
      } else if (this.dropdownOpen && inputValue.length < this.typeThreshold) {
        this.triggerDropdownClose.emit();

        /**
         * Open
         */
      } else if (
        !this.dropdownOpen &&
        !this._preventDropdownReOpen &&
        inputValue.length >= this.typeThreshold
      ) {
        this.triggerDropdownOpen.emit();
      }
    }

    this._preventDropdownReOpen = false;
  }
}
