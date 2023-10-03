import { Component, Input, Output, EventEmitter, HostBinding, ViewEncapsulation, Host, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

	@HostBinding('class') classes = 'fudis-checkbox-host';

	/*
	 * Control name from FormGroup
	 */
	@Input({ required: true }) controlName: string;

	@Input({ required: true }) viewValue: string;

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

	protected _groupId: string;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('checkbox');
		this._groupId = this._checkboxGroup.id;
		this.isChecked();
	}

	onChange(): void {
		this.isChecked();

		const optionToEmit: FudisCheckboxOption = {
			id: this._id,
			groupName: this._groupId,
			controlName: this.controlName,
			viewValue: this.viewValue,
			value: this._checkboxGroup.formGroup.controls[this.controlName].value,
		};

		this.handleChange.emit(optionToEmit);
	}

	onBlur(event: FocusEvent): void {
		this._focused = false;

		if ((event.relatedTarget as HTMLElement)?.getAttribute('name') !== this._groupId) {
			setTimeout(() => {
				if (document.activeElement?.getAttribute('name') !== this._groupId) {
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
