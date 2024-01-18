import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  Signal,
  ViewChild,
  ViewEncapsulation,
  effect,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisSelectOption } from '../../../../../types/forms';

import { FudisTranslationConfig } from '../../../../../types/miscellaneous';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';

@Component({
  selector: 'fudis-select-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectAutocompleteComponent {
  constructor(protected _translationService: FudisTranslationService) {
    effect(() => {
      this._translationClearFilterText =
        _translationService.getTranslations()().SELECT.AUTOCOMPLETE.CLEAR;
    });
  }

  /**
   * Template reference for input. Used in e. g. initialFocus
   */
  @ViewChild('inputRef') inputRef: ElementRef;

  @HostBinding('class') classes = 'fudis-select-autocomplete-host';

  /**
   * Form control used mostly to define HTML attributes and CSS styles
   */
  @Input({ required: true }) control: FormControl<FudisSelectOption | FudisSelectOption[] | null>;

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
   * For single select label for input's value
   */
  @Input() selectedLabel: string;

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
   * Enable / disable autocomplete variant's Clear button. When 'false' autocomplete acts like a dropdown and opens on focus and hides 'Clear' icon button.
   */
  @Input() autocompleteClearButton: boolean = true;

  /**
   * Output event for input field blur
   */
  @Output() triggerBlur = new EventEmitter<FocusEvent>();

  /**
   * Output event for input field focus
   */
  @Output() triggerFocus = new EventEmitter<FocusEvent>();

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
   * Output event for updating parent's filter text signal
   */
  @Output() triggerFocusToFirstOption = new EventEmitter<void>();

  /**
   * Output event for clicking clear button
   */
  @Output() triggerClearFilterButtonClick = new EventEmitter<void>();

  /**
   * Output event for enter press on autocomplete, when there is only one option visible
   */
  @Output() triggerSelectOnlyVisibleOption = new EventEmitter<void>();

  /**
   * Used to prevent case when user selects an option from dropdown with Space key, which would add an extra space to filter text and "breaking" the selection.
   */
  public preventSpaceKeypress: boolean = false;

  /**
   * Info sent by the parent Select / Multiselect to define if only one option is visible.
   */
  public visibleOptionsLength: number = 0;

  /**
   * Input form field focus status
   */
  protected _focused: boolean = false;

  /**
   * Basic Fudis translation keys
   */
  protected _translations: Signal<FudisTranslationConfig>;

  /**
   * Translated aria-label for autocomplete close icon button which clears the input
   */
  protected _translationClearFilterText: string;

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
   * Blur event function for input form field blur
   * @param event FocusEvent
   */
  protected _inputFocus(event: FocusEvent): void {
    this._focused = true;
    this.triggerFocus.emit(event);
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
    } else {
      this.triggerFilterTextUpdate.emit(inputValue);
    }

    this.preventSpaceKeypress = false;

    if (this.dropdownOpen && this.visibleOptionsLength === 1 && key === 'Enter') {
      this.triggerSelectOnlyVisibleOption.emit();
    } else if (!this._preventDropdownReOpen && key === 'Enter') {
      this.triggerDropdownToggle.emit();
    } else if (key !== 'ArrowDown' && this.autocompleteClearButton && inputValue === '') {
      this.triggerDropdownClose.emit();
    } else if (
      !this._preventDropdownReOpen &&
      !this.dropdownOpen &&
      key !== 'Escape' &&
      key !== 'Enter'
    ) {
      this.triggerDropdownOpen.emit();
    } else if (key === 'ArrowDown' && this._focused) {
      event.preventDefault();
      this.triggerFocusToFirstOption.emit();
    }

    this._preventDropdownReOpen = false;
  }

  /**
   * Clear any written or selected value in the autocomplete field
   * @param resetControlValue reset or not control value, used with single selects
   */
  protected _clearAutocompleteFilterText(): void {
    if (this.autocompleteClearButton) {
      this._preventDropdownReOpen = true;
    }
    this.triggerFilterTextUpdate.emit('');

    (this.inputRef.nativeElement as HTMLInputElement).value = '';

    if (!this.multiselect) {
      this.triggerClearFilterButtonClick.emit();
    }

    this.inputRef.nativeElement.focus();
  }
}
