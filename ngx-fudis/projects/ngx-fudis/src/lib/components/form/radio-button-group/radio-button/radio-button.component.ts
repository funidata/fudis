import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'fudis-radio-button',
	templateUrl: './radio-button.component.html',
	styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent {
	// Id of single Radio button
	@Input() id: string;

	// FormGroup for Radio Button
	@Input() parentFormGroup: FormGroup;

	// Selectable form value of a single Radio Button, e.g. "fair-trade-banana"
	@Input() value: string;

	// Visible label for a single Radio Button, e. g. "Fair trade banana"
	@Input() label: string;

	// Name for group of Radio Buttons, e.g. "fruit"
	@Input() name: string;

	// If Radio Button is disabled
	@Input() disabled: boolean;

	// If Radio Button group of same name selection is required
	@Input() required: boolean;

	// If Radio Button is pre-selected
	@Input() checked?: boolean;

	// Used to style Radio Button selection indicator, if this option is selected or not
	@Input() selectedOptionId: string | number | undefined = undefined;

	isSelected() {
		if (!this.selectedOptionId && this.checked) {
			return true;
		}
		if (this.selectedOptionId === this.id) {
			return true;
		}
		return false;
	}
}
