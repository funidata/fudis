import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextInputComponent } from './text-input.component';

export default {
	title: 'Components/Form/TextInput',
	component: TextInputComponent,
	decorators: [
		moduleMetadata({
			imports: [MatInputModule, MatFormFieldModule],
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
