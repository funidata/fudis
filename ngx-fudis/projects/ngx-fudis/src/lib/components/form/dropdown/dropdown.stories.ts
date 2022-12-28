import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { DropdownComponent } from './dropdown.component';

export default {
	title: 'Components/Form/Dropdown',
	component: DropdownComponent,
	decorators: [
		moduleMetadata({
			imports: [BrowserAnimationsModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, FormsModule],
		}),
	],
	argTypes: {},
} as Meta;

const Template: Story<DropdownComponent> = (args: DropdownComponent) => ({
	props: args,
});

// Options given in the component's typescript (test options) are not working in this example
export const SingleSelect = Template.bind({});
SingleSelect.args = {
	label: 'Opintojakso',
};
