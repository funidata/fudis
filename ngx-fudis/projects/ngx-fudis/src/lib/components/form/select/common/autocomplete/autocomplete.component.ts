import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisSelectOption } from '../../../../../types/forms';

import { FudisTranslationConfig } from '../../../../../types/miscellaneous';

@Component({
  selector: 'fudis-select-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectAutocompleteComponent {
  /**
   * Template reference for input. Used in e. g. initialFocus
   */
  @ViewChild('inputRef') public inputRef: ElementRef<HTMLInputElement>;

  /**
   * Form control used mostly to define HTML attributes and CSS styles
   */
  @Input({ required: true }) control: FormControl<
    FudisSelectOption<object> | FudisSelectOption<object>[] | null
  >;

  /**
   * Set input fields required attribute
   */
  @Input({ required: true }) required: boolean;

  /**
   * Id for autocomplete input form field
   */
  @Input({ required: true }) id: string;

  /**
   * If parent's dropdown is open or not
   */
  @Input({ required: true }) dropdownOpen: boolean = false;

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

  @Input() visibleOptions: string[];

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
   * Prevent dropdown reopen on focus
   */
  private _preventDropdownReOpen: boolean = false;

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

    if (inputValue.length >= this.typeThreshold) {
      this.triggerFilterTextUpdate.emit(inputValue);
    }
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
   * Keypress handler to prevent selection exception case with space key press
   * @param event KeyboardEvent
   */
  protected _keyPress(event: KeyboardEvent): void {
    if (this.preventSpaceKeypress && event.key === ' ' && this.control.value) {
      event.preventDefault();
    }
  }

  /**
   * Key up handler function which emits outputs to parent Select / Multiselect
   * @param event KeyboardEvent
   */
  protected _keyUp(event: KeyboardEvent): void {
    const { key } = event;
    const inputValue = (event.target as HTMLInputElement).value;

    if (this.preventSpaceKeypress && key === ' ' && this.control.value) {
      event.preventDefault();
    } else if (
      key !== 'ArrowDown' &&
      key !== 'ArrowUp' &&
      key !== 'ArrowLeft' &&
      key !== 'ArrowRight'
    ) {
      if (inputValue.length >= this.typeThreshold) {
        this.triggerFilterTextUpdate.emit(inputValue);
      } else {
        this.triggerFilterTextUpdate.emit('');
      }
    }

    this.preventSpaceKeypress = false;

    // TODO: check this through
    if (this.dropdownOpen && this.visibleOptions?.length === 1 && key === 'Enter' && !!inputValue) {
      this.triggerSelectOnlyVisibleOption.emit();
    } else if (
      !this._preventDropdownReOpen &&
      key === 'Enter' &&
      inputValue.length >= this.typeThreshold
    ) {
      this.triggerDropdownToggle.emit();
    } else if (
      key !== 'ArrowDown' &&
      this.selectionClearButton &&
      inputValue.length < this.typeThreshold
    ) {
      this.triggerDropdownClose.emit();
    } else if (
      !this._preventDropdownReOpen &&
      !this.dropdownOpen &&
      key !== 'Escape' &&
      key !== 'Enter' &&
      inputValue.length >= this.typeThreshold
    ) {
      this.triggerDropdownOpen.emit();
    } else if (key === 'ArrowDown' && this._focused) {
      event.preventDefault();
      this.triggerFocusToFirstOption.emit();
    }

    this._preventDropdownReOpen = false;
  }
}
