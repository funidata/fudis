import { StoryFn, Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, EventEmitter, Input, Output, importProvidersFrom } from '@angular/core';
import { DropdownMenuComponent } from './dropdown-menu.component';
import docs from './dropdown-menu-docs.mdx';
import { dropdownMenuControlsExclude } from '../../utilities/storybook';
import { defaultMenuItems, smallDropdownMenuGroupedMockData } from './mock_data';
import { action } from '@storybook/addon-actions';
import { FudisInputSize } from '../../types/forms';

@Component({
  selector: 'example-dropdown-menu',
  template: `<fudis-grid [columns]="{ md: 2 }" [rowGap]="'md'">
    <fudis-grid-item>
      <fudis-heading [level]="4">Random items menu</fudis-heading>
      <fudis-button
        [label]="'Random items menu'"
        [labelHidden]="true"
        [size]="'small'"
        [variant]="'secondary'"
        [icon]="'three-dots'"
        [asMenuButton]="true"
      >
        <fudis-dropdown-menu [align]="align" [size]="size">
          <fudis-dropdown-menu-item
            *ngFor="let item of defaultMenuItems"
            [label]="item.label"
            [disabled]="item.disabled"
            (handleClick)="_clickOption(item.label, $event)"
          >
          </fudis-dropdown-menu-item>
        </fudis-dropdown-menu>
      </fudis-button>
    </fudis-grid-item>
    <fudis-grid-item>
      <fudis-heading [level]="4">Grouped animals menu</fudis-heading>
      <fudis-button
        [label]="'Grouped animals menu'"
        [labelHidden]="true"
        [size]="'small'"
        [variant]="'secondary'"
        [icon]="'three-dots'"
        [asMenuButton]="true"
      >
        <fudis-dropdown-menu [align]="align" [size]="size">
          <fudis-dropdown-menu-group
            *ngFor="let group of smallDropdownMenuGroupedMockData"
            [label]="group.country"
          >
            <fudis-dropdown-menu-item
              *ngFor="let groupedItem of group.items"
              [label]="groupedItem.label"
              [disabled]="groupedItem.disabled"
              (handleClick)="_clickOption(groupedItem.label, $event)"
            >
            </fudis-dropdown-menu-item>
          </fudis-dropdown-menu-group>
        </fudis-dropdown-menu>
      </fudis-button>
    </fudis-grid-item>
    <fudis-grid-item [columns]="'1/-1'">
      <fudis-body-text *ngIf="_latestClickItem"
        >Latest clicked item was: {{ _latestClickItem }}</fudis-body-text
      >
    </fudis-grid-item>
  </fudis-grid>`,
})
class DropdownMenuExampleComponent {
  protected _latestClickItem: string | null = null;

  @Input() align: 'left' | 'right' | 'center' = 'left';

  @Input() size: FudisInputSize = 'lg';

  /**
   * Output for blur event in select option
   */
  @Output() handleClick = new EventEmitter<{ label: string; event: Event }>();

  protected _clickOption(label: string, event: Event): void {
    this._latestClickItem = label;
    this.handleClick.emit({ label, event });
  }

  defaultMenuItems = defaultMenuItems;
  smallDropdownMenuGroupedMockData = smallDropdownMenuGroupedMockData;
}

export default {
  title: 'Components/Dropdown Menu',
  component: DropdownMenuComponent,
  decorators: [
    moduleMetadata({
      declarations: [DropdownMenuExampleComponent],
    }),
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
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const html = String.raw;

const Template: StoryFn = (args) => ({
  props: {
    ...args,
    menuItemClick: action('menuItemClick'),
  },
  template: html`<example-dropdown-menu
    [size]="size"
    [align]="align"
    (handleClick)="menuItemClick($event)"
  ></example-dropdown-menu>`,
});

export const Example = Template.bind({});
Example.args = {
  align: 'center',
  size: 'lg',
};
