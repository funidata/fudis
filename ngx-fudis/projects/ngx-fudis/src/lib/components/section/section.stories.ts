import { StoryFn, Meta, applicationConfig } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SectionComponent } from './section.component';
import docs from './section-docs.mdx';
import { sectionExclude } from '../../utilities/storybook';

export default {
  title: 'Components/Section',
  component: SectionComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      sectionExclude,
    },
  },
} as Meta;

const html = String.raw;

const Template: StoryFn<SectionComponent> = (args: SectionComponent) => ({
  props: args,
  template: html`<fudis-section
    [title]="title"
    [titleSize]="titleSize"
    [titleLevel]="titleLevel"
    [tooltip]="tooltip"
    [tooltipToggle]="tooltipToggle"
    [tooltipPosition]="tooltipPosition"
    [align]="align"
    [marginTop]="marginTop"
    [marginBottom]="marginBottom"
    [width]="width"
  >
    <ng-template fudisActions type="section">
      <fudis-button [label]="'Some action'"></fudis-button>
      <fudis-button [label]="'Another action'"></fudis-button>
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
      <fudis-body-text>More text content inside section</fudis-body-text>
    </ng-template>
  </fudis-section> `,
});

export const Example = Template.bind({});
Example.args = {
  title: 'This is title of section',
  titleLevel: 2,
  titleSize: 'xl',
  tooltip: 'More info about this section',
  tooltipToggle: false,
  tooltipPosition: 'below',
  align: 'start',
  marginTop: 'none',
  marginBottom: 'none',
  width: 'xl',
};

Example.parameters = {
  controls: {
    exclude: sectionExclude,
  },
};