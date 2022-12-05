// eslint-disable-next-line max-classes-per-file
import { Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

type Error = {
	id: string;
	message: string;
};
@Component({
	selector: 'fudis-vanilla-text-input',
	templateUrl: './vanilla-text-input.component.html',
	styleUrls: ['./vanilla-text-input.component.scss'],
})
export class VanillaTextInputComponent implements OnInit {
	// Bind input field
	@ViewChild('fudisTextInput') input: ElementRef<HTMLInputElement>;

	@Output() errorOutput: EventEmitter<Error> = new EventEmitter<Error>();

	/**
	 *	Label is mandatory for every input
	 */
	@Input() label: string;

	@Input() inputId: string;

	@Input() required?: boolean = false;

	@Input() size?: 's' | 'm' | 'l' = 'l';

	/**
	 *	Helper or info text for the input, aligned underneath the input
	 */
	@Input() helpText?: string;

	@Input() minLength?: number;

	@Input() maxLength?: number;

	@Input() language?: 'en' | 'fi' | 'se' = 'fi';

	@Input() characterLimitIndicatorValue?: string;

	@Input() labelHeight?: 'single' | 'double' | 'triple' | 'unset' = 'unset';

	/**
	 *	Helper or info text for the input, aligned underneath the input
	 */

	/**
	 *	Type of the input
	 */

	@Input() type: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' = 'text';

	// FormControl;

	validatorArray: Array<any> = [];

	fudisFormControl = new FormControl('', this.validatorArray);

	defaultError: string;

	id: string;

	// Temporary randomiser for ids
	randomId(): string {
		const idFromLabel = this.label
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, ' ')
			.split(' ')
			.slice(0, 3)
			.join('-');
		const randomId = `${idFromLabel}-${Math.random().toString(36).slice(2, 6)}`;
		return randomId;
	}

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

		// Setting id's and names
		if (this.inputId) {
			this.id = this.inputId;
		} else {
			this.id = this.randomId();
		}
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

		// Emit error to parent
		if (this.fudisFormControl.invalid) {
			this.getErrorOutput(this.id, this.defaultError);
		}
	}

	getErrorOutput(id: string, error: string) {
		this.errorOutput.emit({ id, message: error });
	}

	public get classes(): string[] {
		if (this.fudisFormControl.touched && this.fudisFormControl.invalid) {
			return ['fudis-text-input__input--invalid'];
		}
		return [];
	}
}
