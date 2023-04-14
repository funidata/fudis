import { Story, Meta, componentWrapperDecorator } from '@storybook/angular';
import { IconComponent } from '../../components/icon/icon.component';
import { TooltipDirective } from './tooltip.directive';
import readme from './readme.mdx';

export default {
	title: 'Directives/Tooltip',
	component: IconComponent,
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

const Template: Story<TooltipDirective> = (args: TooltipDirective) => ({
	template: html`
		<div class="storybook-flex" style="align-items: flex-start">
			<div>
				<fudis-body-text>This icon here has a tooltip.</fudis-body-text>
				<fudis-body-text>Set tooltip text and position in Controls panel.</fudis-body-text>
				<fudis-body-text>Please refresh the page the changes to get updated.</fudis-body-text>
			</div>

			<fudis-icon
				[tooltip]="tooltip"
				[tooltipPosition]="tooltipPosition"
				[tooltipToggle]="tooltipToggle"
				icon="info-circle"
				color="primary"></fudis-icon>
		</div>
	`,
	props: args,
});

export const Tooltip = Template.bind({});
Tooltip.args = {
	tooltip: 'I hope you can see me!',
};
