import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { DescriptionListCompactComponent } from './description-list-compact.component';

export default {
	title: 'Components/Description List Compact',
	component: DescriptionListCompactComponent,
	decorators: [
		moduleMetadata({
			imports: [],
		}),
	],
	argTypes: {},
} as Meta;

const testData = [
	{ key: 'Opetusieli', value: 'Tagalog' },
	{ key: 'Opetuspaikka', value: 'Norsunluurannikko' },
	{ key: 'Opetusaika', value: '25.8.2022-24.1.2023' },
	{ key: 'Arvosana', value: 'Hylätty' },
	{ key: 'Arvioija', value: 'Kalle Käyttäjä' },
];

const html = String.raw;

export const DescriptionListCompact: Story = () => ({
	props: { testData },
	template: html` <fudis-description-list-compact [data]="testData"></fudis-description-list-compact> `,
});
