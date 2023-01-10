import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { RadioButtonOption } from 'projects/ngx-fudis/src/lib/types/forms';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'example-radio-button-group',
	templateUrl: './radio-button-group-example.component.html',
	styleUrls: ['./radio-button-group-example.component.scss'],
})

// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RadioButtonGroupComponentExample implements OnInit {
	mainFormGroup: FormGroup;

	radioButtonGroupOne: FormControl = new FormControl();

	radioButtonGroupTwo: FormControl = new FormControl();

	selectedId: string | number | undefined = undefined;

	/**
	 * Options for testing purposes
	 */

	options: RadioButtonOption[] = [
		{ value: 'apple', label: 'Apple', id: '1', name: 'fruit', checked: false },
		{ value: 'fair-trade-banana', label: 'Fair Trade Banana', id: '2', name: 'fruit', checked: false },
		{ value: 'cherry', label: 'Cherry', id: '3', name: 'fruit', checked: true },
	];

	optionsTwo: RadioButtonOption[] = [
		{ value: 'dog', label: 'Dog', id: '1', name: 'animal', checked: false },
		{ value: 'cat', label: 'Cat', id: '2', name: 'animal', checked: false },
		{ value: 'cabybara', label: 'Cabybara', id: '3', name: 'animal', checked: false },
	];

	constructor(private formBuilder: FormBuilder) {
		if (this.options.length < 2) {
			throw new Error('Radio button needs value more than 2');
		}
	}

	ngOnInit() {
		this.mainFormGroup = this.formBuilder.group({
			radioButtonGroupOne: this.radioButtonGroupOne,
			radioButtonGroupTwo: this.radioButtonGroupTwo,
		});
	}
}
