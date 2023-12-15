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
import { ContentDirective } from '../../../../directives/content-projection/content/content.directive';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { hasRequiredValidator } from '../../../../utilities/form/getValidators';
import { FudisIdService } from '../../../../services/id/id.service';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { InputBaseDirective } from '../../../../directives/form/input-base/input-base.directive';
import { FudisInputSize } from '../../../../types/forms';
import { ButtonComponent } from '../../../button/button.component';
import { setVisibleOptionsList } from '../selectUtilities';
import { SelectDropdownComponent } from '../select-dropdown/select-dropdown.component';

@Directive({
	selector: '[fudisSelectBase]',
})
export class SelectBaseDirective extends InputBaseDirective implements OnDestroy, OnChanges {
	constructor(
		protected _focusService: FudisFocusService,
		_translationService: FudisTranslationService,
		_idService: FudisIdService
	) {
		super(_translationService, _idService);

		effect(() => {
			this._openAriaLabel = this._translations().SELECT.OPEN_DROPDOWN;
			this._closeAriaLabel = this._translations().SELECT.CLOSE_DROPDOWN;
			this._noResultsFound = this._translations().SELECT.AUTOCOMPLETE.NO_RESULTS;
			this._clearFilterText = this._translations().SELECT.AUTOCOMPLETE.CLEAR;
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
	 * To lazy load options on first open
	 */
	@ContentChild(ContentDirective) protected _content: ContentDirective;

	/**
	 * Add CSS class to host
	 */
	@HostBinding('class') classes = 'fudis-select-host';

	/**
	 * Set dropdown size (should follow the given input element size)
	 */
	@Input() size: FudisInputSize | 'xs' = 'lg';

	/**
	 * Formcontrol. For SelectBase set on purpose to type 'any' and spesified in SelectComponent and MultiselectComponent.
	 */
	@Input() control: FormControl<any>;

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
	 * Internal property for toggle dropdown visibility
	 */
	protected _dropdownOpen: boolean = false;

	/**
	 * Internal translated text for icon-only button aria-label when opening dropdown
	 */
	protected _openAriaLabel: string;

	/**
	 * Internal translated text for icon-only button aria-label when closing dropdown
	 */
	protected _closeAriaLabel: string;

	/**
	 * Internal translated label for situations where no results with current filters were found
	 */
	protected _noResultsFound: string;

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
	 * Translated aria-label for autocomplete close icon button which clears the input
	 */
	protected _clearFilterText: string;

	/**
	 * Status of input focus
	 */
	protected _inputFocused: boolean = false;

	/**
	 * Used to handle exceptions when mouse click event fires before / after focus event
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
	 *
	 * @param focusToInput: when dropdown closes, focus or not to the input
	 * @param preventDropdownReopen: especially if click comes from clicking a option in a dropdown, prevent dropdown to reopen when focusing back
	 */
	public closeDropdown(focusToInput: boolean = true, preventDropdownReopen: boolean = false): void {
		this._dropdownOpen = false;

		this._preventDropdownReopen = preventDropdownReopen;

		if (focusToInput) {
			this.inputRef.nativeElement.focus();
		}
	}

	/**
	 * Each option sends information to parent if they are visible or not
	 * @param value option value
	 * @param visible is this option visible or not
	 */
	public setOptionVisibility(value: string, visible: boolean) {
		this._visibleOptionsValues = setVisibleOptionsList(this._visibleOptionsValues, value, visible);
	}

	/**
	 * Clear any written or selected value in the autocomplete field
	 */
	protected _clearAutocompleteFilterText(resetControlValue?: boolean): void {
		// Clear input field and control value
		(this.inputRef.nativeElement as HTMLInputElement).value = '';
		this._autocompleteFilterText.set('');

		if (resetControlValue) {
			this.controlValueChangedInternally = true;
			this.control.patchValue(null);
		}
	}

	/**
	 * To handle input focus
	 */
	protected _inputFocus(): void {
		if (!this.autocompleteClearButton && !this._dropdownOpen && !this._preventDropdownReopen) {
			this._openDropdown();

			this._preventClick = true;
			this._preventDropdownReopen = false;
		}

		this._inputFocused = true;
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
	 * Filter options from keyboard input
	 */
	protected _autocompleteBaseKeypress(event: KeyboardEvent, selector: string): void {
		const { key } = event;

		const inputValue = (event.target as HTMLInputElement).value;

		if (this._autocompleteFilterText() !== inputValue) {
			this._autocompleteFilterText.set(inputValue);
		}

		if (key === 'Enter') {
			this._toggleDropdown();
		} else if (key !== 'ArrowDown' && this.autocompleteClearButton && this._autocompleteFilterText() === '') {
			this.closeDropdown();
		} else if (!this._dropdownOpen && key !== 'Escape' && key !== 'Enter') {
			this._openDropdown();
		} else if (key === 'ArrowDown' && this._inputFocused) {
			event.preventDefault();
			this._focusToFirstOption(selector);
		}
	}

	/**
	 * Generate html id for parent FudisSelect
	 */
	protected _setParentId(): void {
		if (this.id) {
			this._idService.addNewParentId('select', this.id);
		} else {
			this.id = this._idService.getNewParentId('select');
		}
	}

	/**
	 * Toggle dropdown
	 */
	protected _toggleDropdown(): void {
		this._dropdownOpen = !this._dropdownOpen;

		if (this._dropdownOpen) {
			this._openedOnce = true;
		}
	}

	/**
	 * Open dropdown
	 */
	private _openDropdown(): void {
		this._openedOnce = true;
		this._dropdownOpen = true;
	}

	/**
	 * To focus on first option when dropdown opens
	 * @param focusSelector CSS selector to focus to
	 */
	private _focusToFirstOption(focusSelector: string): void {
		const firstOption: HTMLInputElement = this._dropdownRef?.dropdownElement.nativeElement.querySelector(
			focusSelector
		) as HTMLInputElement;

		if (firstOption) {
			firstOption.focus();

			if (document.activeElement !== firstOption) {
				setTimeout(() => {
					firstOption.focus();
				}, 0);
			}
		} else if (this._focusTryCounter < 100) {
			setTimeout(() => {
				this._focusTryCounter += 1;
				this._focusToFirstOption(focusSelector);
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
			const dropdownAreaClick = this._dropdownRef?.dropdownElement?.nativeElement.contains(targetElement);

			const inputAreaClick = (this._inputWrapperRef.nativeElement as HTMLElement).contains(targetElement);

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
			(
				(event.target as HTMLElement).closest('fudis-select')?.querySelector('.fudis-select__input') as HTMLInputElement
			)?.focus();

			this.closeDropdown();
		}
	}
}
