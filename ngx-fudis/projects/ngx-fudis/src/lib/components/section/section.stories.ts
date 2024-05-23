import { StoryFn, Meta, applicationConfig } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SectionComponent } from './section.component';
import docs from './section-docs.mdx';
import { excludeAllRegex, sectionExclude } from '../../utilities/storybook';
import { fudisHeadingLevelArray, fudisHeadingSizeArray } from '../../types/typography';

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
  argTypes: {
    titleLevel: {
      options: fudisHeadingLevelArray,
      control: { type: 'select' },
    },
    titleSize: {
      options: fudisHeadingSizeArray,
      control: { type: 'select' },
    },
  },
} as Meta;

const html = String.raw;

const ExampleTemplate: StoryFn<SectionComponent> = (args: SectionComponent) => ({
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
    <ng-template fudisActions [type]="'section'">
      <fudis-button [label]="'Some action'"></fudis-button>
      <fudis-button [label]="'Another action'"></fudis-button>
    </ng-template>
    <ng-template fudisNotifications [type]="'section'">
      <fudis-notification
        ><fudis-body-text>This is notification</fudis-body-text></fudis-notification
      >
    </ng-template>
    <ng-template fudisContent [type]="'section'">
      <fudis-expandable [title]="'Expandable inside section'" [closed]="false">
        <ng-template fudisContent type="expandable">
          <fudis-body-text>Some content inside expandable</fudis-body-text>
        </ng-template>
      </fudis-expandable>
      <fudis-body-text>More text content inside section</fudis-body-text>
    </ng-template>
  </fudis-section> `,
});

export const Example = ExampleTemplate.bind({});
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

const NestedExampleTemplate: StoryFn<SectionComponent> = (args: SectionComponent) => ({
  props: args,
  template: html`<fudis-section
    [title]="'Parent Section'"
    [titleSize]="'lg'"
    [titleLevel]="2"
    [width]="'md'"
  >
    // Empty Actions template, so that nested Actions will not be rendered to the parent!
    <ng-template fudisActions [type]="'section'"></ng-template>
    <ng-template fudisContent [type]="'section'">
      <fudis-body-text>Parent Section content</fudis-body-text>
      <fudis-body-text
        >This Section has an empty fudisActions template tag to make sure that nested Section's
        Actions is not rendered there.</fudis-body-text
      >

      <fudis-section
        [title]="'Nested Section'"
        [marginTop]="'sm'"
        [titleSize]="'sm'"
        [titleLevel]="3"
      >
        <ng-template fudisActions [type]="'section'">
          <fudis-button [label]="'Nested Action button'" />
        </ng-template>
        <ng-template fudisContent [type]="'section'">
          <fudis-body-text>Nested Section content</fudis-body-text>
        </ng-template>
      </fudis-section>
    </ng-template>
  </fudis-section>`,
});

export const NestedExample = NestedExampleTemplate.bind({});

NestedExample.parameters = {
  controls: {
    exclude: excludeAllRegex,
  },
};
