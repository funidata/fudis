import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoryFn, Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { DateRangeComponent } from './date-range.component';

export default {
	title: 'Components/Form/Date Range',
	component: DateRangeComponent,
	decorators: [
		moduleMetadata({
			declarations: [],
			imports: [ReactiveFormsModule, FormsModule],
		}),
		applicationConfig({
			providers: [importProvidersFrom(BrowserAnimationsModule)],
		}),
	],
	argTypes: {},
} as Meta;

const Template: StoryFn<DatepickerComponent> = (args: DatepickerComponent) => ({
	props: {},
	template: `
	<fudis-date-range> 
	</fudis-date-range>
	
	`,
});

export const DateRange = Template.bind({});
