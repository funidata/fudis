import type { Meta, StoryObj } from '@storybook/angular-vite';
import { DropdownMenuItemComponent } from './dropdown-menu-item.component';

const meta: Meta<DropdownMenuItemComponent> = {
  title: 'Components/Dropdown/Dropdown Menu Item',
  component: DropdownMenuItemComponent,
  tags: ['!dev', '!autodocs'],
};

export default meta;

export const Example: StoryObj<DropdownMenuItemComponent> = {};
