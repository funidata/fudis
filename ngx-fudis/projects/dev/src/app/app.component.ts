import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { DialogService, ErrorSummaryService } from 'ngx-fudis';
import { DOCUMENT } from '@angular/common';
import { filter, pluck } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['./app.scss'],
})
export class AppComponent implements OnInit {
	@ViewChild('exampleDialogTemplate', { static: true }) templateRef: TemplateRef<unknown>;

	title = 'dev';

	validatorsForDatepicker = [Validators.required];

	textAreaControl: FormControl = new FormControl('');

	datePickerControl: FormControl = new FormControl('', this.validatorsForDatepicker);

	textInputControl: any;

	constructor(
		@Inject(DOCUMENT) private document: Document,
		public dialog: DialogService,
		private translocoService: TranslocoService,
		private errorSummaryService: ErrorSummaryService
	) {}

	name = 'Angular 5';

	differ: any;

	ngOnInit(): void {
		this.translocoService.setActiveLang('en');
		this.translocoService.setActiveLang('fi');

		this.textInputControl = new FormControl('', Validators.required);
		this.document.documentElement.lang = 'fi';

		this.translocoService.events$
			.pipe(
				filter((e) => e.type === 'langChanged'),
				pluck('payload')
			)
			.subscribe(({ langName, scope }) => {
				setTimeout(() => {
					this.errorSummaryService.reloadErrors();
				}, 1000);
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
}
