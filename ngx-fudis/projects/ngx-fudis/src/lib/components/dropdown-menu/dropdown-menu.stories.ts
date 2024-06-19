import { StoryFn, Meta, applicationConfig } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { DropdownMenuComponent } from './dropdown-menu.component';
import docs from './dropdown-menu-docs.mdx';
import { dropdownMenuControlsExclude } from '../../utilities/storybook';
import { defaultMenuItems, groupedMockData } from '../form/select/common/mock_data';

export default {
  title: 'Components/Dropdown Menu',
  component: DropdownMenuComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: dropdownMenuControlsExclude,
    },
  },
} as Meta;

const html = String.raw;

const Template: StoryFn = (args) => ({
  props: { ...args, groupedMockData, defaultMenuItems },
  template: html` <fudis-grid [columns]="2">
    <fudis-grid-item>
      <fudis-heading [level]="4">Align to right, size 'md'</fudis-heading>
      <fudis-button
        [label]="'Menu'"
        [labelHidden]="true"
        [size]="'small'"
        [variant]="'secondary'"
        [icon]="'three-dots'"
        [asMenuButton]="true"
      >
        <fudis-dropdown-menu [align]="'right'" [size]="'md'">
          <fudis-dropdown-menu-item *ngFor="let item of defaultMenuItems" [data]="item">
          </fudis-dropdown-menu-item>
        </fudis-dropdown-menu>
      </fudis-button>
    </fudis-grid-item>
    <fudis-grid-item>
      <fudis-heading [level]="4">Align to left (default), size 'lg'</fudis-heading>
      <fudis-button
        [label]="'Menu'"
        [labelHidden]="true"
        [size]="'small'"
        [variant]="'secondary'"
        [icon]="'three-dots'"
        [asMenuButton]="true"
      >
        <fudis-dropdown-menu>
          <fudis-dropdown-menu-item *ngFor="let item of defaultMenuItems" [data]="item">
          </fudis-dropdown-menu-item>
        </fudis-dropdown-menu>
      </fudis-button>
    </fudis-grid-item>
  </fudis-grid>`,
});

export const Example = Template.bind({});
Example.args = {};
