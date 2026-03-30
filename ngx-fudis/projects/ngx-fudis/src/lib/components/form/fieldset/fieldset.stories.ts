import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldSetComponent } from './fieldset.component';
import docs from './fieldset.mdx';
import { excludeEverythingExceptRegex } from '../../../utilities/storybook';
import { FieldsetExampleComponent } from './examples/fieldset-example.component';
import { fudisGridAlignArray, fudisGridWidthArray } from '../../../types/types';

export default {
  title: 'Components/Form/Fieldset',
  component: FieldSetComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule, FieldsetExampleComponent],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: excludeEverythingExceptRegex(['align', 'width']),
    },
  },
  argTypes: {
    align: {
      options: fudisGridAlignArray,
      control: {
        type: 'select',
      },
    },
    width: {
      options: fudisGridWidthArray,
      control: {
        type: 'select',
      },
    },
  },
} as Meta;

const html = String.raw;

export const Example: StoryFn = (args) => ({
  props: args,
  template: html` <example-fieldset [width]="width" [align]="align" /> `,
});
Example.args = {
  width: 'md',
  align: 'center',
};
