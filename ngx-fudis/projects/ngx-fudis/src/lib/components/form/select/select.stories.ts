import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { FudisValidators } from '../../../utilities/form/validators';
import { SelectComponent } from './select.component';
import readme from './readme.mdx';

export default {
	title: 'Components/Form/Select',
	component: SelectComponent,
	decorators: [
		applicationConfig({
			providers: [importProvidersFrom(BrowserAnimationsModule)],
		}),
	],
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: [
				'ariaLabel',
				'disabled',
				'id',
				'invalidState',
				'_id',
				'_required',
				'_requiredText',
				'_translations',
				'ngOnInit',
				'ngOnChanges',
				'onBlur',
			],
		},
	},
	argTypes: {
		size: {
			options: ['sm', 'md', 'lg'],
			control: { type: 'radio' },
		},
	},
} as Meta;

const html = String.raw;

const Template: StoryFn<SelectComponent> = (args: SelectComponent) => ({
	props: {
		...args,
		options: [
			{ value: 'value-1-dog', label: 'Dog' },
			{ value: 'value-2-capybara', label: 'Capybara' },
			{ value: 'value-3-platypys', label: 'Platypus' },
			{ value: 'value-4-cat', label: 'Cat, disabled for demo purposes', disabled: true },
			{ value: 'value-5-armadillo', label: 'Screaming hairy armadillo' },
			{ value: 'value-6-gecko', label: 'Southern Titiwangsa Bent-Toed Gecko' },
		],
	},
	template: html`
		<fudis-select
			[size]="size"
			[multiselect]="multiselect"
			[placeholder]="placeholder"
			[control]="control"
			[label]="label"
			[id]="id"
			[helpText]="helpText"
			[tooltip]="tooltip"
			[tooltipPosition]="tooltipPosition"
			[tooltipToggle]="tooltipToggle">
			<fudis-select-option
				*ngFor="let option of options"
				[label]="option.label"
				[value]="option.value"
				[disabled]="option.disabled" />
		</fudis-select>
	`,
});

export const SingleSelect = Template.bind({});
SingleSelect.args = {
	label: 'Select a pet',
	size: 'lg',
	placeholder: 'Choose a pet',
	multiselect: true,
	control: new FormControl(
		null,
		FudisValidators.required("It is necessary to choose a pet. It's good for your health!")
	),
	helpText: 'All pets are equally important, but for sake of this example please pick one.',
};

// export const MultiSelect = Template.bind({});
// MultiSelect.args = {
// 	multipleOption: true,
// 	label: 'Select from two to three pets',
// 	size: 'lg',
// 	placeholder: 'Choose pets',
// 	control: new FormControl(null, [
// 		FudisValidators.required("It is necessary to choose multiple pets. It's even better for your health!"),
// 		FudisValidators.minLength(2, 'Choose at least two pets'),
// 		FudisValidators.maxLength(3, "That's probably too much already."),
// 	]),
// 	helpText: 'All pets are equally important, but for sake of this example please pick two to three pets.',
// 	tooltip: 'Platypus is the right choice',
// 	tooltipPosition: 'below',
// 	tooltipToggle: false,
// 	options: [
// 		{ value: 'value-1-dog', label: 'Dog' },
// 		{ value: 'value-2-capybara', label: 'Capybara' },
// 		{ value: 'value-3-platypys', label: 'Platypus' },
// 		{ value: 'value-4-cat', label: 'Cat, disabled for demo purposes', disabled: true },
// 		{ value: 'value-5-armadillo', label: 'Screaming hairy armadillo' },
// 		{ value: 'value-6-gecko', label: 'Southern Titiwangsa Bent-Toed Gecko' },
// 	],
// };
