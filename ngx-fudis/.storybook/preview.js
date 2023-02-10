import { NgxFudisModule } from '../projects/ngx-fudis/src/lib/ngx-fudis.module';
import { useTheme } from './useTheme';
import { moduleMetadata } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

const storyOrder = [
	'Documentation',
	[
		'Introduction',
		['Getting Started'],
		'Development',
		['Overview', 'Ways of working', 'Creating component', 'Project structure'],
	],
	'Foundations',
	'Components',
];

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	docs: { inlineStories: true },
	options: {
		storySort: {
			order: storyOrder,
		},
	},
};

export const globalTypes = {
	theme: {
		name: 'Theme',
		description: 'Project theme for components',
		defaultValue: 'sisu',
		toolbar: {
			icon: 'mirror',
			items: [
				{ value: 'sisu', title: 'Sisu' },
				{ value: 'into', title: 'Into' },
			],
			showName: true,
			dynamicTitle: true,
		},
	},
};

export const decorators = [
	useTheme,
	moduleMetadata({
		imports: [NgxFudisModule],
	}),
];
