import {
  Component,
  Input,
  HostBinding,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import {
  FudisButtonType,
  FudisComponentChanges,
} from '../../types/miscellaneous';
import { BehaviorSubject } from 'rxjs';
import { DropdownEventService } from '../../services/dropdown/dropdown-event.service';
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
  constructor(
    private _dropdownEventService: DropdownEventService,
    _idService: FudisIdService,
  ) {
    super(_idService);
  }

  /**
   * Binding host CSS class to component wrapper
   */
  @HostBinding('class') private _classes = 'fudis-button-host';

  /**
   * Reference to native button element
   */
  @ViewChild('buttonElement') public buttonEl: ElementRef<HTMLButtonElement>;

  /**
   * Text content of the button
   */
  @Input({ required: true }) label: string;

  /**
   * Button size options
   */
  @Input() size: 'medium' | 'small';

  /**
   * Button type options
   */
  @Input() type: FudisButtonType = 'button';

  /**
   * Hide visible label text for icon-only buttons.
   */
  @Input() labelHidden: boolean = false;

  /**
   * Additional aria-label for describing context
   */
  @Input() ariaLabel: string;

  /**
   * Assign button as menu button with dropdown
   */
  @Input() asMenuButton: boolean = false;

  /**
   * Toggle dropdown menu button
   */
  public dropdownOpen = new BehaviorSubject<boolean>(false);

  /**
   * Id of child Dropdown Menu. Passed from child to parent Button.
   */
  public dropdownMenuId: string;

  /**
   * Aria-label for icon-only buttons
   */
  protected _ariaLabel = new BehaviorSubject<string>('');

  override ngOnChanges(changes: FudisComponentChanges<ButtonComponent>): void {
      const size = changes.size?.currentValue !== changes.size?.previousValue;
  
      if ( size ) {
        this._size = this.size;
      }

      super.ngOnChanges(changes);
  }
  
  /**
   * Button click event
   */
  public override buttonClick(event: Event): void {
    if (this.asMenuButton) {
      this.toggleMenu();
    }

    this.handleClick.emit(event);
  }

  /**
   * Toggling when Button is used as Menu Button
   */
  public toggleMenu(): void {
    const newState = !this.dropdownOpen.value;
    this.dropdownOpen.next(newState);

    this._dropdownEventService.triggerWidthCalculation();
  }

  /**
   * Close dropdown when Button is used as Menu Button
   */
  public closeMenu(focusToButton: boolean = true): void {
    this.dropdownOpen.next(false);

    if (!this._focused && focusToButton) {
      this.buttonEl.nativeElement.focus();
    }

    this._dropdownEventService.triggerWidthCalculation();
  }

  /**
   * Handle Escape key down for Menu Button
   */
  protected _handleMenuButtonKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.closeMenu();
    }
  }

  /**
   * Handler for blurring out and closing Menu Button's dropdown
   */
  protected override _handleButtonBlur(event: FocusEvent): void {
    this._focused = false;

    const targetIsDropdownMenuOption = (event.relatedTarget as HTMLElement)?.classList?.contains(
      'fudis-dropdown-menu-item',
    );

    if (this.asMenuButton && !targetIsDropdownMenuOption) {
      this.dropdownOpen.next(false);
    }

    this.handleBlur.emit(event);
  }
}
