import { Component } from '@angular/core';

import {
	UntypedFormBuilder,
	UntypedFormControl,
	UntypedFormGroup,
	Validators,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';

import { RadioButtonOption } from 'projects/ngx-fudis/src/lib/types/forms';

import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { BrowserModule } from '@angular/platform-browser';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { LegendComponent } from '../legend/legend.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

const getDefaultValue = (options: RadioButtonOption[]): string | undefined => {
	const checkedValue = options.find((item) => item.checked);
	return checkedValue?.value;
};
@Component({
	selector: 'example-radio-button-group',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-radio-button-group
				id="fruit-selection"
				legend="Choose your preferred fruit"
				errorMessage="You must choose a fruit! :("
				*ngIf="mainFormGroup"
				[control]="radioButtonGroupOne"
				[options]="fruitOptions"></fudis-radio-button-group>
			<fudis-body-text *ngIf="radioButtonGroupOne.value"
				>Option chosen: {{ radioButtonGroupOne.value }}</fudis-body-text
			>
			<fudis-body-text *ngIf="!radioButtonGroupOne.value">No value chosen for the first :(</fudis-body-text>
			<fudis-radio-button-group
				id="pet-selection"
				legend="Choose a pet"
				errorMessage="You must choose a pet! :("
				*ngIf="mainFormGroup"
				[control]="radioButtonGroupTwo"
				[options]="petOptions"></fudis-radio-button-group>
			<fudis-body-text *ngIf="radioButtonGroupTwo.value"
				>Option chosen: {{ radioButtonGroupTwo.value }}</fudis-body-text
			>
			<fudis-body-text *ngIf="!radioButtonGroupTwo.value">No value chosen for the second :(</fudis-body-text>
		</form>
	`,
})
class RadioButtonGroupExampleComponent {
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

export default {
	title: 'Components/Form/RadioButtonGroup',
	component: RadioButtonGroupComponent,
	subcomponents: {
		RadioButtonGroupComponent,
		RadioButtonComponent,
		BodyTextComponent,
		LegendComponent,
		ErrorMessageComponent,
	},
	decorators: [
		moduleMetadata({
			declarations: [RadioButtonGroupExampleComponent],
			imports: [ReactiveFormsModule, BrowserModule, FormsModule],
		}),
	],
} as Meta;

export const RadioButtonGroup: Story = () => ({
	template: `
			<example-radio-button-group></example-radio-button-group>
	`,
});
