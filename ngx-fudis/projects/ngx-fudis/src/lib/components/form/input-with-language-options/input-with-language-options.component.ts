import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
	FudisInputWithLanguageOptionsFormGroup,
	IFudisDropdownOption,
	TFudisDropdownLanguageOptionArray,
	TFudisGroupErrorMessages,
} from '../../../types/forms';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';

type RequiredControls = {
	[key: string]: { value?: any; requiredText: string | undefined };
};

@Component({
	selector: 'fudis-input-with-language-options',
	templateUrl: './input-with-language-options.component.html',
	styleUrls: ['./input-with-language-options.component.scss'],
})
export class InputWithLanguageOptionsComponent extends InputBaseDirective implements OnInit {
	/**
	 * FormGroup including controls.
	 */
	@Input({ required: true }) formGroup: FormGroup<FudisInputWithLanguageOptionsFormGroup>;

	/**
	 * Option list for language selection Fudis Dropdown. To pair control with corresponding dropdown option Dropdown option "value" must equal to control's name. E.g. "{value: 'english', viewValue: 'EN'}" pairs with "english: New FormControl('')"
	 */
	@Input({ required: true }) options: TFudisDropdownLanguageOptionArray;

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
	@Input({ required: true }) missingLanguage: string | null;

	@Input() variant: 'text-input' | 'text-area' = 'text-input';

	dropdownControl: FormControl<IFudisDropdownOption | null>;

	dropdownValue: IFudisDropdownOption;

	for: string = '';

	requiredControls: RequiredControls = {};

	atLeastOneRequired: boolean = false;

	nonEmptyControls: string[] = [];

	updatedOptions: IFudisDropdownOption[] = [];

	constructor() {
		super();
		this.dropdownControl = new FormControl<IFudisDropdownOption | null>({ value: 'moi', viewValue: 'juu' });
	}

	ngOnInit(): void {
		checkRequiredAttributes(this.id, this.requiredText, undefined, this.formGroup);
		this.updatedOptions = this.missingLanguage ? this.updateDropdownList() : this.options;

		this.dropdownControl.patchValue(this.updatedOptions[0]);
		this.for = `${this.id}_${this.options[0].value}`;

		this.initialRequiredCheck();
	}

	handleLanguageSelect(value: IFudisDropdownOption): void {
		const valueToApply = value[0];

		this.dropdownValue = valueToApply;
		this.for = `${this.id}_${value.value}`;
	}

	handleInputBlur(event: Event, controlKey: string): void {
		this.updatedOptions = this.missingLanguage ? this.updateDropdownList() : this.options;

		this.isControlRequired((event.target as HTMLInputElement).value, controlKey);
	}

	updateDropdownList(): IFudisDropdownOption[] {
		const newOptions: IFudisDropdownOption[] = [];

		this.options.forEach((option) => {
			if (this.formGroup.controls?.[option.value]?.invalid || !this.formGroup.controls[option.value]?.value) {
				const updatedOption = { ...option, viewValue: `${option.viewValue} (${this.missingLanguage})` };

				newOptions.push(updatedOption);

				if (this.dropdownControl?.value && option?.value === this.dropdownControl.value.value) {
					this.dropdownControl.patchValue(updatedOption);
				}
			} else {
				if (this.dropdownControl?.value && option?.value === this.dropdownControl.value.value) {
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
			if (Object.prototype.hasOwnProperty.call(this.requiredControls, controlKey)) {
				if (this.requiredControls[controlKey] !== undefined) {
					this.requiredControls = {
						...this.requiredControls,
						[controlKey]: { ...this.requiredControls[controlKey], value },
					};
				}
			}

			// Check how many controls are empty

			this.nonEmptyControls = Object.keys(this.requiredControls).filter((control) => {
				return this.requiredControls?.[control]?.value !== '';
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
