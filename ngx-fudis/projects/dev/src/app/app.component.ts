import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['./app.scss'],
})
export class AppComponent implements OnInit {
	title = 'dev';

	validatorsForDatepicker = [Validators.required];

	textAreaControl: FormControl = new FormControl('');

	datePickerControl: FormControl = new FormControl('', this.validatorsForDatepicker);

	textInputControl: any;

	constructor(private formBuilder: FormBuilder, private translocoService: TranslocoService) {}

	ngOnInit(): void {
		this.translocoService.getTranslation('en');
		this.translocoService.getTranslation('fi');
		this.translocoService.setActiveLang('fi');

		this.textInputControl = new FormControl('', Validators.required);
	}

	changeLanguage(): void {
		if (this.translocoService.getActiveLang() === 'en') {
			this.translocoService.setActiveLang('fi');
		} else {
			this.translocoService.setActiveLang('en');
		}
	}
}
