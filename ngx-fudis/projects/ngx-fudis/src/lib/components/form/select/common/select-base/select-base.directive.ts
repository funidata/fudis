import {
  ChangeDetectorRef,
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
  effect,
  signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContentDirective } from '../../../../../directives/content-projection/content/content.directive';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { FudisIdService } from '../../../../../services/id/id.service';
import { FudisFocusService } from '../../../../../services/focus/focus.service';
import { InputBaseDirective } from '../../../../../directives/form/input-base/input-base.directive';
import { FudisInputSize, FudisSelectVariant } from '../../../../../types/forms';
import { setVisibleOptionsList } from '../utilities/selectUtilities';
import { SelectDropdownComponent } from '../select-dropdown/select-dropdown.component';
import { SelectAutocompleteComponent } from '../autocomplete/autocomplete.component';
import { FudisComponentChanges } from '../../../../../types/miscellaneous';
import { SelectComponent } from '../../select/select.component';
import { MultiselectComponent } from '../../multiselect/multiselect.component';
import { hasRequiredValidator } from '../../../../../utilities/form/getValidators';
import { DOCUMENT } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[fudisSelectBase]',
})
export class SelectBaseDirective extends InputBaseDirective implements OnChanges {
  constructor(
    @Inject(DOCUMENT) protected _document: Document,
    protected _focusService: FudisFocusService,
    private _translationService: FudisTranslationService,
    _idService: FudisIdService,
    _changeDetectorRef: ChangeDetectorRef,
  ) {
    super(_idService, _changeDetectorRef);

    effect(() => {
      const translations = _translationService.getTranslations()();

      this.translationOptionDisabledText.next(translations.SELECT.DISABLED);

      // TODO: after a11y audit, check if these can be removed
      this._translationOpenAriaLabel.next(translations.SELECT.OPEN_DROPDOWN);
      this._translationCloseAriaLabel.next(translations.SELECT.CLOSE_DROPDOWN);
    });
  }

  /**
   * Reference to autocomplete element, used to focus to it
   */
  @ViewChild('autocompleteRef') public autocompleteRef: SelectAutocompleteComponent;

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
  @ContentChild(ContentDirective) protected _content: ContentDirective;

  /**
   * Reference to child DropdownComponent listing all options
   */
  @ViewChild('selectRef') private _selectRef: ElementRef<HTMLDivElement>;

  /**
   * Set dropdown size (should follow the given input element size)
   */
  @Input() size: FudisInputSize | 'xs' = 'lg';

  /**
   * Formcontrol. For SelectBase set on purpose to type 'any' and spesified in SelectComponent and MultiselectComponent.
   */
  @Input() override control: FormControl;

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
   * Enable / disable button, which clears user selectionw when there is a selected value
   */
  @Input() selectionClearButton: boolean = true;

  /**
   * For Autocomplete variants optional helper text displayed as first item in opened dropdown list. By default uses internal Fudis translation, which can be disabled by setting this property to boolean 'false'
   */
  @Input() autocompleteHelpText: string | false;

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
  public focusSelector: string = '.fudis-select-option__focusable';

  /**
   * Internal translated text for disabled select option, used in Select and Multiselect Option
   */
  public translationOptionDisabledText = new BehaviorSubject<string>('string');

  /**
   * Selected option or options label for non-autocomplete dropdowns
   */
  protected _dropdownSelectionLabelText: string | null = null;

  /**
   * Used in control.valueChanges subscription to not run update functions unless valueChange comes from application
   */
  protected _controlValueChangedInternally: boolean = false;

  /**
   * For setting dropdown open / closed
   */
  protected _dropdownOpen: boolean = false;

  /**
   * Internal translated text for icon-only button aria-label when opening dropdown
   */
  protected _translationOpenAriaLabel = new BehaviorSubject<string>('');

  /**
   * Internal translated text for icon-only button aria-label when closing dropdown
   */
  protected _translationCloseAriaLabel = new BehaviorSubject<string>('');

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

