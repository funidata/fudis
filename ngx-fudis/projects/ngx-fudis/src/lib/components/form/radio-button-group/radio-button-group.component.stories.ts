import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RadioButtonGroupComponentExample } from 'projects/ngx-fudis/src/examples/form/radio-button-group-example/radio-button-group-example.component';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { LegendComponent } from '../legend/legend.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

export default {
	title: 'Components/Form/RadioButtonGroup',
	component: RadioButtonGroupComponentExample,
	subcomponents: {
		RadioButtonGroupComponent,
		RadioButtonComponent,
		BodyTextComponent,
		LegendComponent,
		ErrorMessageComponent,
	},
	decorators: [
		moduleMetadata({
			declarations: [
				RadioButtonGroupComponent,
				RadioButtonComponent,
				RadioButtonGroupComponentExample,
				BodyTextComponent,
				LegendComponent,
				ErrorMessageComponent,
			],
			imports: [ReactiveFormsModule, BrowserModule, FormsModule],
		}),
	],
} as Meta;

export const RadioButtonGroup: Story = () => ({
	template: `
			<example-radio-button-group></example-radio-button-group>
	`,
});
