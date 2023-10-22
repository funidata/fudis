import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { BreadcrumbsComponent } from './breadcrumbs.component';

export default {
	title: 'Components/Breadcrumbs',
	component: BreadcrumbsComponent,
	decorators: [
		moduleMetadata({
			imports: [RouterTestingModule],
		}),
	],
	argTypes: {
		links: {
			description: 'List of breadcrumb links.',
			control: 'object',
			table: {
				type: {
					summary: '{ label: string; url: string }[]',
				},
			},
		},
	},
} as Meta;

const Template: StoryFn<BreadcrumbsComponent> = (args: BreadcrumbsComponent) => ({
	props: args,
	template: '<fudis-breadcrumbs [links]="links"></fudis-breadcrumbs>',
});

export const Breadcrumbs = Template.bind({});
Breadcrumbs.args = {
	links: [
		{ label: 'Components', url: '/Components' },
		{ label: 'Breadcrumbs', url: '/components/breadcrumbs' },
		{ label: 'Documentation', url: '/components/breadcrumbs/documentation' },
	],
};
