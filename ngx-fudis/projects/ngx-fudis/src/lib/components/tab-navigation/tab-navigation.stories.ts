import { Meta, moduleMetadata, StoryFn } from '@storybook/angular-vite';
import { Component, Input } from '@angular/core';
import docs from './tab-navigation.mdx';
import { tabNavigationBarExampleExclude } from '../../utilities/storybook';
import { TabNavigationBarComponent } from './tab-navigation-bar.component';
import { TabNavigationTabComponent } from './tab-navigation-tab.component';
import { TabNavigationPanelComponent } from './tab-navigation-panel.component';
import { BodyTextComponent } from '../typography/body-text/body-text.component';

@Component({
  selector: 'tab-navigation-example',
  imports: [
    TabNavigationBarComponent,
    TabNavigationTabComponent,
    TabNavigationPanelComponent,
    BodyTextComponent,
  ],
  template: `
    <fudis-tab-navigation-bar
      [id]="'fudis-tab-navigation-bar-1'"
      [variant]="variant"
      [panel]="navigationTabPanel"
    >
      @for (tab of tabs; track tab.id) {
        <button
          fudis-tab-navigation-tab
          (click)="setLink(tab.link)"
          [active]="activeLink === tab.link"
          [id]="tab.id"
        >
          {{ tab.label }}
        </button>
      }
      <a
        fudis-tab-navigation-tab
        (click)="setLink('/some-link')"
        [active]="activeLink === '/some-link'"
        href="javascript:void(0);"
        [id]="'fudis-tab-5'"
      >
        Study guidance
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
  @Input() id: string;
  @Input() variant: 'primary' | 'secondary';

  tabs: { id: string; label: string; link: string }[] = [
    { id: 'fudis-tab-1', label: 'Course overview', link: '/link-1' },
    { id: 'fudis-tab-2', label: 'Learning materials', link: '/link-2' },
    { id: 'fudis-tab-3', label: 'Assessment', link: '/link-3' },
    {
      id: 'fudis-tab-4',
      label: 'Assessment and recognition of prior learning',
      link: '/link-4',
    },
  ];
  activeLink = '/link-1';

  setLink(link: string) {
    this.activeLink = link;
  }
}

export default {
  title: 'Components/Tab Navigation',
  component: TabNavigationExampleComponent,
  decorators: [
    moduleMetadata({
      imports: [TabNavigationExampleComponent],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: tabNavigationBarExampleExclude,
    },
  },
  argTypes: {
    id: {
      control: { type: 'text' },
    },
    variant: {
      options: ['primary', 'secondary'],
      controls: { type: 'radio' },
    },
  },
  args: {
    variant: 'primary',
    id: 'fudis-tab-navigation-1',
  },
} as Meta;

const Template: StoryFn<TabNavigationExampleComponent> = (args) => ({
  props: args,
});

export const Example = Template.bind({});
