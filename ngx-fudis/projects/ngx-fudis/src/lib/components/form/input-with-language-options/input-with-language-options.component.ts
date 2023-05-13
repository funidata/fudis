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

	for: string = '';

	currentValues: { [key: string]: any } = {};

	atLeastOneIsRequired: boolean = false;

	@Input() groupErrorMsg: TFudisGroupErrorMessages;

	@Input() missingLanguage: string | null;

	/**
	 * Type of the input - defaults to 'text'
	 */
	@Input() type: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' = 'text';

	updatedOptions: IFudisDropdownOption[] = [];

	ngOnInit(): void {
		this.updatedOptions = this.missingLanguage ? this.updateDropdownList() : this.options;
		this.dropdownControl = new FormControl(this.updatedOptions[0]);
		this.for = `${this.id}_${this.options[0].value}`;
	}

	handleLanguageSelect(value: IFudisDropdownOption): void {
		this.dropdownValue = value;
		this.for = `${this.id}_${value.value}`;
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

	checkAtLeastOneIsRequired(controlKey: string, controlValue: string): boolean {
		if (!this.currentValues[controlKey]) {
			this.currentValues = { ...this.currentValues, [controlKey]: controlValue };
		} else {
			this.currentValues[controlKey] = controlValue;
		}

		if (this.formGroup?.errors?.['atLeastOneRequired']) {
			this.atLeastOneIsRequired = true;
			return true;
		}

		const nonEmptyControls = Object.values(this.currentValues).filter((item) => {
			return item !== '';
		});

		if (nonEmptyControls.length === 1 && controlValue && this.atLeastOneIsRequired) {
			return true;
		}

		return false;
	}
}
