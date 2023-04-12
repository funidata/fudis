import { Story, Meta, applicationConfig } from '@storybook/angular';
import { FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { AutocompleteComponent } from './autocomplete.component';
import readme from './readme.mdx';

export default {
	title: 'Components/Form/Autocomplete',
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

const Template: Story<AutocompleteComponent> = (args: AutocompleteComponent) => ({
	props: args,
});

export const Autocomplete = Template.bind({});
Autocomplete.args = {
	id: 'example-id-for-autocomplete',
	label: 'Choose one option',
	required: true,
	requiredText: 'Required',
	clearFilterText: 'Clear filter',
	helpText:
		'This is autocomplete input, start writing (e.g mar) and after three letters the input will suggest matching options.',
	control: new FormControl('', Validators.required),
	errorMsg: { required: 'This selection is required' },
	options: [
		{ value: 123, viewValue: 'Mary Rhubarb' },
		{ value: '456-xx', viewValue: 'Kingsley Kale' },
		{ value: 789, viewValue: 'Martha Zuccini', disabled: true },
		{ value: 'very-long-value', viewValue: 'Brian Eggplant with Marinated Pomegranate Seeds' },
		{ value: 1234, viewValue: 'Martin Seeding' },
	],
	tooltip: 'well hello to you',
	tooltipPosition: 'below',
	tooltipToggle: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
	id: 'example-id-for-disabled-autocomplete',
	label: 'Choose one option',
	disabled: true,
	helpText:
		'This is autocomplete input, start writing (e.g mar) and after three letters the input will suggest matching options.',
	control: new FormControl(''),
	options: [
		{ value: 123, viewValue: 'Mary Rhubarb' },
		{ value: '456-xx', viewValue: 'Kingsley Kale' },
		{ value: 789, viewValue: 'Martha Zuccini' },
		{ value: 'very-long-value', viewValue: 'Brian Eggplant with Marinated Pomegranate Seeds' },
		{ value: 1234, viewValue: 'Martin Seeding' },
	],
};
