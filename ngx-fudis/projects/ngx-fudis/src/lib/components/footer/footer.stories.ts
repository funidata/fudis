import { Meta, StoryFn } from '@storybook/angular';
import { FooterComponent } from './footer.component';
import readme from './readme.mdx';

const html = String.raw;

export default {
	title: 'Components/Footer',
	component: FooterComponent,
	parameters: {
		docs: {
			page: readme,
		},
	},
	argTypes: {},
} as Meta;

const Template: StoryFn<FooterComponent> = (args: FooterComponent) => ({
	props: args,
	template: html`
		<fudis-footer>
			<ng-template fudisFooterRight>
				<fudis-link [href]="'example.com'" [linkTitle]="'Tietosuojaseloste'" [isExternalLink]="true" />
				<fudis-link [href]="'example.com'" [linkTitle]="'Saavutettavuusseloste'" [isExternalLink]="true" />
				<fudis-link [href]="'example.com'" [linkTitle]="'Järjestelmätiedot'" />
			</ng-template>
			<ng-template fudisFooterLeft>
				<fudis-link [href]="'example.com'" [linkTitle]="'Promo link'" [isExternalLink]="true" />
			</ng-template>
		</fudis-footer>
	`,
});

export const Footer = Template.bind({});
