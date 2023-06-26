import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
	FudisInputWithLanguageOptionsFormGroup,
	FudisDropdownOption,
	FudisDropdownLanguageOption,
	FudisFormGroupErrors,
	FudisInputWidth,
} from '../../../types/forms';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { IdService } from '../../../utilities/id-service.service';

@Component({
	selector: 'fudis-input-with-language-options',
	templateUrl: './input-with-language-options.component.html',
	styleUrls: ['./input-with-language-options.component.scss'],
})
export class InputWithLanguageOptionsComponent extends InputBaseDirective implements OnInit, OnChanges {
	constructor(private _idService: IdService) {
		super();
	}

	/**
	 * FormGroup including controls.
	 */
	@Input({ required: true }) formGroup: FormGroup<FudisInputWithLanguageOptionsFormGroup | any>;

	/**
	 * Option list for language selection Fudis Dropdown. To pair control with corresponding dropdown option Dropdown option "value" must equal to control's name. E.g. "{value: 'english', viewValue: 'EN'}" pairs with "english: New FormControl('')"
	 */
	@Input({ required: true }) options: FudisDropdownLanguageOption[];

	/**
	 * Available sizes for the input - defaults to large.
	 */
	@Input() size: FudisInputWidth = 'lg';

	/*
	 * Object containing error messages for each FormControl and for the FormGroup.
	 * E. g. {atLeastOneRequired: 'At least one input of any language must have a value.', finnish:{maxlength: 'Input in Finnish cannot be longer than X charactes.'}}
	 */

	@Input() groupErrorMsg: FudisFormGroupErrors;

	/**
	 * Indicator text added to the dropdown list if input of a language is empty.
	 */
	@Input({ required: true }) missingLanguage: string;

	/**
	 * Label for language selection dropdown
	 */
	@Input({ required: true }) languageLabel: string;

	/**
	 * Form element to display. Defaults to text-input
	 */
	@Input() variant: 'text-input' | 'text-area' = 'text-input';

	protected _dropdownControl: FormControl<FudisDropdownOption>;

	private _dropdownValue: FudisDropdownOption;

	private _for: string = '';

	protected _requiredControls: { [key: string]: { value?: string | null; requiredText: string | undefined } } = {};

	private _atLeastOneRequired: boolean = false;

	private _nonEmptyControls: string[] = [];

	protected _updatedOptions: FudisDropdownOption[] = [];

	/**
	 * Internal id to generate unique id
	 */
	protected _id: string;

	handleLanguageSelect(value: FudisDropdownOption): void {
		this._dropdownValue = value;
		this._for = `${this.id}_${value.value}`;
	}

	handleInputBlur(event: Event, controlKey: string): void {
		this._updatedOptions = this.missingLanguage ? this.updateDropdownList() : this.options;

		this.isControlRequired((event.target as HTMLInputElement).value, controlKey);
	}

	updateDropdownList(): FudisDropdownOption[] {
		const newOptions: FudisDropdownOption[] = [];

		this.options.forEach((option) => {
			if (this.formGroup.controls[option.value].invalid || !this.formGroup.controls[option.value].value) {
				const updatedOption = { ...option, viewValue: `${option.viewValue} (${this.missingLanguage})` };

				newOptions.push(updatedOption);

				if (option.value === this._dropdownControl?.value.value) {
					this._dropdownControl.patchValue(updatedOption);
				}
			} else {
				if (option.value === this._dropdownControl?.value.value) {
					this._dropdownControl.patchValue(option);
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
		this._requiredControls = {};
		if (this.formGroup.errors?.['atLeastOneRequired'] || this.groupErrorMsg?.atLeastOneRequired) {
			this._atLeastOneRequired = true;

			Object.keys(this.formGroup.controls).forEach((control) => {
				this._requiredControls = {
					...this._requiredControls,
					[control]: {
						value: this.formGroup.controls[control].value,
						requiredText: this.requiredText,
					},
				};
			});
		} else {
			Object.keys(this.formGroup.controls).forEach((control) => {
				this._requiredControls = {
					...this._requiredControls,
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
		} else if (this._atLeastOneRequired && controlKey) {
			// Check how many controls are empty
			this._requiredControls[controlKey].value = value;

			this._nonEmptyControls = Object.keys(this._requiredControls).filter((control) => {
				return this._requiredControls[control].value !== '' && this._requiredControls[control].value !== null;
			});

			// If only one control is not empty, include requiredText with that
			if (this._nonEmptyControls.length === 1) {
				this._requiredControls = {};
				Object.keys(this.formGroup.controls).forEach((control) => {
					this._requiredControls = {
						...this._requiredControls,
						[control]: {
							value: this.formGroup.controls[control].value,
							requiredText:
								this._nonEmptyControls.includes(control) ||
								this.formGroup.controls[control].hasValidator(Validators.required)
									? this.requiredText
									: undefined,
						},
					};
				});
			}

			// If more than one control are not empty remove requiredText unless they have Validators.required
			if (this._atLeastOneRequired && this._nonEmptyControls.length > 1) {
				this._requiredControls = {};
				Object.keys(this.formGroup.controls).forEach((control) => {
					this._requiredControls = {
						...this._requiredControls,
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

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('inputWithLanguageOptions');
		checkRequiredAttributes(this.id, this.requiredText, undefined, this.formGroup);

		this._updatedOptions = this.missingLanguage ? this.updateDropdownList() : this.options;

		this._dropdownControl = new FormControl(this._updatedOptions[0]);
		this._for = `${this.id}_${this.options[0].value}`;

		this.initialRequiredCheck();
	}

	ngOnChanges(): void {
		this._updatedOptions = this.missingLanguage ? this.updateDropdownList() : this.options;
	}
}
