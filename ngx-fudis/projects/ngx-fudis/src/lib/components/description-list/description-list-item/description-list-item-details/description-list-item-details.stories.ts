import { Meta, StoryObj } from '@storybook/angular-vite';
import { DescriptionListItemDetailsComponent } from './description-list-item-details.component';
import { descriptionListItemArgTypesExclude } from '../../../../utilities/storybook';

const meta: Meta<DescriptionListItemDetailsComponent> = {
  title: 'Components/Description List/Description List Item Details',
  component: DescriptionListItemDetailsComponent,
  parameters: {
    controls: {
      exclude: descriptionListItemArgTypesExclude,
    },
  },
  tags: ['!dev', '!autodocs'],
};

export default meta;

export const Example: StoryObj<DescriptionListItemDetailsComponent> = {};
