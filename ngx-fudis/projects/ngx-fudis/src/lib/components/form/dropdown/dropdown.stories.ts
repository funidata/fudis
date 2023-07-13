import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
import readme from './readme.mdx';

export default {
	title: 'Components/Form/Dropdown',
	component: DropdownComponent,
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
	argTypes: {},
} as Meta;

const html = String.raw;

const Template: StoryFn<DropdownComponent> = (args: DropdownComponent) => ({
	props: args,
	template: html`
		<fudis-dropdown
			[size]="size"
			[multipleOption]="multipleOption"
			[placeholder]="placeholder"
			[errorMsg]="errorMsg"
			[control]="control"
			[options]="options"
			[label]="label"
			[id]="id"
			[helpText]="helpText"
			[tooltip]="tooltip"
			[tooltipPosition]="tooltipPosition"
			[tooltipToggle]="tooltipToggle" />
	`,
});

export const SingleSelect = Template.bind({});
SingleSelect.args = {
	errorMsg: { required: "It is necessary to choose a pet. It's good for your health!" },
	label: 'Select a pet',
	size: 'md',
	placeholder: 'Choose a pet',
	control: new FormControl(null, Validators.required),
	helpText: 'All pets are equally important, but for sake of this example please pick one.',
	options: [
		{ value: 'value-1-dog', viewValue: 'Dog' },
		{ value: 'value-2-capybara', viewValue: 'Capybara' },
		{ value: 'value-3-platypys', viewValue: 'Platypus' },
		{ value: 'value-4-cat', viewValue: 'Cat, disabled for demo purposes', disabled: true },
		{ value: 'value-5-armadillo', viewValue: 'Screaming hairy armadillo' },
		{ value: 'value-6-gecko', viewValue: 'Southern Titiwangsa Bent-Toed Gecko' },
	],
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
	errorMsg: {
		required: "It is necessary to choose multiple pets. It's even better for your health!",
		minlength: 'Choose at least two pets',
		maxlength: "That's probably too much already.",
	},
	multipleOption: true,
	label: 'Select from two to three pets',
	size: 'lg',
	placeholder: 'Choose pets',
	control: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(3)]),
	helpText: 'All pets are equally important, but for sake of this example please pick two to three pets.',
	tooltip: 'Platypus is the right choice',
	tooltipPosition: 'below',
	tooltipToggle: false,
	options: [
		{ value: 'value-1-dog', viewValue: 'Dog' },
		{ value: 'value-2-capybara', viewValue: 'Capybara' },
		{ value: 'value-3-platypys', viewValue: 'Platypus' },
		{ value: 'value-4-cat', viewValue: 'Cat, disabled for demo purposes', disabled: true },
		{ value: 'value-5-armadillo', viewValue: 'Screaming hairy armadillo' },
		{ value: 'value-6-gecko', viewValue: 'Southern Titiwangsa Bent-Toed Gecko' },
	],
};
