import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';

import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SectionComponent } from './section.component';

export default {
  title: 'Components/Section',
  component: SectionComponent,

  argTypes: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  parameters: {
    controls: {
      exclude: ['control'],
    },
  },
} as Meta;

const html = String.raw;

const Template: StoryFn = () => ({
  props: {
    title: 'This is title of section',
    titleLevel: 2,
    titleSize: 'xl',
  },

  template: html`<fudis-section
    [id]="'my-section-id'"
    [title]="title"
    [tooltip]="'More info about this section'"
    [titleSize]="titleSize"
    [titleLevel]="titleLevel"
  >
    <ng-template fudisActions type="section">
      <fudis-button [label]="'Some action'" />
      <fudis-button [label]="'Another action'" />
    </ng-template>
    <ng-template fudisNotifications type="section">
      <fudis-notification>This is notification</fudis-notification>
    </ng-template>
    <ng-template fudisContent type="section">
      <fudis-expandable [title]="'Expandable inside section'">
        <ng-template fudisContent type="expandable">
          <fudis-body-text fudis-body-text>Some content inside expandable</fudis-body-text>
        </ng-template>
      </fudis-expandable>
      <fudis-body-text>Some text content inside section</fudis-body-text>
    </ng-template>
  </fudis-section> `,
});

export const Example = Template.bind({});
