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

	/**
	 * Available sizes for the input - defaults to large. Recommended size for number input is small.
	 */
	@Input() size?: 's' | 'm' | 'l' = 'l';

	dropdownControl: FormControl;

	controlPlaceholder = new FormControl();

	dropdownValue: IFudisDropdownOption;

	inputId: string = '';

	@Input() groupErrorMsg: TFudisFieldsetErrorMessages;

	/**
	 * Type of the input - defaults to 'text'
	 */
	@Input() type: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' = 'text';

	override ngOnInit(): void {
		this.dropdownControl = new FormControl(this.options[0]);
		this.inputId = `${this.id}_${this.options[0].value}`;
	}

	handleLanguageSelect(value: IFudisDropdownOption): void {
		this.dropdownValue = value;
		this.inputId = `${this.id}_${value.value}`;
	}

	handleInputBlur(): void {
		if (this.groupErrorMsg) {
			this.updateErrors();
		}
	}
}
