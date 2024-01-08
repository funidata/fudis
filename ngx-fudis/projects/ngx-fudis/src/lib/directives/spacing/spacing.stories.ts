import { StoryFn, Meta, componentWrapperDecorator } from '@storybook/angular';

import { ButtonComponent } from '../../components/button/button.component';
import { SpacingDirective } from './spacing.directive';
import readme from './readme.mdx';

export default {
  title: 'Directives/Spacing',
  component: ButtonComponent,
  decorators: [
    componentWrapperDecorator(
      (story) => `
			<div style="margin: 40px">	
		${story}
		</div>`,
    ),
  ],
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: [
        '_ariaLabel',
        '_classList',
        '_iconColor',
        '_menuStatus',
        '_toggleOn',
        'classes',
        'ariaLabel',
        'asMenuButton',
        'disabled',
        'icon',
        'iconRotate',
        'label',
        'labelHidden',
        'size',
        'type',
        'variant',
        'tooltip',
        'tooltipPosition',
        'tooltipToggle',
        'handleClick',
        '_getAriaLabel',
        '_getClasses',
        'closeMenu',
        'buttonClick',
        'handleBlur',
        'ngOnChanges',
        'buttonEl',
      ],
    },
  },
} as Meta;

const html = String.raw;

const Template: StoryFn<SpacingDirective> = (args: SpacingDirective) => ({
  template: html`
    <fudis-body-text
      >This Fudis Button has margins added through <strong>fudisSpacing</strong> directive. Go ahead
      and inspect the button element while resizing the browser.</fudis-body-text
    >
    <div style="border: 2px solid var(--fudis-color-primary-light); display: inline-block;">
      <fudis-button
        fudisSpacing
        [marginTop]="marginTop"
        [marginBottom]="marginBottom"
        [marginRight]="marginRight"
        [marginLeft]="marginLeft"
        [label]="'Test button'"
      />
    </div>
  `,
  props: args,
});

export const Example = Template.bind({});
Example.args = {
  marginTop: 'lg',
  marginBottom: 'xs',
  marginRight: 'lg',
  marginLeft: 'lg',
};

export const ResponsiveExample = Template.bind({});
ResponsiveExample.args = {
  marginTop: { xs: 'xxl', sm: 'lg', md: 'md', lg: 'sm' },
  marginBottom: { xs: 'none', sm: 'sm', md: 'md', lg: 'lg' },
  marginRight: { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg' },
  marginLeft: { xs: 'xxl', sm: 'xl', md: 'lg', lg: 'md' },
};
