/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import {
	FudisCheckboxOption,
	FudisDropdownOption,
	FudisRadioButtonOption,
} from 'projects/ngx-fudis/src/lib/types/forms';
import { untilDestroyed } from 'projects/ngx-fudis/src/lib/utilities/untilDestroyed';
import { FudisErrorSummaryService } from 'ngx-fudis';
import { FudisFormGroupValidators } from "projects/ngx-fudis/src/lib/utilities/form/validators";

type MyForm = {
	dropdown: FormControl<FudisDropdownOption | null>;
	dropdownMulti: FormControl<FudisDropdownOption[] | null>;
	textArea: FormControl<string | null>;
	textInput: FormControl<string | null | number>;
	truth: FormControl<boolean | null>;
	checkboxFormGroup: FormGroup;
	date: FormControl<Date | null>;
	autocompleteDropdown: FormControl<FudisDropdownOption | null>;
	autocompleteSearch: FormControl<FudisDropdownOption | null>;
};

@Component({
	selector: 'app-form-examples',
	templateUrl: 'formExamples.component.html',
})
export class AppFormExampleComponent implements OnInit {
	constructor(
		private _translocoService: TranslocoService,
		private _errorSummaryService: FudisErrorSummaryService
	) {}

	errorSummaryVisible: boolean = false;

	showSuccessBodyText: boolean = false;

	dropdownOptions: FudisDropdownOption[] = [
		{ value: 'value-1-dog', viewValue: 'Dog' },
		{ value: 'value-2-capybara', viewValue: 'Capybara' },
		{ value: 'value-3-platypys', viewValue: 'Platypus' },
		{ value: 'value-4-cat', viewValue: 'Cat, disabled for demo purposes', disabled: true },
		{ value: 'value-5-armadillo', viewValue: 'Screaming hairy armadillo' },
		{ value: 'value-6-gecko', viewValue: 'Southern Titiwangsa Bent-Toed Gecko' },
	];

	multipleOptions = Array.from({ length: 1000 }).map((value, i) => {
		return {
			value: i,
			viewValue: `Item number ${i}`,
		};
	});

	testFormGroup = new FormGroup<MyForm>({
		dropdown: new FormControl<FudisDropdownOption | null>(this.dropdownOptions[2]),
		dropdownMulti: new FormControl<FudisDropdownOption[] | null>([this.dropdownOptions[2], this.dropdownOptions[4]]),
		textArea: new FormControl<string | null>(null, Validators.required),
		textInput: new FormControl<string | null | number>(null, [
			Validators.required,
			Validators.minLength(5),
			Validators.maxLength(20),
		]),
		truth: new FormControl<boolean | null>(null, Validators.required),
		date: new FormControl<Date | null>(null, Validators.required),
        checkboxFormGroup: new FormGroup({
            checkbox0: new FormControl<FudisCheckboxOption | null>(null),
            checkbox1: new FormControl<FudisCheckboxOption | null>(null),
            checkbox2: new FormControl<FudisCheckboxOption | null>(null),
            checkbox3: new FormControl<FudisCheckboxOption | null>(null)},
          [FudisFormGroupValidators.atLeastOneRequired(), FudisFormGroupValidators.outOfRequiredRange(2, 3)]),
		autocompleteDropdown: new FormControl<FudisDropdownOption | null>(null, Validators.required),
		autocompleteSearch: new FormControl<FudisDropdownOption | null>(null),
	});

	radioButtonOptions: FudisRadioButtonOption[] = [];

	checkboxOptions: FudisCheckboxOption[] = [];

	private _untilDestroyed = untilDestroyed();

	ngOnInit(): void {
		this._translocoService
			.selectTranslateObject('options')
			.pipe(this._untilDestroyed())
			.subscribe((value) => {
				this.radioButtonOptions = [
					{ value: true, viewValue: value.chooseTruthTrue, id: 'boolean-2', name: 'booleans' },
					{ value: false, viewValue: value.chooseTruthFalse, id: 'boolean-1', name: 'booleans' },
				];
				this.checkboxOptions = [
					{ value: 'blueberry', label: value.blueberry, id: 'berry-1', name: 'berries' },
					{ value: 'cloudberry', label: value.cloudberry, id: 'berry-2', name: 'berries' },
					{ value: 'raspberry', label: value.raspberry, id: 'berry-3', name: 'berries' },
					{ value: 'strawberry', label: value.strawberry, id: 'berry-4', name: 'berries' },
				];
			});
	}

	clickSubmit(): void {
		this.testFormGroup.markAllAsTouched();

		if (this.testFormGroup.invalid) {
			this.errorSummaryVisible = true;
			this.showSuccessBodyText = false;
			this._errorSummaryService.reloadErrors();
		} else {
			this.errorSummaryVisible = false;
			this.showSuccessBodyText = true;
		}
	}

	toggleChecked(updatedOptions: FudisCheckboxOption[]): void {
    this.checkboxOptions = updatedOptions;
	}
}
