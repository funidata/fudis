import {
  Component,
  Input,
  HostBinding,
  ViewEncapsulation,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FudisButtonSize, FudisButtonType, FudisComponentChanges } from '../../types/miscellaneous';
import { ButtonBaseDirective } from '../../directives/button-base/button-base.directive';
import { FudisIdService } from '../../services/id/id.service';

@Component({
  selector: 'fudis-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ButtonComponent extends ButtonBaseDirective implements OnChanges, OnInit, OnDestroy {
  constructor(_idService: FudisIdService) {
    super(_idService);
  }
  /**
   * Reference to native button element
   */
  @ViewChild('buttonElement') public buttonEl: ElementRef<HTMLButtonElement>;

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
  @Input() override size: Exclude<FudisButtonSize, 'extra-small'> = 'medium';

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

  /**
   * Button click event
   */
  public buttonClick(event: Event): void {
    this.handleClick.emit(event);
  }

  /**
   * Handler blurring out
   */
  protected _handleButtonBlur(event: FocusEvent): void {
    this._focused = false;

    this.handleBlur.emit(event);
  }
}
