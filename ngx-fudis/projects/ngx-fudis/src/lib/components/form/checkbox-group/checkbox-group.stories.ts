import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { CheckboxGroupComponent } from './checkbox-group.component';

@Component({
	selector: 'example-checkbox-group',
	template: `
		<form [formGroup]="mainFormGroup">
			<!--			<fudis-checkbox-group>-->
			<!--			</fudis-checkbox-group>-->
		</form>
	`,
})
class CheckboxGroupExampleComponent {
	constructor(private _formBuilder: FormBuilder) {}

	mainFormGroup: FormGroup = this._formBuilder.group({});
}

export default {
	title: 'Components/Form/Checkbox Group',
	component: CheckboxGroupComponent,
	decorators: [
		moduleMetadata({
			declarations: [CheckboxGroupExampleComponent],
			imports: [ReactiveFormsModule, FormsModule],
		}),
	],
} as Meta;

export const Checkbox: StoryFn = () => ({
	template: `
			<example-checkbox-group></example-checkbox-group>
	`,
});
