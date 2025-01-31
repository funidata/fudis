import {
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnChanges,
  Output,
  Signal,
  ViewChild,
  WritableSignal,
  signal,
  AfterViewInit,
} from '@angular/core';

import { FudisIdService } from '../../../../../services/id/id.service';
import { FudisFocusService } from '../../../../../services/focus/focus.service';
import { FudisInputSize, FudisSelectVariant } from '../../../../../types/forms';
import { setVisibleOptionsList } from '../utilities/selectUtilities';
import { SelectDropdownComponent } from '../select-dropdown/select-dropdown.component';

import { FudisComponentChanges } from '../../../../../types/miscellaneous';
import { SelectComponent } from '../../select/select.component';
import { MultiselectComponent } from '../../multiselect/multiselect.component';
import { FudisValidatorUtilities } from '../../../../../utilities/form/validator-utilities';
import { DOCUMENT } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlComponentBaseDirective } from '../../../../../directives/form/control-component-base/control-component-base.directive';
import { SelectOptionsDirective } from '../select-options-directive/select-options.directive';

@Directive({
  selector: '[fudisSelectBase]',
})
export class SelectBaseDirective
  extends ControlComponentBaseDirective
  implements OnChanges, AfterViewInit
{
  constructor(
    @Inject(DOCUMENT) protected _document: Document,
    _focusService: FudisFocusService,
    _idService: FudisIdService,
  ) {
    super(_idService, _focusService);

    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.control) {
        this._required.next(FudisValidatorUtilities.required(this.control));
      }
    });
  }

  /**
   * Reference to child DropdownComponent listing all options
   */
  @ViewChild('dropdownRef') protected _dropdownRef: SelectDropdownComponent;

  /**
   * Reference to autocomplete element, used to focus to it
   */
  @ViewChild('selectIconsRef') protected _selectIconsRef: ElementRef<HTMLDivElement>;

  /**
   * To lazy load options on first open
   */
  @ContentChild(SelectOptionsDirective) protected _selectOptionsDirective: SelectOptionsDirective;

  /**
   * Reference to child DropdownComponent listing all options
   */
  @ViewChild('selectRef') private _selectRef: ElementRef<HTMLDivElement>;

  /**
   * Set dropdown size (should follow the given input element size)
   */
  @Input() size: FudisInputSize | 'xs' = 'lg';

  /**
   * Placeholder text for the dropdown input when no selection has been made
   */
  @Input() placeholder: string;

  /**
   * Determine if Select has autocompletion filter for user typed text
   * When set to:
   * "dropdown": default, normal select dropdown
   * "autocompleteDropdown": dropdown with autocomplete input field
   * "autocompleteType": autocomplete but user must type 3 letters before any results are displayed
   */
  @Input() variant: FudisSelectVariant = 'dropdown';

  /**
   * Enable / disable button, which clears user selection when there is a selected value
   */
  @Input() selectionClearButton: boolean = true;

  /**
   * By default Autocomplete filters options loaded to the DOM based on user input. When this is set to 'false', filtering is disabled and all options available in DOM are displayed regardless of user's input. Disabling can be useful, if application wants to implement their own filtering logic. E. g. get user's input, run a backend search and create list of options for the Select.
   */
  @Input() autocompleteFilter: boolean = true;

  /**
   * For Autocomplete variants optional helper text displayed as first item in opened dropdown list. By default uses internal Fudis translation, which can be disabled by setting this property to boolean 'false'
   */
  @Input() autocompleteHelpText: string | false;

  /**
   * By default, Autocomplete variant will display "No results found" text when there are 0 options matching. When combined with 'autocompleteFilter' false, application can set their own 'Fetching options...' etc. text while their own filtering is in progress.
   */
  @Input() autocompleteNoResultsText: string | null = null;

  /**
   * Value output event on selection change
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() selectionUpdate: EventEmitter<any | null> = new EventEmitter<any | null>();

  /**
   * Output for number of visible options after filtering results
   */
  @Output() visibleOptionsUpdate: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Output for number of visible options after filtering results
   */
  @Output() filterTextUpdate: EventEmitter<string | null> = new EventEmitter<string | null>();

  /**
   * CSS selector for querying focus states
   */
  public focusSelector: string = ".fudis-select-option__focusable:not([aria-disabled='true'])";

  /**
   * For setting dropdown open / closed
   */
  protected _dropdownOpen = signal<boolean>(false);

  /**
   * Signal to Select & MultiselectOption for listening autocomplete filter text changes
   */
  protected _autocompleteFilterText: WritableSignal<string> = signal<string>('');

  /**
   *  Lazy loading check for expanding content, unless component control gets values from application, then set to true automatically, so that comparing available options match given control value.
   */
  protected _optionsLoadedOnce: boolean = false;

  /**
   * Used when filtering autocomplete results to check if 'No results found' text is visible
   */
  protected _visibleOptions: string[] = [];

  /**
   * Status of input focus
   */
  protected _inputFocused: boolean = false;

  /**
   * Used to handle exceptions when mouse click event fires before / after focus event or user has clicked autocomplete clear button
   */
  protected _preventDropdownReopen: boolean | undefined = false;

  /**
   * Focus try counter
   */
  private _focusTryCounter: number = 0;

  /**
   * Array to store visible options while options are loading.
   */
  private _visibleOptionsTemp: string[] = [];

  /**
   * Store latest option loaded
   */
  private _latestVisibleOption: string;

  /**
   * Currently focused option
   */
  private _focusedOption: string | null = null;

  /**
   * If clear button is focused
   */
  private _clearButtonFocused: boolean = false;

  /**
   * If click event happens either in input field or in the options
   */
  private _mouseDownInsideComponent: boolean;

  /**
   * If click event's target is Select's input field
   */
  private _mouseUpOnInput: boolean = false;

  /**
   * Used to not update visible options to HTML template before some delay has passed in case new options are still loading
   */
  private _optionLoadInterval: null | NodeJS.Timeout = null;

  /**
   * If click event originated from Icon used inside input field
   */
  private _clickFromIcon: boolean = false;

  /**
   * Keyboard button pressed down
   */
  private _keyDown: string | null = null;

  /**
   * Used to pass info, that Clear Button was clicked
   */
  protected _clearButtonClickTrigger = signal<boolean>(false);

  ngOnChanges(changes: FudisComponentChanges<SelectComponent | MultiselectComponent>): void {
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      this._updateValueAndValidityTrigger.next();

      this._updateComponentStateFromControlValue();

      if (this.control.value) {
        this._optionsLoadedOnce = true;
      }

      this.control.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((value) => {
        this._updateValueAndValidityTrigger.next();
        if (value) {
          this._optionsLoadedOnce = true;
        }

        this._updateComponentStateFromControlValue();
      });
    }

    if (
      changes.variant?.currentValue !== changes.variant?.previousValue &&
      changes.variant?.currentValue === 'dropdown' &&
      !changes.variant.firstChange
    ) {
      this.setAutocompleteFilterText('');
    }

    if (
      changes.autocompleteFilter?.currentValue !== changes.autocompleteFilter?.previousValue &&
      !changes.autocompleteFilter?.currentValue
    ) {
      this._autocompleteFilterText.set(this._autocompleteFilterText());
    }
  }

  /**
   * @returns signal value of autocomplete filter text
   */
  public getAutocompleteFilterText(): Signal<string> {
    return this._autocompleteFilterText.asReadonly();
  }

  /**
   * Open dropdown
   */
  public openDropdown(): void {
    if (!this.control.disabled && !this.disabled) {
      this._optionsLoadedOnce = true;
      this._dropdownOpen.set(true);
    }
  }

  /**
   * Close dropdown
   * @param focusToInput: when dropdown closes, focus or not to the input
   * @param preventDropdownReopen: For cases, when closing command comes from outside eg. clicking an option in the dropdownlist. There's no need to reopen the dropdown when focusing back to the input, which usually triggers opening the dropdown.
   */
  public closeDropdown(focusToInput: boolean = true, preventDropdownReopen: boolean = false): void {
    this._dropdownOpen.set(false);

    this._preventDropdownReopen = preventDropdownReopen;
    if (focusToInput) {
      this._focusToSelectInput();
    }
  }

  /**
   * Each option sends information to parent if they are visible or not
   * @param value option value
   * @param visible is this option visible or not
   */
  public setOptionVisibility(value: string, visible: boolean) {
    this._latestVisibleOption = value;

    this._visibleOptionsTemp = setVisibleOptionsList(this._visibleOptionsTemp, value, visible);

    if (!this._optionLoadInterval) {
      this._optionsLoadDelay().then((resolve) => {
        if (resolve) {
          this._visibleOptions = this._visibleOptionsTemp;
          this.visibleOptionsUpdate.emit(this._visibleOptions.length);
        }
      });
    }
  }

  /**
   * Add or remove currently focused option. Called from SelectOptionBase.
   */
  public setFocusedOption(id: string, type: 'add' | 'remove'): void {
    if (type === 'add') {
      this._focusedOption = id;
    } else {
      this._focusedOption = null;
    }
  }

  /**
   * Promise which determines, if some of the components used in this Select has focus or not.
   * @param event FocusEvent
   * @returns
   */
  public componentFocused(event: FocusEvent): Promise<boolean> {
    return new Promise((resolve) => {
      let counter = 0;

      const nextTarget = event?.relatedTarget as HTMLElement;

      const focusCheckInterval = setInterval(() => {
        const focused =
          !!this._selectRef.nativeElement.contains(this._document.activeElement) ||
          !!this._selectRef.nativeElement.contains(nextTarget);

        // If focus has moved another element inside Select
        if (focused || this._mouseDownInsideComponent) {
          clearInterval(focusCheckInterval);
          this._mouseDownInsideComponent = false;
          resolve(true);

          // If focus target is null
        } else if (!nextTarget) {
          clearInterval(focusCheckInterval);
          resolve(false);

          // Increase counter, and try again. This is needed usually with click events as between previous element blur and next element focus click event is "somewhere else"
        } else if (counter <= 100) {
          counter = counter + 50;
        } else {
          // Else resolve boolean check after two tries, if any relevant element is focused
          clearInterval(focusCheckInterval);
          resolve(!!this._focusedOption || this._inputFocused || this._clearButtonFocused);
        }
      }, 50);
    });
  }

  /**
   * When Clear button is clicked
   */
  protected _clearButtonClick(): void {
    if (!this.control.disabled && !this.disabled) {
      this._clearButtonClickTrigger.set(true);
      this._setControlNull();
      this._focusToSelectInput();
    }
  }

  /**
   * Set control value to null
   * Control value should reset even when user input does not match any option value (i.e. control value is null), so that dropdown shows options correctly
   */
  protected _setControlNull(): void {
    if (this.control.value) {
      this.control.patchValue(null);
      this.selectionUpdate.emit(null);
      this.setAutocompleteFilterText('');
    } else {
      this.control.patchValue(null);
      this.setAutocompleteFilterText('');
    }
  }

  /**
   * To handle input focus
   */
  protected _selectInputFocus(event: FocusEvent): void {
    this._inputFocused = true;

    const openDropdown =
      this.variant === 'dropdown' ||
      this.variant === 'autocompleteDropdown' ||
      (this.variant === 'autocompleteType' && this._autocompleteFilterText() !== '');

    if (
      !this._preventDropdownReopen &&
      openDropdown &&
      !this._mouseDownInsideComponent &&
      !this._dropdownOpen()
    ) {
      this.openDropdown();
    } else if (this._clickFromIcon) {
      if (this._dropdownOpen()) {
        this.closeDropdown();
      } else {
        this.openDropdown();
      }
    }
    this._preventDropdownReopen = false;

    this.onFocus(event);
  }

  /**
   * To handle input field blur events
   * @param event FocusEvent
   */
  protected _inputBlur(event: FocusEvent): void {
    this.componentFocused(event).then((value) => {
      if (!value) {
        this.closeDropdown(false);
      }
    });

    this._inputFocused = false;
    this.control.markAsTouched();
  }

  /**
   * To handle click events for input
   */
  protected _clickInput(): void {
    this._preventDropdownReopen = true;

    if (this._inputFocused || this._mouseUpOnInput) {
      if (this.variant === 'dropdown') {
        this._toggleDropdown();
      } else {
        this.openDropdown();
      }
    }
    this._focusToSelectInput();
  }

  /**
   * Register pressed key inside input field. Used to check that both key down and key up originated from same source.
   */
  protected _inputKeyDown(event: KeyboardEvent): void {
    this._keyDown = event.key;

    // Prevent scrolling
    if (event.key === 'ArrowDown') {
      event.preventDefault();
    }
  }

  /**
   * Handle keypress for dropdown select
   * @param event KeyboardEvent
   * @param focusSelector CSS selector to focus to on ArrowDown event
   */
  protected _inputKeyUp(event: KeyboardEvent): void {
    const { key } = event;

    if (key === this._keyDown) {
      switch (key) {
        case ' ':
          if (this.variant === 'dropdown') {
            event.preventDefault();
            this._toggleDropdown();
          }
          break;
        case 'Enter':
          event.preventDefault();

          if (this._visibleOptions.length === 1) {
            this._focusToFirstOption(true);
          } else {
            this._toggleDropdown();
          }

          break;
        case 'ArrowDown':
          event.preventDefault();
          if (!this._dropdownOpen()) {
            this._toggleDropdown();
          }
          if (this._inputFocused) {
            this._focusToFirstOption();
          }
          break;
        case 'Tab':
          break;
        default:
          event.preventDefault();
      }
    }

    this._keyDown = null;
  }

  /**
   * Generate html id for parent FudisSelect
   */
  protected _setParentId(type: 'multiselect' | 'select'): void {
    if (this.id && type === 'select') {
      this._idService.addNewGrandParentId('select', this.id);
    } else if (type === 'select') {
      this.id = this._idService.getNewGrandParentId('select');
    } else if (this.id && type === 'multiselect') {
      this._idService.addNewGrandParentId('multiselect', this.id);
    } else {
      this.id = this._idService.getNewGrandParentId('multiselect');
    }
  }

  /**
   * Toggle dropdown
   */
  protected _toggleDropdown(): void {
    if (this._dropdownOpen()) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  /**
   * Resolve a promise after delay if there hasn't been new options
   * @returns boolean
   */
  private _optionsLoadDelay(): Promise<boolean> {
    let tempLatestOptions: string;

    return new Promise((resolve) => {
      this._optionLoadInterval = setInterval(() => {
        if (tempLatestOptions === this._latestVisibleOption) {
          if (this._optionLoadInterval) {
            clearInterval(this._optionLoadInterval);
            this._optionLoadInterval = null;
          }
          resolve(true);
        } else {
          tempLatestOptions = this._latestVisibleOption;
        }
      }, 50);
    });
  }

  /**
   * Set Clear button's focus state to false
   */
  protected _setClearButtonFocusFalse(): void {
    this._clearButtonFocused = false;
  }

  /**
   * Set focus state of Clear Button and determine if Dropdown should be closed when this function is called
   * @param event FocusEvent
   * @param state
   */
  protected _setClearButtonFocusState(event: FocusEvent, state: boolean): void {
    this._clearButtonFocused = state;

    if (!state) {
      this.componentFocused(event).then((value) => {
        if (!value) {
          this.closeDropdown(false);
        }
      });
    }
  }

  /**
   * Update input filter text
   * @param text string to set as filter text
   * @param nullCheck true by default, check if control should be set as null
   */
  public setAutocompleteFilterText(text: string, nullCheck = true): void {
    if (this._autocompleteFilterText() !== text) {
      this._autocompleteFilterText.set(text);
      this.filterTextUpdate.emit(text);
    }
    if (nullCheck) {
      this._checkIfAutocompleteValueNull(text);
    }
  }

  /**
   * Checks if currently typed filter text is not same as control label value
   * @param text filter text value emitted from autocomplete
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _checkIfAutocompleteValueNull(text: string): void {}

  /**
   * To focus on first option when dropdown opens
   * @param cssfocusSelector CSS class to focus to
   */
  protected _focusToFirstOption(clickFirstOption?: boolean): void {
    const firstOption: HTMLInputElement | null =
      this._dropdownRef?.dropdownElement.nativeElement.querySelector(this.focusSelector);

    if (firstOption) {
      firstOption.focus();

      if (clickFirstOption) {
        firstOption.click();
      }

      if (this._document.activeElement !== firstOption) {
        setTimeout(() => {
          firstOption.focus();
          if (clickFirstOption) {
            firstOption.click();
          }
        }, 0);
      }
    } else if (this._focusTryCounter < 20) {
      setTimeout(() => {
        this._focusTryCounter += 1;
        this._focusToFirstOption();
      }, 100);
    }
  }

  /**
   * When blurring away from Dropdown, check if this Select has focus
   */
  protected _dropdownBlur(event: FocusEvent): void {
    this.componentFocused(event).then((value) => {
      if (!value) {
        this.closeDropdown(false);
      }
    });
  }

  /**
   * Browser focus logic differs. E. g. Firefox tries to focus to Dropdown menu wrapper. This function determines that if it should focus to first option or back to input field.
   */
  protected _dropdownFocus(event: FocusEvent): void {
    const focusFromInputOrClearButton =
      event.relatedTarget === this._inputRef?.nativeElement ||
      this._selectIconsRef.nativeElement.contains(event.relatedTarget as HTMLElement);

    if (focusFromInputOrClearButton) {
      this._focusToFirstOption();
    } else {
      this._focusToSelectInput();
    }
  }

  /**
   * Focus to input field
   */
  protected _focusToSelectInput() {
    this._inputRef?.nativeElement.focus();
  }

  /**
   * Function declaration overridden and implemented by Select and Multiselect
   */
  protected _updateComponentStateFromControlValue(): void {}

  /**
   * When pressing keyboard Esc, focus to Select input and close dropdown
   * @param event
   */
  @HostListener('window:keydown.escape', ['$event'])
  private _handleEscapePress(event: KeyboardEvent) {
    if (this._dropdownOpen()) {
      event.preventDefault();

      this.closeDropdown(true, true);
    }
  }

  /**
   * When user clicks, set status whether click is inside or outside the Select element
   * @param targetElement
   */
  @HostListener('document:mouseup', ['$event.target'])
  private _handleWindowClick(targetElement: HTMLElement) {
    this._mouseDownInsideComponent = false;
    if (this._dropdownOpen() && !this._selectRef.nativeElement.contains(targetElement)) {
      this.closeDropdown(false);
    }
  }

  @HostListener('mousedown', ['$event.target'])
  private _handleMouseDown() {
    this._mouseDownInsideComponent = true;
  }

  @HostListener('mouseup', ['$event.target'])
  private _handleMouseUp(targetElement: HTMLElement) {
    this._clickFromIcon =
      this._selectRef.nativeElement.contains(targetElement) &&
      !!targetElement.closest('.fudis-select-icons__container');

    this._mouseUpOnInput =
      targetElement &&
      (!!this._inputRef?.nativeElement.contains(targetElement) || this._clickFromIcon);

    if (this._clickFromIcon) {
      if (!this.control.disabled) {
        this._focusToSelectInput();
      }
    }
  }
}
