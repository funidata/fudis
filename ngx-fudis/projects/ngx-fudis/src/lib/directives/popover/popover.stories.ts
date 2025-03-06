import { ButtonComponent } from '../../components/button/button.component';
import readme from '../popover/popover.mdx';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { PopoverDirective } from './popover.directive';

export default {
  title: 'Directives/Popover',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [PopoverDirective],
    }),
  ],
  parameters: {
    docs: {
      page: readme,
    },
  },
  argTypes: {
    popoverText: {
      control: { type: 'text' },
    },
    popoverPosition: {
      options: ['left', 'right', 'above', 'below'],
      controls: { type: 'select' },
    },
  },
} as Meta;

const html = String.raw;

export const ExampleWithNativeButton: StoryFn = (args) => ({
  props: args,
  template: html`
    <button fudisPopover [popoverText]="popoverText" [popoverPosition]="popoverPosition">
      Popover will display on click
    </button>
  `,
});

ExampleWithNativeButton.args = {
  popoverText: 'Greetings from popover, I hope you can see me!',
  popoverPosition: 'right',
};

export const ExampleWithFudisButton: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-button
      [label]="'Popover will display on click'"
      [popoverPosition]="popoverPosition"
      [popoverText]="popoverText"
    >
    </fudis-button>
  `,
});

ExampleWithFudisButton.args = {
  popoverText: 'Greetings from popover, I hope you can see me!',
  popoverPosition: 'right',
};
