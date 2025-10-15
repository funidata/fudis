import { Meta, StoryFn } from '@storybook/angular';
import { IconButtonComponent } from './icon-button.component';
import { fudisIconArray } from '../../types/icons';

export default {
  title: 'Components/IconButton',
  component: IconButtonComponent,
    argTypes: {
      size: {
        options: ['medium', 'small', 'icon-only'],
        control: { type: 'radio' },
      },
      variant: {
        options: ['primary', 'secondary', 'tertiary'],
        control: { type: 'radio' },
      },
      icon: {
        options: fudisIconArray,
        controls: { type: 'select' },
      },
      iconRotate: {
        options: ['flip-180', 'cw-90', 'ccw-90', 'none'],
        control: { type: 'select' },
      },
      popoverText: {
        control: { type: 'text' },
      },
      popoverPosition: {
        options: ['left', 'right', 'above', 'below'],
        control: { type: 'select' },
      },
      ariaLabel: {
        control: { type: 'text' },
      },
    },
} as Meta;

const html = String.raw;

const Template: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-icon-button 
      [ariaLabel]="ariaLabel" 
      [icon]="icon"
      [iconRotate]="iconRotate"
      [size]="size" 
      [variant]="variant"
      [disabled]="disabled"
      [popoverPosition]="popoverPosition"
      [popoverText]="popoverText"
      ></fudis-icon-button>
  `,
});

export const Example = Template.bind({});

Example.args = {
  icon: 'search',
  iconRotate: 'cw-90',
  size: 'icon-only',
  variant: 'primary',
  ariaLabel: 'Search',
  disabled: false,
  popoverPosition: 'below',
  popoverText: 'popover',
};