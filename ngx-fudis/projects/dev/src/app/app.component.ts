/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { TranslocoService } from '@ngneat/transloco';
import { FudisDialogService, FudisErrorSummaryService, FudisGridService } from 'ngx-fudis';
import { DOCUMENT } from '@angular/common';

import { FudisDropdownOption } from 'dist/ngx-fudis/lib/types/forms';
import { DialogTestContentComponent } from './dialog-test/dialog-test-content/dialog-test-content.component';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['./app.scss'],
})
export class AppComponent implements OnInit {
	@ViewChild('exampleDialogTemplate', { static: true }) templateRef: TemplateRef<unknown>;

	title = 'dev';

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

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private dialog: FudisDialogService,
		private translocoService: TranslocoService,
		private errorSummaryService: FudisErrorSummaryService,
		private gridService: FudisGridService,
		private fudisConfig: FudisTranslationService
	) {
		gridService.setGridDefaultValues({
			columns: { xs: 1, lg: 2 },
			marginSides: 'responsive',
		});
	}

	ngOnInit(): void {
		this.translocoService.setActiveLang('en');
		this.translocoService.setActiveLang('fi');

		this.document.documentElement.lang = 'fi';
	}

	changeLanguage(): void {
		if (this.translocoService.getActiveLang() === 'en') {
			this.translocoService.setActiveLang('fi');
			this.document.documentElement.lang = 'fi';
		} else {
			this.translocoService.setActiveLang('en');
			this.document.documentElement.lang = 'en';
		}
		// this.fudisConfig.setConfig({ appLanguage: this.document.documentElement.lang });
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

	// eslint-disable-next-line class-methods-use-this
	doSomething(event: any) {
		console.log('eventti mennyt perille', event);
	}
}
