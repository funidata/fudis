import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

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
  @Input() id: string;
  _activeTabId: string;
}
