import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface Option {
	label: string;
	name: string;
	value: string;
	disabled?: boolean;
}

@Component({
	selector: 'fudis-radio-button-group',
	templateUrl: './radio-button-group.component.html',
	styleUrls: ['./radio-button-group.component.scss'],
})
export class RadioButtonGroupComponent implements OnInit {
	@Input() options: Option[];

	frm: FormGroup;

	constructor(private fb: FormBuilder) {}

	@Input() control: FormControl;

	ngOnInit() {
		// console.log('hellou');
		// if (this.required && this.control.invalid) {
		// 	this.validatorArray.push(Validators.required);
		// }
		this.frm = this.fb.group({
			inputOption: ['Inputs', Validators.required],
		});
	}

	getRadioOptions() {
		console.log('I was checked');
		return this.frm.get('inputOption') as FormControl;
	}
	// toggle() {
	// 	console.log('minua kutsuttiiin');
	// 	if (this.control.disabled) {
	// 		return;
	// 	}
	// 	this.checked = !this.checked;
	// 	console.log(this.checked);
	// }
}
