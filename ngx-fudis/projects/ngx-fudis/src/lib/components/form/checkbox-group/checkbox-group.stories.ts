import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { FudisCheckboxOption } from '../../../types/forms';
import readme from './readme.mdx';
import { FudisFormGroupValidators } from '../../../utilities/form/validators';

@Component({
	selector: 'example-checkbox-group',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-checkbox-group
				*ngIf="mainFormGroup"
				style="margin-bottom: 1rem;"
				[required]="true"
				[title]="'Choose your preferred fruit'"
				[helpText]="'Fruits are important for your health.'"
				[groupErrorMsg]="{
					atLeastOneRequired: 'No berries picked!'
				}"
				[options]="fruitOptions"
				[formGroup]="mainFormGroup.controls['fruitFormGroup']" />
			<fudis-checkbox-group
				*ngIf="mainFormGroup"
				style="margin-bottom: 1rem;"
				[title]="'Choose a pet'"
				[helpText]="'We all should have a pet.'"
				[groupErrorMsg]="{
					lessThanRequiredRange: 'Not enough pets picked!',
					moreThanRequiredRange: 'Too much pets picked!'
				}"
				[options]="petOptions"
				[tooltip]="'Choose from two to three pets'"
				[formGroup]="mainFormGroup.controls['petFormGroup']" />
		</form>
	`,
})
class CheckboxGroupExampleComponent {
	constructor(private _formBuilder: FormBuilder) {}

	fruitOptions: FudisCheckboxOption[] = [
		{ value: 'apple', label: 'Apple', id: 'fruit-1', name: 'fruit' },
		{ value: 'fair-trade-banana', label: 'Fair Trade Banana', id: 'fruit-2', name: 'fruit' },
		{ value: 'cherry', label: 'Cherry', id: 'fruit-3', name: 'fruit' },
	];

	petOptions: FudisCheckboxOption[] = [
		{ value: 'platypus', label: 'Platypus', id: 'pet-1', name: 'animal' },
		{ value: 'otter', label: 'Otter', id: 'pet-2', name: 'animal' },
		{ value: 'capybara', label: 'Capybara', id: 'pet-3', name: 'animal' },
		{ value: 'unicorn', label: 'Unicorn', id: 'pet-4', name: 'animal' },
	];

	mainFormGroup: FormGroup = this._formBuilder.group({
		fruitFormGroup: new FormGroup(
			{
				checkbox0: new FormControl<FudisCheckboxOption | null>(null),
				checkbox1: new FormControl<FudisCheckboxOption | null>(null),
				checkbox2: new FormControl<FudisCheckboxOption | null>(null),
			},
			FudisFormGroupValidators.atLeastOneRequired()
		),
		petFormGroup: new FormGroup(
			{
				checkbox0: new FormControl<FudisCheckboxOption | null>(null),
				checkbox1: new FormControl<FudisCheckboxOption | null>(null),
				checkbox2: new FormControl<FudisCheckboxOption | null>(null),
				checkbox3: new FormControl<FudisCheckboxOption | null>(null),
			},
			FudisFormGroupValidators.outOfRequiredRange(2, 3)
		),
	});
}

export default {
	title: 'Components/Form/Checkbox Group',
	component: CheckboxGroupComponent,
	decorators: [
		moduleMetadata({
			declarations: [CheckboxGroupExampleComponent],
			imports: [ReactiveFormsModule, FormsModule],
		}),
	],
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: /.*/g,
		},
	},
	argTypes: {},
} as Meta;

const html = String.raw;

const Template: StoryFn<CheckboxGroupExampleComponent> = (args: CheckboxGroupExampleComponent) => ({
	props: args,
	template: html`<example-checkbox-group />`,
});
export const Examples = Template.bind({});
Examples.args = {};
