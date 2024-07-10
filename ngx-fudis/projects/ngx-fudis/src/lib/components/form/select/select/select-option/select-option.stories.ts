import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { action } from '@storybook/addon-actions';
import readme from './select-option.mdx';
import { SelectOptionComponent } from './select-option.component';
import { selectStoryControlExclude } from '../../../../../utilities/storybook';

export default {
  title: 'Components/Form/Select/Select and Multiselect Option',
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
    controls: {
      exclude: selectStoryControlExclude,
    },
  },
} as Meta;

const html = String.raw;

const ExampleTemplate: StoryFn<SelectOptionComponent> = (args: SelectOptionComponent) => ({
  props: {
    ...args,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl(null),
  },
  template: html`
    <fudis-select
      (selectionUpdate)="selectionUpdate($event)"
      [control]="control"
      [label]="'Example label'"
      [helpText]="'Example help text'"
      [placeholder]="'Example placeholder text'"
    >
      <ng-template fudisContent type="select-options">
        <fudis-select-option [data]="data"></fudis-select-option>
      </ng-template>
    </fudis-select>
  `,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  data: {
    value: 'example-value-id',
    label: 'Example option label',
    subLabel: 'Example sub label for this option',
  },
};
