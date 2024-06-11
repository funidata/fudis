import {
  OnInit,
  Component,
  ElementRef,
  Host,
  ViewChild,
  Input,
  Optional,
  Inject,
  ChangeDetectionStrategy,
  effect,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DropdownMenuComponent } from '../dropdown-menu.component';
import { FudisIdService } from '../../../services/id/id.service';
import { DropdownItemBaseDirective } from '../../../directives/form/dropdown-item-base/dropdown-item-base.directive';
import { ButtonComponent } from '../../button/button.component';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'fudis-dropdown-menu-item',
  templateUrl: './dropdown-menu-item.component.html',
  styleUrls: ['./dropdown-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuItemComponent extends DropdownItemBaseDirective implements OnInit {
  constructor(
    private _idService: FudisIdService,
    private _translationService: FudisTranslationService,
    @Host() protected _parentComponent: DropdownMenuComponent,
    @Inject(DOCUMENT) _document: Document,
    @Host() @Optional() protected _parentButton: ButtonComponent,
  ) {
    super(_document);

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
   * Visible label for dropdown item
   */
  @Input({ required: true }) label: string;

  /**
   * Option for disabling dropdown item
   */
  @Input() disabled: boolean = false;

  /**
   * Internal translated text for disabled dropdown menu item
   */
  public translationItemDisabledText = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this._id = this._idService.getNewChildId('dropdown-menu', this._parentComponent.id);
  }

  /**
   * Handle key down event
   */
  protected _handleKeyDown(event: KeyboardEvent) {
    this._baseHandleKeyDown(event, this.dropdownItem, '.fudis-dropdown-menu-item__focusable');
  }

  /**
   * Handle blur event
   */
  protected _handleButtonBlur(event: FocusEvent): void {
    const closeDropdown = this._focusedOutFromComponent(
      event,
      this.dropdownItem,
      'fudis-dropdown-menu-item__focusable',
    );

    if (closeDropdown) {
      this._parentComponent.open = false;
    }
  }

  /**
   * Handle and emit event when closing the parent Dropdown Menu. Dropdown Menu should always close when dropdown item is clicked.
   */
  protected _closeDropdown(event: Event): void {
    if (this._parentButton) {
      this._parentButton.closeMenu();
    }

    this.handleClick.emit(event);
  }
}
