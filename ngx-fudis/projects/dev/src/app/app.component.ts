import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { DialogService } from 'ngx-fudis';
import { DOCUMENT } from '@angular/common';

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
		private formBuilder: FormBuilder,
		private translocoService: TranslocoService
	) {}

	ngOnInit(): void {
		this.translocoService.getTranslation('en');
		this.translocoService.getTranslation('fi');
		this.translocoService.setActiveLang('fi');

		this.textInputControl = new FormControl('', Validators.required);
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
	}

	openDialog(): void {
		this.dialog.open(this.templateRef);
	}
}
