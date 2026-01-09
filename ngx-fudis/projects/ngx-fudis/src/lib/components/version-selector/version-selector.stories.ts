import type { Meta, StoryObj } from '@storybook/angular';

export default {
  title: 'Docs/Version Selector',
} satisfies Meta;

export const VersionSelectorStory: StoryObj = {
  name: 'Version Selector',
  render: () => ({
    template: `<fudis-version-selector></fudis-version-selector>`,
  }),
};
