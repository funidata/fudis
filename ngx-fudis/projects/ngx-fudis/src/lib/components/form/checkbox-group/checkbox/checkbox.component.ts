import { Component, Input, Output, EventEmitter, Host, OnInit, ViewEncapsulation } from '@angular/core';
import { FudisIdService } from '../../../../services/id/id.service';
import { CheckboxGroupComponent } from '../checkbox-group.component';
import { FudisCheckboxOption } from '../../../../types/forms';

@Component({
	selector: 'fudis-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent implements OnInit {
	constructor(
		private _idService: FudisIdService,
		@Host() protected _checkboxGroup: CheckboxGroupComponent
	) {}

	/*
	 * Control name from FormGroup
	 */
	@Input({ required: true }) controlName: string;

	/**
	 * Visible label of checkbox
	 */
	@Input({ required: true }) label: string;

	/*
	 * Id for single Radio Button. By default generated.
	 */
	@Input() id: string;

	/*
	 * If Radio Button is checked
	 */
	@Input() checked: boolean | null | undefined;

	/**
	 * Input change output
	 */
	@Output() handleChange = new EventEmitter<FudisCheckboxOption>();

	/**
	 * If checkbox has focus
	 */
	protected _focused = false;

	/**
	 * If checkbox is checked
	 */
	protected _checked: boolean | null | undefined = null;

	/**
	 * Html id attribute
	 */
	protected _id: string;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('checkbox');

		this._isChecked();
	}

	/**
	 * For toggling checkbox
	 */
	protected _onChange(): void {
		this._isChecked();

		const optionToEmit: FudisCheckboxOption = {
			id: this._id,
			groupName: this._checkboxGroup.id,
			controlName: this.controlName,
			label: this.label,
			value: this._checkboxGroup.formGroup.controls[this.controlName].value,
		};

		this.handleChange.emit(optionToEmit);
	}

	/**
	 * When focusing out from checkbox, determine if next focus target is outside of the same checkbox group. If yes, then tell parent Checkbox Group, that focus has moved outside.
	 */
	protected _onBlur(event: FocusEvent): void {
		this._focused = false;

		if ((event.relatedTarget as HTMLElement)?.getAttribute('name') !== this._checkboxGroup.id) {
			setTimeout(() => {
				if (document.activeElement?.getAttribute('name') !== this._checkboxGroup.id) {
					this._checkboxGroup.handleGroupFocusedOut(true);
				}
			}, 150);
		}
	}

	protected _onFocus(): void {
		this._focused = true;
	}

	protected _isChecked(): void {
		this._checked = this._checkboxGroup.formGroup.controls[this.controlName].value ?? this.checked;
	}
}
