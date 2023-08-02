/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { FudisDropdownOption, FudisRadioButtonOption } from 'dist/ngx-fudis/lib/types/forms';
import { untilDestroyed } from 'projects/ngx-fudis/src/lib/utilities/untilDestroyed';
import { FudisErrorSummaryService } from 'ngx-fudis';

type MyForm = {
	dropdown: FormControl<FudisDropdownOption | null>;
	dropdownMulti: FormControl<FudisDropdownOption[] | null>;
	textInput: FormControl<string | null | number>;
	truth: FormControl<boolean | null>;
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
		textInput: new FormControl<string | null | number>(null, [
			Validators.required,
			Validators.minLength(5),
			Validators.maxLength(20),
		]),
		truth: new FormControl<boolean | null>(null, Validators.required),
		date: new FormControl<Date | null>(null, Validators.required),
		autocompleteDropdown: new FormControl<FudisDropdownOption | null>(null, Validators.required),
		autocompleteSearch: new FormControl<FudisDropdownOption | null>(null),
	});

	radioButtonOptions: FudisRadioButtonOption[] = [];

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
}
