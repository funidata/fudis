import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { DescriptionListComponent } from './description-list.component';

export default {
	title: 'Components/Description List',
	component: DescriptionListComponent,
	decorators: [
		moduleMetadata({
			imports: [],
		}),
	],
	argTypes: {},
} as Meta;

const testData = [
	{ key: 'Vastuuopettaja', value: 'olliperson@gmail.com', subHeading: 'Olli Kalle Opettaja' },
	{ key: 'Kieli', value: 'Ruotsi' },
	{ key: 'Vastuuorganisaatio', value: 'Fysiikanlaitois 100%' },
];

const html = String.raw;

export const DescriptionList: Story = () => ({
	props: { testData },
	template: html`<fudis-description-list [data]="testData"> </fudis-description-list>`,
});
