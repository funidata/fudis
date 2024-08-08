import { StoryFn, Meta } from '@storybook/angular';
import { ButtonComponent } from '../../components/button/button.component';
import { fudisSpacingArray } from '../../types/spacing';
import { SpacingDirective } from './spacing.directive';
import { spacingExclude } from '../../utilities/storybook';
import docs from './spacing-directive.docs.mdx';

export default {
  title: 'Directives/Spacing',
  component: ButtonComponent,
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: spacingExclude,
    },
  },
} as Meta;

const html = String.raw;

const ExampleTemplate: StoryFn<SpacingDirective> = (args: SpacingDirective) => ({
  template: html`
    <fudis-body-text [variant]="'lg-regular'"
      >This Fudis Button has margins added through <strong>fudisSpacing</strong> directive. Go ahead
      and inspect the button element while resizing the browser.</fudis-body-text
    >
    <div
      style="border: 2px solid var(--fudis-color-primary-light); display: inline-block; margin-top: 2rem"
    >
      <fudis-button
        fudisSpacing
        [marginTop]="marginTop"
        [marginBottom]="marginBottom"
        [marginRight]="marginRight"
        [marginLeft]="marginLeft"
        [label]="'Test button'"
      ></fudis-button>
    </div>
  `,
  props: args,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  marginTop: 'lg',
  marginBottom: 'xs',
  marginRight: 'lg',
  marginLeft: 'lg',
};

Example.argTypes = {
  marginTop: {
    options: fudisSpacingArray,
    control: { type: 'select' },
  },
  marginBottom: {
    options: fudisSpacingArray,
    control: { type: 'select' },
  },
  marginRight: {
    options: fudisSpacingArray,
    control: { type: 'select' },
  },
  marginLeft: {
    options: fudisSpacingArray,
    control: { type: 'select' },
  },
};

const marginsToString = (margins: string | object): string => {
  if (typeof margins === 'string') {
    return `'${margins}'`;
  }
  return JSON.stringify(margins);
};

const Template: StoryFn<SpacingDirective> = (args: SpacingDirective) => ({
  props: {
    ...args,
    top: marginsToString(args.marginTop),
    bottom: marginsToString(args.marginBottom),
    right: marginsToString(args.marginRight),
    left: marginsToString(args.marginLeft),
  },
  template: html`
    <fudis-grid [marginBottom]="'md'" [align]="'start'" [rowGap]="'sm'" [marginBottom]="'md'">
      <fudis-body-text [variant]="'lg-regular'"
        >These Fudis Button margin values are responsive. Inspect while resizing the browser.
      </fudis-body-text>
      <div
        fudisGridItem
        [alignSelfX]="'start'"
        style="border: 2px solid var(--fudis-color-primary-light); display: inline-block; display: inline-block; margin-top: 2rem"
      >
        <fudis-button
          fudisSpacing
          [marginTop]="marginTop"
          [marginBottom]="marginBottom"
          [marginRight]="marginRight"
          [marginLeft]="marginLeft"
          [label]="'Test button'"
        ></fudis-button>
      </div>
      <fudis-heading [level]="1" [variant]="'sm'">The responsive margin values are</fudis-heading>
      <div fudisGrid [columns]="{'sm': 2 }" [align]="'stretch'">
        <div style="background-color: var(--fudis-color-primary-light); padding: 1rem">
          <fudis-body-text><strong>MarginTop : </strong><code>{{top}}</code></fudis-body-text>
          <fudis-body-text><strong>MarginBottom : </strong><code>{{bottom}}</code></fudis-body-text>
          <fudis-body-text><strong>MarginRight : </strong><code>{{right}}</code></fudis-body-text>
          <fudis-body-text><strong>MarginLeft : </strong><code>{{left}}</code></fudis-body-text>
        </div>
      </div>
    </fudis-grid>
  `,
});

export const ResponsiveExample = Template.bind({});
ResponsiveExample.args = {
  marginTop: { xs: 'xxl', sm: 'lg', md: 'md', lg: 'sm' },
  marginBottom: { xs: 'none', sm: 'sm', md: 'md', lg: 'lg' },
  marginRight: { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg' },
  marginLeft: { xs: 'xxl', sm: 'xl', md: 'lg', lg: 'md' },
};
