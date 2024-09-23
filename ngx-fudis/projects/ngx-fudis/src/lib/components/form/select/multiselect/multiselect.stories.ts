import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { FudisValidators } from '../../../../utilities/form/validators';
import { MultiselectComponent } from './multiselect.component';
import readme from './multiselect.mdx';
import { groupedMockData, defaultOptions, TestAnimalSound } from '../common/mock_data';
import { selectStoryControlExclude } from '../../../../utilities/storybook';

export default {
  title: 'Components/Form/Select/Multiselect',
  component: MultiselectComponent,
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
      exclude: selectStoryControlExclude,
    },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    helpText: {
      control: { type: 'text' },
    },
  },
} as Meta;

const html = String.raw;

const commonProps: Partial<MultiselectComponent> = {
  label: 'Select a pet',
  size: 'lg',
  disabled: false,
  placeholder: 'Choose a pet',
  helpText:
    'All pets are equally important, but for sake of this Dropdown please pick at least two',
  showSelectionChips: true,
  selectionClearButton: true,
  autocompleteHelpText: 'Hello from Dropdown Help Text!',
  variant: 'dropdown',
  initialFocus: false,
};

const ExampleTemplate: StoryFn<MultiselectComponent> = (args: MultiselectComponent) => ({
  props: {
    ...args,
    defaultOptions,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl<TestAnimalSound[] | null>(
      null,
      FudisValidators.minLength(2, 'Pick at least two pets'),
    ),
    groupedMockData,
  },
  template: html`
    <fudis-multiselect
      [size]="size"
      [placeholder]="placeholder"
      [control]="control"
      [variant]="'dropdown'"
      [label]="label"
      [helpText]="helpText"
      [disabled]="disabled"
      [variant]="variant"
      (selectionUpdate)="selectionUpdate($event)"
      [showSelectionChips]="showSelectionChips"
      [selectionClearButton]="selectionClearButton"
      [autocompleteHelpText]="autocompleteHelpText"
      [initialFocus]="initialFocus"
    >
      <ng-template fudisContent type="select-options">
        <fudis-multiselect-option
          *ngFor="let option of defaultOptions"
          [data]="option"
        ></fudis-multiselect-option>
        <fudis-multiselect-group *ngFor="let group of groupedMockData" [label]="group.country">
          <fudis-multiselect-option
            *ngFor="let groupedOption of group.options"
            [data]="groupedOption"
          ></fudis-multiselect-option>
        </fudis-multiselect-group>
      </ng-template>
    </fudis-multiselect>
  `,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  ...commonProps,
};
