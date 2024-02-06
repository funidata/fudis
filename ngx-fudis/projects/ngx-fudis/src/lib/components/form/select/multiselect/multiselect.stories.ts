import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { FudisValidators } from '../../../../utilities/form/validators';
import { MultiselectComponent } from './multiselect.component';
import readme from './readme.mdx';
import { groupedMockData, defaultOptions } from '../common/mock_data';
import { action } from '@storybook/addon-actions';

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
      exclude: [
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
    showSelectionChips: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} as Meta;

const html = String.raw;

const ExampleTemplate: StoryFn<MultiselectComponent> = (args: MultiselectComponent) => ({
  props: {
    ...args,
    defaultOptions,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl(null, FudisValidators.minLength(2, 'Pick at least two pets')),
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
        <fudis-multiselect-option *ngFor="let option of defaultOptions" [data]="option" />
        <fudis-multiselect-group *ngFor="let group of groupedMockData" [label]="group.country">
          <fudis-multiselect-option
            *ngFor="let groupedOption of group.options"
            [data]="groupedOption"
          />
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
