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
import { FudisGroupValidator, FudisFormControlValidators } from 'projects/ngx-fudis/src/lib/utilities/form/validators';
import { FudisDropdownLanguageOption, FudisInputWithLanguageOptionsFormGroup } from 'dist/ngx-fudis/lib/types/forms';

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
	withLanguages: FormGroup<FudisInputWithLanguageOptionsFormGroup>;
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
		textArea: new FormControl<string | null>(
			null,
			FudisFormControlValidators.required(this._translocoService.selectTranslateObject('form_errors.required'))
		),
		textInput: new FormControl<string | null | number>(null, [
			FudisFormControlValidators.required(this._translocoService.selectTranslateObject('form_errors.required')),
			Validators.minLength(5),
			Validators.maxLength(20),
		]),
		truth: new FormControl<boolean | null>(null, Validators.required),
		date: new FormControl<Date | null>(
			null,
			FudisFormControlValidators.required(this._translocoService.selectTranslateObject('form_errors.required'))
		),
		checkboxFormGroup: new FormGroup(
			{
				blueberry: new FormControl<FudisCheckboxOption | null>(null),
				cloudberry: new FormControl<FudisCheckboxOption | null>(null),
				raspberry: new FormControl<FudisCheckboxOption | null>(null),
				strawberry: new FormControl<FudisCheckboxOption | null>(null),
			},
			[
				FudisGroupValidator.min({
					value: 2,
					message: this._translocoService.selectTranslate('chooseBerryErrorMin'),
				}),
				FudisGroupValidator.max({
					value: 3,
					message: this._translocoService.selectTranslate('chooseBerryErrorMax'),
				}),
			]
		),
		autocompleteDropdown: new FormControl<FudisDropdownOption | null>(
			null,
			FudisFormControlValidators.required(this._translocoService.selectTranslateObject('form_errors.required'))
		),
		autocompleteSearch: new FormControl<FudisDropdownOption | null>(
			null,
			FudisFormControlValidators.required(this._translocoService.selectTranslateObject('form_errors.required'))
		),
		withLanguages: new FormGroup<FudisInputWithLanguageOptionsFormGroup>(
			{
				finnish: new FormControl<string | null>(null),
				swedish: new FormControl<string | null>(null),
				english: new FormControl<string | null>(null),
			},
			[FudisGroupValidator.atLeastOneRequired(this._translocoService.selectTranslate('error_one_required'))]
		),
	});

	_languageOptions: FudisDropdownLanguageOption[] = [
		{ value: 'finnish', viewValue: 'FI' },
		{ value: 'swedish', viewValue: 'SV' },
		{ value: 'english', viewValue: 'EN' },
	];

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
					{ controlName: 'blueberry', label: value.blueberry },
					{ controlName: 'cloudberry', label: value.cloudberry },
					{ controlName: 'raspberry', label: value.raspberry },
					{ controlName: 'strawberry', label: value.strawberry },
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

	// eslint-disable-next-line class-methods-use-this
	handleChange(updatedOptions: FudisCheckboxOption): void {
		// eslint-disable-next-line no-console
		console.log(updatedOptions);
	}
}
