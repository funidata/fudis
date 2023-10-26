import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import readme from './readme.mdx';

export default {
	title: 'Components/Breadcrumbs',
	component: BreadcrumbsComponent,
	decorators: [
		moduleMetadata({
			imports: [RouterTestingModule],
		}),
	],
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: '_breadcrumbsPrefix',
		},
	},
	argTypes: {},
} as Meta;

const Template: StoryFn<BreadcrumbsComponent> = (args: BreadcrumbsComponent) => ({
	props: args,
	template: '<fudis-breadcrumbs [links]="links" [label]="label"></fudis-breadcrumbs>',
});

export const Breadcrumbs = Template.bind({});
Breadcrumbs.args = {
	links: [
		{ label: 'Components', url: '/Components' },
		{ label: 'Breadcrumbs', url: '/components/breadcrumbs' },
		{ label: 'Documentation', url: '/components/breadcrumbs/documentation' },
	],
	label: 'Fudis Storybook documentation',
};
