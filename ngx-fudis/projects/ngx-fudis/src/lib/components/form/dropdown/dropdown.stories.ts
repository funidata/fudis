import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UntypedFormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DropdownComponent } from './dropdown.component';

export default {
	title: 'Components/Form/Dropdown',
	component: DropdownComponent,
	decorators: [
		moduleMetadata({
			imports: [
				BrowserAnimationsModule,
				MatFormFieldModule,
				MatSelectModule,
				MatInputModule,
				ReactiveFormsModule,
				FormsModule,
			],
		}),
	],
	argTypes: {},
} as Meta;

const Template: Story<DropdownComponent> = (args: DropdownComponent) => ({
	props: args,
	template: `
	<fudis-dropdown size="l" [placeholder]="placeholder" [errorMsg]="errorMsg" [control]="control" [options]="options" [requiredText]="requiredText" [label]="label" [id]="id" [helpText]="helpText"></fudis-dropdown>
	
	<ng-container *ngIf="control.value">
	<fudis-body-text>Looks like you have a pet with 'viewValue' of: {{control.value.viewValue}}</fudis-body-text>
	<fudis-body-text>And it's technical beep boop 'value' is: {{control.value.value}}</fudis-body-text>
	</ng-container>
	`,
});

// Options given in the component's typescript (test options) are not working in this example
export const SingleSelect = Template.bind({});
SingleSelect.args = {
	errorMsg: { required: "It is necessary to choose a pet. It's good for your health!" },
	requiredText: 'Required',
	label: 'Select a pet',
	placeholder: 'Choose a pet',
	control: new UntypedFormControl('', Validators.required),
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
