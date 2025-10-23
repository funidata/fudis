import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonBaseDirective } from '../../directives/button-base/button-base.directive';
import { FudisIcon } from '../../types/icons';
import { FudisComponentChanges } from '../../types/miscellaneous';
import { BehaviorSubject } from 'rxjs';
import { DropdownEventService } from '../../services/dropdown/dropdown-event.service';
import { FudisIdService } from '../../services/id/id.service';

@Component({
  selector: 'fudis-icon-button',
  templateUrl: './icon-button.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class IconButtonComponent extends ButtonBaseDirective {
  constructor(
    _idService: FudisIdService,
    private _dropdownEventService: DropdownEventService,
  ) {
    super(_idService);
  }
  /**
   * Reference to native button element
   */
  @ViewChild('buttonElement') public buttonEl: ElementRef<HTMLButtonElement>;

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
   * Assign button as menu button with dropdown
   */
  @Input() asMenuButton: boolean = false;

  /**
   * Left icon margin for small and medium sizes
   */
  protected _iconMargin = new BehaviorSubject<string>('fudis-button__icon');

  /**
   * Toggle dropdown menu button
   */
  public dropdownOpen = new BehaviorSubject<boolean>(false);

  /**
   * Id of child Dropdown Menu. Passed from child to parent Button.
   */
  public dropdownMenuId: string;

  override ngOnInit(): void {
    const margin = ['medium', 'small'].includes(this.size) ? ' fudis-ml-xs' : '';
    this._iconMargin.next(`fudis-button__icon${margin}`);
    super.ngOnInit();
  }

  override ngOnChanges(changes: FudisComponentChanges<IconButtonComponent>): void {
    const size = changes.size?.currentValue !== changes.size?.previousValue;

    if (size) {
      this._size = this.size;
      const margin = ['medium', 'small'].includes(this.size) ? ' fudis-ml-xs' : '';
      this._iconMargin.next(`fudis-button__icon${margin}`);
    }

    super.ngOnChanges(changes);
  }

  /**
   * Button click event
   */
  public buttonClick(event: Event): void {
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
  protected _handleButtonBlur(event: FocusEvent): void {
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
