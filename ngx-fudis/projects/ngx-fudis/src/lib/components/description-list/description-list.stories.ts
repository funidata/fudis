import { StoryFn, Meta } from '@storybook/angular';

import { DescriptionListComponent } from './description-list.component';
import readme from './readme.mdx';

export default {
	title: 'Components/Description List',
	component: DescriptionListComponent,
	parameters: {
		docs: {
			page: readme,
		},
	},
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

export const DescriptionList: StoryFn = () => ({
	props: { testData, testDataCompact },
	template: html`<fudis-heading tag="h2" size="md"> Description List Regular With Data Looping</fudis-heading>
		<fudis-description-list [data]="testData" [marginBottom]="'md'"></fudis-description-list>
		<hr />
		<fudis-heading tag="h2" size="md">Description List Compact With Data Looping</fudis-heading>
		<fudis-description-list
			[columns]="{xs: 1, sm: 2}"
			[variant]="'compact'"
			[data]="testDataCompact"></fudis-description-list>`,
});

const TemplateWithDl: StoryFn<DescriptionListComponent> = () => ({
	template: html` <fudis-heading tag="h2" size="md"
			>Here below is a regular Fudis Description List component</fudis-heading
		>
		<fudis-dl [data]="testData" [marginBottom]="'xl'" [columns]="2"></fudis-dl>

		<fudis-grid [columns]="columns">
			<fudis-heading tag="h2" size="md"
				>And here below is a Fudis Grid where DL item is used as child component</fudis-heading
			>
			<fudis-dl [disableGrid]="true" [data]="lonelyDataItem"></fudis-dl>
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

export const DescriptionListWithSubComponents: StoryFn = () => ({
	props: { testData, testDataCompact },
	template: html`<fudis-heading tag="h2" size="md">Description list built with sub components</fudis-heading>
		<fudis-description-list [marginBottom]="'md'">
			<fudis-description-list-item *ngFor="let item of testData; let i = index">
				<fudis-dt>{{item.key}}</fudis-dt>
				<fudis-dd [subHeading]="item.subHeading"
					>{{item.value}}
					<ng-container *ngIf="i === 1 || i === 4">
						<ng-template fudisActions type="dd">
							<fudis-button [label]="'Click!'" [variant]="'tertiary'" [size]="'small'" [icon]="'edit'" />
						</ng-template>
					</ng-container>
				</fudis-dd>
			</fudis-description-list-item>
		</fudis-description-list>
		<fudis-heading tag="h2" size="md">Description list compact built with sub components</fudis-heading>
		<fudis-description-list [variant]="'compact'" [marginBottom]="'md'">
			<fudis-description-list-item *ngFor="let item of testDataCompact; let i = index">
				<fudis-dt>{{item.key}}</fudis-dt>
				<fudis-dd [subHeading]="item.subHeading"
					>{{item.value}}<ng-container *ngIf="i === 1 || i === 4">
						<ng-template fudisActions type="dd">
							<fudis-button [label]="'Click!'" [variant]="'tertiary'" [size]="'small'" [icon]="'edit'" />
						</ng-template>
					</ng-container>
				</fudis-dd>
			</fudis-description-list-item>
		</fudis-description-list> `,
});

// <fudis-description-list-item *ngFor="let item of testData">
// 				<fudis-dd>{{item.key}}</fudis-dd>
// 				<fudis-dt>{{item.value}}</fudis-dt>
// 			</fudis-description-list-item>
