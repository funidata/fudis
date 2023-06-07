import { StoryFn, Meta, componentWrapperDecorator } from '@storybook/angular';

import { GridItemComponent } from './grid-item.component';

const html = String.raw;

export default {
	title: 'Components/Grid/Grid Item',
	component: GridItemComponent,
	parameters: {
		controls: {
			exclude: ['ngOnChanges', 'ngOnInit'],
		},
	},
	decorators: [
		componentWrapperDecorator(
			(story) => html`
				<style>
					.grid-item-highlight {
						background-color: #fdefb4;
					}

					.grid-item {
						background-color: #f1f1f1;
					}

					.grid-refresh-text {
						width: 10rem;
					}
				</style>
				<fudis-body-text class="grid-refresh-text" [size]="'s-regular'">
					If canvas doesn't refresh on knobs change, press toolbar's refresh button.
				</fudis-body-text>
				${story}
			`
		),
	],
} as Meta;

const Template: StoryFn<GridItemComponent> = (args: any) => ({
	props: args,

	template: html`<fudis-grid [columns]="4">
		<fudis-heading [tag]="'h1'" [size]="'l'">This grid demonstrates adjusting a single item in a grid </fudis-heading>
		<fudis-grid-item class="grid-item-highlight" [alignX]="alignX" [alignY]="alignY" [columns]="columns">
			<fudis-body-text>Adjustable grid item.</fudis-body-text>
		</fudis-grid-item>
		<fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
		<fudis-body-text class="grid-item"
			>Normal grid item. With more content so effects of adjusting a single element can be seen better.</fudis-body-text
		>
		<fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
		<fudis-body-text class="grid-item"
			>Normal grid item. With more content so effects of adjusting a single element can be seen better.</fudis-body-text
		>
	</fudis-grid>`,
});

export const Example = Template.bind({});
Example.args = {
	alignX: 'stretch',
	alignY: 'stretch',
	columns: 'auto',
};
Example.argTypes = {
	alignX: {
		control: { type: 'radio' },
	},
	alignY: {
		control: { type: 'radio' },
	},
	columns: {
		options: ['stretch', 'auto', '1/3', '2/4', '2/-1'],
		control: { type: 'radio' },
	},
};

export const AlignX: StoryFn<GridItemComponent> = (args: any) => ({
	props: args,
	template: html`<fudis-grid [columns]="3">
		<fudis-heading [tag]="'h1'" [size]="'l'">This grid demonstrates attribute of 'alignX'</fudis-heading>
		<fudis-grid-item class="grid-item-highlight">
			<fudis-body-text>alignX = 'stretch' (default)</fudis-body-text>
		</fudis-grid-item>
		<fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
		<fudis-grid-item class="grid-item-highlight" [alignX]="'start'"
			><fudis-body-text>alignX = 'start'</fudis-body-text></fudis-grid-item
		>
		<fudis-grid-item class="grid-item-highlight" [alignX]="'end'"
			><fudis-body-text>alignX = 'end'</fudis-body-text></fudis-grid-item
		>
		<fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
		<fudis-body-text class="grid-item">Normal grid item</fudis-body-text
		><fudis-body-text class="grid-item">Normal grid item</fudis-body-text>

		<fudis-grid-item class="grid-item-highlight" [alignX]="'center'">
			<fudis-body-text>alignX = 'center' </fudis-body-text></fudis-grid-item
		>
		<fudis-body-text class="grid-item">Normal grid item</fudis-body-text>
	</fudis-grid>`,
});

export const AlignY: StoryFn<GridItemComponent> = (args: any) => ({
	props: args,
	template: html`<fudis-grid [columns]="2" [width]="'sm'">
		<fudis-heading [tag]="'h1'" [size]="'l'">This grid demonstrates attribute of 'alignY'</fudis-heading>
		<fudis-grid-item class="grid-item-highlight">
			<fudis-body-text>alignY = 'stretch' (default)</fudis-body-text>
		</fudis-grid-item>
		<fudis-grid-item class="grid-item">
			<fudis-body-text style="margin-bottom: 1rem;"
				>Normal grid item. With more content so effects of adjusting a single element can be seen
				better.</fudis-body-text
			>
			<fudis-body-text
				>Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six pounders careen avast
				belay. Sutler Jack Ketch broadside six pounders gally knave landlubber or just lubber handsomely ballast draft.
				Landlubber or just lubber Sea Legs bucko code of conduct chase wench spike lateen sail bilge
				boom.</fudis-body-text
			></fudis-grid-item
		>

		<fudis-grid-item class="grid-item-highlight" [alignY]="'start'"
			><fudis-body-text>alignY = 'start'</fudis-body-text></fudis-grid-item
		>
		<fudis-grid-item class="grid-item">
			<fudis-body-text style="margin-bottom: 1rem;"
				>Normal grid item. With more content so effects of adjusting a single element can be seen
				better.</fudis-body-text
			>
			<fudis-body-text
				>Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six pounders careen avast
				belay. Sutler Jack Ketch broadside six pounders gally knave landlubber or just lubber handsomely ballast draft.
				Landlubber or just lubber Sea Legs bucko code of conduct chase wench spike lateen sail bilge
				boom.</fudis-body-text
			></fudis-grid-item
		>
		<fudis-grid-item class="grid-item-highlight" [alignY]="'end'"
			><fudis-body-text>alignY = 'end'</fudis-body-text></fudis-grid-item
		><fudis-grid-item class="grid-item">
			<fudis-body-text style="margin-bottom: 1rem;"
				>Normal grid item. With more content so effects of adjusting a single element can be seen
				better.</fudis-body-text
			>
			<fudis-body-text
				>Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six pounders careen avast
				belay. Sutler Jack Ketch broadside six pounders gally knave landlubber or just lubber handsomely ballast draft.
				Landlubber or just lubber Sea Legs bucko code of conduct chase wench spike lateen sail bilge
				boom.</fudis-body-text
			></fudis-grid-item
		>
		<fudis-grid-item class="grid-item-highlight" [alignY]="'center'"
			><fudis-body-text>alignY = 'center'</fudis-body-text></fudis-grid-item
		><fudis-grid-item class="grid-item">
			<fudis-body-text style="margin-bottom: 1rem;"
				>Normal grid item. With more content so effects of adjusting a single element can be seen
				better.</fudis-body-text
			>
			<fudis-body-text
				>Barkadeer splice the main brace fire in the hole Corsair cackle fruit topgallant six pounders careen avast
				belay. Sutler Jack Ketch broadside six pounders gally knave landlubber or just lubber handsomely ballast draft.
				Landlubber or just lubber Sea Legs bucko code of conduct chase wench spike lateen sail bilge
				boom.</fudis-body-text
			></fudis-grid-item
		>
	</fudis-grid>`,
});

