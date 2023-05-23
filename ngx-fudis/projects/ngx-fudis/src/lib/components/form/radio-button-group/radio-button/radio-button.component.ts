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
	 * Id of single Radio button
	 */
	@Input() id: string;

	/*
	 * FormControl for Radio Button group
	 */
	@Input() control: FormControl;

	/*
	 * Selectable form value of a single Radio Button, e.g. "fair-trade-banana"
	 */
	@Input() value: string | boolean;

	/*
	 * Visible label for a single Radio Button, e. g. "Fair trade banana"
	 */
	@Input() viewValue: string;

	/*
	 * Name for group of Radio Buttons, e.g. "fruit"
	 */
	@Input() name: string;

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
