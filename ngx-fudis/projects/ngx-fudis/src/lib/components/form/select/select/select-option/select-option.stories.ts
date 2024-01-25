import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { action } from '@storybook/addon-actions';
import readme from './readme.mdx';
import { defaultOptions } from '../../common/mock_data';
import { SelectOptionComponent } from './select-option.component';

export default {
  title: 'Components/Form/Select/Select/Select Option',
  component: SelectOptionComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  parameters: {
    docs: {
      page: readme,
    },
  },
} as Meta;

const html = String.raw;

const ExampleTemplate: StoryFn<SelectOptionComponent> = (args: SelectOptionComponent) => ({
  props: {
    ...args,
    handleClick: action('handleClick'),
    defaultOptions,
    control: new FormControl(defaultOptions[2]),
  },
  template: html`
    <fudis-select
      [control]="control"
      [label]="'Choose a pet'"
      [helpText]="'All pets are equally important, but for sake of this example please pick one.'"
    >
      <ng-template fudisContent type="select-options">
        <fudis-select-option
          (handleClick)="handleClick($event)"
          [data]="data"
        ></fudis-select-option>
        <fudis-select-option
          *ngFor="let option of defaultOptions"
          [data]="option"
          (handleClick)="handleClick($event)"
        />
      </ng-template>
    </fudis-select>
  `,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  data: { value: 'example-value-id', label: 'Example option label' },
};
