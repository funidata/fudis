import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IFudisDropdownOption, TFudisGroupErrorMessages } from '../../../types/forms';
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

	@Input() groupErrorMsg: TFudisGroupErrorMessages;

	@Input() missingLanguage: string | null;

	/**
	 * Type of the input - defaults to 'text'
	 */
	@Input() type: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' = 'text';

	updatedOptions: IFudisDropdownOption[] = [];

	override ngOnInit(): void {
		this.updatedOptions = this.missingLanguage ? this.updateDropdownList() : this.options;
		this.dropdownControl = new FormControl(this.updatedOptions[0]);
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
		this.updatedOptions = this.missingLanguage ? this.updateDropdownList() : this.options;
	}

	updateDropdownList(): IFudisDropdownOption[] {
		const newOptions: IFudisDropdownOption[] = [];

		this.options.forEach((option) => {
			if (this.formGroup.controls[option.value].invalid || !this.formGroup.controls[option.value].value) {
				const updatedOption = { ...option, viewValue: `${option.viewValue} (${this.missingLanguage})` };

				newOptions.push(updatedOption);

				if (option.value === this.dropdownControl?.value.value) {
					this.dropdownControl.patchValue(updatedOption);
				}
			} else {
				if (option.value === this.dropdownControl?.value.value) {
					this.dropdownControl.patchValue(option);
				}
				newOptions.push(option);
			}
		});

		return newOptions;
	}
}
