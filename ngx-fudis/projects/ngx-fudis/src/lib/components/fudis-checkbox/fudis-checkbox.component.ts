import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'fudis-native-checkbox',
	templateUrl: './fudis-checkbox.component.html',
	styleUrls: ['./fudis-checkbox.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FudisCheckboxComponent {
	@Input() disabled?: boolean = false;

	@Input() label: string;

	@Input() required: boolean;

	@Input() checked?: boolean = false;

	control = new FormControl('', Validators.required);

	@Output() checkedChange = new EventEmitter<boolean>();

	toggle() {
		if (this.disabled) {
			return;
		}
		this.checked = !this.checked;
		this.checkedChange.emit(this.checked);
	}

	public get classes(): string[] {
		if (this.control.touched && this.control.invalid) {
			return ['fudis-checkbox--invalid'];
		}
		return [];
	}
}
