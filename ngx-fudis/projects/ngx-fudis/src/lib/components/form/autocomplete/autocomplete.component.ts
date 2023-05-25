/* eslint-disable no-underscore-dangle */
import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
	 * Internal formControl to check if typed text matches with any of the options' viewValue
	 */
	autocompleteFormControl = new FormControl<string>('');

	ngAfterContentInit() {
		if (this.control.value) {
			this.autocompleteFormControl.patchValue(this.control.value.viewValue);
		}

		this.filteredOptions = this.autocompleteFormControl.valueChanges.pipe(
			map((value) => {
				// Start filtering after three characters
				if (value && value.length > 2) {
					this.isValueOption(value.toLowerCase());
					return this._filter(value);
				}
				this.isValueOption(null);
				return [];
			})
		);
	}

	isValueOption(value: string | null): void {
		if (!value) {
			this.control.patchValue(null);
		} else {
			const optionValue = this.options.find((option) => {
				return option.viewValue.toLowerCase() === value ? option : null;
			});

			if (optionValue) {
				this.control.patchValue(optionValue);
			} else {
				this.control.patchValue(null);
			}
		}
	}

	/**
	 * Filter options when user inputs text
	 */
	private _filter(viewValue: string): IFudisDropdownOption[] {
		const filterValue = viewValue.toLowerCase();

		return this.options.filter((option) => option.viewValue.toLowerCase().includes(filterValue));
	}

	/**
	 * Clear any written or selected value in the autocomplete field
	 */
	clearFilter(): void {
		// Clear input field and control value
		this.control.setValue(null);
		this.autocompleteFormControl.setValue(null);

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
