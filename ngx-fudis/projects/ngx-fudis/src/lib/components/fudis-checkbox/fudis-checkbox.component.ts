import { Component, Input, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'fudis-native-checkbox',
	templateUrl: './fudis-checkbox.component.html',
	styleUrls: ['./fudis-checkbox.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FudisCheckboxComponent implements OnInit {
	@ViewChild('fudisCheckboxInput') input: ElementRef<HTMLInputElement>;

	@Input() disabled: boolean = false;

	@Input() disabledInput: string;

	@Input() invalid: string;

	@Input() label: string;

	@Input() name: string;

	@Input() required: boolean;

	@Input() checked?: boolean = false;

	showError: boolean = false;

	control = new FormControl('', Validators.required);

	id: string;

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
