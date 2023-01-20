import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'fudis-radio-button',
	templateUrl: './radio-button.component.html',
	styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent {
	/*
	 * Id of single Radio button
	 */
	@Input() id: string;

	/*
	 * FormControl for Radio Button group
	 */
	@Input() radioButtonFormControl: FormControl;

	/*
	 * Selectable form value of a single Radio Button, e.g. "fair-trade-banana"
	 */
	@Input() value: string;

	/*
	 * Visible label for a single Radio Button, e. g. "Fair trade banana"
	 */
	@Input() label: string;

	/*
	 * Name for group of Radio Buttons, e.g. "fruit"
	 */
	@Input() name: string;

	/*
	 * If Radio Button is disabled
	 */
	@Input() disabled: boolean;

	/*
	 * If Radio Button group of same name selection is required
	 */
	@Input() required: boolean;

	/*
	 * If Radio Button is checked
	 */
	@Input() checked: boolean;

	/*
	 * Using legend of group fieldset to provide additional info for the user
	 */
	@Input() describedByLegend: string;
}
