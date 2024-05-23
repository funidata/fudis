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
      const filterText = this._parent.getAutocompleteFilterText()();

      if (this._parent.variant !== 'dropdown') {
        this._isOptionVisible(filterText);
      }
    });
  }

  /**
   * Reference of input or option element
   */
  @ViewChild('optionInputRef') public optionInputRef: ElementRef<
    HTMLOptionElement | HTMLInputElement
  >;

  /**
   * Select option data
   */
  @Input({ required: true }) data: FudisSelectOption<object>;

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
    this._parent.setFocusedOption(this._id, 'add');
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

      this._updateVisibilityToParents(this._optionVisible);
    }
  }

  /**
   * Update option visibility to parent component
   */
  protected _updateVisibilityToParents(visible: boolean): void {
    this._parent.setOptionVisibility(this._id, visible);

    if (this._parentGroup) {
      this._parentGroup.setOptionVisibility(this._id, visible);
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
    this._parent.setFocusedOption(this._id, 'remove');
    this.handleBlur.emit(event);

    this._parent.componentFocused(event).then((value) => {
      if (!value) {
        this._parent.closeDropdown(false, true);
      }
    });
  }

  /**
   * Boilerplate function to be overriden by SelectOption's and MultiselectOption's own implementations
   */
  // eslint-disable-next-line
  protected _clickOption(event: Event): void {}
}
