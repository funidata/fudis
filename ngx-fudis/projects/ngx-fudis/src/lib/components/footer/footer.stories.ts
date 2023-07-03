import { Meta, StoryFn } from '@storybook/angular';
import { FooterComponent } from './footer.component';

export default {
	title: 'Components/Footer',
	component: FooterComponent,
	argTypes: {},
} as Meta;

const Template: StoryFn = () => ({
	template: `
	<fudis-footer logoAltText="Link to Funidata homepage">
		<ng-template fudisFooterRight>
			<fudis-link [href]="'example.com'" [linkTitle]="'Tietosuojaseloste'" [isExternalLink]="true" />
			<fudis-link [href]="'example.com'" [linkTitle]="'Saavutettavuusseloste'" [isExternalLink]="true" />
			<fudis-link [href]="'example.com'" [linkTitle]="'Järjestelmätiedot'" [isExternalLink]="true" />
		</ng-template>
		<ng-template fudisFooterLeft>
			<fudis-link [href]="'example.com'" [linkTitle]="'Promo link'" [isExternalLink]="true" />
		</ng-template>
</fudis-footer>
	`,
});

export const Footer = Template.bind({});
