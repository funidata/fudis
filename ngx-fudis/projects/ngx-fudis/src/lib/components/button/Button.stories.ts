// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from './button.component';
import { IconComponent } from '../icon/icon.component';

export default {
	title: 'Components/Button',
	component: ButtonComponent,
	decorators: [
		moduleMetadata({
			imports: [MatButtonModule],
			declarations: [ButtonComponent, IconComponent],
		}),
	],
	argTypes: {},
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
	props: args,
});

export const Primary = Template.bind({});
Primary.args = {
	variant: 'primary',
	label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
	variant: 'secondary',
	label: 'Button',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
	variant: 'tertiary',
	label: 'Button',
};

export const Disabled = Template.bind({});
Disabled.args = {
	label: 'Button',
	disabled: true,
};

export const ExamplesWithIcon: Story = () => ({
	template: `
		<div style="display:flex; flex-direction:column;">
			<div style="margin-bottom:1rem">
				<fudis-button label="Poista"><fudis-icon icon="delete"></fudis-icon></fudis-button>
			</div>
			<div style="margin-bottom:1rem">
				<fudis-button label="Poista" variant="secondary"><fudis-icon icon="delete"></fudis-icon></fudis-button>
			</div>
			<div style="margin-bottom:1rem">
				<fudis-button label="Poista" variant="tertiary"><fudis-icon icon="delete"></fudis-icon></fudis-button>
			</div>
			<div style="margin-bottom:1rem">
				<fudis-button label="Palaa takaisin" size="small"><fudis-icon icon="back"></fudis-icon></fudis-button>
			</div>
			<div style="margin-bottom:1rem">
				<fudis-button label="Palaa takaisin" size="small" variant="secondary"><fudis-icon icon="back"></fudis-icon></fudis-button>
			</div>
			<div style="margin-bottom:1rem">
				<fudis-button label="Palaa takaisin" size="small" variant="tertiary"><fudis-icon icon="back"></fudis-icon></fudis-button>
			</div>
		</div>
	`,
});
