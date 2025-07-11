import { Directive, ElementRef, Host, Inject, Input, Optional, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DropdownItemBaseDirective } from '../../../../../directives/form/dropdown-item-base/dropdown-item-base.directive';
import { SelectComponent } from '../../select/select.component';
import { SelectGroupComponent } from '../select-group/select-group.component';
import { FudisSelectOption } from '../../../../../types/forms';
import { MultiselectComponent } from '../../multiselect/multiselect.component';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { FudisIdService } from '../../../../../services/id/id.service';

@Directive({
  selector: '[fudisSelectOptionBase]',
  standalone: false,
})
export class SelectOptionBaseDirective extends DropdownItemBaseDirective {
  constructor(
    @Inject(DOCUMENT) _document: Document,
    @Host() @Optional() protected _parentGroup: SelectGroupComponent,
    protected _translationService: FudisTranslationService,
    protected _idService: FudisIdService,
  ) {
    super(_document);
  }

  /**
   * Reference of input or option element
   */
  @ViewChild('optionInputRef') protected _optionInputRef: ElementRef<
    HTMLOptionElement | HTMLInputElement
  >;

  /**
   * Select option data
   */
  @Input({ required: true }) data: FudisSelectOption<object>;

  /**
   * Id generation helper, e.g. when application has multiple select options with the same label
   * (not recommended)
   */
  @Input() labelKey: string;

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
   * Get visibility status of this option
   */
  public get visible(): boolean {
    return this._optionVisible;
  }

  /**
   * User focus handler
   */
  protected _focus(): void {
    this._focused = true;
    this._parent.setFocusedOption(this._id, 'add');
  }

  /**
   * For autocompletes, compare if current filter text is contained in this option's label. If not,
   * hide the option from the dropdown list.
   *
   * @param filterText Autocomplete filter text from parent
   */
  protected _isOptionVisible(filterText: string): void {
    if (this.data) {
      const labelMatch =
        filterText && this.data.label.toLowerCase().includes(filterText.toLowerCase())
          ? true
          : !filterText;

      const subLabelMatch =
        filterText && this.data.subLabel?.toLowerCase().includes(filterText.toLowerCase())
          ? true
          : !filterText;

      this._optionVisible = labelMatch || subLabelMatch;

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
   *
   * @param event Keyboard event
   */
  protected _keyDown(event: KeyboardEvent) {
    event.preventDefault();
    if ((event.key === 'Enter' || event.key === ' ') && !this.data.disabled) {
      this._clickOption(event);
    } else if (event.key === 'Tab') {
      this._parent.focusToInput();
      this._parent.closeDropdown();
    } else if (event.key !== ' ') {
      this._baseHandleKeyDown(event, this._optionInputRef, this._parent.focusSelector);
    }
  }

  /**
   * Handler for blurring out from focused option
   *
   * @param event FocusEvent to emit
   */
  protected _blur(event: FocusEvent): void {
    this._focused = false;
    this._parent.setFocusedOption(this._id, 'remove');
    this.handleBlur.emit(event);

    this._parent.componentFocused(event).then((value) => {
      if (!value) {
        this._parent.closeDropdown(false);
      }
    });
  }

  /**
   * Boilerplate function to be overriden by SelectOption's and MultiselectOption's own
   * implementations
   */
  // eslint-disable-next-line
  protected _checkVisibilityFromFilterText(filterText: string): void {}

  /**
   * Boilerplate function to be overriden by SelectOption's and MultiselectOption's own
   * implementations
   */
  // eslint-disable-next-line
  protected _clickOption(event: Event): void {}
}
