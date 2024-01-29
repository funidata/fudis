import {
  Directive,
  ElementRef,
  Host,
  Inject,
  Input,
  Optional,
  ViewChild,
  effect,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DropdownItemBaseDirective } from '../../../../../directives/form/dropdown-item-base/dropdown-item-base.directive';
import { SelectComponent } from '../../select/select.component';
import { SelectGroupComponent } from '../select-group/select-group.component';
import { FudisSelectOption } from '../../../../../types/forms';
import { MultiselectComponent } from '../../multiselect/multiselect.component';

@Directive({
  selector: '[fudisSelectOptionBase]',
})
export class SelectOptionBaseDirective extends DropdownItemBaseDirective {
  constructor(
    @Inject(DOCUMENT) _document: Document,
    @Host() @Optional() protected _parentGroup: SelectGroupComponent,
  ) {
    super(_document);

    effect(() => {
      if (this._parent.autocomplete) {
        this._isOptionVisible(this._parent.getAutocompleteFilterText()());
      }
    });
  }

  @ViewChild('optionInputRef') optionInputRef: ElementRef<HTMLOptionElement | HTMLInputElement>;

  @Input({ required: true }) data: FudisSelectOption;

  /**
   * State of option visibility
   */
  protected _optionVisible: boolean = true;

  /**
   * Focus state
   */
  protected _focused: boolean = false;

  /**
   * Common parent and its properties for both Select and Multiselect
   */
  protected _parent: SelectComponent | MultiselectComponent;

  /**
   * User focus handler
   */
  protected _focus(): void {
    this._focused = true;
  }

  /**
   * For autocompletes, compare if current filter text is contained in this option's label. If not, hide the option from the dropdown list.
   * @param filterText autocomplete filter text from parent
   */
  protected _isOptionVisible(filterText: string): void {
    if (this.data) {
      this._optionVisible =
        filterText && this.data.label.toLowerCase().includes(filterText.toLowerCase())
          ? true
          : !filterText;

      if (this._optionVisible && this._parent.noResultsFound) {
        this._parent.noResultsFound = false;
      }

      this._updateVisibilityToParents(this._optionVisible);
    }
  }

  protected _updateVisibilityToParents(visible: boolean): void {
    this._parent.setOptionVisibility(this.data.value, visible);

    if (this._parentGroup) {
      this._parentGroup.setOptionVisibility(this.data.value, visible);
    }
  }

  /**
   * Handler for keydown keyboard events
   * @param event Keyboard event
   */
  protected _keyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._clickOption(event);
    } else if (event.key !== ' ') {
      this._baseHandleKeyDown(event, this.optionInputRef, this._parent.focusSelector);
    }
  }

  /**
   * Handler for blurring out from focused option
   * @param event FocusEvent to emit
   */
  protected _blur(event: FocusEvent): void {
    this._focused = false;
    this.handleBlur.emit(event);

    const closeDropdown = this._focusedOutFromComponent(
      event,
      this.optionInputRef,
      this._parent.focusSelector,
      true,
    );

    if (closeDropdown) {
      this._parent.closeDropdown(true, true);
    }
  }

  /**
   * Boilerplate function to be overriden by SelectOption's and MultiselectOption's own implementations
   */
  // eslint-disable-next-line
  protected _clickOption(event: Event): void {}
}
