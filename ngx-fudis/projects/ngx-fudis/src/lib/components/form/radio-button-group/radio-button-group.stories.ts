import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FudisRadioButtonOption } from '../../../types/forms';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import readme from './readme.mdx';

const getDefaultValue = (options: FudisRadioButtonOption[]): string | boolean | undefined | null => {
	const checkedValue = options.find((item) => item.checked);
	return checkedValue?.value;
};
@Component({
	selector: 'example-radio-button-group',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-radio-button-group
				style="margin-bottom: 1rem;"
				[title]="'Choose your preferred fruit'"
				[helpText]="'Fruits are important for your health.'"
				[errorMsg]="{ required: 'You must choose a fruit.' }"
				*ngIf="mainFormGroup"
				[control]="mainFormGroup.controls['first']"
				[options]="fruitOptions" />
			<fudis-radio-button-group
				style="margin-top: 2rem; margin-bottom: 1rem;"
				[title]="'Choose a pet'"
				[helpText]="'We all should have a pet.'"
				[errorMsg]="{ required: 'You must choose a pet.' }"
				*ngIf="mainFormGroup"
				[control]="mainFormGroup.controls['second']"
				[options]="petOptions" />
			<fudis-radio-button-group
				style="margin-top: 2rem; margin-bottom: 1rem;"
				[title]="'Choose a truth'"
				[helpText]="'We all perceive truth individually.'"
				[errorMsg]="{ required: 'You must choose a truth.' }"
				*ngIf="mainFormGroup"
				[control]="mainFormGroup.controls['third']"
				[options]="booleanOptions" />
		</form>
	`,
})
class RadioButtonGroupExampleComponent {
	constructor(private _formBuilder: FormBuilder) {}

	fruitOptions: FudisRadioButtonOption[] = [
		{ value: 'apple', viewValue: 'Apple', id: 'fruit-1', name: 'fruit' },
		{ value: 'fair-trade-banana', viewValue: 'Fair Trade Banana', id: 'fruit-2', name: 'fruit', checked: true },
		{ value: 'cherry', viewValue: 'Cherry', id: 'fruit-3', name: 'fruit' },
	];

	petOptions: FudisRadioButtonOption[] = [
		{ value: 'platypus', viewValue: 'Platypus', id: 'pet-1', name: 'animal' },
		{ value: 'otter', viewValue: 'Otter', id: 'pet-2', name: 'animal' },
		{ value: 'capybara', viewValue: 'Capybara', id: 'pet-3', name: 'animal' },
	];

	booleanOptions: FudisRadioButtonOption[] = [
		{ value: false, viewValue: 'False', id: 'boolean-1', name: 'booleans' },
		{ value: true, viewValue: 'True', id: 'boolean-2', name: 'booleans' },
	];

	mainFormGroup: FormGroup = this._formBuilder.group({
		first: new FormControl(getDefaultValue(this.fruitOptions), Validators.required),
		second: new FormControl(getDefaultValue(this.petOptions), Validators.required),
		third: new FormControl(null, Validators.required),
	});
}

export default {
	title: 'Components/Form/Radio Button Group',
	component: RadioButtonGroupComponent,
	subcomponents: {
		RadioButtonGroupComponent,
		RadioButtonComponent,
		BodyTextComponent,
		ErrorMessageComponent,
	},
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
