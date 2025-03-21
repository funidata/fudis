import { StoryFn, Meta } from '@storybook/angular';
import { ButtonComponent } from '../../components/button/button.component';
import { tooltipExclude } from '../../utilities/storybook';
import readme from './tooltip.mdx';

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

export const ExampleWithNativeButton: StoryFn = (args) => ({
  props: args,
  template: html`
    <button
      id="button-1"
      fudisTooltip
      [tooltip]="tooltip"
      [tooltipPosition]="tooltipPosition"
      [tooltipToggle]="tooltipToggle"
    >
      Tooltip will display on: {{tooltipToggle ? 'click' : 'hover'}}
    </button>
  `,
});

ExampleWithNativeButton.args = {
  tooltip: 'Greetings from tooltip, I hope you can see me!',
  tooltipPosition: 'right',
  tooltipToggle: false,
};
