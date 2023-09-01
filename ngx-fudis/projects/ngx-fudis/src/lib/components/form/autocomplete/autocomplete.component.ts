import { AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit, effect } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { FudisDropdownOption, FudisInputWidth } from '../../../types/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';

import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';

@Component({
	selector: 'fudis-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent
	extends InputBaseDirective
	implements OnInit, AfterContentInit, OnChanges, AfterViewInit
{
	constructor(
		private _idService: FudisIdService,
		_translationService: FudisTranslationService
	) {
		super(_translationService);

		effect(() => {
			this._clearFilterText = this._translations().AUTOCOMPLETE.CLEAR;
		});
	}

	/**
	 * FormControl for the input.
	 */
	@Input({ required: true }) control: FormControl<FudisDropdownOption | null>;

	/**
	 * Option list
	 */
	@Input({ required: true }) options: FudisDropdownOption[];

	/**
	 * Available sizes for the autocomplete - defaults to large.
	 */
	@Input() size: FudisInputWidth = 'lg';

	/**
	 * Pre-selected dropdown options.
	 * If string, it fills the input with given string. NOTE: This sets formControl's value to 'null' if string does not match of any viewValues from 'options'.
	 * If given FudisDropdownOption, it searches given 'options' input array for matching 'value' and 'viewValue' with selectedOptions and updates formControl value with item from 'options' input.
	 */
	@Input() selectedOption: string | FudisDropdownOption;

	/**
	 * Option whether the dropdown options are shown only after three charactes (search) or if options are displayed when focusing the search input even without typing (dropdown)
	 */
	@Input() variant: 'search' | 'dropdown' = 'search';

	/**
	 * Internal formControl to check if typed text matches with any of the options' viewValue
	 */
	protected _autocompleteFormControl = new FormControl<string | null>('');

	/**
	 * Internal filtered options derived from options Input
	 */
	protected _filteredOptions: Observable<FudisDropdownOption[]>;

	/**
	 * Aria-label for close icon which clears the input
	 */
	protected _clearFilterText: string;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('autocomplete');
	}

	ngAfterContentInit() {
		this._setInitialValues();
		this._checkFilteredOptions();
	}

	ngAfterViewInit(): void {
		if (this.initialFocus) {
			this.focusToInput();
		}
	}

	ngOnChanges(): void {
		this._required = this.required ?? this.control.hasValidator(Validators.required);
	}

	/**
	 * Clear any written or selected value in the autocomplete field
	 */
	protected _clearFilter(): void {
		// Clear input field and control value
		this.control.setValue(null);
		this._autocompleteFormControl.setValue(null);

		this._checkFilteredOptions();

		// After clearing set focus back to input field
		this.inputRef.nativeElement.focus();
	}

	/**
	 * Handle blur
	 */
	protected _autocompleteBlur(event: Event): void {
		this.control.markAsTouched();
		if (this.control.valid && this.control.value) {
			this._autocompleteFormControl.patchValue(this.control.value.viewValue);
		}
		this.handleBlur.emit(event);
	}

	private _setInitialValues(): void {
		if (this.control.value) {
			this._autocompleteFormControl.patchValue(this.control.value.viewValue);
		} else if (this.selectedOption && typeof this.selectedOption !== 'string') {
			const findMe = this.selectedOption;

			const foundIndex = this.options.findIndex(
				(option: FudisDropdownOption) => option.value === findMe.value && option.viewValue === findMe.viewValue
			);
			if (foundIndex !== -1) {
				this._autocompleteFormControl.patchValue(this.options[foundIndex].viewValue);
				this.control.patchValue(this.options[foundIndex]);
			}
		} else if (this.selectedOption) {
			this._autocompleteFormControl.patchValue(this.selectedOption);
			this._updateControlValue(this.selectedOption);
		}
	}

	private _checkFilteredOptions() {
		if (this.variant === 'search') {
			this._filteredOptions = this._autocompleteFormControl.valueChanges.pipe(
				startWith(this._autocompleteFormControl.value),
				map((value) => {
					this._updateControlValue(value);
					// Start filtering after three characters
					if (value && value.length > 2 && !this.control.value) {
						return this._filter(value);
					}
					return [];
				})
			);
		}
		if (this.variant === 'dropdown') {
			this._filteredOptions = this._autocompleteFormControl.valueChanges.pipe(
				startWith(this._autocompleteFormControl.value),
				map((value) => {
					this._updateControlValue(value);
					if ((value || value === '') && !this.control.value) {
						return this._filter(value);
					}
					return [];
				})
			);
		}
	}

	/**
	 * Check that value is found from given options list, if not set control as null
	 */
	private _updateControlValue(value: string | null): void {
		if (!value) {
			this.control.patchValue(null);
		} else {
			const optionValue = this.options.find((option) => {
				return option.viewValue.toLowerCase() === value.toLowerCase() ? option : null;
			});

			if (optionValue) {
				this.control.patchValue(optionValue);
			} else {
				this.control.patchValue(null);
			}
		}
	}

	/**
	 * Filter options when user inputs text or opens dropdown
	 */
	private _filter(value: string): FudisDropdownOption[] {
		if (value || value === '') {
			const filterValue = value.toLowerCase();
			const filteredOptions = this.options.filter((option) => option.viewValue.toLowerCase().includes(filterValue));

			return filteredOptions;
		}
		return [];
	}
}
