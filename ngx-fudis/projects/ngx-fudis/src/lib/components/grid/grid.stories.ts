import { Story, Meta, componentWrapperDecorator } from '@storybook/angular';

import { GridComponent } from './grid.component';

export default {
	title: 'Components/Grid',
	component: GridComponent,
	decorators: [
		componentWrapperDecorator(
			(story) => `
			<style>
			.grid-test-item{
				border: 3px solid cornflowerblue;
			}
			</style>
			<div style="border: 3px solid orangered">	
		${story}
		</div>`
		),
	],
	argTypes: {
		columns: {
			options: ['1fr 3fr', '1fr 1fr', '5fr 1fr'],
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
			options: ['none', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'responsive'],
			control: { type: 'select' },
		},
		columnGap: {
			options: ['none', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'responsive'],
			control: { type: 'select' },
		},
	},
	parameters: {
		controls: {
			exclude: [
				'columnsToApply',
				'fakeGridArray',
				'ngOnInit',
				'breakpointObserver',
				'columnsFromInput',
				'gridWidths',
				'gridWidthsArray',
			],
		},
	},
} as Meta;

const html = String.raw;

const Template: Story<GridComponent> = (args: GridComponent) => ({
	template: html`<fudis-grid
		[columns]="'1fr 1fr 1fr'"
		[columnsXs]="columnsXs"
		[columnsS]="columnsS"
		[columnsM]="columnsM"
		[columnsL]="columnsL"
		[columnsXl]="columnsXl"
		[columnsXxl]="columnsXxl"
		[align]="align"
		[alignItemsX]="alignItemsX"
		[alignItemsY]="alignItemsY"
		[marginTop]="marginTop"
		[marginBottom]="marginBottom"
		[width]="width"
		[columnGap]="columnGap"
		[rowGap]="rowGap">
		<fudis-heading class="grid-test-item" tag="h1" size="l"
			>Fudis-headings will always take 100% width if they are direct child of Fudis grid component</fudis-heading
		>
		<fudis-heading class="grid-test-item" tag="h2" size="s"
			>If you change any of the column size values from the controls, please refresh the page for ngMaterial's
			Breakpoint Observer to register the new values!</fudis-heading
		>

		<div class="grid-test-item">
			<fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<div class="grid-test-item">
			<fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<div class="grid-test-item">
			<fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<div class="grid-test-item">
			<fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<div class="grid-test-item">
			<fudis-heading tag="h3" size="m">This is fudis-heading inside a div</fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
	</fudis-grid>`,
	props: args,
});

export const Grid = Template.bind({});
Grid.args = {};
