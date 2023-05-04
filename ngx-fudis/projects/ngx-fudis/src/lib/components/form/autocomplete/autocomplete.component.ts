/* eslint-disable no-underscore-dangle */
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFudisAutocompleteOption } from '../../../types/forms';
import { FormBaseDirective } from '../../../directives/form/form-base.directive';

export type AutocompleteInputSize = 's' | 'm' | 'l';

@Component({
	selector: 'fudis-autocomplete[label][id][options][clearFilterText]',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent extends FormBaseDirective implements OnInit {
	@ViewChild('fudisAutocompleteInput') autocompleteInput: ElementRef;

	/**
	 * Option list
	 */
	@Input() options: IFudisAutocompleteOption[];

	/**
	 * Filtered options derived from options Input
	 */
	filteredOptions: Observable<IFudisAutocompleteOption[]>;

	/**
	 * FormControl for autocomplete
	 */
	@Input() control: FormControl;

	/**
	 * Available sizes for the autocomplete - defaults to large.
	 */
	@Input() size: AutocompleteInputSize = 'l';

	/**
	 * Aria-label for close icon which clears the input
	 */
	@Input() clearFilterText: string;

	/**
	 * If control has required validator, this is set to true
	 */
	required: boolean = false;

	ngOnInit(): void {
		if (this.control.hasValidator(Validators.required)) {
			this.required = true;
		}
		this.filteredOptions = this.control.valueChanges.pipe(
			map((value) => {
				// Start filtering after three characters
				if (value.length > 2) {
					const viewValue = typeof value === 'string' ? value : value?.viewValue;
					return viewValue ? this._filter(viewValue as string) : this.options.slice();
				}
				return [];
			})
		);
	}

	/**
	 * Filter options when user inputs text
	 */
	private _filter(viewValue: string): IFudisAutocompleteOption[] {
		const filterValue = viewValue.toLowerCase();

		return this.options.filter((option) => option.viewValue.toLowerCase().includes(filterValue));
	}

	/**
	 * Function to show option value as a string instead of object
	 * Bind to [displayWith] in template
	 */
	// eslint-disable-next-line class-methods-use-this
	displayFn(option: IFudisAutocompleteOption): string {
		return option && option.viewValue ? option.viewValue : '';
	}

	/**
	 * Clear any written or selected value in the autocomplete field
	 */
	clearFilter(): void {
		// Clear input field and control value
		this.autocompleteInput.nativeElement.value = '';
		this.control.setValue('');

		// After clearing set focus back to input field
		this.autocompleteInput.nativeElement.focus();
	}
}
