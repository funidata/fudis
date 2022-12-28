import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export interface Option {
	/** Underlying value of the option */
	value: any;
	/** Value that is shown in the UI */
	viewValue: string;
	/** Is option disabled in the dropdown */
	disabled?: boolean;
}

@Component({
	selector: 'fudis-radio-button-group',
	templateUrl: './radio-button-group.component.html',
	styleUrls: ['./radio-button-group.component.scss'],
})
export class RadioButtonGroupComponent implements OnInit {
	/**
	  Options for testing purposes */

	options: Option[] = [
		{ value: 'Hedelmä1', viewValue: 'Omena' },
		// { value: 'Hedelmä2', viewValue: 'Banaaani' },
		// { value: 'Hedelmä3', viewValue: 'Vesimeloni', disabled: true },
	];

	// @Input() options: Option[];

	@Input() name?: string;

	@Input() disabled?: boolean;

	@Input() required?: boolean;

	@Input() checked?: boolean = false;

	@Input() value: any;

	@Input() label: string;

	validatorArray: any = [];

	selectedOption: Option;

	control = new FormControl('', this.validatorArray);

	ngOnInit(): void {
		console.log('hellou');
		if (this.required) {
			this.validatorArray.push(Validators.required);
		}
	}

	toggle() {
		console.log('minua kutsuttiiin');
		if (this.disabled) {
			return;
		}
		this.checked = !this.checked;
		console.log(this.checked);
	}

	public get classes(): string[] {
		if (this.control.touched && this.control.invalid) {
			return ['fudis-radio-button-group--invalid'];
		}
		return [];
	}
}
