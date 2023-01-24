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
	argTypes: {
		icon: {
			control: { type: 'text' },
		},
	},
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
	props: args,
});

export const Button = Template.bind({});
Button.args = {
	variant: 'primary',
	label: 'Button',
	icon: 'search',
};

export const ExamplesWithIcon: Story = () => ({
	template: `
		<div style="display:flex; flex-direction:column;">
			<div style="margin-bottom:1rem">
				<fudis-button icon="delete" label="Poista"></fudis-button>
			</div>
			<div style="margin-bottom:1rem">
				<fudis-button icon="delete" label="Poista" variant="secondary"></fudis-button>
			</div>
			<div style="margin-bottom:1rem">
				<fudis-button icon="delete" label="Poista" variant="tertiary"></fudis-button>
			</div>
			<div style="margin-bottom:1rem">
				<fudis-button icon="delete" label="Palaa takaisin" size="small"></fudis-button>
			</div>
			<div style="margin-bottom:1rem">
				<fudis-button icon="delete" label="Palaa takaisin" size="small" variant="secondary"></fudis-button>
			</div>
			<div style="margin-bottom:1rem">
				<fudis-button icon="delete" label="Palaa takaisin" size="small" variant="tertiary"></fudis-button>
			</div>
			<div style="margin-bottom:1rem">
				<fudis-button icon="delete" disabled="true" label="Palaa takaisin" variant="tertiary"></fudis-button>
			</div>
		</div>
	`,
});
