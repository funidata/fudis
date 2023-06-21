import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';

import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SectionComponent } from './section.component';

export default {
	title: 'Components/Section',
	component: SectionComponent,

	argTypes: {},
	decorators: [
		moduleMetadata({
			declarations: [],
			imports: [],
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

const html = String.raw;

const Template: StoryFn = () => ({
	props: {
		title: 'This is title of section',
		titleTag: 'h2',
		titleSize: 'xl',
	},

	template: html`<fudis-section
		[title]="title"
		[tooltip]="'More info about this section'"
		[titleSize]="titleSize"
		[titleTag]="titleTag">
		<fudis-expandable [title]="'Expandable inside section'">
			<ng-template fudisContent type="expandable">
				<fudis-body-text>Some content inside expandable</fudis-body-text>
			</ng-template>
		</fudis-expandable>
		<fudis-body-text>Some text content inside section</fudis-body-text>
	</fudis-section>`,
});

export const Example = Template.bind({});
