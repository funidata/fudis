import { StoryFn, Meta } from '@storybook/angular';
import { IconComponent } from './icon.component';
import { fudisIconArray } from '../../types/icons';
import readme from './readme.mdx';
import { iconExclude } from '../../utilities/storybook';

export default {
  title: 'Components/Icon',
  component: IconComponent,
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: iconExclude,
    },
  },
  argTypes: {
    color: {
      options: [
        'yellow',
        'red',
        'gray-dark',
        'gray-light',
        'primary',
        'primary-dark',
        'green',
        'white',
      ],
      control: { type: 'select' },
    },
    icon: {
      options: [
        'achievement',
        'achievement-small',
        'alert',
        'alert-fill',
        'alert-small',
        'archive',
        'arrow-big',
        'arrow-dashed',
        'arrow-solid',
        'back',
        'brochure',
        'bullets',
        'calendar',
        'change-log',
        'check',
        'check-indeterminate-small',
        'check-small',
        'checkmark-circle',
        'chevron',
        'chevron-ring',
        'chevron-ring-fill',
        'clock',
        'close',
        'close-big',
        'code',
        'decrease-indent',
        'delete',
        'dot',
        'double-chevron-left',
        'double-chevron-right',
        'edit',
        'editor',
        'exclamation-mark-circle',
        'exclamation-mark-circle-fill',
        'exclamation-mark-small',
        'eye',
        'eye-blind',
        'fail',
        'hourglass',
        'increase-indent',
        'info',
        'info-circle',
        'info-circle-fill',
        'info-small',
        'junction',
        'link',
        'list-add',
        'list-minus',
        'lock',
        'lock-open',
        'magic-wand',
        'mail',
        'menu',
        'message',
        'minus',
        'minus-ring-fill',
        'new-tab',
        'notebook',
        'notification',
        'numbering',
        'pdf',
        'people',
        'person',
        'person-small',
        'picker',
        'pin-small',
        'place',
        'place-ring-fill',
        'plus',
        'print',
        'question-mark',
        'question-mark-small',
        'required',
        'ring-close',
        'ring-close-fill',
        'ring-plus',
        'ring-plus-fill',
        'rosette',
        'rule',
        'search',
        'seats',
        'settings',
        'shopping-cart',
        'sorter',
        'star',
        'switch',
        'three-dots',
        'three-dots-small',
        'waiting-approval',
        'waiting-decline',
        'zoom-in',
        'zoom-out',
      ],
    },
    rotate: {
      options: ['flip-180', 'cw-90', 'ccw-90', 'none'],
    },
  },
} as Meta;

const Template: StoryFn<IconComponent> = (args: IconComponent) => ({
  props: args,
});

export const Icon = Template.bind({});
Icon.args = {
  icon: 'achievement',
  color: 'default',
};

export const AllIcons: StoryFn = () => ({
  props: {
    fudisIconArray,
  },
  template: `
	<fudis-grid [columns]="{xs:2, md: 3, lg: 4}" [width]="'sm'">
		<div class="storybook-flex" style="margin: 0.25rem; justify-content: space-between;" *ngFor="let icon of fudisIconArray;">
		<fudis-body-text>{{icon}}</fudis-body-text>
		<fudis-icon [icon]="icon"></fudis-icon>
		</div>
	</fudis-grid>
	`,
});
