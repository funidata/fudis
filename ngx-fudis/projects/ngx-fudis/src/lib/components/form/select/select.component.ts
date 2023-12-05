import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	HostListener,
	Input,
	OnChanges,
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
import { FudisFocusService } from '../../../services/focus/focus.service';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { FudisDropdownOption, FudisInputSize } from '../../../types/forms';
import { hasRequiredValidator } from '../../../utilities/form/getValidators';

import { SelectDropdownComponent } from './select-dropdown/select-dropdown.component';

@Component({
	selector: 'fudis-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class SelectComponent extends InputBaseDirective implements OnInit, AfterViewInit, OnChanges {
	constructor(
		private _focusService: FudisFocusService,
		_idService: FudisIdService,
		_translationService: FudisTranslationService
	) {
		super(_translationService, _idService);

		effect(() => {
			this._openAriaLabel = this._translations().AUTOCOMPLETE.MULTISELECT.OPEN_DROPDOWN;
			this._closeAriaLabel = this._translations().AUTOCOMPLETE.MULTISELECT.CLOSE_DROPDOWN;
			this._noResultsFound = this._translations().AUTOCOMPLETE.MULTISELECT.NO_RESULTS;
			this._removeItemText = this._translations().AUTOCOMPLETE.MULTISELECT.REMOVE_ITEM;
		});
	}

	@ViewChild('dropdownRef') dropdownRef: SelectDropdownComponent;

	@ViewChild('selectRef', { static: false }) selectElementRef: ElementRef;

	@ViewChild('inputWrapperRef') inputWrapperRef: ElementRef;

	/*
	 * FormControl for the dropdown
	 */
	@Input({ required: true }) control: FormControl<FudisDropdownOption | FudisDropdownOption[] | null>;

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
	@Input() size: 'xs' | FudisInputSize = 'lg';

	@Input() variant: 'dropdown' | 'autocomplete' = 'dropdown';

	@Input() openOnFocus: boolean = true;

	/**
	 * Value output event on selection change
	 */
	@Output() selectionUpdate: EventEmitter<FudisDropdownOption | null> = new EventEmitter<FudisDropdownOption | null>();

	public selectionLabelText: string | null = null;

	/**
	 * Internal property for toggle dropdown visibility
	 */
	protected _dropdownOpen: boolean;

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

	private _preventClick: boolean = false;

	private _preventDropdownReopen: boolean = false;

	private _inputFocused: boolean = false;

	/**
	 * Autocomplete user input filtering
	 */
	private _autocompleteFilterText: WritableSignal<string> = signal<string>('');

	handleSelectionChange(value: FudisDropdownOption | null, disableSignalEmit?: boolean): void {
		this.selectionUpdate.emit(value);
		this.control.patchValue(value);

		this.selectionLabelText = value?.label ? value.label : '';

		if (value && this.variant === 'autocomplete' && !disableSignalEmit) {
			this._autocompleteFilterText.set(value.label);
		}
	}

	ngOnInit(): void {
		this._setParentId();
	}

	ngAfterViewInit(): void {
		if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
			this.focusToInput();
		}
	}

	ngOnChanges(): void {
		this._required = this.required ?? hasRequiredValidator(this.control);
	}

	getAutocompleteFilterText(): Signal<string> {
		return this._autocompleteFilterText.asReadonly();
	}

	public handleMultiSelectionChange(option: FudisDropdownOption, removeSelection: boolean): void {
		const currentControlValue = this.control.value;

		if (removeSelection && currentControlValue) {
			const newControlValue = currentControlValue.filter((item: FudisDropdownOption) => {
				return item.value !== option.value;
			});

			this._sortAndPatchValue(newControlValue, true);
		} else if (currentControlValue === null || currentControlValue.length === 0) {
			this._sortAndPatchValue([option], false);
		} else {
			currentControlValue.push(option);
			this._sortAndPatchValue(currentControlValue as FudisDropdownOption[], true);
		}
	}

	public closeDropdown(selectionClick?: boolean): void {
		this._dropdownOpen = false;

		if (selectionClick) {
			this._preventDropdownReopen = true;
		}
		this.inputRef.nativeElement.focus();
	}

	protected _inputBlur(event: FocusEvent): void {
		if (!event.relatedTarget && this.multiselect) {
			setTimeout(() => {
				if (!document.activeElement?.classList.contains('fudis-dropdown-menu-item__focusable')) {
					this._dropdownOpen = false;
				}
			}, 150);
		} else if (!(event.relatedTarget as HTMLElement)?.classList.contains('fudis-dropdown-menu-item__focusable')) {
			this._dropdownOpen = false;
		}

		this._inputFocused = false;

		this.control.markAsTouched();
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
			this._dropdownOpen = false;
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
		if (event.key !== 'Escape') {
			this._dropdownOpen = true;
		}

		const { key } = event;

		switch (key) {
			case 'ArrowDown':
				if (this._inputFocused) {
					this._focusToFirstOption();
				}
				break;
			default:
				break;
		}

		this._autocompleteFilterText.set(event.target.value);

		if (
			this.control.value &&
			event.target.value.toLowerCase() !== (this.control.value as FudisDropdownOption).label.toLowerCase()
		) {
			this.selectionUpdate.emit(null);
			this.control.patchValue(null);
		}
	}

	private _openDropdown(): void {
		this._dropdownOpen = true;
	}

	private _toggleDropdown(): void {
		this._dropdownOpen = !this._dropdownOpen;
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
		const selectorCss = '.fudis-dropdown-menu-item__focusable';

		const firstOption: HTMLInputElement = this.dropdownRef?.dropdownElement.nativeElement.querySelector(
			selectorCss
		) as HTMLInputElement;

		if (firstOption) {
			firstOption.focus();
			this._focusTryCounter = 0;
		} else if (this._focusTryCounter < 100) {
			setTimeout(() => {
				this._focusTryCounter += 1;
				this._focusToFirstOption();
			}, 100);
		}
	}

	/**
	 * Arranges selected options in an order they are present in the DOM
	 * @param value list of options to be sorted and patched
	 * @param sort used if there more than one option selected
	 */
	private _sortAndPatchValue(value: FudisDropdownOption[], sort: boolean): void {
		if (sort) {
			const label: string[] = [];

			const sortedOptions = value.sort((a: FudisDropdownOption, b: FudisDropdownOption) => {
				if (a['htmlId'] < b['htmlId']) {
					return -1;
				}
				if (a['htmlId'] > b['htmlId']) {
					return 1;
				}
				return 0;
			});

			sortedOptions.forEach((item: FudisDropdownOption) => {
				label.push(item.label);
			});
			this.selectionLabelText = label.join(', ');
			this.control.patchValue(sortedOptions);
		} else {
			this.selectionLabelText = value[0].label;
			this.control.patchValue(value);
		}
	}

	/**
	 * When user clicks somewhere else than DropdownMenu or input element area, close dropdown
	 * @param targetElement
	 */
	@HostListener('document:click', ['$event.target'])
	private _handleWindowClick(targetElement: HTMLElement) {
		if (this._dropdownOpen) {
			const inputAreaClick = this.inputWrapperRef.nativeElement.contains(targetElement);

			const dropdownAreaClick = this.dropdownRef?.dropdownElement?.nativeElement.contains(targetElement);

			if (!inputAreaClick && !dropdownAreaClick) {
				this._dropdownOpen = false;
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
			(event.target as HTMLElement).closest('fudis-select')?.querySelector('input')?.focus();
			this._dropdownOpen = false;
		}
	}
}
