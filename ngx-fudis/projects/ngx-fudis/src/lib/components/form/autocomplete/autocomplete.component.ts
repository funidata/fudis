/* eslint-disable no-underscore-dangle */
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFudisAutocompleteOption, TFudisFormErrorMessages } from '../../../types/forms';
import isRequired from '../../../utilities/errors/errors.utility';
import { GuidanceComponent } from '../guidance/guidance.component';
import { TooltipApiDirective } from '../../../directives/tooltip/tooltip-api.directive';

export type AutocompleteInputSize = 's' | 'm' | 'l';

@Component({
	selector: 'fudis-autocomplete[label][id][options][clearFilterText]',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent extends TooltipApiDirective implements OnInit {
	@ViewChild(GuidanceComponent, { static: true }) guidanceToUpdate: GuidanceComponent;

	@ViewChild('fudisAutocompleteInput') autocompleteInput: ElementRef;

	/**
	 * Option list
	 */
	@isRequired
	@Input()
	options: IFudisAutocompleteOption[];

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
	@isRequired
	@Input()
	label: string;

	/**
	 * Unique id for autocomplete
	 */
	@isRequired
	@Input()
	id: string;

	/**
	 * Available sizes for the autocomplete - defaults to large.
	 */
	@Input() size: AutocompleteInputSize = 'l';

	/**
	 * Option for disabling the input
	 */
	@Input() disabled: boolean = false;

	/**
	 * Text to indicate compulsory
	 */
	@Input() requiredText: string;

	/**
	 * Aria-label for close icon which clears the input
	 */
	@Input() clearFilterText: string;

	/**
	 * Help text, aligned underneath the autocomplete input
	 */
	@Input() helpText: string;

	/**
	 * Error messages shown when form control validators are invalid
	 */
	@Input() errorMsg: TFudisFormErrorMessages;

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
	 * Check errors after user blurs focus from the autocomplete input
	 */
	handleBlur(): void {
		this.guidanceToUpdate.checkErrors();
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
