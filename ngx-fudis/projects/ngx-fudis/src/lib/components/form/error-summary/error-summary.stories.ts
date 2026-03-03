import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorSummaryComponent } from './error-summary.component';
import docs from './error-summary.mdx';
import { excludeAllRegex } from '../../../utilities/storybook';
import { ErrorSummaryExampleComponent } from './example/error-summary-example.component';

export default {
  title: 'Components/Form/Error Summary',
  component: ErrorSummaryComponent,
  decorators: [
    moduleMetadata({
      imports: [ErrorSummaryExampleComponent],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
  },
} as Meta;
const html = String.raw;

export const Example: StoryFn = (args) => ({
  props: args,
  template: html` <example-error-summary />`,
});

Example.parameters = {
  controls: {
    exclude: excludeAllRegex,
  },
};
