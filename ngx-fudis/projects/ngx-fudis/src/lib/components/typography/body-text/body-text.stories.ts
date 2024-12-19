import { StoryFn, Meta } from '@storybook/angular';
import { BodyTextComponent } from './body-text.component';
import readme from './readme.mdx';

export default {
  title: 'Components/Typography/Body Text',
  component: BodyTextComponent,
  parameters: {
    docs: {
      page: readme,
    },
  },
  argTypes: {
    variant: {
      options: ['lg-regular', 'md-regular', 'sm-regular', 'lg-light', 'md-light'],
      control: { type: 'radio' },
    },
    align: {
      options: ['left', 'right', 'center'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const html = String.raw;

const Template: StoryFn = (args) => ({
  props: args,
  template: html` <fudis-grid [width]="'md'" [align]="'start'">
    <div>
      <fudis-body-text [variant]="variant" [align]="align">{{content}}</fudis-body-text>
      <fudis-body-text [variant]="variant" [align]="align">{{content}}</fudis-body-text>
    </div>
  </fudis-grid>`,
});

export const Example = Template.bind({});
Example.args = {
  variant: 'md-regular',
  align: 'left',
  content:
    'Mutiny Pirate Round execution dock spanker broadside schooner aye reef sails quarter yo-ho-ho.',
};

export const AllVariants: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-body-text [variant]="'lg-regular'"
      >This paragraph has <strong>lg-regular</strong> variant. Splice the main brace bilged on her
      anchor lateen sail lee carouser overhaul rigging come about haul wind Blimey.
    </fudis-body-text>
    <fudis-body-text [variant]="'lg-light'"
      >This paragraph has <strong>lg-light</strong> variant. Topsail haul wind Nelsons folly Letter
      of Marque aft shrouds plunder strike colors keel holystone.
    </fudis-body-text>
    <fudis-body-text [variant]="'md-regular'"
      >This paragraph has <strong>md-regular</strong> variant.Gally nipperkin gaff interloper
      gangway scourge of the seven seas pillage sheet long clothes belay.</fudis-body-text
    >
    <fudis-body-text [variant]="'md-light'"
      >This paragraph has <strong>md-light</strong> variant. Long clothes topgallant fire in the
      hole transom barkadeer furl lookout Sea Legs man-of-war coffer.
    </fudis-body-text>
    <fudis-body-text [variant]="'sm-regular'"
      >This paragraph has <strong>sm-regular</strong> variant. Rope's end dead men tell no tales
      gally hearties barkadeer boom bounty Pirate Round sloop spanker.
    </fudis-body-text>
  `,
});

AllVariants.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
