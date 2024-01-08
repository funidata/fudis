import { StoryFn, Meta, componentWrapperDecorator } from '@storybook/angular';

import { ButtonComponent } from '../../components/button/button.component';
import { TooltipDirective } from './tooltip.directive';
import readme from './readme.mdx';

export default {
  title: 'Directives/Tooltip',
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
      page: readme,
    },
    controls: {
      exclude: ['ariaLabel', 'labelHidden', 'size', 'type', 'variant'],
    },
  },
} as Meta;

const html = String.raw;

const Template: StoryFn<TooltipDirective> = (args: TooltipDirective) => ({
  template: html`
    <div class="storybook-flex" style="align-items: flex-start; flex-direction: column;">
      <div style="margin-bottom: 1rem;">
        <fudis-body-text>This button here has a tooltip.</fudis-body-text>
      </div>
      <fudis-button
        [label]="'Label of button'"
        [tooltip]="tooltip"
        [tooltipPosition]="tooltipPosition"
        [tooltipToggle]="tooltipToggle"
      >
      </fudis-button>
    </div>
  `,
  props: args,
});

export const Example = Template.bind({});
Example.args = {
  tooltip: 'Greetings from the tooltip, I hope you can see me!',
};
