import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CheckboxComponentExample } from '../../../../../examples/form/checkbox-example/checkbox-example.component';
import { CheckboxComponent } from './checkbox.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { ButtonComponent } from '../../button/button.component';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';

export default {
	title: 'Components/Form/Checkbox',
	component: CheckboxComponent,
	subcomponents: {
		ErrorMessageComponent,
	},
	decorators: [
		moduleMetadata({
			declarations: [
				CheckboxComponent,
				CheckboxComponentExample,
				ErrorMessageComponent,
				ButtonComponent,
				BodyTextComponent,
			],
			imports: [ReactiveFormsModule, BrowserModule, FormsModule],
		}),
	],
} as Meta;

export const Checkbox: Story = () => ({
	template: `
			<example-checkbox></example-checkbox>
	`,
});
