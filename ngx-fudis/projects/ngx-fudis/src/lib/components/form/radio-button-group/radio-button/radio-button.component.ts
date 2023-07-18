import { Component, Input, Output, EventEmitter, HostBinding, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'fudis-radio-button',
	templateUrl: './radio-button.component.html',
	styleUrls: ['./radio-button.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class RadioButtonComponent {
	@HostBinding('class') classes = 'fudis-radio-button-host';

	/*
	 * FormControl for Radio Button group
	 */
	@Input({ required: true }) control: FormControl;

	/*
	 * Selectable form value of a single Radio Button, e.g. "fair-trade-banana"
	 */
	@Input({ required: true }) value: string | boolean | null;

	/*
	 * Visible label for a single Radio Button, e. g. "Fair trade banana"
	 */
	@Input({ required: true }) viewValue: string;

	/*
	 * Name for group of Radio Buttons, e.g. "fruit"
	 */
	@Input({ required: true }) name: string;

	/*
	 * Id of single Radio button
	 */
	@Input() id: string;

	/*
	 * If Radio Button group of same name selection is required
	 */
	@Input() required: boolean;

	/*
	 * If Radio Button is checked
	 */
	@Input() checked: boolean;

	/**
	 * Set Radio Button's visual style and ARIA attribute as invalid. Does not override if control.invalid is true.
	 */
	@Input() invalidState: boolean = false;

	@Output() radioButtonBlur = new EventEmitter<string>();

	@Output() radioButtonChange = new EventEmitter<string>();

	handleBlur(): void {
		this.radioButtonBlur.emit();
	}

	handleChange(): void {
		this.radioButtonChange.emit();
	}
}
