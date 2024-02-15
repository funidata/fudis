import { StoryFn, Meta } from '@storybook/angular';
import { ExpandableComponent } from './expandable.component';
import readme from './readme.mdx';
import { expandableExclude } from '../../utilities/storybook';

export default {
  title: 'Components/Expandable',
  component: ExpandableComponent,
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: expandableExclude,
    },
  },
} as Meta;

const html = String.raw;

const Template: StoryFn<ExpandableComponent> = (args: ExpandableComponent) => ({
  props: args,
  template: html`
    <fudis-expandable
      [title]="title"
      [subTitle]="subTitle"
      [level]="level"
      [variant]="variant"
      [closed]="closed"
      [padding]="padding"
    >
      <ng-template fudisContent type="expandable">
        <fudis-body-text>The content of the expandable.</fudis-body-text>
      </ng-template>
    </fudis-expandable>
  `,
});

const ActionTemplate: StoryFn<ExpandableComponent> = (args: ExpandableComponent) => ({
  props: args,
  template: html`
    <fudis-expandable
      [title]="title"
      [subTitle]="subTitle"
      [level]="level"
      [variant]="variant"
      [closed]="closed"
      [padding]="padding"
    >
      <ng-template fudisActions type="expandable">
        <fudis-button label="Button"></fudis-button>
      </ng-template>
      <ng-template fudisContent type="expandable">
        <fudis-body-text>The content of the expandable.</fudis-body-text>
      </ng-template>
    </fudis-expandable>
  `,
});

export const Expandable = Template.bind({});
Expandable.args = {
  variant: 'regular',
  title: 'Regular expandable',
  closed: true,
  level: 2,
  padding: 'default',
};

export const ExpandableWithSubTitle = Template.bind({});
ExpandableWithSubTitle.args = {
  variant: 'regular',
  title: 'Regular expandable with a sub title',
  subTitle: 'Use me for an additional information',
  closed: true,
  level: 2,
  padding: 'default',
};

export const ExpandableWithActionButton = ActionTemplate.bind({});
ExpandableWithActionButton.args = {
  variant: 'regular',
  title: 'Regular expandable with an action button',
  closed: true,
  level: 2,
  padding: 'default',
};

export const ExpandableLite = Template.bind({});
ExpandableLite.args = {
  variant: 'lite',
  title: 'Lite expandable',
  closed: true,
  level: 2,
  padding: 'default',
};

export const AllVariants: StoryFn = () => ({
  template: html`
    <fudis-grid [align]="'start'" [width]="'xl'">
      <fudis-expandable [title]="'Regular expandable'">
        <ng-template fudisContent type="expandable">
          <fudis-body-text>The content of the expandable.</fudis-body-text>
        </ng-template>
      </fudis-expandable>
      <fudis-expandable
        [title]="'Regular expandable with sub title'"
        [subTitle]="'Use me for an additional information'"
      >
        <ng-template fudisContent type="expandable">
          <fudis-body-text>The content of the expandable.</fudis-body-text>
        </ng-template>
      </fudis-expandable>
      <fudis-expandable [title]="'Regular expandable with an action button'">
        <ng-template fudisActions type="expandable">
          <fudis-button label="Button"></fudis-button>
        </ng-template>
        <ng-template fudisContent type="expandable">
          <fudis-body-text>The content of the expandable.</fudis-body-text>
        </ng-template>
      </fudis-expandable>
      <fudis-expandable [title]="'Lite expandable'" [variant]="'lite'" [padding]="'small'">
        <ng-template fudisContent type="expandable">
          <fudis-body-text>The content of the expandable with padding small.</fudis-body-text>
        </ng-template>
      </fudis-expandable>
    </fudis-grid>
  `,
});
