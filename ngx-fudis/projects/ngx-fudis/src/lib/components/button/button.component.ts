import {
  Component,
  Input,
  HostBinding,
  ViewEncapsulation,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  forwardRef,
} from '@angular/core';
import { FudisButtonSize, FudisButtonType, FudisComponentChanges } from '../../types/miscellaneous';
import { DropdownEventService } from '../../services/dropdown/dropdown-event.service';
import {
  BUTTON_TOKEN,
  ButtonBaseDirective,
} from '../../directives/button-base/button-base.directive';
import { FudisIdService } from '../../services/id/id.service';

@Component({
  selector: 'fudis-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  providers: [{ provide: BUTTON_TOKEN, useExisting: forwardRef(() => ButtonComponent) }],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ButtonComponent extends ButtonBaseDirective implements OnChanges, OnInit, OnDestroy {
  constructor(_idService: FudisIdService, _dropdownEventService: DropdownEventService) {
    super(_idService, _dropdownEventService);
  }

  /**
   * Binding host CSS class to component wrapper
   */
  @HostBinding('class') private _classes = 'fudis-button-host';

  /**
   * Text content of the button
   */
  @Input({ required: true }) label: string;

  /**
   * Button size options ignoring extra-small
   */
  @Input() override size: Exclude<FudisButtonSize, 'icon-only'> = 'medium';

  /**
   * Button type options
   */
  @Input() type: FudisButtonType = 'button';

  override ngOnChanges(changes: FudisComponentChanges<ButtonComponent>): void {
    const size = changes.size?.currentValue !== changes.size?.previousValue;

    if (size) {
      this._size = this.size;
    }

    super.ngOnChanges(changes);
  }
}
