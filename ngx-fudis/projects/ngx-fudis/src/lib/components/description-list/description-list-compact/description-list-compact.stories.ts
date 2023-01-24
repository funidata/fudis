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
const html = String.raw;

export const DescriptionListCompact: Story = () => ({
	template: html`
		<fudis-description-list-compact
			[data]="[
		{ key: 'Opetusieli', value: 'Tagalog' },
		{ key: 'Opetuspaikka', value: 'Norsunluurannikko' },
		{ key: 'Opetusaika', value: '25.8.2022-24.1.2023' },
		{ key: 'Arvosana', value: 'Hylätty' },
		{ key: 'Arvioija', value: 'Kalle Käyttäjä' }
	]">
		</fudis-description-list-compact>
	`,
});
