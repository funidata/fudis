import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * Navigation tab panel associated with the TabNavigationBarComponent.
 *
 * @example
 *   ```html
 *   <fudis-tab-navigation-bar [id]="'tabs-1'" [panel]="tabPanel">
 *     <button fudis-tab-navigation-tab [id]="'tab-1'" [active]="true">Overview</button>
 *   </fudis-tab-navigation-bar>
 *   <fudis-tab-navigation-panel [id]="'panel-1'" #tabPanel>
 *     <fudis-body-text>Tab panel content goes here.</fudis-body-text>
 *   </fudis-tab-navigation-panel>
 *   ```;
 */
@Component({
  selector: 'fudis-tab-navigation-panel',
  encapsulation: ViewEncapsulation.None,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-labelledby]': '_activeTabId',
    '[id]': 'id',
    role: 'tabpanel',
  },
})
export class TabNavigationPanelComponent {
  /**
   * Unique identifier for the component
   */
  @Input() id: string;

  protected _activeTabId: string | undefined;

  setActiveTabId = (id: string) => (this._activeTabId = id);
}
