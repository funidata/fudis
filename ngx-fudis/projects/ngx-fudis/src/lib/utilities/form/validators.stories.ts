import { StoryFn, Meta } from '@storybook/angular';
import readme from './readme.mdx';

export default {
	title: 'Utilities/Validators',
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: ['control'],
		},
	},
} as Meta;
const html = String.raw;

export const ValidatorsExample: StoryFn = () => ({
	template: html` <h1>TBD</h1> `,
});
