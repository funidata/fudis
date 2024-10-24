import { Meta, applicationConfig, StoryFn, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { SelectComponent } from './select/select.component';
import readme from './select-index.mdx';
import { excludeAllRegex, selectStoryControlExclude } from '../../../utilities/storybook';
import { StorybookExampleSelectShowcaseComponent } from './examples/select-showcase.component';
import { StorybookExampleMultiselectShowcaseComponent } from './examples/multiselect-showcase.component';

export default {
  title: 'Components/Form/Select',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        StorybookExampleSelectShowcaseComponent,
        StorybookExampleMultiselectShowcaseComponent,
      ],
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
} as Meta;

const html = String.raw;

const SelectShowcaseTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    selectionUpdate: action('selectionUpdate'),
  },
  template: html`
    <example-select-showcase (selectionUpdate)="selectionUpdate($event)"></example-select-showcase>
  `,
});

export const SelectShowcase = SelectShowcaseTemplate.bind({});

SelectShowcase.parameters = {
  controls: {
    exclude: excludeAllRegex,
  },
};

const MultiselectShowcaseTemplate: StoryFn = (args) => ({
  props: {
    ...args,

    selectionUpdate: action('selectionUpdate'),
  },
  template: html`
    <example-multiselect-showcase
      (selectionUpdate)="selectionUpdate($event)"
    ></example-multiselect-showcase>
  `,
});

export const MultiselectShowcase = MultiselectShowcaseTemplate.bind({});

MultiselectShowcase.parameters = {
  controls: {
    exclude: excludeAllRegex,
  },
};
