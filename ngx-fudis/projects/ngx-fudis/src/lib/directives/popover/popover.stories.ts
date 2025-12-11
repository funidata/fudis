import { ButtonComponent } from '../../components/button/button.component';
import docs from '../popover/popover.mdx';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { PopoverDirective } from './popover.directive';
import { popoverExclude } from '../../utilities/storybook';

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
      page: docs,
    },
    controls: {
      exclude: popoverExclude,
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
  args: {
    popoverPosition: 'below',
    popoverText: 'Greetings from popover, I hope you can see me!',
  },
} as Meta;

const html = String.raw;

export const ExampleWithNativeButton: StoryFn = (args) => ({
  props: args,
  template: html`
    <div style="display: flex; min-height: 50vh; align-items: center; justify-content: center"
      ><button fudisPopover [popoverText]="popoverText" [popoverPosition]="popoverPosition">
        Popover will display and close on click
      </button></div
    >
  `,
});

export const ExampleWithFudisButton: StoryFn = (args) => ({
  props: args,
  template: html`
    <div style="display: flex; min-height: 50vh; align-items: center; justify-content: center">
      <fudis-button
        [label]="'Popover will display and close on click'"
        [popoverPosition]="popoverPosition"
        [popoverText]="popoverText"
      ></fudis-button>
    </div>
  `,
});
