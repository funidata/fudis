import { StoryFn, Meta } from '@storybook/angular';
import { AutocompleteMultiSelectComponent } from './autocomplete-multi-select.component';
import readme from './readme.mdx';

export default {
	title: 'Components/Autocomplete multi-select',
	component: AutocompleteMultiSelectComponent,
	parameters: {
		docs: {
			page: readme,
		},
	},
	argTypes: {},
} as Meta;

const Template: StoryFn = (args) => ({
	props: args,
});

const manyOptions = Array.from({ length: 100 }).map((value, i) => {
	return {
		value: i,
		viewValue: `Item number ${i}`,
	};
});

export const AutocompleteMultiSelect = Template.bind({});
AutocompleteMultiSelect.args = {
	label: 'Autocomplete multi-select label',
	helpText: 'Guidance text for autocomplete multi-select. Selected filter items should be above this guidance text.',
	tooltip: 'With this multi-select you can choose unlimited number of filters for your search',
	options: manyOptions,
};
