import { StoryFn, Meta } from '@storybook/angular';
import { ExpandableComponent } from './expandable.component';

export default {
	title: 'Components/Expandable',
	component: ExpandableComponent,
	argTypes: { level: { control: { type: 'number', min: 1, max: 10 } } },
	parameters: {
		controls: {
			exclude: ['_collapsed', 'openedOnce', 'ref', 'collapsedChange', 'setCollapsedStatus', 'content', 'headerButtons'],
		},
	},
} as Meta;

const html = String.raw;

const Template: StoryFn<ExpandableComponent> = (args: ExpandableComponent) => ({
	props: args,
	template: html`
		<fudis-expandable [title]="title" [subTitle]="subTitle" [level]="2">
			<ng-template fudisContent type="expandable">
				<fudis-body-text>Hey you! I am the content of the expandable.</fudis-body-text>
			</ng-template>
		</fudis-expandable>
	`,
});

export const Expandable = Template.bind({});
Expandable.args = {
	variant: 'regular',
	title: 'Regular expandable',
	collapsed: true,
};

const SubTitleTemplate: StoryFn<ExpandableComponent> = (args: ExpandableComponent) => ({
	props: args,
	template: html`
		<fudis-expandable [title]="title" [subTitle]="subTitle">
			<ng-template fudisContent type="expandable">
				<fudis-body-text>Hey you! I am the content of the expandable.</fudis-body-text>
			</ng-template>
		</fudis-expandable>
	`,
});

export const ExpandableWithSubTitle = SubTitleTemplate.bind({});
ExpandableWithSubTitle.args = {
	variant: 'regular',
	title: 'Expandable with a sub title',
	subTitle: 'This is my sub title for extra info',
	collapsed: true,
};

const ActionTemplate: StoryFn<ExpandableComponent> = (args: ExpandableComponent) => ({
	props: args,
	template: html`
		<fudis-expandable [title]="title" [subTitle]="subTitle">
			<ng-template fudisActions type="expandable">
				<fudis-button label="Button"></fudis-button>
			</ng-template>
			<ng-template fudisContent type="expandable">
				<fudis-body-text>Hey you! I am the content of the expandable.</fudis-body-text>
			</ng-template>
		</fudis-expandable>
	`,
});

export const ExpandableWithActionButton = ActionTemplate.bind({});
ExpandableWithActionButton.args = {
	variant: 'regular',
	title: 'Expandable with a header action button',
	collapsed: true,
};

const LiteTemplate: StoryFn<ExpandableComponent> = (args: ExpandableComponent) => ({
	props: args,
	template: html`
		<fudis-expandable [title]="'Expandable lite'" [variant]="'lite'" [padding]="'small'">
			<ng-template fudisContent type="expandable">
				<fudis-body-text>You might want to use me with padding small.</fudis-body-text>
			</ng-template>
		</fudis-expandable>
	`,
});

export const ExpandableLite = LiteTemplate.bind({});
LiteTemplate.args = {
	collapsed: true,
};
