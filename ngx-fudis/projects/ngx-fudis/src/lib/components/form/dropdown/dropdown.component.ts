import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
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
	selector: 'fudis-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent implements OnInit {
	@Input() options: Option[];

	/**
	 * Options for testing purposes
	 */
	options2: Option[] = [
		{ value: 'Leivonta-101', viewValue: 'Leivontakurssi, joka kestää tosi kauan ja on tosi spesifi' },
		{ value: 'Hiivat661', viewValue: 'Kaikki hiivasta', disabled: true },
		{ value: 'Sticky-bun', viewValue: 'Luonnon pullat' },
	];

	@Input() required = false;

	/**
	 * If true, user can choose multiple checkbox options from dropdown
	 */
	@Input() multipleOption = false;

	@Input() label?: string;

	/**
	 * Custom placeholder text to show when no selection has been made. Defaults to 'Valitse'
	 */
	@Input() placeholder: string;

	/**
	 *	Helper or info text for the input, aligned underneath the input
	 */
	@Input() helpText?: string;

	selectedOption: Option;

	validatorArray: any = [];

	selectFormControl = new FormControl('', this.validatorArray);

	ngOnInit(): void {
		if (this.required) {
			this.validatorArray.push(Validators.required);
		}
	}

	public get classes(): string[] {
		if (this.selectFormControl.touched && this.selectFormControl.invalid) {
			return ['fudis-dropdown--invalid'];
		}
		return [];
	}
}
