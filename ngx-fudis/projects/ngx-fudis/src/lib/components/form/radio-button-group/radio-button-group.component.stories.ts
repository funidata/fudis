import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFudisRadioButtonOption } from 'projects/ngx-fudis/src/lib/types/forms';

import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { LegendComponent } from '../legend/legend.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

const getDefaultValue = (options: IFudisRadioButtonOption[]): string | undefined => {
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
				helpText="Fruits are important for your health."
				[errorMsg]="{ required: 'You must choose a fruit!' }"
				*ngIf="mainFormGroup"
				[control]="mainFormGroup.controls['first']"
				[options]="fruitOptions"></fudis-radio-button-group>
			<fudis-body-text *ngIf="mainFormGroup.controls['first'].value"
				>Option chosen: {{ mainFormGroup.controls['first'].value }}</fudis-body-text
			>
			<fudis-body-text *ngIf="!mainFormGroup.controls['first'].value"
				>No value chosen for the second :(</fudis-body-text
			>
			<fudis-radio-button-group
				id="pet-selection"
				legend="Choose a pet"
				helpText="We all should have a pet."
				[errorMsg]="{ required: 'You must choose a pet!' }"
				*ngIf="mainFormGroup"
				[control]="mainFormGroup.controls['second']"
				[options]="petOptions"></fudis-radio-button-group>
			<fudis-body-text *ngIf="mainFormGroup.controls['second'].value"
				>Option chosen: {{ mainFormGroup.controls['second'].value }}</fudis-body-text
			>
			<fudis-body-text *ngIf="!mainFormGroup.controls['second'].value"
				>No value chosen for the second :(</fudis-body-text
			>
		</form>
	`,
})
class RadioButtonGroupExampleComponent {
	/**
	 * Options for testing purposes
	 */
	fruitOptions: IFudisRadioButtonOption[] = [
		{ value: 'apple', viewValue: 'Apple', id: 'fruit-1', name: 'fruit' },
		{ value: 'fair-trade-banana', viewValue: 'Fair Trade Banana', id: 'fruit-2', name: 'fruit', checked: true },
		{ value: 'cherry', viewValue: 'Cherry', id: 'fruit-3', name: 'fruit' },
	];

	petOptions: IFudisRadioButtonOption[] = [
		{ value: 'platypus', viewValue: 'Platypus', id: 'pet-1', name: 'animal' },
		{ value: 'otter', viewValue: 'Otter', id: 'pet-2', name: 'animal' },
		{ value: 'capybara', viewValue: 'Capybara', id: 'pet-3', name: 'animal' },
	];

	mainFormGroup: FormGroup = this.formBuilder.group({
		first: new FormControl(getDefaultValue(this.fruitOptions), Validators.required),
		second: new FormControl(getDefaultValue(this.petOptions), Validators.required),
	});

	constructor(private formBuilder: FormBuilder) {}
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
			imports: [ReactiveFormsModule, FormsModule],
		}),
	],
} as Meta;

export const RadioButtonGroup: Story = () => ({
	template: `
			<example-radio-button-group></example-radio-button-group>
	`,
});
