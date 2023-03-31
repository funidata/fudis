import { Story, Meta } from '@storybook/angular/types-6-0';
import { ExpandableComponent } from './expandable.component';
import { ExpandableType } from '../../types/expandables';

export default {
	title: 'Components/Expandable',
	component: ExpandableComponent,
	argTypes: {
		tag: {
			options: ['h2', 'h3', 'h4', 'h5', 'h6'],
			control: { type: 'radio' },
		},
	},
	parameters: {
		controls: {
			exclude: ['_collapsed', 'openedOnce', 'ref', 'collapsedChange', 'setCollapsedStatus', 'content', 'headerButtons'],
		},
	},
} as Meta;

const Template: Story<ExpandableComponent> = (args: ExpandableComponent) => ({
	props: args,
	template: `
    <fudis-expandable [title]="title" [subTitle]="subTitle">
      <ng-template fudisExpandableContent>
        <fudis-body-text>Hey you! I am the content of the expandable.</fudis-body-text>
      </ng-template>
    </fudis-expandable>
  `,
});

export const Expandable = Template.bind({});
Expandable.args = {
	variant: ExpandableType.regular,
	title: 'Regular expandable',
	collapsed: true,
};

const SubTitleTemplate: Story<ExpandableComponent> = (args: ExpandableComponent) => ({
	props: args,
	template: `
    <fudis-expandable [title]="title" [subTitle]="subTitle">
      <ng-template fudisExpandableContent>
        <fudis-body-text>Hey you! I am the content of the expandable.</fudis-body-text>
      </ng-template>
    </fudis-expandable>
  `,
});

export const ExpandableWithSubTitle = SubTitleTemplate.bind({});
ExpandableWithSubTitle.args = {
	variant: ExpandableType.regular,
	title: 'Expandable with a sub title',
	subTitle: 'This is my sub title for extra info',
	collapsed: true,
};

const ActionTemplate: Story<ExpandableComponent> = (args: ExpandableComponent) => ({
	props: args,
	template: `
    <fudis-expandable [title]="title" [subTitle]="subTitle">
      <ng-template fudisExpandableActions>
        <fudis-button label="Button"></fudis-button>
      </ng-template>
      <ng-template fudisExpandableContent>
        <fudis-body-text>Hey you! I am the content of the expandable.</fudis-body-text>
      </ng-template>
    </fudis-expandable>
  `,
});

export const ExpandableWithActionButton = ActionTemplate.bind({});
ExpandableWithActionButton.args = {
	variant: ExpandableType.regular,
	title: 'Expandable with a header action button',
	collapsed: true,
};
