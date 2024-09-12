import {
  Component,
  EventEmitter,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
  effect,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import { InputBaseDirective } from '../../directives/form/input-base/input-base.directive';
import { FudisSelectOption, FudisInputSize } from '../../types/forms';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { FudisFocusService } from '../../services/focus/focus.service';
import { FudisIdService } from '../../services/id/id.service';

@Component({
  selector: 'fudis-autocomplete-multi-select',
  templateUrl: './autocomplete-multi-select.component.html',
  styleUrls: ['./autocomplete-multi-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AutocompleteMultiSelectComponent
  extends InputBaseDirective
  implements OnInit, AfterViewInit
{
  constructor(
    private _focusService: FudisFocusService,
    _idService: FudisIdService,
    _translationService: FudisTranslationService,
  ) {
    super(_translationService, _idService);

    effect(() => {
      this._openAriaLabel = this._translations().SELECT.OPEN_DROPDOWN;
      this._closeAriaLabel = this._translations().SELECT.CLOSE_DROPDOWN;
      this._noResultsFound = this._translations().SELECT.AUTOCOMPLETE.NO_RESULTS;
      this._removeItemText = this._translations().SELECT.MULTISELECT.REMOVE_ITEM;
    });
  }

  @ViewChild('autocompleteMultiSelectWrapper') wrapper: ElementRef;

  @ViewChild('autocompleteInput') input: ElementRef;

  /**
   * Dropdown options to display
   */
  @Input({ required: true }) options: FudisSelectOption[] = [];

  /**
   * Available sizes for the multi-select - defaults to large.
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * Array of selected dropdown options which user is clicking. Can also be used to set preselected options.
   */
  @Input() selectedOptions: FudisSelectOption[] = [];

  /**
   * Placeholder text in input when selection is not yet made
   */
  @Input() placeholder: string;

  /**
   * Output for option click
   */
  @Output() optionChange = new EventEmitter<FudisSelectOption[]>();

  /**
   * Internal property for toggle dropdown visibility
   */
  protected _toggleOn: boolean;

  /**
   * Internal property for icon-only button aria-label when opening dropdown
   */
  protected _openAriaLabel: string;

  /**
   * Internal property for icon-only button aria-label when closing dropdown
   */
  protected _closeAriaLabel: string;

  /**
   * Internal property label for situations where no results with current filters were found
   */
  protected _noResultsFound: string;

  /**
   * Internal property to indicate deleting item chip aria-label
   */
  protected _removeItemText: string;

  /**
   * Internal variable for user input filtering
   */
  protected _filterText: string = '';

  /**
   * Internal variable for results filtered from options
   */
  protected _results: FudisSelectOption[] = [];

  ngOnInit(): void {
    this._setInputId('autocomplete-multi-select');

    this._results = [...this.options];
  }

  ngAfterViewInit(): void {
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      this.focusToInput();
    }
  }

  /**
   * Remove / Add item from the list
   */
  public setItemSelection(item: FudisSelectOption): void {
    if (this._isChecked(item)) {
      this.removeItem(item);
    } else {
      this.selectedOptions.push(item);
      this.optionChange.emit(this.selectedOptions);
    }
  }

  public removeItem(item: FudisSelectOption): void {
    this.selectedOptions = this.selectedOptions.filter((option) => item.label !== option.label);
    this.optionChange.emit(this.selectedOptions);

    if (this.selectedOptions.length === 0) {
      this.input.nativeElement.focus();
    }
  }

  protected _isChecked(item: FudisSelectOption): boolean {
    return this.selectedOptions.some((e) => e.label === item.label);
  }

  /**
   * Open menu / Toggle dropdown menu on
   */
  protected _openDropdown(): void {
    this._toggleOn = true;
  }

  /**
   * Toggle dropdown menu on / off
   */
  protected _toggleDropdown(): void {
    this._toggleOn = !this._toggleOn;
  }

  /**
   * Handle chip item remove by index. If there are no selections done, focus back to input on last item removal.
   */
  protected _handleRemoveChip(index: number): void {
    this.selectedOptions.splice(index, 1);

    if (this.selectedOptions.length === 0) {
      this.input.nativeElement.focus();
    }

    this.optionChange.emit(this.selectedOptions);
  }

  /**
   * Close dropdown if keyboard focus moves from dropdown menu to an element after it
   */
  protected _closeMenuOnListExit(event: FocusEvent): void {
    if (
      event.relatedTarget ===
      this.wrapper.nativeElement.querySelector(
        '.fudis-autocomplete-multi-select-selected-item-chip__button',
      )
    ) {
      this._toggleOn = false;
    }
  }

  /**
   * Filter options from keyboard input
   */
  protected _doSearch(event: KeyboardEvent): void {
    if (event.key !== 'Escape') {
      this._toggleOn = true;
    }

    this._filterText = (event.target as HTMLInputElement).value;

    this._results = this.options.filter((option) =>
      option.label.toLowerCase().includes(this._filterText.toLowerCase()),
    );
  }

  /**
   * Close dropdown menu when focusing from input to previous element before it
   */
  protected _closeOnShiftTab(event: KeyboardEvent): void {
    if (event.shiftKey && event.key === 'Tab') {
      this._toggleOn = false;
    }
  }

  /**
   * Handle arrowkey down and up when target is checkbox in dropdown menu
   */
  @HostListener('window:keydown.arrowDown', ['$event'])
  @HostListener('window:keydown.arrowUp', ['$event'])
  private _handleArrowKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    const dropdownElement = this.wrapper.nativeElement.children[2];

    const wrapperInput = this.wrapper.nativeElement.querySelector(
      '.fudis-autocomplete-multi-select__input-wrapper__input',
    );

    const checkboxInput = dropdownElement?.querySelector(
      '.fudis-dropdown-menu-item__checkbox__input',
    );

    if (wrapperInput === document.activeElement && checkboxInput) {
      checkboxInput.focus();
    } else if (wrapperInput !== document.activeElement) {
      this._handleCheckboxFocus(event);
    }
  }

  /**
   * Handle escape key down and move focus to input
   */
  @HostListener('window:keydown.Escape', ['$event'])
  private _handleEscapeKeyDown(event: KeyboardEvent) {
    event.preventDefault();

    const wrapperInput = this.wrapper.nativeElement.querySelector(
      '.fudis-autocomplete-multi-select__input-wrapper__input',
    );

    if (document.activeElement === wrapperInput) {
      this._toggleOn = false;
    }

    if (
      document.activeElement?.classList.contains('fudis-dropdown-menu-item__checkbox__input') &&
      this.wrapper.nativeElement.contains(document.activeElement)
    ) {
      wrapperInput.focus();
    }
  }

  // TODO: fix event any typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _handleCheckboxFocus(event: any) {
    const parent = event.target.closest('fudis-dropdown-menu-item');

    // eslint-disable-next-line default-case
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        parent?.nextElementSibling?.querySelector('input').focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        parent?.previousElementSibling?.querySelector('input').focus();
        break;
      case 'Escape':
        this.input.nativeElement.focus();
    }
  }

  @HostListener('document:click', ['$event.target'])
  private _handleWindowClick(targetElement: HTMLElement) {
    // Close dropdown-menu if click is outside of the autocomplete-multi-select component
    if (
      targetElement &&
      !this.wrapper.nativeElement.contains(targetElement) &&
      !targetElement.classList.contains(
        'fudis-autocomplete-multi-select-selected-item-chip__button',
      )
    ) {
      this._toggleOn = false;
    }
  }
}
