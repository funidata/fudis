import { Component, Input, Output, EventEmitter, HostBinding, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FudisIdService } from '../../../../services/id/id.service';

@Component({
	selector: 'fudis-radio-button',
	templateUrl: './radio-button.component.html',
	styleUrls: ['./radio-button.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class RadioButtonComponent implements OnInit {
	constructor(private _idService: FudisIdService) {}

	@HostBinding('class') classes = 'fudis-radio-button-host';

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

	/**
	 * Parent wrapper's id. TODO: remove when component is refactored to be similar like like Checkbox Group and Checkboxes
	 */
	@Input({ required: true }) groupId: string;

	/*
	 * Id for single Radio Button
	 */
	@Input() id: string | undefined;

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

	/**
	 * Blur event output
	 */
	@Output() radioButtonBlur = new EventEmitter<string>();

	/**
	 * Checked input change output
	 */
	@Output() radioButtonChange = new EventEmitter<string>();

	ngOnInit(): void {
		if (this.id) {
			this._idService.addNewChildId('radio-button-group', this.groupId, this.id);
		} else {
			this.id = this._idService.getNewChildId('radio-button-group', this.groupId);
		}
	}

	handleBlur(): void {
		this.radioButtonBlur.emit();
	}

	handleChange(): void {
		this.radioButtonChange.emit();
	}
}
