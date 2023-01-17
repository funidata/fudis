import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { RadioButtonOption } from 'projects/ngx-fudis/src/lib/types/forms';

const getDefaultValue = (options: RadioButtonOption[]): string | undefined => {
	const checkedValue = options.find((item) => item.checked);
	return checkedValue?.value;
};
@Component({
	selector: 'example-radio-button-group',
	templateUrl: './radio-button-group-example.component.html',
	styleUrls: ['./radio-button-group-example.component.scss'],
})

// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RadioButtonGroupComponentExample {
	/**
	 * Options for testing purposes
	 */

	fruitOptions: RadioButtonOption[] = [
		{ value: 'apple', label: 'Apple', id: '1', name: 'fruit' },
		{ value: 'fair-trade-banana', label: 'Fair Trade Banana', id: '2', name: 'fruit', checked: true },
		{ value: 'cherry', label: 'Cherry', id: '3', name: 'fruit' },
	];

	petOptions: RadioButtonOption[] = [
		{ value: 'platypus', label: 'Platypus', id: '1', name: 'animal' },
		{ value: 'otter', label: 'Otter', id: '2', name: 'animal' },
		{ value: 'capybara', label: 'Capybara', id: '3', name: 'animal' },
	];

	radioButtonGroupOne: FormControl = new FormControl(getDefaultValue(this.fruitOptions));

	radioButtonGroupTwo: FormControl = new FormControl(getDefaultValue(this.petOptions));

	mainFormGroup: FormGroup = this.formBuilder.group({
		radioButtonGroupOne: this.radioButtonGroupOne,
		radioButtonGroupTwo: this.radioButtonGroupTwo,
	});

	constructor(private formBuilder: FormBuilder) {}
}
