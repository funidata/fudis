import { Attribute, Component, Input, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'fudis-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
	constructor(@Attribute('required') required: boolean | '' | 'true') {
		if (required === '' || required === 'true' || required) {
			this.required = true;
		} else {
			this.required = false;
		}
	}

	@ViewChild('fudisCheckbox') input: ElementRef<HTMLInputElement>;

	@Input() name = 'check';

	@Input() id: string;

	color: 'primary' | 'warn';

	allComplete: boolean = false;

	disableRipple = false;

	control = new FormControl('', Validators.required);

	/**
	 * Checbok modifiers
	 */

	@Input() disabled: boolean;

	@Input() checked = false;

	required: boolean;

	// ngOnInit(): string {
	// 	if (!this.control.value && this.required) {
	// 		this.color = 'warn';
	// 		console.log('Olen reguired!!!!');
	// 		return this.color;
	// 	}
	// 	console.log('Olen primaryyyyy!!!!');
	// 	this.color = 'primary';
	// 	return this.color;
	// }
	// validateCheckBox(): boolean {
	// 	if (this.control.touched && this.required && !this.control.value) {
	// 		console.log('warrrrrn! :)');
	// 		return this.color === 'warn';
	// 	}
	// 	console.log('painoit minua! :)');
	// 	return this.color === 'primary';
	// }

	public get classes(): string[] {
		if (this.required && !this.control.value) {
			return ['fudis-checkbox--invalid'];
		}
		if (this.control.touched && this.control.invalid) {
			return ['fudis-checkbox--invalid'];
		}
		return [];
	}

	checkErrors(): string {
		if (this.required) {
			this.color = 'warn';
			console.log('Olen pakollinen!!!!');
			return this.color;
		}
		// if (this.control.touched && this.control.invalid) {
		// 	this.color = 'warn';
		// 	console.log('Olen reguired!!!!');
		// 	return this.color;
		// }
		console.log('Olen ookooo!!!!');
		this.color = 'primary';
		return this.color;
	}
}