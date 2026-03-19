import { Meta, StoryFn } from '@storybook/angular';
import { DummyComponent } from './dummy.component';

// This is the basic Story layout.
// This file can consist multiple stories, but each component has one Example story that can be controlled through Storybook Controls tab.
// In order to make the controls accessible, you need to bind story argTypes to component inputs.

// Follow the implementation steps from 1 to 4.

const html = String.raw;

export default {
  title: 'Components/Dummy',
  component: DummyComponent,
  parameters: {
    // 4. Place for importing documentation and excluding unnecessary controls
  },
  argTypes: {
    // 3. Make dialog inputs accessible through Storybook Controls. Storybook users should be able to easily switch between different input variants to test their effects.
    // ArgTypes that require object should be excluded from controls.
  },
} as Meta;

const Template: StoryFn<DummyComponent> = (args) => ({
  props: args,
  template: html`
    <!-- 1. place your dummy selector here -->
    <fudis-dummy></fudis-dummy>
  `,
});

export const Example = Template.bind({});

// 2. Bind story args to component inputs.
