/* eslint-disable no-console */
import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { TranslocoService } from '@ngneat/transloco';
import {
	FudisTranslationConfigService,
	FudisDialogService,
	FudisErrorSummaryService,
	FudisGridService,
} from 'ngx-fudis';
import { DOCUMENT } from '@angular/common';

import { DialogTestContentComponent } from './dialog-test/dialog-test-content/dialog-test-content.component';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['./app.scss'],
})
export class AppComponent implements OnInit {
	@ViewChild('exampleDialogTemplate', { static: true }) templateRef: TemplateRef<unknown>;

	title = 'dev';

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private dialog: FudisDialogService,
		private translocoService: TranslocoService,
		private errorSummaryService: FudisErrorSummaryService,
		private gridService: FudisGridService,
		private fudisConfig: FudisTranslationConfigService
	) {
		gridService.setGridDefaultValues({
			columns: { xs: 1, xl: 2 },
			marginSides: 'responsive',
		});

		// fudisConfig.setConfig({
		// 	datepicker: { closeLabel: 'Close calendar' },
		// 	requiredText: 'Required',
		// 	language: 'en',
		// });
	}

	ngOnInit(): void {
		this.translocoService.setActiveLang('en');
		this.translocoService.setActiveLang('fi');

		this.document.documentElement.lang = 'fi';

		this.fudisConfig.setConfig({
			appLanguage: this.document.documentElement.lang,
			requiredText: this.translocoService.selectTranslate('required'),
			datepicker: { closeLabel: this.translocoService.selectTranslate('closeCalendar') },
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
		this.fudisConfig.setConfig({ appLanguage: this.document.documentElement.lang });
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
