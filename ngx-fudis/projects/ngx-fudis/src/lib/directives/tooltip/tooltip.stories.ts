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
  tooltip: 'Greetings from toggle tooltip, I hope you can see me!',
  tooltipPosition: 'right',
  tooltipToggle: false,
};

export const ExampleWithFudisButton: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-button
      [label]="tooltipToggle ? 'Tooltip will display on: click' : 'Tooltip will display on: hover'"
      [tooltip]="tooltip"
      [tooltipPosition]="tooltipPosition"
      [tooltipToggle]="tooltipToggle"
    >
    </fudis-button>
  `,
});

ExampleWithFudisButton.args = {
  tooltip: 'Greetings from toggle tooltip, I hope you can see me!',
  tooltipPosition: 'right',
  tooltipToggle: false,
};
