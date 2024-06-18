import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Host,
  HostListener,
  OnChanges,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { FudisIdService } from '../../services/id/id.service';
import { DropdownBaseDirective } from '../../directives/form/dropdown-base/dropdown-base.directive';
import { ButtonComponent } from '../button/button.component';
import { ContentDirective } from '../../directives/content-projection/content/content.directive';
import { SelectDropdownComponent } from '../form/select/common/select-dropdown/select-dropdown.component';
import { BehaviorSubject } from 'rxjs';
import { FudisComponentChanges } from '../../types/miscellaneous';

@Component({
  selector: 'fudis-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuComponent
  extends DropdownBaseDirective
  implements OnInit, OnChanges, AfterContentInit
{
  constructor(
    private _idService: FudisIdService,
    @Host() @Optional() private _parentButton: ButtonComponent,
  ) {
    super();
  }

  /**
   * Template reference for Dropdown Menu's content
   */
  @ContentChild(ContentDirective) protected _content: ContentDirective;

  /**
   * Template reference for the Dropdown Menu wrapper element
   */
  @ViewChild(SelectDropdownComponent) dropdownMenuElement: SelectDropdownComponent;

  /**
   * Getter for dropdown open status
   */
  get dropdownOpen() {
    return this._parentButton.dropdownOpen;
  }

  /**
   * CSS classlist for Dropdown Menu
   */
  protected _classList = new BehaviorSubject<string[]>([]);

  /**
   * Host Listener for dropdown's width, it needs to be wider than its Button parent
   */
  @HostListener('window:click', ['$event'])
  private _getMaxWidth(): void {
    const elementInViewWidth =
      this.dropdownMenuElement?.dropdownElement?.nativeElement?.getBoundingClientRect()?.width;

    const elementInViewX =
      this.dropdownMenuElement?.dropdownElement?.nativeElement?.getBoundingClientRect()?.x;

    if (elementInViewX && elementInViewWidth && elementInViewWidth !== 0 && this.align === 'left') {
      this.maxWidth = `${elementInViewWidth + elementInViewX}px`;
    } else if (window?.innerWidth && elementInViewX) {
      this.maxWidth = `${window.innerWidth - elementInViewX}px`;
    } else {
      this.maxWidth = 'initial';
    }
  }

  /**
   * Host Listener for keydown events, especially Arrow Down and Escape from Menu Button
   */
  @HostListener('window:keydown', ['$event'])
  private _handleDropdownMenuButtonKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();

      const firstChildElement = this.dropdownMenuElement.dropdownElement.nativeElement.children[0];

      // If focus is on the menu button, only then listen keydown and focus on the first child
      if (
        firstChildElement.closest('fudis-button')?.querySelector('.fudis-button') ===
        document.activeElement
      ) {
        const firstChildButtonElement = firstChildElement.querySelector('button');
        firstChildButtonElement?.focus();
      }
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this._parentButton.closeMenu();
    }
  }

  ngOnInit(): void {
    this._classList.next(this._getClasses());

    if (this.parentId) {
      this.id = this.parentId + '-dropdown';
      this._idService.addNewParentId('dropdown-menu', this.id);
    } else {
      this.id = this._idService.getNewParentId('dropdown-menu');

      if (this._parentButton) {
        this._parentButton.dropdownMenuId = this.id;
      }
    }
  }

  ngOnChanges(changes: FudisComponentChanges<DropdownMenuComponent>): void {
    if (
      changes.align?.currentValue !== changes.align?.previousValue ||
      changes.size?.currentValue !== changes.size?.previousValue
    ) {
      this._classList.next(this._getClasses());
    }
  }

  ngAfterContentInit(): void {
    this._getMaxWidth();
  }

  /**
   * Get CSS classes with correct align and size suffixes
   */
  private _getClasses(): string[] {
    const cssClasses = [
      'fudis-dropdown-menu',
      `fudis-dropdown-menu__${this.align}`,
      `fudis-dropdown-menu__${this.size}`,
    ];

    return cssClasses;
  }
}
