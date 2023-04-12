import { StoryFn, Meta, componentWrapperDecorator } from '@storybook/angular';

import { ButtonComponent } from '../../components/button/button.component';
import { TooltipDirective } from './tooltip.directive';
import readme from './readme.mdx';

export default {
	title: 'Directives/Tooltip',
	component: ButtonComponent,
	decorators: [
		componentWrapperDecorator(
			(story) => `
			<div style="margin: 40px">	
		${story}
		</div>`
		),
	],
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: ['icon', 'color', 'rotate', 'getClasses'],
		},
	},
} as Meta;

const html = String.raw;

const Template: StoryFn<TooltipDirective> = (args: TooltipDirective) => ({
	template: html`
		<div class="storybook-flex" style="align-items: flex-start">
			<div>
				<fudis-body-text>This button here has a tooltip.</fudis-body-text>
				<fudis-body-text>Set tooltip text and position in Controls panel.</fudis-body-text>
				<fudis-body-text>Please refresh the page the changes to get updated.</fudis-body-text>
			</div>
			<fudis-button
				[label]="tooltip"
				[tooltip]="tooltip"
				[size]="'icon-only'"
				[variant]="'tertiary'"
				[tooltipPosition]="tooltipPosition"
				[tooltipToggle]="tooltipToggle"
				[icon]="'info-circle'"></fudis-button>
		</div>
	`,
	props: args,
});

export const Tooltip = Template.bind({});
Tooltip.args = {
	tooltip: 'I hope you can see me!',
};
