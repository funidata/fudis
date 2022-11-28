import { Attribute, Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

interface FudisErrorMessages {
	message?: string;
	required?: string;
}
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

	/**
	 *	Id is mandatory to bind label, error and hint to the input
	 */
	@Input() id: string = 'munInputti';

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

	/**
	 *	Helper or info text for the input, aligned underneath the input
	 */

	@Input() errorMessages?: FudisErrorMessages = {};

	/**
	 *	Type of the input
	 */

	@Input() type: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' = 'text';

	// FormControl;

	required: boolean;

	validatorArray: Array<any> = [];

	fudisFormControl = new FormControl('', this.validatorArray);

	errorsToShow: FudisErrorMessages = {
		message: this.defaultMessage(),
		required: 'Required Default',
	};

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

		Object.keys(this.errorsToShow).forEach((error) => {
			if (this.errorMessages && this.errorMessages[error as keyof FudisErrorMessages]) {
				this.errorsToShow[error as keyof FudisErrorMessages] = this.errorMessages[error as keyof FudisErrorMessages];
			}
		});
	}

	defaultMessage(): string {
		switch (this.type) {
			case 'email': {
				return 'Email default error';
			}
			case 'number': {
				return 'should be a number';
			}
			default: {
				return 'Default generic error message';
			}
		}
	}

	public get classes(): string[] {
		if (this.fudisFormControl.touched && this.required && !this.fudisFormControl.value) {
			return ['fudis-text-input--invalid'];
		}
		if (this.fudisFormControl.touched && this.fudisFormControl.invalid) {
			return ['fudis-text-input--invalid'];
		}
		return [];
	}
}
