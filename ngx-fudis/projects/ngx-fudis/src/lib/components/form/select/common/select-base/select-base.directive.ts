import {
  ContentChild,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Signal,
  ViewChild,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContentDirective } from '../../../../../directives/content-projection/content/content.directive';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { hasRequiredValidator } from '../../../../../utilities/form/getValidators';
import { FudisIdService } from '../../../../../services/id/id.service';
import { FudisFocusService } from '../../../../../services/focus/focus.service';
import { InputBaseDirective } from '../../../../../directives/form/input-base/input-base.directive';
import { FudisInputSize } from '../../../../../types/forms';
import { ButtonComponent } from '../../../../button/button.component';
import { setVisibleOptionsList } from '../selectUtilities';
import { SelectDropdownComponent } from '../select-dropdown/select-dropdown.component';
import { SelectAutocompleteComponent } from '../autocomplete/autocomplete.component';

@Directive({
  selector: '[fudisSelectBase]',
})
export class SelectBaseDirective extends InputBaseDirective implements OnDestroy, OnChanges {
  constructor(
    protected _focusService: FudisFocusService,
    _translationService: FudisTranslationService,
    _idService: FudisIdService,
  ) {
    super(_translationService, _idService);

    effect(() => {
      this._translationOpenAriaLabel = this._translations().SELECT.OPEN_DROPDOWN;
      this._translationCloseAriaLabel = this._translations().SELECT.CLOSE_DROPDOWN;
      this._translationNoResultsFound = this._translations().SELECT.AUTOCOMPLETE.NO_RESULTS;
    });
  }

  /**
   * Reference to child DropdownComponent listing all options
   */
  @ViewChild('dropdownRef') private _dropdownRef: SelectDropdownComponent;

  /**
   * Autocomplete button ref used for clearing typed text
   */
  @ViewChild('clearFilterButton') private _clearFilterButton: ButtonComponent;

  /**
   * Reference for div containing select / multiselect dropdown input
   */
  @ViewChild('inputWrapperRef') private _inputWrapperRef: ElementRef<HTMLDivElement>;

  /**
   * Reference to autocomplete element
   */
  @ViewChild('autocompleteRef') protected _autocompleteRef: SelectAutocompleteComponent;

  /**
   * To lazy load options on first open
   */
  @ContentChild(ContentDirective) protected _content: ContentDirective;

  /**
   * Adds CSS class to host
   */
  @HostBinding('class') classes = 'fudis-select-host';

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
   * Determine is Select is dropdown (default / false) or autocomplete input (true)
   */
  @Input() autocomplete: boolean = false;

  /**
   * Enable / disable autocomplete variant's Clear button. When 'false' autocomplete acts like a dropdown and opens on focus and hides 'Clear' icon button.
   */
  @Input() autocompleteClearButton: boolean = true;

  /**
   * Selected option or options label for non-autocomplete dropdowns
   */
  public dropdownSelectionLabelText: string | null = null;

  /**
   * Used in control.valueChanges subscription to not run update functions unless valueChange comes from application
   */
  public controlValueChangedInternally: boolean = false;

  /**
   * CSS selector for querying focus states
   */
  public focusSelector: string;

  /**
   * With autocomplete always assume that no results are found when control value is updated or when autocomplete filter text is updated. Each option will then check, if control value or filter text value matches its label and sets this false.
   */
  public noResultsFound: boolean = true;

  /**
   * For setting dropdown open / closed
   */
  protected _dropdownOpen: boolean = false;

  /**
   * Internal translated text for icon-only button aria-label when opening dropdown
   */
  protected _translationOpenAriaLabel: string;

  /**
   * Internal translated text for icon-only button aria-label when closing dropdown
   */
  protected _translationCloseAriaLabel: string;

  /**
   * Internal translated label for situations where no results with current filters were found
   */
  protected _translationNoResultsFound: string;

  /**
   * Signal to Select & MultiselectOption for listening autocomplete filter text changes
   */
  protected _autocompleteFilterText: WritableSignal<string> = signal<string>('');

  /**
   *  Lazy loading check for expanding content
   */
  protected _openedOnce: boolean = false;

  /**
   * Used when filtering autocomplete results to check if 'No results found' text is visible
   */
  protected _visibleOptionsValues: string[] = [];

  /**
   * Status of input focus
   */
  protected _inputFocused: boolean = false;

  /**
   * Used to handle exceptions when mouse click event fires before / after focus event or user has clicked autocomplete clear button
   */
  protected _preventDropdownReopen: boolean | undefined = false;

  /**
   * Used to handle exceptions when mouse click event fires before / after focus event
   */
  protected _preventClick: boolean = false;

  /**
   * Subscription to listen to control's value changes coming from outside Fudis components
   */
  protected _controlValueSubscription: Subscription;

  ngOnChanges(): void {
    this._required = this.required ?? hasRequiredValidator(this.control);
  }

  ngOnDestroy(): void {
    this._controlValueSubscription.unsubscribe();
  }

  /**
   *
   * @returns signal value of autocomplete filter text
   */
  public getAutocompleteFilterText(): Signal<string> {
    return this._autocompleteFilterText.asReadonly();
  }

