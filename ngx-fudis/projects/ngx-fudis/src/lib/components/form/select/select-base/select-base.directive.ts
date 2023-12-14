import {
	ContentChild,
	Directive,
	ElementRef,
	EventEmitter,
	HostBinding,
	HostListener,
	Input,
	OnChanges,
	OnDestroy,
	Output,
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
import { FudisInputSize, FudisSelectOption } from '../../../../types/forms';
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

	@ViewChild('dropdownElement') dropdownElement: ElementRef<HTMLElement>;

	@ViewChild('dropdownRef') private _dropdownRef: SelectDropdownComponent;

	/**
	 * Set dropdown size (should follow the given input element size)
	 */
	@Input() size: FudisInputSize | 'xs' = 'lg';

	/**
	 * Set dropdown open
	 */
	@Input() open: boolean = false;

	@Input() control: FormControl<any>;

	@HostBinding('class') classes = 'fudis-select-host';

	@ViewChild('clearFilterButton') private _clearFilterButton: ButtonComponent;

	@ViewChild('toggleDropdownButton') private _toggleDropdownButton: ButtonComponent;

	@ViewChild('inputWrapperRef') private _inputWrapperRef: ElementRef<HTMLDivElement>;

	@ContentChild(ContentDirective) protected _content: ContentDirective;

	/**
	 * Placeholder text for the dropdown input when no selection has been made
	 */
	@Input() placeholder: string;

	/**
	 * "dropdown" variant for regular dropdown and "autocomplete" enables user typing for search result filtering
	 */
	@Input() variant: 'dropdown' | 'autocomplete' = 'dropdown';

	/**
	 * Enable / disable autocomplete variant's Clear button. When 'false' autocomplete acts like a dropdown and opens on focus and hides 'Clear' icon button.
	 */
	@Input() autocompleteClearButton: boolean = true;

	/**
	 * With multiselects, disable or enable selection chips rendered below Select input
	 */
	@Input() showSelectionChips = true;

	/**
	 * Value output event on selection change
	 */
	@Output() selectionUpdate: EventEmitter<FudisSelectOption | null> = new EventEmitter<FudisSelectOption | null>();

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
	 * When selecting / deselecting options, sort them in same order as in DOM
	 */
	protected _sortedSelectedOptions: FudisSelectOption[] = [];

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

	protected _inputFocused: boolean = false;

	protected _preventClick: boolean = false;

	protected _preventDropdownReopen: boolean | undefined = false;

	protected _controlValueSubscription: Subscription;

	ngOnChanges(): void {
		this._required = this.required ?? hasRequiredValidator(this.control);
	}

	ngOnDestroy(): void {
		this._controlValueSubscription.unsubscribe();
	}

	public getAutocompleteFilterText(): Signal<string> {
		return this._autocompleteFilterText.asReadonly();
	}

	public closeDropdown(focusToInput: boolean = true, selectionClick: boolean = false): void {
		this._dropdownOpen = false;

		this._preventDropdownReopen = selectionClick;

		if (focusToInput) {
			this.inputRef.nativeElement.focus();
		}
	}

	public setOptionsVisibility(value: string, visible: boolean) {
		this._visibleOptionsValues = setVisibleOptionsList(this._visibleOptionsValues, value, visible);
	}

	/**
	 * Clear any written or selected value in the autocomplete field
	 */
	protected _clearAutocompleteFilterText(): void {
		// Clear input field and control value
		(this.inputRef.nativeElement as HTMLInputElement).value = '';
		this.controlValueChangedInternally = true;

		this._autocompleteFilterText.set('');

		this.control.patchValue(null);
	}

	protected _inputFocus(): void {
		if (!this.autocompleteClearButton && !this._dropdownOpen && !this._preventDropdownReopen) {
			this._openDropdown();

			this._preventClick = true;
			this._preventDropdownReopen = false;
		}

		this._inputFocused = true;
	}

	protected _clickInput(event: Event): void {
		const clickFromInputButton =
			event.target === this._toggleDropdownButton?.buttonEl.nativeElement.querySelector('fudis-icon') ||
			event.target === this._toggleDropdownButton?.buttonEl.nativeElement ||
			event.target === this._clearFilterButton?.buttonEl.nativeElement ||
			event.target === this._clearFilterButton?.buttonEl.nativeElement.querySelector('fudis-icon');

		if (!clickFromInputButton) {
			if (this._preventClick) {
				this._preventClick = false;
			} else if (this._dropdownOpen) {
				this.closeDropdown(false);
				this._preventDropdownReopen = true;
			} else {
				this._toggleDropdown();
			}
		}

		this.inputRef.nativeElement.focus();
	}

	protected _dropdownKeypress(event: KeyboardEvent, selector: string): void {
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
					this._focusToFirstOption(selector);
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

		if (this.autocompleteClearButton && this._autocompleteFilterText() === '') {
			this.closeDropdown();
		} else if (!this._dropdownOpen && key !== 'Escape' && key !== 'Enter') {
			this._openDropdown();
		}

		if (key === 'ArrowDown' && this._inputFocused) {
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

	protected _toggleDropdown(): void {
		this._dropdownOpen = !this._dropdownOpen;

		if (this._dropdownOpen) {
			this._openedOnce = true;
		}
	}

	private _openDropdown(): void {
		this._openedOnce = true;
		this._dropdownOpen = true;
	}

	/**
	 *
	 */
	private _focusToFirstOption(selector: string): void {
		const firstOption: HTMLInputElement = this._dropdownRef?.dropdownElement.nativeElement.querySelector(
			selector
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
				this._focusToFirstOption(selector);
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
