import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { FudisValidators } from '../../../utilities/form/validators';
import { SelectComponent } from './select.component';
import readme from './readme.mdx';
import { selectMockData, groupedMockData, defaultOptions } from './mock_data';

export default {
	title: 'Components/Form/Select',
	component: SelectComponent,
	decorators: [
		applicationConfig({
			providers: [importProvidersFrom(BrowserAnimationsModule)],
		}),
	],
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: [
				'ariaLabel',
				'disabled',
				'id',
				'invalidState',
				'_id',
				'_required',
				'_requiredText',
				'_translations',
				'ngOnInit',
				'ngOnChanges',
				'onBlur',
			],
		},
	},
	argTypes: {
		size: {
			options: ['sm', 'md', 'lg'],
			control: { type: 'radio' },
		},
		variant: {
			options: ['dropdown', 'autocomplete'],
			control: { type: 'radio' },
		},
	},
} as Meta;

const html = String.raw;

const AllSelectsTemplate: StoryFn<SelectComponent> = (args: SelectComponent) => ({
	props: {
		...args,
		defaultOptions,
		selectMockData,
		groupedMockData,
		singleselect: {
			label: 'Select one pet',
			placeholder: 'Choose a pet',
			control: new FormControl(
				defaultOptions[2],
				FudisValidators.required("It is necessary to choose a pet. It's good for your health!")
			),
			helpText: 'All pets are equally important, but for sake of this example please pick one.',
		},
		multiselect: {
			label: 'Multiselect pet',
			placeholder: 'Multiselect a pet',
			multiselect: true,
			control: new FormControl(
				[selectMockData[1]],
				FudisValidators.required("It is necessary to choose a pet. It's good for your health!")
			),
			helpText: 'All pets are equally important, but for sake of this example please pick one.',
		},
		autocomplete: {
			label: 'Autoselect pet',
			placeholder: 'Autoselect a pet',
			control: new FormControl(
				selectMockData[72],
				FudisValidators.required("It is necessary to choose a pet. It's good for your health!")
			),
			helpText: 'All pets are equally important, but for sake of this example please pick one.',
		},
		autocompleteMultiselect: {
			label: 'Multiselect autocomplete pet',
			placeholder: 'Autoselect a pet',
			multiselect: true,
			control: new FormControl(
				[selectMockData[1], selectMockData[3], selectMockData[5]],
				FudisValidators.required("It is necessary to choose a pet. It's good for your health!")
			),
			helpText: 'All pets are equally important, but for sake of this example please pick one.',
		},
	},
	template: html`
		<fudis-grid [columns]="2">
			<div>
				<fudis-heading [level]="2">Dropdown Select</fudis-heading>
				<fudis-select
					[placeholder]="'Select one pet'"
					[control]="singleselect.control"
					[label]="singleselect.label"
					[id]="id"
					[helpText]="singleselect.helpText"
					[tooltip]="tooltip"
					[tooltipPosition]="tooltipPosition"
					[tooltipToggle]="tooltipToggle">
					<ng-template fudisContent type="select-options">
						<fudis-select-option *ngFor="let option of defaultOptions" [data]="option" />
					</ng-template>
				</fudis-select>
			</div>
			<div>
				<fudis-heading [level]="2">Autocomplete Select</fudis-heading>
				<fudis-select
					[variant]="'autocomplete'"
					[placeholder]="autocomplete.placeholder"
					[control]="autocomplete.control"
					[label]="autocomplete.label"
					[helpText]="autocomplete.helpText">
					<ng-template fudisContent type="select-options">
						<fudis-select-option *ngFor="let option of selectMockData" [data]="option" />
					</ng-template>
				</fudis-select>
			</div>
			<div>
				<fudis-heading [level]="2">Dropdown Multiselect</fudis-heading>
				<fudis-select
					[multiselect]="true"
					[placeholder]="multiselect.placeholder"
					[control]="multiselect.control"
					[label]="multiselect.label"
					[helpText]="multiselect.helpText">
					<ng-template fudisContent type="select-options">
						<fudis-select-option *ngFor="let option of defaultOptions" [data]="option" />
						<fudis-select-group *ngFor="let group of groupedMockData" [label]="group.country">
							<fudis-select-option *ngFor="let groupedOption of group.options" [data]="groupedOption" />
						</fudis-select-group>
					</ng-template>
				</fudis-select>
			</div>

			<div>
				<fudis-heading [level]="2">Autocomplete Multiselect</fudis-heading>
				<fudis-select
					[variant]="'autocomplete'"
					[multiselect]="true"
					[placeholder]="autocompleteMultiselect.placeholder"
					[control]="autocompleteMultiselect.control"
					[label]="autocompleteMultiselect.label"
					[helpText]="autocompleteMultiselect.helpText">
					<ng-template fudisContent type="select-options">
						<fudis-select-option *ngFor="let option of defaultOptionsTwo" [data]="option" />
						<fudis-select-group *ngFor="let group of groupedMockData" [label]="group.country">
							<fudis-select-option *ngFor="let groupedOption of group.options" [data]="groupedOption" />
						</fudis-select-group>
					</ng-template>
				</fudis-select>
			</div>
		</fudis-grid>
	`,
});

const ExampleTemplate: StoryFn<SelectComponent> = (args: SelectComponent) => ({
	props: {
		...args,
		defaultOptions,
		control: new FormControl(
			defaultOptions[2],
			FudisValidators.required("It is necessary to choose a pet. It's good for your health!")
		),
		groupedMockData,
	},
	template: html`
		<fudis-select
			[variant]="'dropdown'"
			[size]="size"
			[multiselect]="false"
			[showSelectionChips]="showSelectionChips"
			[placeholder]="placeholder"
			[control]="control"
			[label]="label"
			[helpText]="helpText">
			<ng-template fudisContent type="select-options">
				<fudis-select-option *ngFor="let option of defaultOptions" [data]="option" />
				<fudis-select-group *ngFor="let group of groupedMockData" [label]="group.country">
					<fudis-select-option *ngFor="let groupedOption of group.options" [data]="groupedOption" />
				</fudis-select-group>
			</ng-template>
		</fudis-select>
	`,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
	label: 'Select a pet',
	size: 'lg',
	placeholder: 'Choose a pet',
	variant: 'autocomplete',
	showSelectionChips: true,
	helpText: 'All pets are equally important, but for sake of this example please pick one.',
};

export const AllSelects = AllSelectsTemplate.bind({});
AllSelects.args = {};
