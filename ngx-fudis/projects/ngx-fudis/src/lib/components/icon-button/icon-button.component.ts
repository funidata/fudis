import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonBaseDirective } from '../../directives/button-base/button-base.directive';
import { FudisIcon } from '../../types/icons';
import { FudisComponentChanges } from '../../types/miscellaneous';

@Component({
  selector: 'fudis-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class IconButtonComponent extends ButtonBaseDirective {
  /**
   * Binding host CSS class to component wrapper
   */
  @HostBinding('class') private _classes = 'fudis-icon-button-host';

  /**
   * Required aria-label for describing context
   */
  @Input({ required: true }) override ariaLabel: string;

  /**
   * Icon for button
   */
  @Input({ required: true }) override icon: FudisIcon | undefined = undefined;

  /**
   * Button size options
   */
  @Input() size: 'medium' | 'small' | 'icon-only' = 'medium';

  override ngOnChanges(changes: FudisComponentChanges<IconButtonComponent>): void {
    const size = changes.size?.currentValue !== changes.size?.previousValue;

    if (size) {
      this._size = this.size;
    }

    super.ngOnChanges(changes);
  }
}
