import { StoryFn, Meta } from '@storybook/angular';
import { ExpandableComponent } from './expandable.component';
import docs from './expandable.mdx';
import {
  expandableExclude,
  expandableControlExclude,
  expandableLiteExclude,
} from '../../utilities/storybook';

export default {
  title: 'Components/Expandable',
  component: ExpandableComponent,
  parameters: {
    docs: {
      page: docs,
      argTypes: {
        exclude: expandableExclude,
      },
    },
    controls: {
      exclude: expandableControlExclude,
    },
  },
  argTypes: {
    variant: {
      options: ['regular', 'lite'],
      control: { type: 'radio' },
    },
    level: {
      options: [1, 2, 3, 4, 5, 6],
      control: { type: 'select' },
    },
    badge: {
      options: ['accent', 'danger', 'primary', 'secondary', 'success'],
      control: { type: 'radio' },
    },
    badgeText: { control: 'text' },
  },
} as Meta;

const html = String.raw;

const Template: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-expandable
      [title]="title"
      [subTitle]="subTitle"
      [level]="level"
      [variant]="variant"
      [closed]="closed"
      [padding]="padding"
      [badge]="badge"
      [badgeText]="badgeText"
    >
      <ng-template fudisExpandableContent>
        <fudis-body-text>The content of the expandable.</fudis-body-text>
      </ng-template>
    </fudis-expandable>
  `,
});

const ActionTemplate: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-expandable
      [title]="title"
      [subTitle]="subTitle"
      [level]="level"
      [variant]="variant"
      [closed]="closed"
      [padding]="padding"
      [badge]="badge"
      [badgeText]="badgeText"
    >
      <fudis-expandable-actions>
        <fudis-button label="Button"></fudis-button>
      </fudis-expandable-actions>
      <ng-template fudisExpandableContent>
        <fudis-body-text>The content of the expandable.</fudis-body-text>
      </ng-template>
    </fudis-expandable>
  `,
});

export const Example = Template.bind({});
Example.args = {
  variant: 'regular',
  level: 2,
  title: 'Regular expandable',
  subTitle: undefined,
  closed: true,
  padding: 'default',
};

export const ExampleWithBadge = Template.bind({});
ExampleWithBadge.args = {
  variant: 'regular',
  level: 2,
  title: 'Regular expandable with a badge',
  subTitle: undefined,
  closed: true,
  padding: 'default',
  badge: 'accent',
  badgeText: 'Badge',
};

export const ExampleWithSubTitle = Template.bind({});
ExampleWithSubTitle.args = {
  variant: 'regular',
  level: 2,
  title: 'Regular expandable with a sub title',
  subTitle: 'Use me for an additional information',
  closed: true,
  padding: 'default',
};

export const ExampleWithActionButton = ActionTemplate.bind({});
ExampleWithActionButton.args = {
  variant: 'regular',
  level: 2,
  title: 'Regular expandable with an action button',
  subTitle: undefined,
  closed: true,
  padding: 'default',
};

export const ExampleLite = Template.bind({});
ExampleLite.args = {
  variant: 'lite',
  level: 2,
  title: 'Lite expandable',
  subTitle: undefined,
  closed: true,
  padding: 'default',
};

export const AllVariants: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-grid [align]="'start'" [width]="'xl'">
      <fudis-expandable [title]="'Regular expandable'" [level]="2">
        <ng-template fudisExpandableContent>
          <fudis-body-text>The content of the expandable.</fudis-body-text>
        </ng-template>
      </fudis-expandable>
      <fudis-expandable
        [title]="'Regular expandable with a badge'"
        [level]="2"
        [badge]="'accent'"
        [badgeText]="'Badge'"
      >
        <ng-template fudisExpandableContent>
          <fudis-body-text>The content of the expandable.</fudis-body-text>
        </ng-template>
      </fudis-expandable>
      <fudis-expandable
        [title]="'Regular expandable with sub title'"
        [level]="2"
        [subTitle]="'Use me for an additional information'"
      >
        <ng-template fudisExpandableContent>
          <fudis-body-text>The content of the expandable.</fudis-body-text>
        </ng-template>
      </fudis-expandable>
      <fudis-expandable [title]="'Regular expandable with an action button'" [level]="2">
        <fudis-expandable-actions>
          <fudis-button label="Button"></fudis-button>
        </fudis-expandable-actions>
        <ng-template fudisExpandableContent>
          <fudis-body-text>The content of the expandable.</fudis-body-text>
        </ng-template>
      </fudis-expandable>
      <fudis-expandable
        [title]="'Lite expandable'"
        [level]="2"
        [variant]="'lite'"
        [padding]="'small'"
      >
        <ng-template fudisExpandableContent>
          <fudis-body-text>The content of the expandable with padding small.</fudis-body-text>
        </ng-template>
      </fudis-expandable>
    </fudis-grid>
  `,
});

AllVariants.parameters = {
  controls: {
    exclude: /.*/g,
  },
};

ExampleLite.parameters = {
  controls: {
    exclude: expandableLiteExclude,
  },
};
