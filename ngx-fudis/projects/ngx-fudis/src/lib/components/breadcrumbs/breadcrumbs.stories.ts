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

const html = String.raw;

const links = [
	{ label: 'Components', url: '/Components' },
	{ label: 'Breadcrumbs', url: '/components/breadcrumbs' },
	{ label: 'Documentation', url: '/components/breadcrumbs/documentation' },
];

const Template: StoryFn<BreadcrumbsComponent> = (args: BreadcrumbsComponent) => ({
	props: {
		...args,
		links,
	},
	template: html`
		<fudis-breadcrumbs [label]="label">
			<fudis-breadcrumbs-item *ngFor="let link of links" [label]="link.label" [url]="link.url" />
		</fudis-breadcrumbs>
	`,
});

export const Breadcrumbs = Template.bind({});
Breadcrumbs.args = {
	label: 'Fudis Storybook documentation',
};
