import { Component, Input, Output, EventEmitter, HostBinding, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../../directives/form/input-base/input-base.directive';

@Component({
	selector: 'fudis-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent extends InputBaseDirective {
	// constructor(
	// 	@Host() private _parentGroupComponent: CheckboxGroupComponent,
	// 	_translationService: FudisTranslationService
	// ) {
	// 	super(_translationService);
	// }

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
	@Input() checked: boolean | null | undefined;

	@Input() groupId: string;

	/**
	 * Checked input change output
	 */
	@Output() checkboxChange = new EventEmitter<boolean>();

	@Output() handleFocus = new EventEmitter<FocusEvent>();

	protected _focused = false;

	onChange(): void {
		this.checkboxChange.emit(!this.checked);
	}

	override onBlur(event: FocusEvent): void {
		this._focused = false;

		this.handleBlur.emit(event);
	}

	onFocus(event: FocusEvent): void {
		this._focused = true;

		this.handleFocus.emit(event);

		// console.log(this._parentGroupComponent);
	}
}
