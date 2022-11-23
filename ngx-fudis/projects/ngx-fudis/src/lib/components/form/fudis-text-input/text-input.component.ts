import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
// import { TouchedErrorStateMatcher } from '../touched-error-state.matcher';

@Component({
	selector: 'fudis-text-input',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
	@Input() id: string = 'munInput';

	@Input() label: string;

	@Input() type: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' = 'email';

	// @Input() required: boolean;

	// @Input() disabled: boolean;

	// @Input() control: FormControl;

	emailFormControl = new FormControl('', [Validators.required, Validators.email]);

	// matcher = new TouchedErrorStateMatcher();

	// public get classes(): string[] {
	// 	return ['fudis-text-input', `fudis-text-input__${this.type}`];
	// }

	getErrorMessage() {
		if (this.emailFormControl.hasError('required')) {
			return 'You must enter a value';
		}

		return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
	}
}
