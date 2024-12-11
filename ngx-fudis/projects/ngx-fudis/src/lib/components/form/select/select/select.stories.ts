import { Meta, applicationConfig, StoryFn, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { SelectComponent } from './select.component';
import readme from './select.mdx';
import {
  groupedMockData,
  defaultOptions,
  TestAnimalSound,
  TestAnimalScience,
} from '../common/mock_data';
import { selectStoryControlExclude } from '../../../../utilities/storybook';
import { StorybookExampleSelectBackendSimulationComponent } from '../examples/select-backend-simulation.component';

export default {
  title: 'Components/Form/Select/Select',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [StorybookExampleSelectBackendSimulationComponent],
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
  },
} as Meta;

const html = String.raw;

const commonArgs: Partial<SelectComponent> = {
  label: 'Select a pet',
  size: 'lg',
  placeholder: 'Choose a pet',
  helpText: 'All pets are equally important, but for sake of this example please pick one.',
  autocompleteHelpText: 'Hello from Dropdown Help Text!',
  selectionClearButton: true,
  variant: 'dropdown',
  initialFocus: false,
};

const ExampleTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    defaultOptions,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl<TestAnimalSound | TestAnimalScience | null>(null),
    groupedMockData,
  },
  template: html`
    <fudis-select
      [size]="size"
      [placeholder]="placeholder"
      [control]="control"
      [label]="label"
      [helpText]="helpText"
      [initialFocus]="initialFocus"
      [selectionClearButton]="selectionClearButton"
      [variant]="variant"
      (selectionUpdate)="selectionUpdate($event)"
    >
      <ng-template fudisSelectOptions>
        <fudis-select-option
          *ngFor="let option of defaultOptions"
          [data]="option"
        ></fudis-select-option>
        <fudis-select-group *ngFor="let group of groupedMockData" [label]="group.country">
          <fudis-select-option
            *ngFor="let groupedOption of group.options"
            [data]="groupedOption"
          ></fudis-select-option>
        </fudis-select-group>
      </ng-template>
    </fudis-select>
  `,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  ...commonArgs,
};

const ExampleBackendTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    selectionUpdate: action('selectionUpdate'),
  },
  template: html`<example-select-backend-simulation></example-select-backend-simulation>`,
});

export const BackendSimulation = ExampleBackendTemplate.bind({});

BackendSimulation.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
