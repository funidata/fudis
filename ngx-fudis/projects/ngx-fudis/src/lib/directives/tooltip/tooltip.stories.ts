import { StoryFn, Meta } from '@storybook/angular';

import { ButtonComponent } from '../../components/button/button.component';
import { TooltipDirective } from './tooltip.directive';
import { tooltipExclude } from '../../utilities/storybook';
import readme from './readme.mdx';

export default {
  title: 'Directives/Tooltip',
  component: ButtonComponent,
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: tooltipExclude,
    },
  },
  argTypes: {
    tooltip: {
      control: { type: 'text' },
    },
    tooltipPosition: {
      options: ['left', 'right', 'above', 'below'],
      controls: { type: 'select' },
    },
  },
} as Meta;

const html = String.raw;

// TODO: Refactor fudis-button inline style to Spacing Directive after the directive is exposed again
// (fudisSpacing [marginRight]="'md'")
export const Example: StoryFn<TooltipDirective> = (args: TooltipDirective) => ({
  props: args,
  template: html`
    <fudis-button
      style="margin-right: 2rem;"
      [label]="'Hover me'"
      [tooltip]="tooltip"
      [tooltipPosition]="false"
    >
    </fudis-button>
    <fudis-button
      [label]="'Click me'"
      [tooltip]="tooltip"
      [tooltipPosition]="tooltipPosition"
      [tooltipToggle]="true"
    >
    </fudis-button>
  `,
});

Example.args = {
  tooltip: 'Greetings from toggle tooltip, I hope you can see me!',
  tooltipPosition: 'right',
};
