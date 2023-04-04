import { NgxFudisModule } from '../projects/ngx-fudis/src/lib/ngx-fudis.module';
import { useTheme } from './useTheme';
import { moduleMetadata } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import getVersion from './getVersion';

setCompodocJson(docJson);

const storyOrder = [
	'Documentation',
	[
		'Introduction',
		['Introduction', 'How to start using Fudis'],
		'Development',
		[
			'Getting Started',
			'Setup VSCode',
			'Project Structure',
			'Ways of Working',
			'Naming Conventions',
			'Creating A Component',
			'Component Checklist',
		],
	],
	'Foundations',
	'Components',
	'Directives',
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
	version: {
		...getVersion(),
		style: {
			color: '#1ea7fd',
			border: '1px solid #f2f9ff',
			'background-color': '#f2f9ff',
			'font-size': '12px',
			'text-transform': 'none',
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
			title: true,
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
