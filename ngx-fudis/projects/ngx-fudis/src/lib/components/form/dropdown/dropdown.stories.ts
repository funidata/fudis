import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
import readme from './readme.mdx';
import { FudisValidators } from '../../../utilities/form/validators';

export default {
  title: 'Components/Form/Dropdown',
  component: DropdownComponent,
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
  },
} as Meta;

const html = String.raw;

const Template: StoryFn<DropdownComponent> = (args: DropdownComponent) => ({
  props: args,
  template: html`
    <fudis-dropdown
      [size]="size"
      [multipleOption]="multipleOption"
      [placeholder]="placeholder"
      [control]="control"
      [options]="options"
      [label]="label"
      [id]="id"
      [selectedOptions]="selectedOptions"
      [helpText]="helpText"
      [tooltip]="tooltip"
      [tooltipPosition]="tooltipPosition"
      [tooltipToggle]="tooltipToggle"
    />
  `,
});

export const SingleSelect = Template.bind({});
SingleSelect.args = {
  label: 'Select a pet',
  size: 'md',
  placeholder: 'Choose a pet',
  control: new FormControl(
    null,
    FudisValidators.required("It is necessary to choose a pet. It's good for your health!"),
  ),
  helpText: 'All pets are equally important, but for sake of this example please pick one.',
  selectedOptions: { value: 'value-1-dog', label: 'Dog' },
  options: [
    { value: 'value-1-dog', label: 'Dog' },
    { value: 'value-2-capybara', label: 'Capybara' },
    { value: 'value-3-platypys', label: 'Platypus' },
    { value: 'value-4-cat', label: 'Really dangerous cat', disabled: true },
    { value: 'value-5-armadillo', label: 'Screaming hairy armadillo' },
    { value: 'value-6-gecko', label: 'Southern Titiwangsa Bent-Toed Gecko' },
  ],
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  multipleOption: true,
  label: 'Select from two to three pets',
  size: 'lg',
  placeholder: 'Choose pets',
  control: new FormControl(null, [
    FudisValidators.required(
      "It is necessary to choose multiple pets. It's even better for your health!",
    ),
    FudisValidators.minLength(2, 'Choose at least two pets'),
    FudisValidators.maxLength(3, "That's probably too much already."),
  ]),
  helpText:
    'All pets are equally important, but for sake of this example please pick two to three pets.',
  tooltip: 'Platypus is the right choice',
  tooltipPosition: 'below',
  tooltipToggle: false,
  options: [
    { value: 'value-1-dog', label: 'Dog' },
    { value: 'value-2-capybara', label: 'Capybara' },
    { value: 'value-3-platypys', label: 'Platypus' },
    { value: 'value-4-cat', label: 'Really dangerous cat', disabled: true },
    { value: 'value-5-armadillo', label: 'Screaming hairy armadillo' },
    { value: 'value-6-gecko', label: 'Southern Titiwangsa Bent-Toed Gecko' },
  ],
};
