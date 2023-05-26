import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
	FudisInputWithLanguageOptionsFormGroup,
	IFudisDropdownOption,
	TFudisDropdownLanguageOption,
	TFudisGroupErrorMessages,
} from '../../../types/forms';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';

@Component({
	selector: 'fudis-input-with-language-options',
	templateUrl: './input-with-language-options.component.html',
	styleUrls: ['./input-with-language-options.component.scss'],
})
export class InputWithLanguageOptionsComponent extends InputBaseDirective implements OnInit {
	/**
	 * FormGroup including controls.
	 */
	@Input() formGroup: FormGroup<FudisInputWithLanguageOptionsFormGroup>;

	/**
	 * Option list for language selection Fudis Dropdown. To pair control with corresponding dropdown option Dropdown option "value" must equal to control's name. E.g. "{value: 'english', viewValue: 'EN'}" pairs with "english: New FormControl('')"
	 */
	@Input() options: TFudisDropdownLanguageOption[];

	/**
	 * Available sizes for the input - defaults to large.
	 */
	@Input() size?: 's' | 'm' | 'l' = 'l';

	/*
	 * Object containing error messages for each FormControl and for the FormGroup.
	 * E. g. {atLeastOneRequired: 'At least one input of any language must have a value.', finnish:{maxlength: 'Input in Finnish cannot be longer than X charactes.'}}
	 */

	@Input() groupErrorMsg: TFudisGroupErrorMessages;

	/**
	 * Indicator text added to the dropdown list if input of a language is empty.
	 */
	@Input() missingLanguage: string | null;

	@Input() variant: 'text-input' | 'text-area' = 'text-input';

	dropdownControl: FormControl<IFudisDropdownOption>;

	dropdownValue: IFudisDropdownOption;

	for: string = '';

	requiredControls: { [key: string]: { value?: string | null; requiredText: string | undefined } } = {};

	atLeastOneRequired: boolean = false;

	nonEmptyControls: string[] = [];

	updatedOptions: IFudisDropdownOption[] = [];

	ngOnInit(): void {
		checkRequiredAttributes(this.id, this.requiredText, undefined, this.formGroup);
		this.updatedOptions = this.missingLanguage ? this.updateDropdownList() : this.options;
		this.dropdownControl = new FormControl(this.updatedOptions[0]);
		this.for = `${this.id}_${this.options[0].value}`;

		this.initialRequiredCheck();
	}

	handleLanguageSelect(value: IFudisDropdownOption): void {
		this.dropdownValue = value;
		this.for = `${this.id}_${value.value}`;
	}

	handleInputBlur(event: Event, controlKey: string): void {
		this.updatedOptions = this.missingLanguage ? this.updateDropdownList() : this.options;

		this.isControlRequired((event.target as HTMLInputElement).value, controlKey);
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

	/**
	 * OnInit check to forward necessary "requiredText" attributes to all generated inputs.
	 */
	initialRequiredCheck(): void {
		this.requiredControls = {};
		if (this.formGroup.errors?.['atLeastOneRequired'] || this.groupErrorMsg?.atLeastOneRequired) {
			this.atLeastOneRequired = true;

			Object.keys(this.formGroup.controls).forEach((control) => {
				this.requiredControls = {
					...this.requiredControls,
					[control]: {
						value: this.formGroup.controls[control].value,
						requiredText: this.requiredText,
					},
				};
			});
		} else {
			Object.keys(this.formGroup.controls).forEach((control) => {
				this.requiredControls = {
					...this.requiredControls,
					[control]: {
						value: this.formGroup.controls[control].value,
						requiredText: this.formGroup.controls[control].hasValidator(Validators.required)
							? this.requiredText
							: undefined,
					},
				};
			});
		}
	}

	/**
	 * Check onBlur if requiredText is needed to be shown
	 */
	isControlRequired(value: string, controlKey: string): void {
		// If all controls are invalid run initialRequiredCheck()
		if (this.formGroup.errors?.['atLeastOneRequired']) {
			this.initialRequiredCheck();
		} else if (this.atLeastOneRequired && controlKey) {
			// Check how many controls are empty
			this.requiredControls[controlKey].value = value;

			this.nonEmptyControls = Object.keys(this.requiredControls).filter((control) => {
				return this.requiredControls[control].value !== '';
			});

			// If only one control is not empty, include requiredText with that
			if (this.nonEmptyControls.length === 1) {
				this.requiredControls = {};
				Object.keys(this.formGroup.controls).forEach((control) => {
					this.requiredControls = {
						...this.requiredControls,
						[control]: {
							value: this.formGroup.controls[control].value,
							requiredText:
								this.nonEmptyControls.includes(control) ||
								this.formGroup.controls[control].hasValidator(Validators.required)
									? this.requiredText
									: undefined,
						},
					};
				});
			}

			// If more than one control are not empty remove requiredText unless they have Validators.required
			if (this.atLeastOneRequired && this.nonEmptyControls.length > 1) {
				this.requiredControls = {};
				Object.keys(this.formGroup.controls).forEach((control) => {
					this.requiredControls = {
						...this.requiredControls,
						[control]: {
							value: this.formGroup.controls[control].value,
							requiredText: this.formGroup.controls[control].hasValidator(Validators.required)
								? this.requiredText
								: undefined,
						},
					};
				});
			}
		}
	}
}
