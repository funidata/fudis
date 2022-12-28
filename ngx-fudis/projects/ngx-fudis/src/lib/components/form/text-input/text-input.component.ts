import { Attribute, Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'fudis-text-input',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
	constructor(@Attribute('required') required: boolean | '' | 'true') {
		if (required === '' || required === 'true' || required) {
			this.required = true;
		} else {
			this.required = false;
		}
	}

	// Bind input field
	@ViewChild('fudisTextInput') input: ElementRef<HTMLInputElement>;

	/**
	 *	Label is mandatory for every input
	 */
	@Input() label: string;

	/**
	 *	Helper or info text for the input, aligned underneath the input
	 */
	@Input() helpText?: string;

	@Input() minLength?: number;

	@Input() maxLength?: number;

	@Input() language?: 'en' | 'fi' | 'se' = 'fi';

	@Input() characterLimitIndicatorValue?: string;

	/**
	 *	Type of the input
	 */
	@Input() type: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' = 'text';

	required: boolean;

	validatorArray: Array<any> = [];

	fudisFormControl = new FormControl('', this.validatorArray);

	defaultError: string;

	ngOnInit() {
		if (this.required) {
			this.validatorArray.push(Validators.required);
		}
		if (this.minLength) {
			this.validatorArray.push(Validators.minLength(this.minLength));
		}
		if (this.maxLength) {
			this.validatorArray.push(Validators.maxLength(this.maxLength));
		}
		if (this.type === 'email') {
			this.validatorArray.push(Validators.email);
		}
		if (this.type === 'number') {
			this.validatorArray.push(Validators.pattern('^[0-9]*$'));
		}
		this.fudisFormControl = new FormControl('', this.validatorArray);
	}

	// Check and returns browsers native error message
	checkErrors(): void {
		const inputElement = this.input.nativeElement;

		if (inputElement.validationMessage) {
			const { validity } = inputElement;

			if (validity.valueMissing && this.language === 'fi') {
				inputElement.setCustomValidity('Pakollinen arvo puuttuu.');
			}
			if (validity.tooShort && this.language === 'fi') {
				inputElement.setCustomValidity(
					`Liian lyhyt syöte. Minimimerkkimäärä on ${this.minLength} merkkiä. Olet nyt syöttänyt ${inputElement.value.length} merkkiä.`
				);
			}
			if (validity.typeMismatch && inputElement.type === 'email' && this.language === 'fi') {
				inputElement.setCustomValidity('Syöte ei ole sähköpostimuotoinen. @-merkki puuttuu.');
			}

			if (validity.typeMismatch && inputElement.type === 'url' && this.language === 'fi') {
				inputElement.setCustomValidity('ei oo urli');
			}
			this.defaultError = inputElement.validationMessage;
		}
	}

	public get classes(): string[] {
		if (this.fudisFormControl.touched && this.fudisFormControl.invalid) {
			return ['fudis-text-input--invalid'];
		}
		return [];
	}
}
