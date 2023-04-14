import { Story, Meta } from '@storybook/angular';

import { DescriptionListComponent } from './description-list.component';

export default {
	title: 'Components/Description List',
	component: DescriptionListComponent,
	argTypes: {},
} as Meta;

const testData = [
	{ key: 'First Name', value: 'Rex' },
	{ key: 'Last Name', value: 'Dangerwest' },
	{ key: 'Alias', value: 'Radical Emmet Xtreme' },
	{ key: 'Voice actor', value: 'Chris Pratt' },
	{ key: 'Favorite animal', value: 'Velociraptor', subHeading: 'Dinosaurus' },
	{ key: 'Real name', value: 'Emmet Joseph Brickowski' },
	{ key: 'Species', value: 'Lego' },
	{ key: 'Enemy', value: 'Emmet Brickowski', subHeading: 'Archenemy' },
	{ key: 'Enemy', value: 'Lucy', subHeading: 'Second Archenemy' },
];

const testDataCompact = [
	{ key: 'First Name', value: 'Rex' },
	{ key: 'Last Name', value: 'Dangerwest' },
	{ key: 'Alias', value: 'Radical Emmet Xtreme' },
	{ key: 'Voice actor', value: 'Chris Pratt' },
	{ key: 'Favorite animal', value: 'Velociraptor', subHeading: 'Dinosaurus' },
	{ key: 'Real name', value: 'Emmet Joseph Brickowski' },
	{ key: 'Species', value: 'Lego' },
	{ key: 'Enemy', value: 'Emmet Brickowski' },
	{ key: 'Enemy', value: 'Lucy' },
];

const lonelyDataItem = [{ key: 'Vastuuopettajan sähköposti', value: 'olli@ope.com', subHeading: 'Olli Opettaja' }];

const html = String.raw;

export const DescriptionList: Story = () => ({
	props: { testData, testDataCompact },
	template: html`<fudis-heading tag="h2" size="m"> Description List Regular Example</fudis-heading>
		<fudis-description-list [data]="testData" [marginBottom]="'m'"></fudis-description-list>
		<hr />
		<fudis-heading tag="h2" size="m">Description List Compact Example</fudis-heading>
		<fudis-description-list [variant]="'compact'" [data]="testDataCompact"></fudis-description-list> `,
});

const TemplateWithDl: Story<DescriptionListComponent> = () => ({
	template: html`<fudis-grid>
			<fudis-heading tag="h2" size="m">Here below is a regular Fudis Description List component</fudis-heading>
		</fudis-grid>
		<fudis-description-list [data]="testData" [marginBottom]="'xl'"></fudis-description-list>

		<fudis-grid [columns]="columns" [columnsXs]="'1fr'">
			<fudis-heading tag="h2" size="m"
				>And here below is a Fudis Grid where DL item is used as child component</fudis-heading
			>
			<fudis-description-list [disableGrid]="true" [data]="lonelyDataItem"></fudis-description-list>
			<fudis-body-text
				>Item next to this Body Text is a lonely Description List component with only one list item. This and DL item
				are both inside a Fudis Grid.</fudis-body-text
			>
		</fudis-grid>`,
	props: {
		testData,
		lonelyDataItem,
		columns: '1fr 1fr',
	},
});

export const DescriptionListItemInsideGrid = TemplateWithDl.bind({});
