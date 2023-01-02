import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface Option {
	label: string;
	id: string;
	name: string;
	value: string;
	disabled?: boolean;
	checked: boolean;
}

@Component({
	selector: 'fudis-radio-button-group',
	templateUrl: './radio-button-group.component.html',
	styleUrls: ['./radio-button-group.component.scss'],
})
export class RadioButtonGroupComponent implements OnInit {
	@Input() label: string;

	/**
	 * Options for testing purposes
	 */
	options: Option[] = [
		{ value: 'omena', label: 'omena', id: '1', name: 'hedelma', checked: false },
		{ value: 'banaani', label: 'banaani', id: '2', name: 'hedelma', checked: true },
		{ value: 'kirsikka', label: 'kirsikka', id: '3', name: 'hedelma', checked: false },
	];

	// @Input() options: Option[];

	frm: FormGroup;

	constructor(private fb: FormBuilder) {}

	@Input() ctrl: FormControl;

	ngOnInit() {
		this.frm = this.fb.group({
			inputOption: ['Inputs', Validators.required],
		});

		if (this.options.length < 2) {
			throw new Error('Radio button needs value more than 2');
		}
	}

	getRadioOptions() {
		console.log('I was checked');

		console.log(this.frm);
		return this.frm.get('inputOption') as FormControl;
	}
}
