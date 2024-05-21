import { Component, Host, Inject, OnInit, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FudisSelectOption } from '../../../../../types/forms';
import { FudisIdService } from '../../../../../services/id/id.service';
import { SelectGroupComponent } from '../../common/select-group/select-group.component';
import { MultiselectComponent } from '../multiselect.component';
import { SelectOptionBaseDirective } from '../../common/select-option-base/select-option-base.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fudis-multiselect-option',
  templateUrl: './multiselect-option.component.html',
  styleUrls: ['./multiselect-option.component.scss'],
})
export class MultiselectOptionComponent extends SelectOptionBaseDirective implements OnInit {
  constructor(
    private _idService: FudisIdService,
    @Inject(DOCUMENT) _document: Document,
    @Host() protected _parentMultiselect: MultiselectComponent,
    @Host() @Optional() _parentGroup: SelectGroupComponent,
  ) {
    super(_document, _parentGroup);

    this._parent = this._parentMultiselect;

    this._id = this._idService.getNewSelectOptionId(
      'multiselect',
      this._parent.id,
      this._parentGroup?.id,
    );

    _parentMultiselect.control.valueChanges.pipe(takeUntilDestroyed()).subscribe((newValue) => {
      this._isOptionChecked(newValue);
    });
  }

  /**
   * On init check if option is visible or checked
   */
  ngOnInit(): void {
    // if (this._parent.variant !== 'dropdown') {
    //   this._isOptionVisible(this._parent.getAutocompleteFilterText()());
    // } else {
    //   this._updateVisibilityToParents(true);
    // }

    const parentControlValue = this._parentMultiselect.control.value;

    if (parentControlValue && parentControlValue.length !== 0) {
      this._isOptionChecked(parentControlValue);
    } else {
      this.checked = false;
    }
  }

  /**
   * Click handler for clicking the option
   * @param event Event
   */
  protected override _clickOption(event: Event): void {
    if (!this.data.disabled) {
      if (!this.checked) {
        this._parentMultiselect.handleMultiSelectionChange(this.data, 'add');
      } else {
        this._parentMultiselect.handleMultiSelectionChange(this.data, 'remove');
      }

      this.handleClick.emit(event);
      this.handleChecked.emit();
    }
  }

  /**
   * Checks if this option is checked or not and updates parents state accordingly
   * @param options currently selected options
   */
  private _isOptionChecked(options: FudisSelectOption<object>[] | null): void {
    if (this.data) {
      const result = options?.find((option) => option.value === this.data.value);

      if (this.checked !== !!result) {
        this._parentMultiselect.handleCheckedSort(
          { ...this.data, fudisGeneratedHtmlId: this._id },
          result ? 'add' : 'remove',
        );
      }

      this.checked = !!result;
    }
  }
}
