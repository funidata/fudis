import { StoryFn, Meta, applicationConfig } from '@storybook/angular-vite';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SectionComponent } from './section.component';
import docs from './section.mdx';
import { excludeAllRegex, sectionExclude } from '../../utilities/storybook';
import { fudisHeadingLevelArray, fudisHeadingVariantArray } from '../../types/typography';
import { fudisGridAlignArray, fudisGridWidthArray } from '../../types/types';

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
      <fudis-button [label]="'Edit details'"></fudis-button>
      <fudis-button [label]="'Save changes'"></fudis-button>
    </fudis-section-actions>
    <fudis-section-content>
      <fudis-notification>
        <fudis-body-text>Your profile is up to date.</fudis-body-text>
      </fudis-notification>
      <fudis-expandable
        [level]="3"
        [title]="'Additional programme information'"
        [closed]="false"
        [class]="'fudis-mb-sm'"
      >
        <ng-template fudisExpandableContent>
          <fudis-body-text>View additional programme information.</fudis-body-text>
        </ng-template>
      </fudis-expandable>
      <fudis-body-text>Programme details are available for registered students.</fudis-body-text>
    </fudis-section-content>
  </fudis-section> `,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  title: 'Student information',
  titleVariant: 'xl',
  level: 2,
  popoverText: 'Review and update your student information.',
  popoverTriggerLabel: 'Additional information',
  popoverPosition: 'below',
  badge: 'primary',
  badgeText: 'Updated',
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
    [title]="'Study plan'"
    [titleVariant]="'lg'"
    [level]="2"
    [width]="'md'"
  >
    <fudis-section-content>
      <fudis-body-text>Review the courses included in your study plan.</fudis-body-text>

      <fudis-section
        class="fudis-mt-sm"
        [title]="'Major studies'"
        [titleVariant]="'sm'"
        [level]="3"
      >
        <fudis-section-actions>
          <fudis-button [label]="'Edit major studies'" />
        </fudis-section-actions>
        <fudis-section-content>
          <fudis-body-text>Major studies form the core of your degree.</fudis-body-text>

          <fudis-section
            class="fudis-mt-sm"
            [title]="'Course selection'"
            [titleVariant]="'xs'"
            [level]="4"
          >
            <fudis-section-actions>
              <fudis-button [label]="'Edit course selection'" />
            </fudis-section-actions>
            <fudis-section-content>
              <fudis-body-text>Choose courses for the next teaching period.</fudis-body-text>
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
