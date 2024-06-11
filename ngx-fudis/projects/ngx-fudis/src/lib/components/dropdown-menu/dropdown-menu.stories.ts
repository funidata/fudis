import { StoryFn, Meta, applicationConfig } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { DropdownMenuComponent } from './dropdown-menu.component';
import docs from './dropdown-menu-docs.mdx';
import { dropdownMenuExclude } from '../../utilities/storybook';

export default {
  title: 'Components/Dropdown Menu',
  component: DropdownMenuComponent,
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: dropdownMenuExclude,
    },
  },
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  argTypes: {},
} as Meta;

const html = String.raw;

const Template: StoryFn = (args) => ({
  props: args,
  template: html` <fudis-grid [columns]="2">
    <fudis-grid-item>
      <fudis-heading [level]="4">Align dropdown to right</fudis-heading>
      <fudis-button
        [label]="'Menu'"
        [labelHidden]="true"
        [size]="'small'"
        [variant]="'secondary'"
        [icon]="'three-dots'"
        [asMenuButton]="true"
      >
        <fudis-dropdown-menu [align]="right">
          <fudis-dropdown-menu-item [label]="'Item 1'"></fudis-dropdown-menu-item>
          <fudis-dropdown-menu-item
            [label]="'Item 22'"
            [disabled]="true"
          ></fudis-dropdown-menu-item>
          <fudis-dropdown-menu-item [label]="'Item 23'"></fudis-dropdown-menu-item>
          <fudis-dropdown-menu-item
            [label]="'Item 45 with very long text so no one really bothers to even read it'"
          ></fudis-dropdown-menu-item>
          <fudis-dropdown-menu-item [label]="'Item 100'"></fudis-dropdown-menu-item>
          <fudis-dropdown-menu-item [label]="'Item 2200250'"></fudis-dropdown-menu-item>
          <fudis-dropdown-menu-item [label]="'Item 878787878571'"></fudis-dropdown-menu-item>
        </fudis-dropdown-menu>
      </fudis-button>
    </fudis-grid-item>
    <fudis-grid-item>
      <fudis-heading [level]="4">Align dropdown to left (default)</fudis-heading>
      <fudis-button
        [label]="'Menu'"
        [labelHidden]="true"
        [size]="'small'"
        [variant]="'secondary'"
        [icon]="'three-dots'"
        [asMenuButton]="true"
      >
        <fudis-dropdown-menu>
          <fudis-dropdown-menu-item [label]="'Item 1'"></fudis-dropdown-menu-item>
          <fudis-dropdown-menu-item
            [label]="'Item 22'"
            [disabled]="true"
          ></fudis-dropdown-menu-item>
          <fudis-dropdown-menu-item [label]="'Item 23'"></fudis-dropdown-menu-item>
          <fudis-dropdown-menu-item
            [label]="'Item 45 with very long text so no one really bothers to even read it'"
          ></fudis-dropdown-menu-item>
          <fudis-dropdown-menu-item [label]="'Item 100'"></fudis-dropdown-menu-item>
          <fudis-dropdown-menu-item [label]="'Item 2200250'"></fudis-dropdown-menu-item>
          <fudis-dropdown-menu-item [label]="'Item 878787878571'"></fudis-dropdown-menu-item>
        </fudis-dropdown-menu>
      </fudis-button>
    </fudis-grid-item>
  </fudis-grid>`,
});

export const Example = Template.bind({});
Example.args = {};
