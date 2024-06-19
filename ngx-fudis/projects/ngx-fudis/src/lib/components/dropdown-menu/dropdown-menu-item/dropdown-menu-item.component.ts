import {
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
  Input,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DropdownMenuComponent } from '../dropdown-menu.component';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { BehaviorSubject } from 'rxjs';
import { FudisDropdownMenuItem } from '../../../types/miscellaneous';
import { DropdownItemBaseDirective } from '../../../directives/form/dropdown-item-base/dropdown-item-base.directive';
import { DropdownMenuGroupComponent } from '../dropdown-menu-group/dropdown-menu-group.component';

@Component({
  selector: 'fudis-dropdown-menu-item',
  templateUrl: './dropdown-menu-item.component.html',
  styleUrls: ['./dropdown-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuItemComponent extends DropdownItemBaseDirective {
  constructor(
    private _idService: FudisIdService,
    private _translationService: FudisTranslationService,
    @Inject(DOCUMENT) _document: Document,
    @Host() protected _parentDropdownMenu: DropdownMenuComponent,
    @Host() @Optional() protected _parentGroup: DropdownMenuGroupComponent,
  ) {
    super(_document);

    this._id = this._idService.getNewSelectOptionId(
      'dropdown-menu',
      this._parentDropdownMenu.id,
      this._parentGroup?.id,
    );

    effect(() => {
      const translations = _translationService.getTranslations()();

      this.translationItemDisabledText.next(translations.DROPDOWNMENU.ITEM.DISABLED);
    });
  }

  /**
   * Template reference for dropdown item button element
   */
  @ViewChild('dropdownItem') dropdownItem: ElementRef<HTMLButtonElement>;

  /**
   * Dropdown Menu Item data
   */
  @Input({ required: true }) data: FudisDropdownMenuItem<object>;

  /**
   * Item selection ouput event
   */
  @Output() selectionUpdate: EventEmitter<FudisDropdownMenuItem<object> | null> =
    new EventEmitter<FudisDropdownMenuItem<object> | null>();

  /**
   * Internal translated text for disabled dropdown menu item
   */
  public translationItemDisabledText = new BehaviorSubject<string>('');

  /**
   * Handle key down event
   */
  protected _handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      if (this.data.disabled) {
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
    this._parentDropdownMenu.setFocusedOption(this._id, 'remove', event);
  }

  /**
   * Handle focus
   */
  protected _handleMenuItemFocus(): void {
    this._parentDropdownMenu.setFocusedOption(this._id, 'add');
  }

  /**
   * Click handler for Dropdown Menu Item click
   */
  protected _clickOption(event: Event): void {
    if (!this.data.disabled) {
      const selectedOption: FudisDropdownMenuItem<object> = {
        ...this.data,
        fudisGeneratedHtmlId: this._id,
      };

      this.selectionUpdate.emit(selectedOption);
      this.handleClick.emit(event);

      this._executeAction(selectedOption);

      this._parentDropdownMenu.closeDropdownMenu();
    }
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
