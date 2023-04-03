import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownComponent } from './dropdown.component';

export default {
	title: 'Components/Form/Dropdown',
	component: DropdownComponent,
	decorators: [
		moduleMetadata({
			imports: [BrowserAnimationsModule],
		}),
	],
	argTypes: {},
} as Meta;

const html = String.raw;

const Template: Story<DropdownComponent> = (args: DropdownComponent) => ({
	props: args,
	template: html`
		<fudis-dropdown
			size="l"
			[multipleOption]="multipleOption"
			[placeholder]="placeholder"
			[errorMsg]="errorMsg"
			[control]="control"
			[options]="options"
			[requiredText]="requiredText"
			[label]="label"
			[id]="id"
			[helpText]="helpText"></fudis-dropdown>

		<ng-container *ngIf="control.value.length > 0">
			<ng-container *ngFor="let value of control.value">
				<fudis-body-text>Looks picked a pet with 'viewValue' of: {{value.viewValue}}</fudis-body-text>
				<fudis-body-text>And it's technical beep boop 'value' is: {{value.value}}</fudis-body-text>
			</ng-container>
		</ng-container>

		<ng-container *ngIf="control.value.value">
			<fudis-body-text>Looks picked a pet with 'viewValue' of: {{control.value.viewValue}}</fudis-body-text>
			<fudis-body-text>And it's technical beep boop 'value' is: {{control.value.value}}</fudis-body-text>
		</ng-container>
	`,
});

export const SingleSelect = Template.bind({});
SingleSelect.args = {
	errorMsg: { required: "It is necessary to choose a pet. It's good for your health!" },
	requiredText: 'Required',
	required: true,
	label: 'Select a pet',
	placeholder: 'Choose a pet',
	multipleOption: false,
	control: new FormControl('', Validators.required),
	id: 'example-id-for-dropdown-select',
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
	requiredText: 'Required',
	required: true,
	label: 'Select from two to three pets',
	placeholder: 'Choose a pet',
	control: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]),
	id: 'example-id-for-dropdown-multi-select',
	helpText: 'All pets are equally important, but for sake of this example please pick two to three pets.',
	options: [
		{ value: 'value-1-dog', viewValue: 'Dog' },
		{ value: 'value-2-capybara', viewValue: 'Capybara' },
		{ value: 'value-3-platypys', viewValue: 'Platypus' },
		{ value: 'value-4-cat', viewValue: 'Cat, disabled for demo purposes', disabled: true },
		{ value: 'value-5-armadillo', viewValue: 'Screaming hairy armadillo' },
		{ value: 'value-6-gecko', viewValue: 'Southern Titiwangsa Bent-Toed Gecko' },
	],
};
