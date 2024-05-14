import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { FudisValidators } from '../../../../utilities/form/validators';
import { MultiselectComponent } from './multiselect.component';
import readme from './multiselect.mdx';
import { groupedMockData, defaultOptions, TestAnimalSound } from '../common/mock_data';
import { selectCommonExclude } from '../../../../utilities/storybook';

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
      exclude: selectCommonExclude,
    },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    showSelectionChips: {
      options: [true, false],
      control: { type: 'radio' },
    },
    helpText: {
      control: { type: 'text' },
    },
  },
} as Meta;

const html = String.raw;

const ExampleTemplate: StoryFn<MultiselectComponent> = (args: MultiselectComponent) => ({
  props: {
    ...args,
    defaultOptions,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl<TestAnimalSound | null>(
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
      [disabled]="disabled"
      (selectionUpdate)="selectionUpdate($event)"
      [showSelectionChips]="showSelectionChips"
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
  label: 'Select a pet',
  size: 'lg',
  disabled: false,
  placeholder: 'Choose a pet',
  helpText: 'All pets are equally important, but for sake of this example please pick atleast two',
  showSelectionChips: true,
};
