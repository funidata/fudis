import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldsetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { IFudisDropdownOption } from '../../../types/forms';

@Component({
	selector: 'fudis-fieldset-with-language-options',
	templateUrl: './fieldset-with-language-options.component.html',
	styleUrls: ['./fieldset-with-language-options.component.scss'],
})
export class FieldsetWithLanguageOptionsComponent extends FieldsetBaseDirective implements OnInit {
	@Input() formGroup: FormGroup;

	@Input() inputLabel: string;

	@Input() inputHelpText: string;

	@Input() options: IFudisDropdownOption[];

	dropdownControl: FormControl;

	controlPlaceholder = new FormControl();

	dropdownValue: IFudisDropdownOption;

	ngOnInit(): void {
		this.dropdownControl = new FormControl(this.options[0]);
	}

	handleLanguageSelect(value: IFudisDropdownOption): void {
		this.dropdownValue = value;
	}
}
