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
    popoverPosition: {
      options: ['left', 'right', 'above', 'below'],
      control: { type: 'radio' },
    },
    popoverText: {
      control: { type: 'text' },
    },
    popoverTriggerLabel: {
      control: { type: 'text' },
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
    [popoverText]="popoverText"
    [popoverPosition]="popoverPosition"
    [popoverTriggerLabel]="popoverTriggerLabel"
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
        <ng-template fudisExpandableContent>
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
  popoverText: 'More info about this section',
  popoverTriggerLabel: 'Additional information',
  popoverPosition: 'below',
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
    <fudis-section-content>
      <fudis-body-text>Parent Section content below</fudis-body-text>

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
          <fudis-body-text>First level nested Section content</fudis-body-text>

          <fudis-section
            class="fudis-mt-sm"
            [title]="'Nested Section'"
            [titleVariant]="'xs'"
            [level]="4"
          >
            <fudis-section-actions>
              <fudis-button [label]="'Deeper nested Action button'" />
            </fudis-section-actions>
            <fudis-section-content>
              <fudis-body-text>Second level nested Section content</fudis-body-text>
            </fudis-section-content>
          </fudis-section>
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
