import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FudisCheckboxGroupFormGroup, FudisInputSize } from '../../../types/forms';

import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { hasAtLeastOneRequiredOrMinValidator } from '../../../utilities/form/getValidators';

@Component({
  selector: 'fudis-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
})
export class CheckboxGroupComponent extends FieldSetBaseDirective implements OnInit, OnChanges {
  /**
   * FormControl for Checkbox group.
   */
  @Input({ required: true }) formGroup: FormGroup<FudisCheckboxGroupFormGroup>;

  /**
   * Width size of the group.
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * To determine if focus has been moved out from the whole checkbox group, so possible errors will not show before that.
   */
  private _groupBlurredOut = false;

  /**
   * Set requiredText based on this boolean value.
   */
  protected _required: boolean = false;

  /**
   * Getter for _groupBlurredOut.
   */
  get groupBlurredOut(): boolean {
    return this._groupBlurredOut;
  }

  public ngOnInit() {
    this._setParentId('checkbox-group');

    if (this.formGroup.touched) {
      this._groupBlurredOut = true;
    } else {
      /**
       * Extend original markAllAsTouched function to change _groupBlurredOut value to 'true', so error messages are loaded when e.g. on Submit touched value is changed programatically.
       */
      const originalMarkAllAsTouched = this.formGroup.markAllAsTouched;
      this.formGroup.markAllAsTouched = () => {
        originalMarkAllAsTouched.apply(this.formGroup);
        this._groupBlurredOut = true;
      };
    }
  }

  public ngOnChanges(): void {
    this._required = hasAtLeastOneRequiredOrMinValidator(this.formGroup);
  }

  /**
   * Used to display possible error messages only when focus has moved out from all the group's checkboxes.
   */
  public setGroupBlurredOut(value: boolean): void {
    if (value) {
      this._groupBlurredOut = true;
    } else {
      this._groupBlurredOut = false;
    }
  }
}
