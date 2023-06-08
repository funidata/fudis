import { StoryFn, Meta, componentWrapperDecorator } from '@storybook/angular';

import { GridComponent } from './grid.component';

const html = String.raw;

export default {
	title: 'Components/Grid',
	component: GridComponent,
	decorators: [
		componentWrapperDecorator(
			(story) => html` <style>
					.grid-item {
						padding: 0.5rem;
						background-color: #f1f1f1;
					}
				</style>
				<div style="border: 3px solid orangered">${story}</div>`
		),
	],
	argTypes: {
		columns: {
			options: ['1fr 3fr', '1fr 1fr', '5fr 1fr', 3],
			control: { type: 'select' },
		},
		align: {
			control: { type: 'select' },
		},
		marginTop: {
			control: { type: 'select' },
		},
		marginBottom: {
			control: { type: 'select' },
		},
		rowGap: {
			options: ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'responsive'],
			control: { type: 'select' },
		},
		columnGap: {
			options: ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'responsive'],
			control: { type: 'select' },
		},
	},
	parameters: {
		controls: {
			exclude: [
				'columnsToApply',
				'ngOnInit',
				'breakpointObserver',
				'columnsFromInput',
				'gridWidths',
				'gridWidthsArray',
			],
		},
	},
} as Meta;

const Template: StoryFn<GridComponent> = (args: GridComponent) => ({
	props: args,
	template: html`<fudis-grid
		[columns]="columns"
		[align]="align"
		[alignItemsX]="alignItemsX"
		[alignItemsY]="alignItemsY"
		[marginTop]="marginTop"
		[marginBottom]="marginBottom"
		[marginSides]="marginSides"
		[width]="width"
		[columnGap]="columnGap"
		[rowGap]="rowGap">
		<fudis-heading class="grid-item" tag="h1" size="l"
			>Fudis-headings will always take 100% width if they are direct child of Fudis grid component</fudis-heading
		>

		<div class="grid-item">
			<fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<div class="grid-item">
			<fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<div class="grid-item">
			<fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<div class="grid-item">
			<fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<div class="grid-item">
			<fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
	</fudis-grid>`,
});

export const Grid = Template.bind({});
Grid.args = {
	columns: { default: 2, md: 4 },
	align: 'center',
	alignItemsX: 'stretch',
	alignItemsY: 'stretch',
	marginTop: 'none',
	marginBottom: 'none',
	marginSides: 'responsive',
	width: 'xxl',
	rowGap: 'responsive',
	columnGap: 'responsive',
};
