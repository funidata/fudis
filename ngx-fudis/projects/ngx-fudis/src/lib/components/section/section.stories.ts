import { StoryFn, Meta, applicationConfig } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SectionComponent } from './section.component';
import docs from './section-docs.mdx';
import { excludeAllRegex, sectionExclude } from '../../utilities/storybook';
import { fudisHeadingLevelArray, fudisHeadingVariantArray } from '../../types/typography';

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
    badge: {
      options: ['accent', 'danger', 'primary', 'secondary', 'success'],
      control: {
        type: 'select',
      },
    },
    badgeText: {
      control: {
        type: 'text',
      },
    },
    level: {
      options: fudisHeadingLevelArray,
      control: { type: 'select' },
    },
    titleVariant: {
      options: fudisHeadingVariantArray,
      control: { type: 'select' },
    },
  },
} as Meta;

const html = String.raw;

const ExampleTemplate: StoryFn = (args) => ({
  props: args,
  template: html`<fudis-section
    [title]="title"
    [titleVariant]="titleVariant"
    [level]="level"
    [badge]="badge"
    [badgeText]="badgeText"
    [tooltip]="tooltip"
    [tooltipToggle]="tooltipToggle"
    [tooltipPosition]="tooltipPosition"
    [align]="align"
    [width]="width"
  >
    <fudis-section-actions>
      <fudis-button [label]="'Some action'"></fudis-button>
      <fudis-button [label]="'Another action'"></fudis-button>
    </fudis-section-actions>
    <fudis-section-content>
      <fudis-notification>
        <fudis-body-text>This is notification</fudis-body-text>
      </fudis-notification>
      <fudis-expandable [level]="3" [title]="'Expandable inside section'" [closed]="false">
        <ng-template fudisContent type="expandable">
          <fudis-body-text>Some content inside expandable</fudis-body-text>
        </ng-template>
      </fudis-expandable>
      <fudis-body-text>More text content inside section</fudis-body-text>
    </fudis-section-content>
  </fudis-section> `,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  title: 'This is title of section',
  titleVariant: 'xl',
  level: 2,
  tooltip: 'More info about this section',
  tooltipToggle: false,
  tooltipPosition: 'below',
  badge: 'primary',
  badgeText: 'Example',
  align: 'start',
  width: 'xl',
};

Example.parameters = {
  controls: {
    exclude: sectionExclude,
  },
};

const NestedExampleTemplate: StoryFn = (args) => ({
  props: args,
  template: html`<fudis-section
    [title]="'Parent Section'"
    [titleVariant]="'lg'"
    [level]="2"
    [width]="'md'"
  >
    // Empty Actions template, so that nested Actions will not be rendered to the parent!
    <fudis-section-actions></fudis-section-actions>
    <fudis-section-content>
      <fudis-body-text>Parent Section content</fudis-body-text>
      <fudis-body-text
        >This Section has an empty fudisActions template tag to make sure that nested Section's
        Actions is not rendered there.</fudis-body-text
      >

      <fudis-section
        class="fudis-mt-sm"
        [title]="'Nested Section'"
        [titleVariant]="'sm'"
        [level]="3"
      >
        <fudis-section-actions>
          <fudis-button [label]="'Nested Action button'" />
        </fudis-section-actions>
        <fudis-section-content>
          <fudis-body-text>Nested Section content</fudis-body-text>
        </fudis-section-content>
      </fudis-section>
    </fudis-section-content>
  </fudis-section>`,
});

export const NestedExample = NestedExampleTemplate.bind({});

NestedExample.parameters = {
  controls: {
    exclude: excludeAllRegex,
  },
};
