import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FudisRadioButtonOption } from '../../../types/forms';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import readme from './readme.mdx';
import { FudisValidators } from '../../../utilities/form/validators';

const getDefaultValue = (options: FudisRadioButtonOption[]): string | boolean | undefined | null => {
	const checkedValue = options.find((item) => item.checked);
	return checkedValue?.value;
};
@Component({
	selector: 'example-radio-button-group',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-radio-button-group
				*ngIf="mainFormGroup"
				style="margin-bottom: 1rem;"
				[title]="'Choose your preferred fruit'"
				[helpText]="'Fruits are important for your health.'"
				[control]="mainFormGroup.controls['first']"
				[options]="fruitOptions" />
			<fudis-radio-button-group
				*ngIf="mainFormGroup"
				style="margin-top: 2rem; margin-bottom: 1rem;"
				[title]="'Choose a pet'"
				[helpText]="'We all should have a pet.'"
				[control]="mainFormGroup.controls['second']"
				[options]="petOptions" />
			<fudis-radio-button-group
				*ngIf="mainFormGroup"
				style="margin-top: 2rem; margin-bottom: 1rem;"
				[title]="'Choose a truth'"
				[helpText]="'We all perceive truth individually.'"
				[control]="mainFormGroup.controls['third']"
				[options]="booleanOptions" />
		</form>
	`,
})
class RadioButtonGroupExampleComponent {
	constructor(private _formBuilder: FormBuilder) {}

	fruitOptions: FudisRadioButtonOption[] = [
		{ value: 'apple', label: 'Apple', id: 'fruit-1', name: 'fruit' },
		{ value: 'fair-trade-banana', label: 'Fair Trade Banana', id: 'fruit-2', name: 'fruit', checked: true },
		{ value: 'cherry', label: 'Cherry', id: 'fruit-3', name: 'fruit' },
	];

	petOptions: FudisRadioButtonOption[] = [
		{ value: 'platypus', label: 'Platypus' },
		{ value: 'otter', label: 'Otter', name: 'animal' },
		{ value: 'capybara', label: 'Capybara' },
	];

	booleanOptions: FudisRadioButtonOption[] = [
		{ value: false, label: 'False', id: 'boolean-1', name: 'booleans' },
		{ value: true, label: 'True', id: 'boolean-2', name: 'booleans' },
	];

	mainFormGroup: FormGroup = this._formBuilder.group({
		first: new FormControl(getDefaultValue(this.fruitOptions), FudisValidators.required('You must choose a fruit')),
		second: new FormControl(getDefaultValue(this.petOptions), FudisValidators.required('You must choose a pet.')),
		third: new FormControl(null, FudisValidators.required('You must choose a truth')),
	});
}

export default {
	title: 'Components/Form/Radio Button Group',
	component: RadioButtonGroupComponent,
	decorators: [
		moduleMetadata({
			declarations: [RadioButtonGroupExampleComponent],
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

const Template: StoryFn<RadioButtonGroupExampleComponent> = (args: RadioButtonGroupExampleComponent) => ({
	props: args,
	template: html`<example-radio-button-group></example-radio-button-group> `,
});

export const Examples = Template.bind({});
Examples.args = {};
