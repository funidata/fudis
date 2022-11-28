import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextInputComponent } from './text-input.component';

export default {
	title: 'Components/Form/TextInput',
	component: TextInputComponent,
	decorators: [
		moduleMetadata({
			imports: [BrowserAnimationsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule],
		}),
	],
	argTypes: {},
	parameters: {
		controls: {
			exclude: ['control'],
		},
	},
} as Meta;

const Template: Story<TextInputComponent> = (args: TextInputComponent) => ({
	props: args,
});

export const TextInput = Template.bind({});
TextInput.args = {
	label: 'This is the label',
};

export const WithMultipleTextInput: Story = (args) => ({
	props: {
		...args,
	},
	template: `
		<form> 
			<fudis-text-input style="display:flex; flex-direction:column; width:80%"></fudis-text-input>
			<fudis-text-input style="display:flex; flex-direction:column; width:80%" type="email"></fudis-text-input>
			<fudis-text-input style="display:flex; flex-direction:column; width:80%" type="number"></fudis-text-input>
		</form>
	`,
});
