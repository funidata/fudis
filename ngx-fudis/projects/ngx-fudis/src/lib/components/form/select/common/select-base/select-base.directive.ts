import {
  ChangeDetectorRef,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
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
import { setVisibleOptionsList } from '../selectUtilities';
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

      this._translationNoResultsFound.next(translations.SELECT.AUTOCOMPLETE.NO_RESULTS);

      // TODO: after a11y audit, check if these can be removed
      this._translationOpenAriaLabel.next(translations.SELECT.OPEN_DROPDOWN);
      this._translationCloseAriaLabel.next(translations.SELECT.CLOSE_DROPDOWN);
    });
  }

  /**
   * Reference to child DropdownComponent listing all options
   */
  @ViewChild('dropdownRef') private _dropdownRef: SelectDropdownComponent;

  /**
   * Reference to child DropdownComponent listing all options
   */
  @ViewChild('selectRef') private _selectRef: ElementRef<HTMLDivElement>;

  /**
   * Reference to autocomplete element, used to focus to it
   */
  @ViewChild('autocompleteRef') protected _autocompleteRef: SelectAutocompleteComponent;

  /**
   * Reference to autocomplete element, used to focus to it
   */
  @ViewChild('selectIconsRef') protected _selectIconsRef: ElementRef<HTMLDivElement>;

  /**
   * To lazy load options on first open
   */
  @ContentChild(ContentDirective) protected _content: ContentDirective;

  /**
   * Binding CSS class for component wrapper
   */
  @HostBinding('class') protected _classes = 'fudis-select-host';

  /**
   * Set dropdown size (should follow the given input element size)
   */
  @Input() size: FudisInputSize | 'xs' = 'lg';

  /**
   * Formcontrol. For SelectBase set on purpose to type 'any' and spesified in SelectComponent and MultiselectComponent.
   */
  @Input() control: FormControl;

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
   * Value output event on selection change
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() selectionUpdate: EventEmitter<any | null> = new EventEmitter<any | null>();

  /**
   * Selected option or options label for non-autocomplete dropdowns
   */
  protected _dropdownSelectionLabelText: string | null = null;

  /**
   * Getter for visible value in input field
   */
  get dropdownSelectionLabelText(): string | null {
    return this._dropdownSelectionLabelText;
  }

  /**
   * Used in control.valueChanges subscription to not run update functions unless valueChange comes from application
   */
  protected _controlValueChangedInternally: boolean = false;

  /**
   * CSS selector for querying focus states
   */
  public focusSelector: string = '.fudis-select-option__focusable';

  private _focusTryCounter: number = 0;

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
   * Internal translated label for situations where no results with current filters were found
   */
  protected _translationNoResultsFound = new BehaviorSubject<string>('');

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
  private _mouseDownTargetInsideComponent: boolean;

  /**
   * Used to prevent event triggering before mouseUp happens
   */
  private _mouseDown: boolean = false;

  /**
   * If click event's target is Select's input field
   */
  private _mouseUpOnInput: boolean = false;

  protected _clearButtonClick(): void {
    if (!this.disabled && !this.control.disabled) {
      this._setControlNull();

      this._focusToSelectInput();
    }
  }

  protected _setControlNull(): void {
    this._controlValueChangedInternally = true;
    this.control.patchValue(null);
    this.selectionUpdate.emit(null);

    this._updateInputValueTexts('');
  }

  ngOnChanges(changes: FudisComponentChanges<SelectComponent | MultiselectComponent>): void {
    if (changes.control?.currentValue !== changes.control?.previousValue) {
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
  }

  /**
   * @returns signal value of autocomplete filter text
   */
  public getAutocompleteFilterText(): Signal<string> {
    return this._autocompleteFilterText.asReadonly();
  }

  /**
   * Close dropdown
   * @param focusToInput: when dropdown closes, focus or not to the input
   * @param preventDropdownReopen: For cases, when closing command comes from outside eg. clicking an option in the dropdownlist. There's no need to reopen the dropdown when focusing back to the input, which usually triggers opening the dropdown.
   */
  public closeDropdown(focusToInput: boolean = true, preventDropdownReopen: boolean = false): void {
    this._dropdownOpen = false;

    this._preventDropdownReopen = preventDropdownReopen;

    this._focusToSelectInput(focusToInput);
  }

  /**
   * Each option sends information to parent if they are visible or not
   * @param value option value
   * @param visible is this option visible or not
   */
  public setOptionVisibility(value: string, visible: boolean) {
    this._visibleOptions = setVisibleOptionsList(this._visibleOptions, value, visible);
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

    if (!this._preventDropdownReopen && !this._dropdownOpen && openDropdown && !this._mouseDown) {
      this.openDropdown();

      this._preventDropdownReopen = false;
    }
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
   * Handle keypress for dropdown select
   * @param event KeyboardEvent
   * @param focusSelector CSS selector to focus to on ArrowDown event
   */
  protected _dropdownKeypress(event: KeyboardEvent): void {
    const { key } = event;

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
   * Open dropdown
   */
  public openDropdown(): void {
    if (!this.disabled && !this.control.disabled) {
      this._optionsLoadedOnce = true;
      this._dropdownOpen = true;
    }
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
    }
  }

  protected _updateInputValueTexts(value: string): void {
    if (this.variant !== 'dropdown') {
      this._autocompleteRef.preventSpaceKeypress = true;

      (this._autocompleteRef.inputRef.nativeElement as HTMLInputElement).setAttribute(
        'value',
        value,
      );
      (this._autocompleteRef.inputRef.nativeElement as HTMLInputElement).value = value;

      // TODO: check if below is needed, if yes, change it observable.

      //this._autocompleteFilterText.set('');
    } else {
      this._dropdownSelectionLabelText = value;
    }
  }

  /**
   * To focus on first option when dropdown opens
   * @param cssfocusSelector CSS class to focus to
   */

  // TODO: check if this could be achieved more elegantly
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
    } else if (this._focusTryCounter < 100) {
      setTimeout(() => {
        this._focusTryCounter += 1;
        this._focusToFirstOption();
      }, 100);
    }
  }

  protected _dropdownBlur(event: FocusEvent): void {
    this.componentFocused(event).then((value) => {
      if (!value) {
        this.closeDropdown(false);
      }
    });
  }

  protected _dropdownFocus(event: FocusEvent): void {
    const focusFromInputOrClearButton =
      event.relatedTarget === this._inputRef?.nativeElement ||
      event.relatedTarget === this._autocompleteRef?.inputRef.nativeElement ||
      this._selectIconsRef.nativeElement.contains(event.relatedTarget as HTMLElement);

    if (focusFromInputOrClearButton) {
      this._focusToFirstOption();
    } else {
      this._focusToSelectInput();
    }
  }

  protected _focusToSelectInput(condition: boolean = true) {
    if (this.variant !== 'dropdown' && condition) {
      this._autocompleteRef.inputRef.nativeElement.focus();
    } else if (condition) {
      this._inputRef.nativeElement.focus();
    }
  }

  /**
   * Function declaration overridden and implemented by Select and Multiselect
   */
  protected _updateSelectionFromControlValue(): void {}

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

  public componentFocused(event: FocusEvent): Promise<boolean> {
    return new Promise((resolve) => {
      let counter = 0;

      const nextTarget = event?.relatedTarget as HTMLElement;

      const focusCheckInterval = setInterval(() => {
        const focused =
          !!this._selectRef.nativeElement.contains(this._document.activeElement) ||
          !!this._selectRef.nativeElement.contains(nextTarget);

        // If focus has moved another element inside Select
        if (focused || this._mouseDownTargetInsideComponent) {
          clearInterval(focusCheckInterval);
          this._mouseDownTargetInsideComponent = false;
          resolve(true);
          // If focus target is null
        } else if (!nextTarget) {
          clearInterval(focusCheckInterval);
          resolve(false);

          // Encrease counter, and try again. This is needed usually with click events as between previous element blur and next element focus click event is "somewhere else"
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
   * When pressing keyboard Esc, focus to FudisSelect input and close dropdown
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
   * When user clicks, set status is click inside or outside
   * @param targetElement
   */
  @HostListener('document:click', ['$event.target'])
  private _handleWindowClick(targetElement: HTMLElement) {
    if (this._dropdownOpen && !this._selectRef.nativeElement.contains(targetElement)) {
      this.closeDropdown(false, true);
    }
  }

  @HostListener('mousedown', ['$event.target'])
  private _handleMouseDown(targetElement: HTMLElement) {
    this._mouseDown = true;

    this._mouseDownTargetInsideComponent =
      targetElement && !!this._selectRef.nativeElement.contains(targetElement);
  }

  @HostListener('mouseup', ['$event.target'])
  private _handleMouseUp(targetElement: HTMLElement) {
    this._mouseDown = false;
    this._mouseUpOnInput =
      targetElement &&
      (!!this._inputRef?.nativeElement.contains(targetElement) ||
        !!this._autocompleteRef?.inputRef?.nativeElement.contains(targetElement));
  }
}
