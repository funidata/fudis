import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipComponent } from './tooltip.component';
import { NgxFudisModule } from '../../ngx-fudis.module';

export default {
	title: 'Components/Tooltip',
	component: TooltipComponent,
	decorators: [
		moduleMetadata({
			imports: [MatButtonModule, MatTooltipModule, NgxFudisModule],
		}),
	],
	argTypes: {},
} as Meta;

const Template: Story = (args) => ({
	props: args,
	template: `<fudis-tooltip [tooltipText]="tooltipText">{{content}}</fudis-tooltip>`,
});

export const Tooltip = Template.bind({});
Tooltip.args = {
	tooltipText: 'warning',
	content: 'Jeejee',
};
