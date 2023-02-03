// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from './button.component';
import { IconComponent } from '../icon/icon.component';
import { GridComponent } from '../grid/grid.component';
import { HeadingComponent } from '../typography/heading/heading.component';

import readme from './readme.mdx';

export default {
	title: 'Components/Button',
	component: ButtonComponent,
	decorators: [
		moduleMetadata({
			imports: [MatButtonModule],
			declarations: [ButtonComponent, IconComponent, GridComponent, HeadingComponent],
		}),
	],
	parameters: {
		docs: {
			page: readme,
		},
	},
	argTypes: {
		icon: {
			control: { type: 'text' },
		},
	},
} as Meta;

const Template: Story = (args) => ({
	props: args,
});

export const Button = Template.bind({});
Button.args = {
	variant: 'primary',
	label: 'Button',
	icon: 'search',
};

export const Secondary = Template.bind({});
Secondary.args = {
	variant: 'secondary',
	label: 'toinen nappi!',
	icon: 'search',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
	variant: 'secondary',
	label: 'with icon',
	icon: 'search',
};

export const AllVariants: Story = () => ({
	template: `
	<fudis-grid columns="1fr 1fr 1fr" align="left">
		<fudis-button variant="primary" label="Primary"></fudis-button>
		<fudis-button variant="secondary" label="Secondary"></fudis-button>
		<fudis-button variant="tertiary" label="Tertiary"></fudis-button>
	</fudis-grid>
	`,
});

// export const PrimaryVariations: Story = () => ({
// 	template: `
// 	<fudis-grid columns="1fr 1fr 1fr" align="left">
// 			<fudis-button size="small" label="Primary"></fudis-button>
// 			<fudis-button variant="secondary" size="small" label="Secondary"></fudis-button>
// 			<fudis-button variant="tertiary" size="small" label="Tertiary"></fudis-button>
// 			<fudis-button label="Primary"></fudis-button>
// 			<fudis-button variant="secondary" label="Secondary"></fudis-button>
// 			<fudis-button variant="tertiary" label="Tertiary"></fudis-button>
// 			<fudis-button disabled="true" label="Primary"></fudis-button>
// 			<fudis-button variant="secondary" disabled="true" label="Secondary"></fudis-button>
// 		<fudis-button variant="tertiary" disabled="true" label="Tertiary"></fudis-button>
// 	</fudis-grid>
// 	`,
// });

// export const SecondaryVariations: Story = () => ({
// 	template: `
// 	<fudis-grid columns="1fr 1fr 1fr" align="left">
// 		<fudis-button variant="secondary" size="small" label="Secondary"></fudis-button>
// 		<fudis-button variant="secondary" label="Secondary"></fudis-button>
// 		<fudis-button variant="secondary" disabled="true" label="Secondary"></fudis-button>
// 	</fudis-grid>
// 	`,
// });

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
