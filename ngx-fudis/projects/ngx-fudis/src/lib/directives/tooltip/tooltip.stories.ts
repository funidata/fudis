import { StoryFn, Meta } from '@storybook/angular';

import { ButtonComponent } from '../../components/button/button.component';
import { TooltipDirective } from './tooltip.directive';
import readme from './readme.mdx';

export default {
  title: 'Directives/Tooltip',
  component: ButtonComponent,
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: ['ariaLabel', 'labelHidden', 'size', 'type', 'variant'],
    },
  },
} as Meta;

const html = String.raw;

export const Example: StoryFn<TooltipDirective> = (args: TooltipDirective) => ({
  template: html`
    <fudis-button
      fudisSpacing
      [label]="'Hover me'"
      [tooltip]="'Greetings from regular tooltip, I hope you can see me!'"
      [marginRight]="'md'"
    >
    </fudis-button>
    <fudis-button
      [label]="'Click me'"
      [tooltip]="'Greetings from toggle tooltip, I hope you can see me!'"
      [tooltipToggle]="true"
      [tooltipPosition]="'right'"
    >
    </fudis-button>
  `,
  props: args,
});
