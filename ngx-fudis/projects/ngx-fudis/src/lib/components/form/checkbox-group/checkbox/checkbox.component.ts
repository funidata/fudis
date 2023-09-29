import { Component, Input, Output, EventEmitter, HostBinding, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'fudis-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent {
	@HostBinding('class') classes = 'fudis-checkbox-host';

	/*
	 * FormControl for single Radio Button
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
	 * Id for single Radio Button
	 */
	@Input() id: string;

	/*
	 * If Radio Button group of same name selection is required
	 */
	@Input() required: boolean | undefined;

	/*
	 * If Radio Button is checked
	 */
	@Input() checked: boolean | null | undefined;

	/**
	 * Set Radio Button's visual style and ARIA attribute as invalid. Does not override if control.invalid is true.
	 */
	@Input() invalidState: boolean = false;

	@Input() groupId: string;

	/**
	 * Checked input change output
	 */
	@Output() checkboxChange = new EventEmitter<boolean>();

	@Output() handleFocus = new EventEmitter<FocusEvent>();

	@Output() handleBlur = new EventEmitter<FocusEvent>();

	protected _focused = false;

	onChange(): void {
		this.checkboxChange.emit(!this.checked);
	}

	onBlur(event: FocusEvent): void {
		this._focused = false;

		this.handleBlur.emit(event);
	}

	onFocus(event: FocusEvent): void {
		this._focused = true;

		this.handleFocus.emit(event);

		// console.log(this._parentGroupComponent);
	}
}
