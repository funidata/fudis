import { TextSpacingComponent } from './text-spacing.component';

export default {
	title: 'Components/Typography/TextSpacing',
	component: TextSpacingComponent,
};

const html = String.raw;

export const Default = () => ({
	template: html`
		<fudis-text-spacing>
			<fudis-heading tag="h1" size="xl" text="I am heading size XL"></fudis-heading>
			<fudis-body-text>Regular body text lorem</fudis-body-text>
			<fudis-body-text size="m-regular"
				>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
				magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
				pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
				laborum.</fudis-body-text
			>
			<fudis-heading tag="h2" size="l" text="I am heading size L"></fudis-heading>
			<fudis-body-text size="m-regular"
				>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
				magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
				pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
				laborum.</fudis-body-text
			>
		</fudis-text-spacing>
	`,
	props: {},
});

Default.story = {
	name: 'Text Spacing',
};
