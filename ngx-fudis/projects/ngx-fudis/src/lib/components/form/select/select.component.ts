import {
	AfterViewInit,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	HostBinding,
	HostListener,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	Signal,
	ViewChild,
	ViewEncapsulation,
	WritableSignal,
	effect,
	signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { FudisSelectOption, FudisInputSize } from '../../../types/forms';
import { hasRequiredValidator } from '../../../utilities/form/getValidators';

import { SelectDropdownComponent } from './select-dropdown/select-dropdown.component';
import { joinInputValues, setVisibleOptionsList, sortValues } from './selectUtilities';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';

@Component({
	selector: 'fudis-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class SelectComponent extends InputBaseDirective implements OnInit, AfterViewInit, OnChanges, OnDestroy {
	constructor(
		private _focusService: FudisFocusService,
		_idService: FudisIdService,
		_translationService: FudisTranslationService
	) {
		super(_translationService, _idService);

		effect(() => {
			this._openAriaLabel = this._translations().SELECT.OPEN_DROPDOWN;
			this._closeAriaLabel = this._translations().SELECT.CLOSE_DROPDOWN;
			this._noResultsFound = this._translations().SELECT.AUTOCOMPLETE.NO_RESULTS;
			this._removeItemText = this._translations().SELECT.MULTISELECT.REMOVE_ITEM;
			this.optionDisabledText = this._translations().SELECT.DISABLED;
		});
	}

	@HostBinding('class') classes = 'fudis-select-host';

	@ViewChild('dropdownRef') dropdownRef: SelectDropdownComponent;

	@ViewChild('selectRef', { static: false }) selectElementRef: ElementRef;

	@ViewChild('inputWrapperRef') inputWrapperRef: ElementRef;

	@ContentChild(ContentDirective) content: ContentDirective;

	/*
	 * FormControl for the dropdown
	 */
	@Input({ required: true }) control: FormControl<FudisSelectOption | FudisSelectOption[] | null>;

	/**
	 * If true, user can choose multiple checkbox options from dropdown
	 */
	@Input() multiselect: boolean = false;

	/**
	 * Placeholder text for the dropdown input when no selection has been made
	 */
	@Input() placeholder: string;

	/**
	 * Available sizes for the dropdown
	 */
	@Input() size: FudisInputSize = 'lg';

	/**
	 * "dropdown" variant for regular dropdown and "autocomplete" enables user typing for search result filtering
	 */
	@Input() variant: 'dropdown' | 'autocomplete' = 'dropdown';

	/**
	 * When focusing on input, open dropdown menu
	 */
	@Input() openOnFocus: boolean = true;

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
	 * Internal translated text for disabled select option
	 */
	public optionDisabledText: string;

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
	 * Internal translated text to indicate deleting item chip aria-label
	 */
	protected _removeItemText: string;

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

	private _sortedSelectedOptionsSignal: WritableSignal<FudisSelectOption[]> = signal<FudisSelectOption[]>([]);

	private _preventClick: boolean = false;

	private _preventDropdownReopen: boolean | undefined = false;

	private _inputFocused: boolean = false;

	private _controlValueSubscription: Subscription;

	/**
	 * Autocomplete user input filtering
	 */
	public handleSelectionChange(value: FudisSelectOption | null, disableSignalEmit?: boolean): void {
		this.selectionUpdate.emit(value);
		this.controlValueChangedInternally = true;
		this.control.patchValue(value);

		if (this.variant === 'autocomplete') {
			(this.inputRef.nativeElement as HTMLInputElement).value = (this.control.value as FudisSelectOption).label;
		} else {
			this.dropdownSelectionLabelText = value?.label ? value.label : '';
		}

		if (value && this.variant === 'autocomplete' && !disableSignalEmit) {
			this._autocompleteFilterText.set(value.label);
		}
	}

	public handleMultiSelectionChange(option: FudisSelectOption, type: 'add' | 'remove'): void {
		let updatedValue = this.control.value as FudisSelectOption[] | null;

		if (type === 'remove' && updatedValue) {
			updatedValue = updatedValue.filter((item: FudisSelectOption) => {
				return item.value !== option.value;
			});
		} else if (!updatedValue) {
			updatedValue = [option];
		} else if (type === 'add') {
			updatedValue.push(option);
		}

		this._sortedSelectedOptions = sortValues(updatedValue);

		this.dropdownSelectionLabelText = joinInputValues(this._sortedSelectedOptions);

		this.controlValueChangedInternally = true;

		this.control.patchValue(this._sortedSelectedOptions);
	}

	public handleCheckedSort(checkedOption: FudisSelectOption): void {
		const foundIndex: number = this._sortedSelectedOptions.findIndex((option) => {
			return option.value === checkedOption.value && option.label === checkedOption.label;
		});

		if (foundIndex !== -1) {
			this._sortedSelectedOptions[foundIndex] = checkedOption;

			this._sortedSelectedOptions = sortValues(this._sortedSelectedOptions);

			this.dropdownSelectionLabelText = joinInputValues(this._sortedSelectedOptions);
		}
	}

	ngOnInit(): void {
		this._setParentId();

		this._controlValueSubscription = this.control.valueChanges.subscribe((value) => {
			if (!this.controlValueChangedInternally) {
				this._updateSelectionFromControlValue();
			}

			console.table(value);

			this.controlValueChangedInternally = false;
		});
	}

	ngAfterViewInit(): void {
		if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
			this.focusToInput();
		}

		if (this.control.value) {
			this._updateSelectionFromControlValue();
		}
	}

	ngOnChanges(): void {
		this._required = this.required ?? hasRequiredValidator(this.control);
	}

	ngOnDestroy(): void {
		this._controlValueSubscription.unsubscribe();
	}

	public getAutocompleteFilterText(): Signal<string> {
		return this._autocompleteFilterText.asReadonly();
	}

	public getSelectedOptions(): Signal<FudisSelectOption[]> {
		return this._sortedSelectedOptionsSignal.asReadonly();
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

	protected _inputBlur(event: FocusEvent): void {
		if (!event.relatedTarget && this.multiselect) {
			setTimeout(() => {
				if (!document.activeElement?.classList.contains('fudis-select-option__focusable')) {
					this.closeDropdown(false);
				}
			}, 150);
		} else if (!(event.relatedTarget as HTMLElement)?.classList.contains('fudis-select-option__focusable')) {
			this.closeDropdown(false);
		}

		this._inputFocused = false;

		this.control.markAsTouched();
	}

	protected _setInputValueOnBlur(): void {
		if (this.control.value && !this.multiselect) {
			(this.inputRef.nativeElement as HTMLInputElement).value = (this.control.value as FudisSelectOption).label;
		}
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
		if (this.openOnFocus && !this._dropdownOpen && !this._preventDropdownReopen) {
			this._openDropdown();
			this._preventClick = true;
			this._preventDropdownReopen = false;
		}

		this._inputFocused = true;
	}

	protected _clickInput(): void {
		if (this._preventClick) {
			this._preventClick = false;
		} else if (this._dropdownOpen) {
			this.closeDropdown(false);
			this._preventDropdownReopen = true;
		} else {
			this._toggleDropdown();
		}

		this.inputRef.nativeElement.focus();
	}

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
	 * Filter options from keyboard input
	 */
	protected _autocompleteKeypress(event: any): void {
		const { key } = event;

		if (!this._dropdownOpen && key !== 'Escape' && key !== 'Enter') {
			this._openDropdown();
		}

		if (key === 'ArrowDown' && this._inputFocused) {
			event.preventDefault();
			this._focusToFirstOption();
		}

		if (this._autocompleteFilterText() !== event.target.value) {
			this._autocompleteFilterText.set(event.target.value);
		}

		if (!this.multiselect) {
			if (
				this.control.value &&
				event.target.value.toLowerCase() !== (this.control.value as FudisSelectOption).label.toLowerCase()
			) {
				this.controlValueChangedInternally = true;
				this.selectionUpdate.emit(null);
				this.control.patchValue(null);
			}
		}
	}

	/**
	 * Handle chip item remove by index. If there are no selections done, focus back to input on last item removal.
	 */
	protected _handleRemoveChip(index: number): void {
		const currentValue = this.control.value as FudisSelectOption[];

		if (currentValue) {
			currentValue.splice(index, 1);
			if (currentValue!.length === 0) {
				this.inputRef.nativeElement.focus();
			}

			this.dropdownSelectionLabelText = joinInputValues(currentValue);
			this._sortedSelectedOptionsSignal.set(currentValue);
			this.controlValueChangedInternally = true;
			this.control.patchValue(currentValue);
		}
	}

	private _openDropdown(): void {
		this._openedOnce = true;
		this._dropdownOpen = true;
	}

	private _toggleDropdown(): void {
		this._dropdownOpen = !this._dropdownOpen;

		if (this._dropdownOpen) {
			this._openedOnce = true;
		}
	}

	/**
	 * Generate html id for parent FudisSelect
	 */
	private _setParentId(): void {
		if (this.id) {
			this._idService.addNewParentId('select', this.id);
		} else {
			this.id = this._idService.getNewParentId('select');
		}
	}

	/**
	 *
	 */
	private _focusToFirstOption(): void {
		const selectorCss = '.fudis-select-option__focusable';

		const firstOption: HTMLInputElement = this.dropdownRef?.dropdownElement.nativeElement.querySelector(
			selectorCss
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
				this._focusToFirstOption();
			}, 100);
		}
	}

	private _updateSelectionFromControlValue(): void {
		if (!this.multiselect) {
			/**
			 * Single select dropdown
			 */
			this.dropdownSelectionLabelText = (this.control.value as FudisSelectOption).label;

			if (this.variant === 'autocomplete') {
				const { label, value } = this.control.value as FudisSelectOption;

				(this.inputRef.nativeElement as HTMLInputElement).value = label;
				this._autocompleteFilterText.set(label);

				this._visibleOptionsValues = [value];
			}
		} else if (this.multiselect) {
			/**
			 * Multiselect
			 */

			const value = this.control.value as FudisSelectOption[];

			this._sortedSelectedOptions = sortValues(value);
			this._sortedSelectedOptionsSignal.set(this._sortedSelectedOptions);

			if (this.variant === 'dropdown') {
				this.dropdownSelectionLabelText = joinInputValues(this._sortedSelectedOptions);
			} else {
				this._visibleOptionsValues = value.map((option) => option.value);
			}
		}
	}

	/**
	 * When user clicks somewhere else than DropdownMenu or input element area, close dropdown
	 * @param targetElement
	 */
	@HostListener('document:click', ['$event.target'])
	private _handleWindowClick(targetElement: HTMLElement) {
		if (this._dropdownOpen && !this._inputFocused) {
			const dropdownAreaClick = this.dropdownRef?.dropdownElement?.nativeElement.contains(targetElement);

			const inputAreaClick = (this.inputWrapperRef.nativeElement as HTMLElement).contains(targetElement);

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
