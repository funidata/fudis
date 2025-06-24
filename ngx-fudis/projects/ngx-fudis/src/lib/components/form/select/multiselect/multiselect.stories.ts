import { Meta, applicationConfig, StoryFn, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { FudisValidators } from '../../../../utilities/form/validators';
import { MultiselectComponent } from './multiselect.component';
import readme from './multiselect.mdx';
import { groupedMockData, defaultOptions, TestAnimalSound } from '../common/mock_data';
import { selectStoryControlExclude } from '../../../../utilities/storybook';
import { StorybookExampleMultiselectBackendSimulationComponent } from '../examples/multiselect-backend-simulation.component';

export default {
  title: 'Components/Form/Select/Multiselect',
  component: MultiselectComponent,
  decorators: [
    moduleMetadata({
      imports: [StorybookExampleMultiselectBackendSimulationComponent],
    }),
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
    showSelectionChips: {
      control: 'boolean',
    },
    variant: {
      control: { type: 'radio' },
      if: { arg: 'showSelectionChips' },
    },
    popoverPosition: {
      options: ['left', 'right', 'above', 'below'],
      control: { type: 'radio' },
    },
    popoverText: {
      control: { type: 'text' },
    },
    popoverTriggerLabel: {
      control: { type: 'text' },
    },
  },
} as Meta;

const html = String.raw;

const commonProps: Partial<MultiselectComponent> = {
  label: 'Select a pet',
  size: 'lg',
  placeholder: 'Choose a pet',
  helpText:
    'All pets are equally important, but for sake of this Dropdown please pick at least two',
  showSelectionChips: true,
  selectionClearButton: true,
  autocompleteHelpText: 'Hello from Dropdown Help Text!',
  variant: 'dropdown',
  initialFocus: false,
  popoverText: '',
  popoverTriggerLabel: '',
  popoverPosition: 'right',
};

const ExampleTemplate: StoryFn = (args) => ({
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
      [label]="label"
      [helpText]="helpText"
      [variant]="variant"
      (selectionUpdate)="selectionUpdate($event)"
      [showSelectionChips]="showSelectionChips"
      [selectionClearButton]="selectionClearButton"
      [autocompleteHelpText]="autocompleteHelpText"
      [initialFocus]="initialFocus"
      [popoverText]="popoverText"
      [popoverPosition]="popoverPosition"
      [popoverTriggerLabel]="popoverTriggerLabel"
    >
      <ng-template fudisSelectOptions>
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

const ExampleBackendTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    selectionUpdate: action('selectionUpdate'),
  },
  template: html`<example-multiselect-backend-simulation></example-multiselect-backend-simulation>`,
});

export const BackendSimulation = ExampleBackendTemplate.bind({});

BackendSimulation.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
