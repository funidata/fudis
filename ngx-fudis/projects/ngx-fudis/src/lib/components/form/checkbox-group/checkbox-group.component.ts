import {
  ChangeDetectorRef,
  Component,
  Host,
  Input,
  OnChanges,
  OnInit,
  Optional,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FudisCheckboxGroupFormGroup, FudisInputSize } from '../../../types/forms';

import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { hasAtLeastOneRequiredOrMinValidator } from '../../../utilities/form/getValidators';
import { FormComponent } from '../form/form.component';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisComponentChanges } from '../../../types/miscellaneous';

@Component({
  selector: 'fudis-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
})
export class CheckboxGroupComponent extends FieldSetBaseDirective implements OnInit, OnChanges {
  constructor(
    @Host() @Optional() protected _parentForm: FormComponent | null,
    _idService: FudisIdService,
    _translationService: FudisTranslationService,
    _changeDetectorRef: ChangeDetectorRef,
  ) {
    super(_idService, _translationService, _changeDetectorRef);
  }
  /**
   * FormGroup or FormArray for Checkbox group.
   */
  @Input({ required: true }) formGroup: FormGroup<FudisCheckboxGroupFormGroup<object>>;

  /**
   * FormArray for Checkbox group.
   */
  @Input({ required: true }) formArray: FormArray<FormControl<boolean | null | undefined>>;

  /**
   * Width size of the group.
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * If component is a child of Form component, Form's Error Summary is visible,this component's control has errors and when this component is loaded for the first time, it will by default call Error Summary to reload itself again and mark control as touched. This is because if component is lazy loaded to the DOM after the initial reload errors call was made, errors of this component might not appear on the list. To disable this feature, set this to false.
   */
  @Input() errorSummaryReloadOnInit: boolean = true;

  /**
   * To determine if focus has been moved out from the whole checkbox group, so possible errors will not show before that.
   */
  private _groupBlurredOut = false;

  /**
   * Set requiredText based on this boolean value.
   */
  protected _required: boolean = false;

  private _hasGroup: boolean = false;

  private _hasArray: boolean = false;

  /**
   * Getter for _groupBlurredOut.
   */
  get groupBlurredOut(): boolean {
    return this._groupBlurredOut;
  }

  public ngOnInit() {
    this._hasGroup = this.formGroup && !this.formArray;

    this._hasArray = this.formArray && !this.formGroup;

    this._setParentId('checkbox-group');

    if (this._hasGroup) {
      this._initialCheck(this.formGroup);
    } else if (this._hasArray) {
      this._initialCheck(this.formArray);
    }
  }

  private _initialCheck(groupOrArray: FormGroup | FormArray): void {
    if (groupOrArray.touched) {
      this._groupBlurredOut = true;
    } else {
      /**
       * Extend original markAllAsTouched function to change _groupBlurredOut value to 'true', so error messages are loaded when e.g. on Submit touched value is changed programatically.
       */
      const originalMarkAllAsTouched = groupOrArray.markAllAsTouched;
      groupOrArray.markAllAsTouched = () => {
        originalMarkAllAsTouched.apply(groupOrArray);
        this._groupBlurredOut = true;
      };
    }

    if (this.errorSummaryReloadOnInit) {
      this._reloadErrorSummaryOnLazyLoad(this._parentForm?.errorSummaryVisible, groupOrArray);
    }
  }

  public ngOnChanges(changes: FudisComponentChanges<CheckboxGroupComponent>): void {
    if (changes.formGroup) {
      this._required = hasAtLeastOneRequiredOrMinValidator(this.formGroup);
    } else if (changes.formArray) {
      this._required = hasAtLeastOneRequiredOrMinValidator(this.formArray);
    }
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

  /**
   * Getter for if component has FormGroup, FormArray or neither as its control.
   */
  public getFormType(): 'group' | 'array' {
    if (this._hasGroup) {
      return 'group';
    }

    return 'array';
  }
}
