import { Component } from '@angular/core';

import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { RadioButtonOption } from 'projects/ngx-fudis/src/lib/types/forms';

const getDefaultValue = (options: RadioButtonOption[]): string | undefined => {
	const checkedValue = options.find((item) => item.checked);
	return checkedValue?.value;
};
@Component({
	selector: 'example-radio-button-group',
	templateUrl: './radio-button-group-example.component.html',
})

// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RadioButtonGroupComponentExample {
	/**
	 * Options for testing purposes
	 */

	fruitOptions: RadioButtonOption[] = [
		{ value: 'apple', label: 'Apple', id: 'fruit-1', name: 'fruit' },
		{ value: 'fair-trade-banana', label: 'Fair Trade Banana', id: 'fruit-2', name: 'fruit', checked: true },
		{ value: 'cherry', label: 'Cherry', id: 'fruit-3', name: 'fruit' },
	];

	petOptions: RadioButtonOption[] = [
		{ value: 'platypus', label: 'Platypus', id: 'pet-1', name: 'animal' },
		{ value: 'otter', label: 'Otter', id: 'pet-2', name: 'animal' },
		{ value: 'capybara', label: 'Capybara', id: 'pet-3', name: 'animal' },
	];

	radioButtonGroupOne: UntypedFormControl = new UntypedFormControl(
		getDefaultValue(this.fruitOptions),
		Validators.required
	);

	radioButtonGroupTwo: UntypedFormControl = new UntypedFormControl(
		getDefaultValue(this.petOptions),
		Validators.required
	);

	mainFormGroup: UntypedFormGroup = this.formBuilder.group({
		radioButtonGroupOne: this.radioButtonGroupOne,
		radioButtonGroupTwo: this.radioButtonGroupTwo,
	});

	constructor(private formBuilder: UntypedFormBuilder) {}
}
