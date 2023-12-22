import { StoryFn, Meta } from '@storybook/angular';
import { AutocompleteMultiSelectComponent } from './autocomplete-multi-select.component';
import readme from './readme.mdx';

const html = String.raw;

const inputBaseDirectiveExcludes = [
	'id',
	'ariaLabel',
	'disabled',
	'errorMsg',
	'invalidState',
	'onBlur',
	'handleBlur',
	'required',
	'_closeAriaLabel',
	'_filterText',
	'_menuStatus',
	'_noResultsFound',
	'_openAriaLabel',
	'_removeItemText',
	'_results',
	'_toggleOn',
	'_id',
	'_required',
	'_requiredText',
	'_translations',
];

export default {
	title: 'Components/Autocomplete multi-select',
	component: AutocompleteMultiSelectComponent,
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: inputBaseDirectiveExcludes,
		},
	},
	argTypes: {},
} as Meta;

const Template: StoryFn = (args) => ({
	props: args,
});

const manyOptions = Array.from({ length: 100 }).map((value, i) => {
	let a = 'a';
	const first = String(i).charAt(0);

	if (first === '1') {
		a = 'b';
	}
	if (first === '2') {
		a = 'c';
	}
	if (first === '3') {
		a = 'd';
	}
	if (first === '4') {
		a = 'e';
	}
	return {
		value: i,
		label: `Item ${a} ${i}`,
	};
});

export const AutocompleteMultiSelect = Template.bind({});
AutocompleteMultiSelect.args = {
	label: 'Autocomplete multi-select label',
	helpText: 'Guidance text for autocomplete multi-select. Selected filter items should be above this guidance text.',
	tooltip: 'With this multi-select you can choose unlimited number of filters for your search',
	placeholder: 'Search and select options',
	options: manyOptions,
};

const TemplateMultiple: StoryFn = () => ({
	props: {
		options: manyOptions,
	},
	template: html`
		<fudis-grid [marginSides]="'responsive'">
			<fudis-heading
				>Example with multiple autocompletes to test keyboard navigation better<fudis-heading />
				<fudis-autocomplete-multi-select [label]="'First multiselect'" [options]="options" />
				<fudis-autocomplete-multi-select [label]="'Second multiselect'" [options]="options" />
				<fudis-autocomplete-multi-select [label]="'Third multiselect'" [options]="options" />
			</fudis-heading>
		</fudis-grid>
	`,
});

export const MultipleMultiselects = TemplateMultiple.bind({});
