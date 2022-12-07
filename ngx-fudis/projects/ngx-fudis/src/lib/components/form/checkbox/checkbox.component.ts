import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

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
export class CheckboxComponent {
	@ViewChild('fudisCheckbox') input: ElementRef<HTMLInputElement>;

	@Input() name = 'check';

	@Input() id: string;

	color: 'primary' | 'warn' = 'primary';

	disableRipple = true;

	checked: boolean = false;

	showError: boolean = false;

	control = new FormControl('', Validators.required);

	/**
	 * Checbok modifiers
	 */
	@Input() classes: string;

	@Input() disabled: boolean;

	@Input() required: boolean;

	toggleChecked(event: MatCheckboxChange): void {
		console.log('moro togglesta');
		if (event.checked) {
			this.checked = true;
			this.color = 'primary';
		} else {
			this.checked = false;
		}
	}

	checkErrors(): void {
		if (this.required && !this.checked) {
			this.color = 'warn';
			this.showError = true;
		} else {
			this.color = 'primary';
			this.showError = false;
		}
	}
}
