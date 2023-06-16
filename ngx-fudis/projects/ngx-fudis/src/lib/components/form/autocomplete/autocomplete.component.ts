import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { IFudisDropdownOption } from '../../../types/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';

export type AutocompleteInputSize = 's' | 'm' | 'l';

@Component({
	selector: 'fudis-autocomplete[label][id][options][clearFilterText]',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent extends InputBaseDirective implements OnInit, AfterContentInit {
	@ViewChild('fudisAutocompleteInput') autocompleteInput: ElementRef;

	/**
	 * FormControl for the input.
	 */
	@Input() control: FormControl<IFudisDropdownOption | null>;

	/**
	 * Option list
	 */
	@Input() options: IFudisDropdownOption[];

	/**
	 * Filtered options derived from options Input
	 */
	filteredOptions: Observable<IFudisDropdownOption[]>;

	/**
	 * Available sizes for the autocomplete - defaults to large.
	 */
	@Input() size: AutocompleteInputSize = 'l';

	/**
	 * Aria-label for close icon which clears the input
	 */
	@Input() clearFilterText: string;

	/**
	 * Option whether the dropdown options are shown only after three charactes (search) or if options are displayed when focusing the search input even without typing (dropdown)
	 */
	@Input() variant: 'search' | 'dropdown' = 'search';

	/**
	 * Internal formControl to check if typed text matches with any of the options' viewValue
	 */
	autocompleteFormControl = new FormControl<string | null>('');

	protected _collapsed: boolean = true;

	ngAfterContentInit() {
		if (this.control.value) {
			this.autocompleteFormControl.patchValue(this.control.value.viewValue);
		}

		this.checkFilteredOptions();
	}

	checkFilteredOptions() {
		if (this.variant === 'search') {
			this.filteredOptions = this.autocompleteFormControl.valueChanges.pipe(
				map((value) => {
					// Start filtering after three characters
					if (value && value.length > 2) {
						this.isValueOption(value.toLowerCase());
						return this._filter(value);
					}
					this.isValueOption(null);
					console.log('value', value);
					return [];
				})
			);
		}
		if (this.variant === 'dropdown') {
			this.filteredOptions = this.autocompleteFormControl.valueChanges.pipe(
				startWith(''),
				map((value) => {
					console.log('formControl value', this.control.value);
					console.log('autocompleteControl value', this.autocompleteFormControl.value);
					if (value || value === '') {
						console.log('filteredOptions value', value);
						this.isValueOption(value?.toLowerCase() as string);
						return this._filter(value as string);
					}
					this.isValueOption(null);
					return [];
				})
			);
		}
	}

	isValueOption(value: string | null): void {
		if (!value) {
			this.control.patchValue(null);
			// console.log('isValueOption value', value);
			// console.log('isValueOption control', this.control.value);
		} else {
			const optionValue = this.options.find((option) => {
				return option.viewValue.toLowerCase() === value ? option : null;
			});

			if (optionValue) {
				// console.log('isValueOption optionValue', optionValue);
				this.control.patchValue(optionValue);
			} else {
				this.control.patchValue(null);
			}
		}
	}

	/**
	 * Filter options when user inputs text
	 */
	private _filter(value: string): IFudisDropdownOption[] {
		if (value || value === '') {
			// console.log('_filter viewValue', value);
			const filterValue = value.toLowerCase();

			return this.options.filter((option) => option.viewValue.toLowerCase().includes(filterValue));
		}
		return [];
	}

	/**
	 * Clear any written or selected value in the autocomplete field
	 */
	clearFilter(): void {
		// Clear input field and control value
		this.control.setValue(null);
		console.log(' clearFilter control value', this.control.value);
		this.autocompleteFormControl.setValue(null);

		this.checkFilteredOptions();

		// After clearing set focus back to input field
		this.autocompleteInput.nativeElement.focus();
	}

	autocompleteBlur(event: Event): void {
		this.control.markAsTouched();
		if (this.control.valid && this.control.value) {
			this.autocompleteFormControl.patchValue(this.control.value.viewValue);
		}
		this.handleBlur.emit(event);
	}

	ngOnInit(): void {
		checkRequiredAttributes(this.id, this.requiredText, this.control, undefined, this.ignoreRequiredCheck);
	}
}
