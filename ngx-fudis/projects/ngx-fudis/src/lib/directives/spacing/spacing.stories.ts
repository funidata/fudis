import { StoryFn, Meta, componentWrapperDecorator } from '@storybook/angular';
import { ButtonComponent } from '../../components/button/button.component';
import { fudisSpacingArray } from '../../types/spacing';
import { SpacingDirective } from './spacing.directive';
import { spacingExclude } from '../../utilities/storybook';
import docs from './spacing-directive.docs.mdx';

export default {
  title: 'Directives/Spacing',
  component: ButtonComponent,
  decorators: [
    componentWrapperDecorator(
      (story) => `
			<div style="margin: 40px">	
		${story}
		</div>`,
    ),
  ],
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
    <div style="border: 2px solid var(--fudis-color-primary-light); display: inline-block; margin-top: 2rem">
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
  props: { ...args, 
    top: marginsToString(args.marginTop), 
    bottom: marginsToString(args.marginBottom),
    right: marginsToString(args.marginRight),
    left: marginsToString(args.marginLeft)},
    template: html`
    <fudis-grid
    [marginBottom]="'md'"
    [columns]="{'sm': 1, 'md': 2}"
    [align]="'start'"
    [rowGap]="'sm'"
    [marginBottom]="'md'"
  >
  <fudis-grid-item>
    <fudis-body-text [variant]="'lg-regular'">These Fudis Button margin values are responsive. Inspect while resizing the browser. </fudis-body-text>
      <div fudisSpacing [marginBottom]="'xl'" [marginTop]="'xl'" style="border: 2px solid var(--fudis-color-primary-light); display: inline-block;">
        <fudis-button
          fudisSpacing
          [marginTop]="marginTop"
          [marginBottom]="marginBottom"
          [marginRight]="marginRight"
          [marginLeft]="marginLeft"
          [label]="'Test button'"
        ></fudis-button>
      </div>
      <fudis-heading [level]="4" [variant]="'sm'" [marginTop]="xl">The current margin values are:</fudis-heading>
        <ul style="list-style: none">
          <li><code>marginTop: {{top}}</code></li>
          <li><code>marginBottom: {{bottom}}</code></li>
          <li><code>marginLeft: {{left}}</code></li>
          <li><code>marginRight: {{right}}</code></li>
        </ul>
    </fudis-grid-item>
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

