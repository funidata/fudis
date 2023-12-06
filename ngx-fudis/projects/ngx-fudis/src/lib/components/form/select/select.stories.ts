import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { FudisValidators } from '../../../utilities/form/validators';
import { SelectComponent } from './select.component';
import readme from './readme.mdx';
import { selectMockData } from './mock_data';
import { FudisSelectOption } from '../../../types/forms';

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

const singleselectProps = {
	label: 'Select a pet',
	size: 'lg',
	placeholder: 'Choose a pet',
	multiselect: false,
	control: new FormControl(
		selectMockData[2],
		FudisValidators.required("It is necessary to choose a pet. It's good for your health!")
	),
	helpText: 'All pets are equally important, but for sake of this example please pick one.',
};

const multiselectProps = {
	label: 'Multiselect pet',
	size: 'lg',
	placeholder: 'Multiselect a pet',
	multiselect: true,
	control: new FormControl(
		[selectMockData[1], selectMockData[3], selectMockData[5]],
		FudisValidators.required("It is necessary to choose a pet. It's good for your health!")
	),
	helpText: 'All pets are equally important, but for sake of this example please pick one.',
};

const autoCompleteProps = {
	label: 'Autoselect pet',
	size: 'lg',
	placeholder: 'Autoselect a pet',
	multiselect: false,
	control: new FormControl(
		selectMockData[72],
		FudisValidators.required("It is necessary to choose a pet. It's good for your health!")
	),
	helpText: 'All pets are equally important, but for sake of this example please pick one.',
};
const autocompleteMultiselectProps = {
	label: 'Multiselect autocomplete pet',
	size: 'lg',
	placeholder: 'Autoselect a pet',
	multiselect: true,
	control: new FormControl(
		[selectMockData[1], selectMockData[3], selectMockData[5]],
		FudisValidators.required("It is necessary to choose a pet. It's good for your health!")
	),
	helpText: 'All pets are equally important, but for sake of this example please pick one.',
};

const defaultOptions: FudisSelectOption[] = [
	{ value: 'value-1-dog', label: 'Dog' },
	{ value: 'value-2-capybara', label: 'Capybara' },
	{ value: 'value-3-platypys', label: 'Platypus' },
	{ value: 'value-4-cat', label: 'Cat, disabled for demo purposes', disabled: true },
	{ value: 'value-5-armadillo', label: 'Screaming hairy armadillo' },
	{ value: 'value-6-gecko', label: 'Southern Titiwangsa Bent-Toed Gecko' },
];

const Template: StoryFn<SelectComponent> = (args: SelectComponent) => ({
	props: {
		...args,
		defaultOptions,
		options: selectMockData,
		singleselect: {
			...singleselectProps,
		},
		multiselect: {
			...multiselectProps,
		},
		autocomplete: {
			...autoCompleteProps,
		},
		autocompleteMultiselect: {
			...autocompleteMultiselectProps,
		},
	},
	template: html`
		<fudis-select
			[openOnFocus]="true"
			[multiselect]="singleselect.multiselect"
			[placeholder]="singleselect.placeholder"
			[control]="singleselect.control"
			[label]="singleselect.label"
			[id]="id"
			[helpText]="singleselect.helpText"
			[tooltip]="tooltip"
			[tooltipPosition]="tooltipPosition"
			[tooltipToggle]="tooltipToggle">
			<ng-template fudisContent type="select-options">
				<fudis-select-option *ngFor="let option of defaultOptions" [data]="option"
			/></ng-template>
		</fudis-select>
		<fudis-select
			[multiselect]="multiselect.multiselect"
			[placeholder]="multiselect.placeholder"
			[control]="multiselect.control"
			[label]="multiselect.label"
			[helpText]="multiselect.helpText">
			<ng-template fudisContent type="select-options">
				<fudis-select-option *ngFor="let option of options" [data]="option"
			/></ng-template>
		</fudis-select>
		<fudis-select
			[variant]="'autocomplete'"
			[openOnFocus]="true"
			[multiselect]="autocomplete.multiselect"
			[placeholder]="autocomplete.placeholder"
			[control]="autocomplete.control"
			[label]="autocomplete.label"
			[helpText]="autocomplete.helpText">
			<ng-template fudisContent type="select-options">
				<fudis-select-option *ngFor="let option of options" [data]="option"
			/></ng-template>
		</fudis-select>
		<fudis-select
			[variant]="'autocomplete'"
			[openOnFocus]="true"
			[multiselect]="autocompleteMultiselect.multiselect"
			[placeholder]="autocompleteMultiselect.placeholder"
			[control]="autocompleteMultiselect.control"
			[label]="autocompleteMultiselect.label"
			[helpText]="autocompleteMultiselect.helpText">
			<ng-template fudisContent type="select-options">
				<fudis-select-option *ngFor="let option of options" [data]="option"
			/></ng-template>
		</fudis-select>
	`,
});

export const SingleSelect = Template.bind({});
SingleSelect.args = {};

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
