import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { DescriptionListComponent } from './description-list.component';
import { HeadingComponent } from '../typography/heading/heading.component';

export default {
	title: 'Components/Description List',
	component: DescriptionListComponent,
	decorators: [
		moduleMetadata({
			imports: [],
			declarations: [HeadingComponent],
		}),
	],
	argTypes: {},
} as Meta;

const testData = [
	{ key: 'Vastuuopettaja', value: 'olliperson@gmail.com', subHeading: 'Olli Kalle Opettaja' },
	{ key: 'Kieli', value: 'Ruotsi' },
	{ key: 'Vastuuorganisaatio', value: 'Fysiikanlaitois 100%' },
];

const testDataCompact = [
	{ key: 'Opetusieli', value: 'Tagalog' },
	{ key: 'Opetuspaikka', value: 'Norsunluurannikko' },
	{ key: 'Opetusaika', value: '25.8.2022-24.1.2023' },
	{ key: 'Arvosana', value: 'Hylätty' },
	{ key: 'Arvioija', value: 'Kalle Käyttäjä' },
];

const html = String.raw;

export const DescriptionList: Story = () => ({
	props: { testData, testDataCompact },
	template: html`<fudis-heading tag="h2" size="m" text="Description List Regular Example"></fudis-heading>
		<fudis-description-list [data]="testData"></fudis-description-list>
		<hr />
		<fudis-heading tag="h2" size="m" text="Description List Compact Example"></fudis-heading>
		<fudis-description-list variant="compact" [data]="testDataCompact"></fudis-description-list> `,
});
