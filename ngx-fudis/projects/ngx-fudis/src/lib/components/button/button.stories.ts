// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ButtonComponent } from './button.component';
import readme from './readme.mdx';

export default {
	title: 'Components/Button',
	component: ButtonComponent,
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
};

export const IconButton = Template.bind({});
IconButton.args = {
	variant: 'secondary',
	label: 'Icon Button',
	icon: 'search',
};

export const OnlyIconButton = Template.bind({});
OnlyIconButton.args = {
	variant: 'secondary',
	icon: 'three-dots',
	ariaLabel: 'Open additional menu',
};

export const AllVariants: Story = () => ({
	template: `
	<fudis-grid columns="1fr 1fr 1fr 1fr" align="left" rowGap="xs" marginBottom="m">
		<fudis-heading tag="h4" size="s">Medium size buttons</fudis-heading>
		<fudis-button variant="primary" label="Primary"></fudis-button>
		<fudis-button variant="secondary" label="Secondary"></fudis-button>
		<fudis-button variant="tertiary" label="Tertiary"></fudis-button>
		<fudis-button label="Disabled" [disabled]="true"></fudis-button>
	</fudis-grid>

	<fudis-grid columns="1fr 1fr 1fr 1fr" align="left" rowGap="xs">
		<fudis-heading tag="h4" size="s">Small size buttons</fudis-heading>
		<fudis-button variant="primary" label="Primary" size="small"></fudis-button>
		<fudis-button variant="secondary" label="Secondary" size="small"></fudis-button>
		<fudis-button variant="tertiary" label="Tertiary" size="small"></fudis-button>
		<fudis-button label="Disabled" [disabled]="true" size="small"></fudis-button>
	</fudis-grid>
	`,
});
