import { Attribute, Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export interface Checkbox {
	name: string;
	id: string;
	checked: boolean;
	value: string;
}
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

	color: 'primary' | 'warn' = 'primary';

	disableRipple = true;

	control = new FormControl('', Validators.required);

	/**
	 * Checbok modifiers
	 */
	@Input() classes: string;

	@Input() disabled: boolean;

	checked: boolean = false;

	required: boolean;

	ngOnInit() {}

	onChange(checked: boolean) {
		this.checked = checked;
		if (this.required && this.control.invalid) {
			this.color = 'warn';
		}
	}

	onModelChange(e: boolean) {
		this.checked = e;

		this.onChange(e);
	}
	// public get classes(): string[] {
	// 	if (this.required && !this.control.value) {
	// 		return ['fudis-checkbox--invalid'];
	// 	}
	// 	if (this.control.touched && this.control.invalid) {
	// 		return ['fudis-checkbox--invalid'];
	// 	}
	// 	if (!this.control.value) {
	// 		return ['fudis-checkbox--checked'];
	// 	}
	// 	return [];
	// }
	// ngOnInit() {
	// 	if (this.required && !this.control.value) {
	// 		this.classes = 'fudis-checkbox--invalid';
	// 	}
	// 	if (this.control.touched && this.control.invalid) {
	// 		this.classes = 'fudis-checkbox--invalid';
	// 	}
	// 	if (!this.control.value) {
	// 		this.classes = 'fudis-checkbox--checked';
	// 	}
	// 	return [];
	// }

	// checkErrors(): string {
	// 	if (this.required && !this.control.value) {
	// 		return this.color;
	// 	}
	// 	if (this.control.touched && this.required && this.control.invalid) {
	// 		this.color = 'warn';
	// 		return this.color;
	// 	}
	// 	console.log('olen tsekattu');
	// 	return this.color;
	// }
}