export const alignXAndY: StoryFn<GridItemComponent> = (args: any) => ({
	props: args,
	template: html`<fudis-grid [columns]="2">
		<fudis-heading [tag]="'h1'" [size]="'l'">This grid demonstrates combination of 'alignX' and 'alignY'</fudis-heading>
		<fudis-grid-item class="grid-item-highlight">
			<fudis-body-text>alignX = 'stretch' & alignY = 'stretch' (default)</fudis-body-text>
		</fudis-grid-item>
		<fudis-body-text class="grid-item"
			>Normal grid item. With more content so effects of adjusting a single element can be seen better.</fudis-body-text
		>
		<fudis-grid-item class="grid-item-highlight" [alignX]="'start'" [alignY]="'start'"
			><fudis-body-text>align = 'start' & alignY = 'start'</fudis-body-text></fudis-grid-item
		>
		<fudis-body-text class="grid-item"
			>Normal grid item. With more content so effects of adjusting a single element can be seen better.</fudis-body-text
		>
		<fudis-grid-item class="grid-item-highlight" [alignX]="'end'" [alignY]="'end'"
			><fudis-body-text>alignX = 'end' & alignY = 'end'</fudis-body-text></fudis-grid-item
		><fudis-body-text class="grid-item"
			>Normal grid item. With more content so effects of adjusting a single element can be seen better.</fudis-body-text
		>
		<fudis-grid-item class="grid-item-highlight" [alignX]="'center'" [alignY]="'center'"
			><fudis-body-text>alignX = 'center' & alignY = 'center'</fudis-body-text></fudis-grid-item
		>
		<fudis-body-text class="grid-item"
			>Normal grid item. With more content so effects of adjusting a single element can be seen better.</fudis-body-text
		>
	</fudis-grid>`,
});

export const columns: StoryFn<GridItemComponent> = (args: any) => ({
	props: args,
	template: html`<fudis-grid [columns]="6">
		<fudis-heading [tag]="'h1'" [size]="'l'"
			>This grid demonstrates 'columns' attribute. Parent grid has six columns.
		</fudis-heading>
		<fudis-grid-item class="grid-item-highlight" [columns]="'stretch'">
			<fudis-body-text>columns = 'stretch', so it takes the full width</fudis-body-text>
		</fudis-grid-item>
		<fudis-grid-item class="grid-item" class="grid-item">
			<fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
		>
		<fudis-grid-item class="grid-item"><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item>
		<fudis-grid-item class="grid-item-highlight" [columns]="'3/-1'"
			><fudis-body-text
				>columns = '3/-1', so it starts from the third column and stretches to the end</fudis-body-text
			></fudis-grid-item
		>
		<fudis-grid-item class="grid-item"><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item>
		<fudis-grid-item class="grid-item-highlight" [columns]="'2/4'"
			><fudis-body-text
				>columns = '2/4', so it starts from 2nd and ends in 4th column.</fudis-body-text
			></fudis-grid-item
		>
		<fudis-grid-item class="grid-item" class="grid-item"
			><fudis-body-text>Normal grid-item</fudis-body-text></fudis-grid-item
		>
		<fudis-grid-item class="grid-item-highlight" [columns]="'5/-1'"
			><fudis-body-text
				>columns = '5/-1', so it starts 5th column and stretches until the very end.</fudis-body-text
			></fudis-grid-item
		>
	</fudis-grid>`,
});

AlignX.parameters = {
	controls: { disable: true },
};

AlignY.parameters = {
	controls: { disable: true },
};

alignXAndY.parameters = {
	controls: { disable: true },
};

columns.parameters = {
	controls: { disable: true },
};
