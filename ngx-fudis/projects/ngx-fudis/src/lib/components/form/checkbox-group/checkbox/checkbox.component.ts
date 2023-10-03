import { Component, Input, Output, EventEmitter, Host, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisIdService } from '../../../../services/id/id.service';
import { CheckboxGroupComponent } from '../checkbox-group.component';
import { FudisCheckboxOption } from '../../../../types/forms';

@Component({
	selector: 'fudis-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
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
	 * Checked input change output
	 */
	@Output() handleChange = new EventEmitter<FudisCheckboxOption>();

	public control: FormControl<boolean | null | undefined>;

	protected _focused = false;

	protected _checked: boolean | null | undefined = null;

	/**
	 * Html id attribute
	 */
	protected _id: string;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('checkbox');

		this.isChecked();
	}

	onChange(): void {
		this.isChecked();

		const optionToEmit: FudisCheckboxOption = {
			id: this._id,
			groupName: this._checkboxGroup.id,
			controlName: this.controlName,
			label: this.label,
			value: this._checkboxGroup.formGroup.controls[this.controlName].value,
		};

		this.handleChange.emit(optionToEmit);
	}

	onBlur(event: FocusEvent): void {
		this._focused = false;

		if ((event.relatedTarget as HTMLElement)?.getAttribute('name') !== this._checkboxGroup.id) {
			setTimeout(() => {
				if (document.activeElement?.getAttribute('name') !== this._checkboxGroup.id) {
					this._checkboxGroup.handleGroupFocusedOut(true);
				}
			}, 150);
		}
	}

	onFocus(): void {
		this._focused = true;
	}

	isChecked(): void {
		this._checked = this._checkboxGroup.formGroup.controls[this.controlName].value ?? this.checked;
	}
}
