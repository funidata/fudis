import { Component, Host, Inject, Optional, OnDestroy, OnChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FudisSelectOption } from '../../../../../types/forms';
import { FudisIdService } from '../../../../../services/id/id.service';
import { SelectGroupComponent } from '../../common/select-group/select-group.component';
import { MultiselectComponent } from '../multiselect.component';
import { SelectOptionBaseDirective } from '../../common/select-option-base/select-option-base.directive';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { FudisComponentChanges } from '../../../../../types/miscellaneous';

@Component({
  selector: 'fudis-multiselect-option',
  templateUrl: './multiselect-option.component.html',
  styleUrls: ['./multiselect-option.component.scss'],
})
export class MultiselectOptionComponent
  extends SelectOptionBaseDirective
  implements OnDestroy, OnChanges
{
  constructor(
    @Inject(DOCUMENT) _document: Document,
    @Host() protected _parentMultiselect: MultiselectComponent,
    @Host() @Optional() _parentGroup: SelectGroupComponent,
    _idService: FudisIdService,
    _translationService: FudisTranslationService,
  ) {
    super(_document, _parentGroup, _translationService, _idService);

    this._parent = this._parentMultiselect;

    this._componentVariant = 'multiselect';

    _parentMultiselect.control.valueChanges.pipe(takeUntilDestroyed()).subscribe((newValue) => {
      this._isOptionChecked(newValue);
    });

    toObservable(this._parent.getAutocompleteFilterText())
      .pipe(takeUntilDestroyed())
      .subscribe((filterText) => {
        this._checkVisibilityFromFilterText(filterText);
      });
  }

  /**
   * Common parent and its properties
   */
  protected override _parent: MultiselectComponent;

  ngOnChanges(changes: FudisComponentChanges<MultiselectOptionComponent>) {
    if (changes.data?.currentValue !== changes.data?.previousValue) {
      this._checkVisibilityFromFilterText(this._parent.getAutocompleteFilterText()());

      const parentControlValue = this._parentMultiselect.control.value;

      if (parentControlValue && parentControlValue.length !== 0) {
        this._isOptionChecked(parentControlValue);
      } else {
        this.checked = false;
      }
    }
  }

  ngOnDestroy(): void {
    this._parentMultiselect.setOptionVisibility(this._id, false);
    this._parentGroup?.setOptionVisibility(this._id, false);
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

  protected override _checkVisibilityFromFilterText(filterText: string): void {
    if (this._parent.variant !== 'dropdown' && this._parent.autocompleteFilter) {
      this._isOptionVisible(filterText);
    } else {
      this._isOptionVisible('');
    }
  }

  /**
   * Checks if this option is checked or not and updates parents state accordingly
   * @param options currently selected options
   */
  private _isOptionChecked(options: FudisSelectOption<object>[] | null): void {
    if (this.data) {
      const result = options?.find((option) => option.value === this.data.value);

      // if (this.checked !== !!result) {
      //   this._parentMultiselect.handleCheckedSort(
      //     { ...this.data, fudisGeneratedHtmlId: this._id },
      //     result ? 'add' : 'remove',
      //   );
      // }

      this.checked = !!result;
    }
  }
}
