import {
	Component,
	Input,
	Output,
	EventEmitter,
	HostBinding,
	ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../../directives/form/input-base/input-base.directive';

@Component({
	selector: 'fudis-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent extends InputBaseDirective {

	@HostBinding('class') classes = 'fudis-checkbox-host';

	/*
	 * FormControl for Checkbox group
	 */
	@Input({ required: true }) control: FormControl;

	/*
	 * Selectable form value of a single Checkbox
	 */
	@Input({ required: true }) value: string | boolean | null;

	/*
	 * Name for group of Checkboxes
	 */
	@Input({ required: true }) name: string;

	/*
	 * If Checkbox is checked
	 */
	@Input() checked: boolean;

	/**
	 * Checked input change output
	 */
	@Output() checkboxChange = new EventEmitter<boolean>();

	protected _focused = false;

	onChange(): void {
		this.checkboxChange.emit(!this.checked);
		this._focused = !this._focused;
	}

	override onBlur(): void {
		this._focused = false;
		this.handleBlur.emit();
	}
}