  ngOnChanges(changes: FudisComponentChanges<SelectComponent | MultiselectComponent>): void {
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      // TODO: refactor this after dynamic validator update ticket is done
      this._required = hasRequiredValidator(this.control);

      if (changes.control?.currentValue?.value) {
        this._updateSelectionFromControlValue();
      }

      this.control.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
        if (!this._controlValueChangedInternally) {
          this._updateSelectionFromControlValue();
        }

        this._controlValueChangedInternally = false;
      });
    }

    if (
      changes.variant?.currentValue !== changes.variant?.previousValue &&
      changes.variant?.currentValue === 'dropdown' &&
      !changes.variant.firstChange
    ) {
      this._filterTextUpdate('');
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
    if (!this.disabled && !this.control.disabled) {
      this._optionsLoadedOnce = true;
      this._dropdownOpen = true;
    }
  }

  /**
   * Close dropdown
   * @param focusToInput: when dropdown closes, focus or not to the input
   * @param preventDropdownReopen: For cases, when closing command comes from outside eg. clicking an option in the dropdownlist. There's no need to reopen the dropdown when focusing back to the input, which usually triggers opening the dropdown.
   */
  public closeDropdown(focusToInput: boolean = true, preventDropdownReopen: boolean = false): void {
    this._dropdownOpen = false;

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
    if (!this.disabled && !this.control.disabled) {
      this._setControlNull();

      this._focusToSelectInput();
    }
  }

  /**
   * Set control value to null
   */
  protected _setControlNull(): void {
    this._controlValueChangedInternally = true;
    this.control.patchValue(null);
    this.selectionUpdate.emit(null);

    this._updateInputValueTexts('');
  }

  /**
   * To handle input focus
   */
  protected _inputFocus(): void {
    this._inputFocused = true;

    const openDropdown =
      this.variant === 'dropdown' ||
      this.variant === 'autocompleteDropdown' ||
      (this.variant === 'autocompleteType' && this._autocompleteFilterText() !== '');

    if (
      !this._preventDropdownReopen &&
      openDropdown &&
      !this._mouseDownInsideComponent &&
      !this._dropdownOpen
    ) {
      this.openDropdown();
    } else if (this._clickFromIcon) {
      this.closeDropdown();
    }
    this._preventDropdownReopen = false;
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
      this._toggleDropdown();
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
        case 'Enter':
          event.preventDefault();
          this._toggleDropdown();
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (!this._dropdownOpen) {
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
    if (this._dropdownOpen) {
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
   * Update input filter
   */
  protected _filterTextUpdate(text: string): void {
    if (this._autocompleteFilterText() !== text) {
      this._autocompleteFilterText.set(text);
      this.filterTextUpdate.emit(text);
    }
  }

  /**
   * Manually set typed text in input fields
   */
  protected _updateInputValueTexts(value: string): void {
    if (this.variant !== 'dropdown') {
      this.autocompleteRef.preventSpaceKeypress = true;

      this.autocompleteRef.updateInputValue(value);
    } else {
      this._dropdownSelectionLabelText = value;
    }
  }

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
      event.relatedTarget === this.autocompleteRef?.inputRef.nativeElement ||
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
    if (this.variant !== 'dropdown') {
      this.autocompleteRef.inputRef.nativeElement.focus();
    } else {
      this._inputRef.nativeElement.focus();
    }
  }

  /**
   * Function declaration overridden and implemented by Select and Multiselect
   */
  protected _updateSelectionFromControlValue(): void {}

  /**
   * When pressing keyboard Esc, focus to Select input and close dropdown
   * @param event
   */
  @HostListener('window:keydown.escape', ['$event'])
  private _handleEscapePress(event: KeyboardEvent) {
    if (this._dropdownOpen) {
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
    if (this._dropdownOpen && !this._selectRef.nativeElement.contains(targetElement)) {
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
      (!!this._inputRef?.nativeElement.contains(targetElement) ||
        !!this.autocompleteRef?.inputRef?.nativeElement.contains(targetElement) ||
        this._clickFromIcon);

    if (this._clickFromIcon) {
      this._focusToSelectInput();
    }
  }
}
