import { StoryFn, Meta, applicationConfig } from '@storybook/angular';
import { FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { AutocompleteComponent } from './autocomplete.component';
import readme from './readme.mdx';

export default {
	title: 'Components/Form/Autocomplete (single-select)',
	component: AutocompleteComponent,
	parameters: {
		docs: {
			page: readme,
		},
	},
	decorators: [
		applicationConfig({
			providers: [importProvidersFrom(BrowserAnimationsModule)],
		}),
	],
	argTypes: {},
} as Meta;

const Template: StoryFn<AutocompleteComponent> = (args: AutocompleteComponent) => ({
	props: args,
});

export const AutocompleteSearch = Template.bind({});
AutocompleteSearch.args = {
	label: 'Search autocomplete',
	helpText:
		'This is autocomplete input, start writing (e.g mar) and after three letters the input will suggest matching options.',
	control: new FormControl(null, Validators.required),
	errorMsg: { required: 'This selection is required' },
	options: [
		{ value: 123, viewValue: 'Mary Rhubarb' },
		{ value: '456-xx', viewValue: 'Kingsley Kale' },
		{ value: 789, viewValue: 'Martha Zuccini', disabled: true },
		{ value: 'very-long-value', viewValue: 'Brian Eggplant with Marinated Pomegranate Seeds' },
		{ value: 1234, viewValue: 'Martin Seeding' },
	],
	placeholder: "Try searching for 'Mary'",
	tooltip: 'Tooltip text for autocomplete',
	tooltipPosition: 'below',
	tooltipToggle: true,
};

const manyOptions = Array.from({ length: 100 }).map((value, i) => {
	return {
		value: i,
		viewValue: `Item number ${i}`,
	};
});

export const AutocompleteDropdown = Template.bind({});
AutocompleteDropdown.args = {
	label: 'Dropdown autocomplete',
	variant: 'dropdown',
	helpText: 'This autocomplete displays dropdown option list when focusing to the input.',
	control: new FormControl(null, Validators.required),
	errorMsg: { required: 'This selection is required' },
	options: manyOptions,
	tooltip: 'Tooltip text for autocomplete',
	placeholder: 'Focus here to expand options!',
	tooltipPosition: 'below',
	tooltipToggle: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
	label: 'Choose one option',
	disabled: true,
	helpText:
		'This is autocomplete input, start writing (e.g mar) and after three letters the input will suggest matching options.',
	control: new FormControl(null),
	options: [
		{ value: 123, viewValue: 'Mary Rhubarb' },
		{ value: '456-xx', viewValue: 'Kingsley Kale' },
		{ value: 789, viewValue: 'Martha Zuccini' },
		{ value: 'very-long-value', viewValue: 'Brian Eggplant with Marinated Pomegranate Seeds' },
		{ value: 1234, viewValue: 'Martin Seeding' },
	],
};
