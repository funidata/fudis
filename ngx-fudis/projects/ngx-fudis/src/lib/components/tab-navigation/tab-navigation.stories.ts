import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

import { Component, Input } from '@angular/core';
import { TabNavigationTabComponent } from './tab-navigation-tab.component';
import { TabNavigationPanelComponent } from './tab-navigation-panel.component';
import { TabNavigationBarComponent } from './tab-navigation-bar.component';

@Component({
  selector: 'tab-navigation-example',
  standalone: false,
  template: `
    <fudis-tab-navigation-bar
      [id]="'fudis-tab-navigation-1'"
      [variant]="variant"
      [panel]="navigationTabPanel"
    >
      <button
        *ngFor="let tab of tabs"
        fudis-tab-navigation-tab
        (click)="setLink(tab.link)"
        [active]="activeLink === tab.link"
        [id]="tab.id"
      >
        {{ tab.label }}
      </button>
      <a
        fudis-tab-navigation-tab
        (click)="setLink('/some-link')"
        [active]="activeLink === '/some-link'"
        href="javascript:void(0);"
        [id]="'fudis-tab-5'"
      >
        Link button
      </a>
    </fudis-tab-navigation-bar>
    <fudis-tab-navigation-panel [id]="'fudis-panel-1'" #navigationTabPanel>
      <div style="margin-top: 1rem">
        <fudis-body-text
          >In this example the content does not change when tabs are toggled. In a real life
          scenario a router of any kind is used to project content. See documentation for more
          detailed information.</fudis-body-text
        >
      </div>
    </fudis-tab-navigation-panel>
  `,
})
class TabNavigationExampleComponent {
  @Input() variant: 'primary' | 'secondary';

  tabs: { id: string; label: string; link: string }[] = [
    { id: 'fudis-tab-1', label: 'Link 1', link: '/link-1' },
    { id: 'fudis-tab-2', label: 'Link 2', link: '/link-2' },
    { id: 'fudis-tab-3', label: 'Link 3', link: '/link-3' },
    { id: 'fudis-tab-4', label: 'Lorem ipsum olen pitkä linkki', link: '/link-4' },
    { id: 'fudis-tab-5', label: 'Link 4', link: '/link-5' },
  ];
  activeLink = '/link-1';

  setLink(link: string) {
    this.activeLink = link;
  }
}

export default {
  title: 'Components/Tabs with navigation',
  component: TabNavigationExampleComponent,
  decorators: [
    moduleMetadata({
      declarations: [TabNavigationExampleComponent],
      imports: [TabNavigationTabComponent, TabNavigationBarComponent, TabNavigationPanelComponent],
    }),
  ],
  parameters: {
    docs: {},
    controls: {},
  },
  argTypes: {},
  args: {},
} as Meta;

const Template: StoryFn<TabNavigationExampleComponent> = (args) => ({
  props: args,
});

export const ExamplePrimary = Template.bind({});
ExamplePrimary.args = {
  variant: 'primary',
};

export const ExampleSecondary = Template.bind({});
ExampleSecondary.args = {
  variant: 'secondary',
};
