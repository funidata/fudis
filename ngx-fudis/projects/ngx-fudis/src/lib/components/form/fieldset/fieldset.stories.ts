import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldSetComponent } from './fieldset.component';
import readme from './readme.mdx';
import { excludeAllRegex } from '../../../utilities/storybook';
import { FieldsetExampleComponent } from './examples/fieldset-example.component';

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
      page: readme,
    },
  },
} as Meta;

const html = String.raw;

export const Example: StoryFn = (args) => ({
  props: args,
  template: html` <example-fieldset /> `,
});

Example.parameters = {
  controls: {
    exclude: excludeAllRegex,
  },
};
