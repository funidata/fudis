import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoryFn, Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

const Template: StoryFn<DateRangeComponent> = () => ({
	props: {},
	template: `
	<fudis-date-range [label]="'Date range selection'" [helpText]="'Some help text here'"/>
	`,
});

export const DateRange = Template.bind({});
