import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
	selector: 'fudis-native-checkbox',
	templateUrl: './fudis-checkbox.component.html',
	styleUrls: ['./fudis-checkbox.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FudisCheckboxComponent implements OnInit {
	@Input() disabled?: boolean = false;

	@Input() label: string;

	@Input() name: string;

	@Input() required: boolean;

	@Input() checked?: boolean = false;

	showError: boolean = false;

	id: string;

	disabledInput: string;

	invalid: string;

	ngOnInit(): void {
		if (this.disabled) {
			this.disabledInput = 'disabled';
		}
	}

	toggle() {
		if (this.disabled) {
			return;
		}
		this.checked = !this.checked;
		this.checkErrors();
	}

	checkErrors(): void {
		if (this.required && !this.checked) {
			this.invalid = 'invalid';
			this.showError = true;
		} else {
			this.invalid = '';
			this.showError = false;
		}
	}
}
