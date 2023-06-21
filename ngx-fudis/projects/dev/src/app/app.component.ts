/* eslint-disable no-console */
import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { DialogService, ErrorSummaryService, GridService } from 'ngx-fudis';
import { DOCUMENT } from '@angular/common';

import { IFudisDropdownOption, IFudisRadioButtonOption } from 'dist/ngx-fudis/lib/types/forms';
import { DialogTestContentComponent } from './dialog-test/dialog-test-content/dialog-test-content.component';

type MyForm = {
	dropdown: FormControl<IFudisDropdownOption | null>;
	textInput: FormControl<string | null>;
	truth: FormControl<boolean | null>;
	date: FormControl<Date | null>;
};
@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['./app.scss'],
})
export class AppComponent implements OnInit {
	@ViewChild('exampleDialogTemplate', { static: true }) templateRef: TemplateRef<unknown>;

	title = 'dev';

	dropdownOptions: IFudisDropdownOption[] = [
		{ value: 'value-1-dog', viewValue: 'Dog' },
		{ value: 'value-2-capybara', viewValue: 'Capybara' },
		{ value: 'value-3-platypys', viewValue: 'Platypus' },
		{ value: 'value-4-cat', viewValue: 'Cat, disabled for demo purposes', disabled: true },
		{ value: 'value-5-armadillo', viewValue: 'Screaming hairy armadillo' },
		{ value: 'value-6-gecko', viewValue: 'Southern Titiwangsa Bent-Toed Gecko' },
	];

	testFormGroup = new FormGroup<MyForm>({
		dropdown: new FormControl<IFudisDropdownOption | null>(this.dropdownOptions[2]),
		textInput: new FormControl<string | null>(null, Validators.required),
		truth: new FormControl<boolean | null>(null, Validators.required),
		date: new FormControl<Date | null>(null),
	});

	constructor(
		@Inject(DOCUMENT) private document: Document,
		public dialog: DialogService,
		private translocoService: TranslocoService,
		private errorSummaryService: ErrorSummaryService,
		private gridService: GridService
	) {
		gridService.setGridDefaultColumns({ xs: 1, lg: 2 });
	}

	errorSummaryVisible: boolean = false;

	showSuccessBodyText: boolean = false;

	transLatedOptions: any = {};

	radioButtonOptions: IFudisRadioButtonOption[] = [];

	ngOnInit(): void {
		this.translocoService.setActiveLang('en');
		this.translocoService.setActiveLang('fi');

		this.document.documentElement.lang = 'fi';

		this.translocoService.selectTranslateObject('options').subscribe((value) => {
			this.radioButtonOptions = [
				{ value: true, viewValue: value.chooseTruthTrue, id: 'boolean-2', name: 'booleans' },
				{ value: false, viewValue: value.chooseTruthFalse, id: 'boolean-1', name: 'booleans' },
			];
		});

		this.translocoService.selectTranslation().subscribe(() => {
			if (this.errorSummaryVisible) {
				setTimeout(() => {
					this.errorSummaryService.reloadErrors();
				}, 500);
			}
		});
	}

	changeLanguage(): void {
		if (this.translocoService.getActiveLang() === 'en') {
			this.translocoService.setActiveLang('fi');
			this.document.documentElement.lang = 'fi';
		} else {
			this.translocoService.setActiveLang('en');
			this.document.documentElement.lang = 'en';
		}
	}

	openDialog(): void {
		this.dialog.open(this.templateRef);
	}

	openDialogFromComponent(): void {
		this.dialog.open(DialogTestContentComponent);
	}

	testData = [
		{ key: 'First Name', value: 'Rex' },
		{ key: 'Last Name', value: 'Dangerwest' },
		{ key: 'Alias', value: 'Radical Emmet Xtreme' },
		{ key: 'Voice actor', value: 'Chris Pratt' },
		{ key: 'Favorite animal', value: 'Velociraptor', subHeading: 'Dinosaurus' },
		{ key: 'Real name', value: 'Emmet Joseph Brickowski' },
		{ key: 'Species', value: 'Lego' },
		{ key: 'Enemy', value: 'Emmet Brickowski', subHeading: 'Archenemy' },
		{ key: 'Enemy', value: 'Lucy', subHeading: 'Second Archenemy' },
	];

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

	// eslint-disable-next-line class-methods-use-this
	doSomething(event: any) {
		console.log('eventti mennyt perille', event);
	}
}
