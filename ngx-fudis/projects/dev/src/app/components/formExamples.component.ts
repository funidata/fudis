/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { FudisDropdownOption, FudisRadioButtonOption } from 'dist/ngx-fudis/lib/types/forms';
import { FudisErrorSummaryService, FudisTranslationConfigService } from 'ngx-fudis';

type MyForm = {
	dropdown: FormControl<FudisDropdownOption | null>;
	textInput: FormControl<string | null>;
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
		private translocoService: TranslocoService,
		private errorSummaryService: FudisErrorSummaryService,
		private fudisConfig: FudisTranslationConfigService
	) {
		// fudisConfig.setConfig({
		// 	datepicker: { closeLabel: 'Close calendar' },
		// 	requiredText: 'Required',
		// 	language: 'en',
		// });
	}

	errorSummaryVisible: boolean = false;

	showSuccessBodyText: boolean = false;

	transLatedOptions: any = {};

	closeLabel: string = '';

	requiredText: string = '';

	ngOnInit(): void {
		this.translocoService
			.selectTranslateObject('options')
			.pipe(takeUntilDestroyed())
			.subscribe((value) => {
				this.radioButtonOptions = [
					{ value: true, viewValue: value.chooseTruthTrue, id: 'boolean-2', name: 'booleans' },
					{ value: false, viewValue: value.chooseTruthFalse, id: 'boolean-1', name: 'booleans' },
				];
			});

		this.translocoService
			.selectTranslation()
			.pipe(takeUntilDestroyed())
			.subscribe(() => {
				if (this.errorSummaryVisible) {
					setTimeout(() => {
						this.errorSummaryService.reloadErrors();
					}, 100);
				}
			});
	}

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
		textInput: new FormControl<string | null>(null, Validators.required),
		truth: new FormControl<boolean | null>(null, Validators.required),
		date: new FormControl<Date | null>(null, Validators.required),
		autocompleteDropdown: new FormControl<FudisDropdownOption | null>(null, Validators.required),
		autocompleteSearch: new FormControl<FudisDropdownOption | null>(null),
	});

	radioButtonOptions: FudisRadioButtonOption[] = [];

	clickSubmit(): void {
		this.testFormGroup.markAllAsTouched();

		if (this.testFormGroup.invalid) {
			this.errorSummaryVisible = true;
			this.showSuccessBodyText = false;
			setTimeout(() => {
				this.errorSummaryService.reloadErrors();
			}, 500);
		} else {
			this.errorSummaryVisible = false;
			this.showSuccessBodyText = true;
		}
	}
}
