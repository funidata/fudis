import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface Option {
	label: string;
	id: string;
	name: string;
	value: string;
	disabled?: boolean;
	checked?: boolean;
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
		{ value: 'omena', label: 'omena', id: '1', name: 'hedelma' },
		{ value: 'banaani', label: 'banaani', id: '2', name: 'hedelma' },
		{ value: 'kirsikka', label: 'kirsikka', id: '3', name: 'hedelma', checked: true },
	];

	// @Input() options: Option[];

	@Input() id: string;

	frm: FormGroup;

	constructor(private fb: FormBuilder) {}

	@Input() control: FormControl;

	ngOnInit() {
		// this.MyFunction();
		// console.log('hellou');
		// if (this.required && this.control.invalid) {
		// 	this.validatorArray.push(Validators.required);
		// }
		this.frm = this.fb.group({
			inputOption: ['Inputs', Validators.required],
		});
	}

	// MyFunction() {
	// 	this.options.forEach((option) => {
	// 		option.name = 'hedelmä';
	// 	});
	// 	console.log(this.options);
	// }

	getRadioOptions() {
		console.log('I was checked');
		return this.frm.get('inputOption') as FormControl;
	}
}
