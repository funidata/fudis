import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'fudis-text-input',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
	/**
	 *	Id is mandatory to bind label, error and hint to the input
	 */
	@Input() id: string = 'munInputti';

	/**
	 *	Label is mandatory for every input
	 */
	@Input() label: string;

	/**
	 *	Is input required
	 */
	@Input() required: boolean;

	/**
	 *	Helper or info text for the input, aligned underneath the input
	 */
	@Input() helpText?: string;

	/**
	 *	Type of the input
	 */
	@Input() type: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' = 'text';

	control = new FormControl('', Validators.required);

	// @Input() control: FormControl;

	isValidationErrorBlockVisible() {
		return this.control.touched && this.control.invalid;
	}

	public get classes(): string[] {
		if (this.control.touched && this.control.invalid) {
			return ['fudis-text-input--invalid'];
		}
		return [];
	}
}
