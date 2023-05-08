import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IFudisDropdownOption } from '../../../types/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';

@Component({
	selector: 'fudis-input-with-language-options',
	templateUrl: './input-with-language-options.component.html',
	styleUrls: ['./input-with-language-options.component.scss'],
})
export class InputWithLanguageOptionsComponent extends InputBaseDirective implements OnInit {
	@Input() formGroup: FormGroup;

	@Input() options: IFudisDropdownOption[];

	dropdownControl: FormControl;

	@Input() groupErrorMsg: any;

	controlPlaceholder = new FormControl();

	dropdownValue: IFudisDropdownOption;

	override ngOnInit(): void {
		this.dropdownControl = new FormControl(this.options[0]);

		// [errorMsg]="groupErrorMsg[control.key]"
		console.log(this.groupErrorMsg);
	}

	handleLanguageSelect(value: IFudisDropdownOption): void {
		this.dropdownValue = value;
	}

	getLabel(controlKey: string): string {
		// const controlLanguage = this.options
		// 	.filter((option) => option.value === controlKey)
		// 	.forEach((option) => option.viewValue);

		// return controlLanguage !== undefined ? `${this.label}, ${controlLanguage}` : this.label;

		return this.label;
	}
}
