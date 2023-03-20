import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { IconComponent } from '../../components/icon/icon.component';
import { TooltipDirective } from './tooltip.directive';
import readme from './readme.mdx';

export default {
	title: 'Directives/Tooltip',
	component: IconComponent,
	decorators: [
		moduleMetadata({
			imports: [],
		}),
	],
	argTypes: {},
	parameters: {
		docs: {
			page: readme,
		},
	},
} as Meta;

const tooltipOne = 'I am a tooltip tied to this icon!';
const tooltipTwo = 'You can toggle me.';
const tooltipThree = 'Kolmas tooltip';
const tooltipFourth = 'Neljäs tooltip';

const Template: Story<TooltipDirective> = () => ({
	props: {
		tooltipOne,
		tooltipTwo,
		tooltipThree,
		tooltipFourth,
	},
	template: `
	<div class="flex">
	<fudis-body-text>This icon has a tooltip and is visible on hover and on focus</fudis-body-text><fudis-icon [tooltip]="tooltipOne" icon="info-circle" color="primary"></fudis-icon></div>
	<div class="flex">
	<fudis-body-text>Following tooltip can be toggled </fudis-body-text><fudis-icon [tooltip]="tooltipTwo" [tooltipToggle]="true" icon="info-circle" color="primary"></fudis-icon></div>
	<div class="flex">
	<fudis-body-text>Following tooltip can be toggled </fudis-body-text><fudis-icon [tooltip]="tooltipThree" icon="info-circle" color="primary"></fudis-icon></div>
	<div class="flex">
	<fudis-body-text>Following tooltip can be toggled </fudis-body-text><fudis-icon [tooltip]="tooltipFourth" icon="info-circle" color="primary"></fudis-icon></div>
	
	<fudis-body-text fudisTooltip [tooltip]="'Miunssakin on tooltip'">moi eka lause</fudis-body-text>
	<fudis-body-text fudisTooltip [tooltip]="'Miunssakin on tooltip'">moi toka lause</fudis-body-text>
<fudis-icon [icon]="'search'" [tooltip]="'moimoimoi'" [tooltipToggle]="true"></fudis-icon>
	`,
});

export const Tooltip = Template.bind({});
