/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFudisAutocompleteOption, IFudisErrorMessages } from '../../../types/forms';
import { GuidanceComponent } from '../guidance/guidance.component';

@Component({
	selector: 'fudis-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
	@ViewChild(GuidanceComponent, { static: true }) guidanceToUpdate: GuidanceComponent;

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
	 * Label for autocomplete
	 */
	@Input() label: string;

	/**
	 * Id for autocomplete
	 */
	@Input() id: string;

	/**
	 * Available sizes for the autocomplete - defaults to large.
	 */
	@Input() size?: 's' | 'm' | 'l' = 'l';

	/**
	 * Text to indicate compulsory
	 */
	@Input() requiredText: string;

	/**
	 * Help text, aligned underneath the autocomplete input
	 */
	@Input() helpText: string;

	/**
	 * Error messages shown when form control validators are invalid
	 */
	@Input() errorMsg: IFudisErrorMessages;

	required: boolean = false;

	ngOnInit(): void {
		if (this.control.hasValidator(Validators.required)) {
			this.required = true;
		}

		/**
		 * Filter options when user inputs text
		 */
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
	 * Check errors after user blurs focus from the autocomplete input
	 */
	handleBlur(): void {
		this.guidanceToUpdate.checkErrors();
	}
}
