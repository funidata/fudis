import {
  OnInit,
  Component,
  ElementRef,
  Host,
  ViewChild,
  Optional,
  Inject,
  ChangeDetectionStrategy,
  effect,
  Output,
  EventEmitter,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DropdownMenuComponent } from '../dropdown-menu.component';
import { FudisIdService } from '../../../services/id/id.service';
import { ButtonComponent } from '../../button/button.component';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { BehaviorSubject } from 'rxjs';
import { SelectOptionBaseDirective } from '../../form/select/common/select-option-base/select-option-base.directive';
import { SelectGroupComponent } from '../../form/select/common/select-group/select-group.component';
import { FudisDropdownMenuItem } from '../../../types/forms';

@Component({
  selector: 'fudis-dropdown-menu-item',
  templateUrl: './dropdown-menu-item.component.html',
  styleUrls: ['./dropdown-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuItemComponent extends SelectOptionBaseDirective implements OnInit {
  constructor(
    private _idService: FudisIdService,
    private _translationService: FudisTranslationService,
    @Host() protected _parentDropdownMenu: DropdownMenuComponent,
    @Inject(DOCUMENT) _document: Document,
    @Host() @Optional() protected _parentButton: ButtonComponent,
    @Host() @Optional() _parentGroup: SelectGroupComponent,
  ) {
    super(_document, _parentGroup);

    // this._dropdownMenuParent = _parentDropdownMenu;

    effect(() => {
      const translations = _translationService.getTranslations()();

      this.translationItemDisabledText.next(translations.DROPDOWNMENU.ITEM.DISABLED);
    });
  }

  /**
   * Template reference for dropdown item button element
   */
  @ViewChild('dropdownItem') dropdownItem: ElementRef<HTMLButtonElement>;

  @Output() selectionUpdate = new EventEmitter<FudisDropdownMenuItem<object> | null>();

  /**
   * Internal translated text for disabled dropdown menu item
   */
  public translationItemDisabledText = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this._id = this._idService.getNewChildId('dropdown-menu', this._parentDropdownMenu.id);

    //  this._id = this._idService.getNewSelectOptionId(
    //   'dropdown-menu',
    //   this._parentDropdownMenu.id,
    //   this._parentGroup?.id,
    // );

    // console.log(this._id);
  }

  /**
   * Handle key down event
   */
  protected _handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      if (this.menuItemData.disabled) {
        event.preventDefault();
        return;
      } else {
        event.preventDefault();
        this._clickOption(event);
      }
    } else if (event.key !== ' ') {
      this._baseHandleKeyDown(event, this.dropdownItem, '.fudis-dropdown-menu-item__focusable');
    }
  }

  /**
   * Handle blur event
   */
  protected _handleMenuItemBlur(event: FocusEvent): void {

    // if (!document.activeElement?.classList.contains('fudis-dropdown-menu-item__focusable')) {
    //   console.log(document.activeElement);
    //   this._parentDropdownMenu.open = false;
    //   this.handleBlur.emit(event);
    // } else {
    //   this._parentDropdownMenu.open = true;
    // }

    const closeDropdown = this._focusedOutFromComponent(
      event,
      this.dropdownItem,
      'fudis-dropdown-menu-item__focusable',
    );

    if (closeDropdown) {
      this._parentDropdownMenu.open = false;
    }
  }

  /**
   * Click handler for Dropdown Menu Item click
   */
  protected override _clickOption(event: Event): void {
    if (!this.menuItemData.disabled) {
      const selectedOption: FudisDropdownMenuItem<object> = {
        ...this.menuItemData,
        fudisGeneratedHtmlId: this._id,
      };

      this.selectionUpdate.emit(selectedOption);
      this.handleClick.emit(event);

      this._executeAction(selectedOption);

      this._parentDropdownMenu.open = false;
    }

    return;
  }

  /**
   * Execute Dropdown Menu Item's object's callback function
   */
  private _executeAction(option: FudisDropdownMenuItem<object>): void {
    if (option) {
      option.callback?.();
    }
  }
}
