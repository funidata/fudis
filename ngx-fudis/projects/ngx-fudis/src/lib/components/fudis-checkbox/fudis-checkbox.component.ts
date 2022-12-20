import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'fudis-native-checkbox',
	templateUrl: './fudis-checkbox.component.html',
	styleUrls: ['./fudis-checkbox.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FudisCheckboxComponent {
	@Input() disabled?: boolean = false;

	@Input() invalid: boolean;

	@Input() label: string;

	@Input() name: string;

	@Input() required: boolean;

	@Input() checked?: boolean = false;

	@Input() classes: string;

	showError: boolean = false;

	@Output() checkedChange = new EventEmitter<boolean>();

	toggle() {
		if (this.disabled) {
			return;
		}
		this.checked = !this.checked;
		this.checkedChange.emit(this.checked);
	}

	checkErrors(): void {
		if (this.required && !this.checked) {
			this.invalid = true;
			this.showError = true;
		} else {
			this.invalid = false;
			this.showError = false;
		}
	}
}
