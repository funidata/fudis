import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CheckboxComponent } from './checkbox.component';

@Component({
	selector: 'example-checkbox',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-checkbox
				[control]="checkboxFirst"
				[id]="'example_checkbox_1_id'"
				[name]="'example_checkbox_1_name'"
				[helpText]="'This checkbox is disabled and cannot be toggled.'"
				[label]="'I am an example!'"></fudis-checkbox>
			<fudis-checkbox
				[control]="checkboxSecond"
				[id]="'example_checkbox_2_id'"
				[name]="'example_checkbox_2_name'"
				[helpText]="'This checkbox is required and must be checked.'"
				[errorMsg]="{ required: 'Please check the checkbox.' }"
				[label]="'I am an another example!'"></fudis-checkbox>
			<div class="storybook-flex-column">
				<fudis-body-text>Value of first box: {{ checkboxFirst.value }}</fudis-body-text>
				<fudis-body-text>Value of second box: {{ checkboxSecond.value }}</fudis-body-text>
			</div>
		</form>
	`,
})
class CheckboxExampleComponent {
	checkboxFirst: FormControl = new FormControl({ value: true, disabled: true });

	checkboxSecond: FormControl = new FormControl(false, Validators.requiredTrue);

	mainFormGroup: FormGroup = this.formBuilder.group({
		checkboxFirst: this.checkboxFirst,
		checkboxSecond: this.checkboxSecond,
	});

	constructor(private formBuilder: FormBuilder) {}
}

export default {
	title: 'Components/Form/Checkbox',
	component: CheckboxComponent,
	decorators: [
		moduleMetadata({
			declarations: [CheckboxExampleComponent],
			imports: [ReactiveFormsModule, FormsModule],
		}),
	],
} as Meta;

export const Checkbox: Story = () => ({
	template: `
			<example-checkbox></example-checkbox>
	`,
});
