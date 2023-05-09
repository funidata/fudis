import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IFudisDropdownOption, TFudisFieldsetErrorMessages } from '../../../types/forms';
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

	controlPlaceholder = new FormControl();

	dropdownValue: IFudisDropdownOption;

	@Input() groupErrorMsg: TFudisFieldsetErrorMessages;

	/**
	 * Type of the input - defaults to 'text'
	 */
	@Input() type: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' = 'text';

	override ngOnInit(): void {
		this.dropdownControl = new FormControl(this.options[0]);
	}

	handleLanguageSelect(value: IFudisDropdownOption): void {
		this.dropdownValue = value;
	}
}
