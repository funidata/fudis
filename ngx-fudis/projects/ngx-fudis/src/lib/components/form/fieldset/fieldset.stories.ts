import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldsetComponent } from './fieldset.component';

export default {
	title: 'Components/Form/Fieldset',
	component: FieldsetComponent,

	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [ReactiveFormsModule, FormsModule],
		}),
		applicationConfig({
			providers: [importProvidersFrom(BrowserAnimationsModule)],
		}),
	],
	parameters: {
		controls: {
			exclude: ['control'],
		},
	},
} as Meta;

const props = {};

const Template: StoryFn = () => ({
	props: { ...props },
	template: `
	<form>
	TBD 
	</form>

	`,
});

export const Example = Template.bind({});
