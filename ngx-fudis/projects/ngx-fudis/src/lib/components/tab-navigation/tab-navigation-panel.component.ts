import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * Navigation tab panel associated with the Tab Navigation Bar component.
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

   private _activeTabId: string | undefined;
}
