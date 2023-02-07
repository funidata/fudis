import { Story, Meta, moduleMetadata } from '@storybook/angular';
import {
	FormsModule,
	ReactiveFormsModule,
	UntypedFormBuilder,
	UntypedFormControl,
	UntypedFormGroup,
	Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CheckboxComponent } from './checkbox.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
	selector: 'example-checkbox',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-checkbox
				[control]="checkboxFirst"
				id="example_checkbox_1_id"
				name="example_checkbox_1_name"
				label="I am an example!"></fudis-checkbox>
			<fudis-checkbox
				[control]="checkboxSecond"
				id="example_checkbox_2_id"
				name="example_checkbox_2_name"
				errorMessage="There is something wrong with me. Probably I am set as required in my FormControl."
				label="I am an another example!"></fudis-checkbox>
			<div [style.display]="'flex'" [style.flex-direction]="'column'">
				<fudis-body-text>Value of first box: {{ checkboxFirst.value }}</fudis-body-text>
				<fudis-body-text>Value of second box: {{ checkboxSecond.value }}</fudis-body-text>
				<fudis-body-text size="s-regular"
					>For testing purposes this button below triggers checkbox value update outside of checkbox components
				</fudis-body-text>
				<fudis-button (click)="changeValueFromOutside()" label="Click here to toggle second checkbox!"></fudis-button>
			</div>
		</form>
	`,
})
class CheckboxExampleComponent {
	/**
	 * Options for testing purposes
	 */

	checkboxFirst: UntypedFormControl = new UntypedFormControl({ value: true, disabled: true });

	checkboxSecond: UntypedFormControl = new UntypedFormControl(false, Validators.requiredTrue);

	mainFormGroup: UntypedFormGroup = this.formBuilder.group({
		checkboxFirst: this.checkboxFirst,
		checkboxSecond: this.checkboxSecond,
	});

	constructor(private formBuilder: UntypedFormBuilder) {}

	changeValueFromOutside(): void {
		this.checkboxSecond.patchValue(!this.checkboxSecond.value);
	}
}

export default {
	title: 'Components/Form/Checkbox',
	component: CheckboxComponent,
	subcomponents: {
		ErrorMessageComponent,
	},
	decorators: [
		moduleMetadata({
			declarations: [CheckboxExampleComponent],
			imports: [ReactiveFormsModule, BrowserModule, FormsModule],
		}),
	],
} as Meta;

export const Checkbox: Story = () => ({
	template: `
			<example-checkbox></example-checkbox>
	`,
});