  /**
   * Close dropdown
   * @param focusToInput: when dropdown closes, focus or not to the input
   * @param preventDropdownReopen: For cases, when closing comes from outside and there's no need to reopen the dropdown when focusing back to the input, which usually triggers opening the dropdown.
   */
  public closeDropdown(focusToInput: boolean = true, preventDropdownReopen: boolean = false): void {
    this._dropdownOpen = false;

    this._preventDropdownReopen = preventDropdownReopen;

    if (this.autocomplete && focusToInput) {
      this._autocompleteRef.inputRef.nativeElement.focus();
    } else if (focusToInput) {
      this.inputRef.nativeElement.focus();
    }
  }

  /**
   * With autocomplete, each option sends information to parent if they are visible or not
   * @param value option value
   * @param visible is this option visible or not
   */
  public setOptionVisibility(value: string, visible: boolean) {
    this._visibleOptionsValues = setVisibleOptionsList(this._visibleOptionsValues, value, visible);

    this._autocompleteRef.visibleOptionsLength = this._visibleOptionsValues.length;
  }

  /**
   * To handle input focus
   */
  protected _inputFocus(): void {
    this._inputFocused = true;

    const openAutocomplete =
      this.autocomplete &&
      (!this.autocompleteClearButton ||
        (this.autocompleteClearButton && this._autocompleteFilterText() !== '')) &&
      !this._preventDropdownReopen &&
      !this._dropdownOpen;

    const openDropdown = !this.autocomplete && !this._preventDropdownReopen && !this._dropdownOpen;

    if (openAutocomplete || openDropdown) {
      this.openDropdown();

      this._preventClick = true;
      this._preventDropdownReopen = false;
    }
  }

  /**
   * Handler for input field blur
   * @param event FocusEvent
   */
  protected _inputBlur(event: FocusEvent): void {
    // Time out used for user mouse click cases
    if (!event.relatedTarget) {
      setTimeout(() => {
        if (!document.activeElement?.classList.contains(this.focusSelector)) {
          this.closeDropdown(false);
        }
      }, 150);
    } else if (!(event.relatedTarget as HTMLElement)?.classList.contains(this.focusSelector)) {
      this.closeDropdown(false);
    }

    this._inputFocused = false;
    this.control.markAsTouched();
  }

  /**
   * To handle click events for input
   * @param event click event
   */
  protected _clickInput(event: Event): void {
    const clickFromClearButton =
      event.target === this._clearFilterButton?.buttonEl.nativeElement ||
      event.target === this._clearFilterButton?.buttonEl.nativeElement.querySelector('fudis-icon');

    this._preventDropdownReopen = true;
    if (clickFromClearButton) {
      this.closeDropdown(false);
    } else if (this._inputFocused && !this._preventClick) {
      this._toggleDropdown();
    }
    this._preventClick = false;
    this.inputRef.nativeElement.focus();
  }

  /**
   * Handle keypress for dropdown select
   * @param event KeyboardEvent
   * @param focusSelector CSS selector to focus to on ArrowDown event
   */
  protected _dropdownKeypress(event: KeyboardEvent, focusSelector: string): void {
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
          this._focusToFirstOption(focusSelector);
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
      this._idService.addNewParentId('select', this.id);
    } else if (type === 'select') {
      this.id = this._idService.getNewParentId('select');
    } else if (this.id && type === 'multiselect') {
      this._idService.addNewParentId('multiselect', this.id);
    } else {
      this.id = this._idService.getNewParentId('multiselect');
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
    this._openedOnce = true;
    this._dropdownOpen = true;
  }

  protected _filterTextUpdate(text: string): void {
    if (this._autocompleteFilterText() !== text) {
      this.noResultsFound = true;
      this._autocompleteFilterText.set(text);
    }
  }

  /**
   * To focus on first option when dropdown opens
   * @param cssFocusSelector CSS class to focus to
   */
  protected _focusToFirstOption(cssFocusSelector: string, clickFirstOption?: boolean): void {
    const cssSelector = `.${cssFocusSelector}`;

    const firstOption: HTMLInputElement =
      this._dropdownRef?.dropdownElement.nativeElement.querySelector(
        cssSelector,
      ) as HTMLInputElement;

    if (firstOption) {
      firstOption.focus();

      if (clickFirstOption) {
        firstOption.click();
      }

      if (document.activeElement !== firstOption) {
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
        this._focusToFirstOption(cssSelector);
      }, 100);
    }
  }

  /**
   * When user clicks somewhere else than DropdownMenu or input element area, close dropdown
   * @param targetElement
   */
  @HostListener('document:click', ['$event.target'])
  private _handleWindowClick(targetElement: HTMLElement) {
    if (this._dropdownOpen && !this._inputFocused) {
      const dropdownAreaClick =
        this._dropdownRef?.dropdownElement?.nativeElement.contains(targetElement);

      const inputAreaClick = (this._inputWrapperRef.nativeElement as HTMLElement).contains(
        targetElement,
      );

      if (!inputAreaClick && !dropdownAreaClick) {
        this.closeDropdown(false);
      }
    }
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
}
