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
    size: {
      options: ['lg-regular', 'md-regular', 'sm-regular', 'lg-light', 'md-light'],
      control: { type: 'select' },
    },
    align: {
      options: ['left', 'right', 'center'],
    },
    color: {
      options: ['default', 'white'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const html = String.raw;

const Template: StoryFn = (args) => ({
  props: args,
  template: html` <fudis-grid [width]="'md'" [align]="'start'">
    <div>
      <fudis-body-text [size]="size" [color]="color" [align]="align">{{content}}</fudis-body-text>
      <fudis-body-text [size]="size" [color]="color" [align]="align">{{content}}</fudis-body-text>
    </div>
  </fudis-grid>`,
});

export const Example = Template.bind({});
Example.args = {
  size: 'lg-regular',
  align: 'left',
  color: 'default',
  content:
    'Mutiny Pirate Round execution dock spanker broadside schooner aye reef sails quarter yo-ho-ho.',
};

export const AllVariants: StoryFn<BodyTextComponent> = (args: BodyTextComponent) => ({
  props: args,
  template: html`
    <fudis-grid [columns]="{xs: 1, md: 2}" [align]="'start'">
      <fudis-body-text [size]="'lg-regular'"
        >This paragraph has <strong>lg-regular</strong> size. Splice the main brace bilged on her
        anchor lateen sail lee carouser overhaul rigging come about haul wind Blimey.
      </fudis-body-text>
      <fudis-body-text [size]="'lg-light'"
        >This paragraph has <strong>lg-light</strong> size. Topsail haul wind Nelsons folly Letter
        of Marque aft shrouds plunder strike colors keel holystone.
      </fudis-body-text>
      <fudis-body-text [size]="'md-regular'"
        >This paragraph has <strong>md-regular</strong> size.Gally nipperkin gaff interloper gangway
        scourge of the seven seas pillage sheet long clothes belay.</fudis-body-text
      >
      <fudis-body-text [size]="'md-light'"
        >This paragraph has <strong>md-light</strong> size. Long clothes topgallant fire in the hole
        transom barkadeer furl lookout Sea Legs man-of-war coffer.
      </fudis-body-text>
      <fudis-body-text [size]="'sm-regular'"
        >This paragraph has <strong>sm-regular</strong> size. Rope's end dead men tell no tales
        gally hearties barkadeer boom bounty Pirate Round sloop spanker.
      </fudis-body-text>
    </fudis-grid>
  `,
});

AllVariants.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
