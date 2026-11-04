import { ButtonComponent } from '../../components/button/button.component';
import docs from '../popover/popover.mdx';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { popoverExclude } from '../../utilities/storybook';

const meta: Meta<ButtonComponent> = {
  title: 'Directives/Popover',
  component: ButtonComponent,
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
};
export default meta;

const html = String.raw;

export const ExampleWithNativeButton: StoryObj<ButtonComponent> = {
  render: (args) => ({
    props: args,
    template: html`
      <div style="display: flex; min-height: 50vh; align-items: center; justify-content: center"
        ><button fudisPopover [popoverText]="popoverText" [popoverPosition]="popoverPosition">
          Popover will display and close on click
        </button></div
      >
    `,
  }),
};

export const ExampleWithFudisButton: StoryObj<ButtonComponent> = {
  render: (args) => ({
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
  }),
};
