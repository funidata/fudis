import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInputComponent } from './text-input.component';

export default {
	title: 'Components/Form/TextInput',
	component: TextInputComponent,
	decorators: [
		moduleMetadata({
			imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule],
		}),
	],
	argTypes: {},
} as Meta;

const Template: Story<TextInputComponent> = (args: TextInputComponent) => ({
	props: args,
});

export const TextInput = Template.bind({});
TextInput.args = {
	label: 'Is this the label?',
};

const control = new FormControl('', Validators.required);
export const WithErrorMessage: Story = (args) => ({
	props: {
		...args,
		control,
	},
	template: `
		<mat-form-field class="fudis-form-field">
			<label>Inputin label</label>
			<input matInput type="text" [formControl]="control" class="fudis-text-input" required />
			<mat-error *ngIf="control.hasError('required')">Tää on pakollinen</mat-error>
		</mat-form-field>
    `,
});
WithErrorMessage.storyName = 'with error message';
WithErrorMessage.parameters = {
	controls: {
		exclude: ['alignHint'],
	},
};

export const WithFudis: Story = (args) => ({
	props: {
		...args,
		control,
	},
	template: `
		<fudis-text-input required></fudis-text-input>
    `,
});
WithFudis.storyName = 'with fudis';
