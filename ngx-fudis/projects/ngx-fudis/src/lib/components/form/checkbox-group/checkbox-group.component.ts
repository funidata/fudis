import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
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
   * FormGroup for Checkbox group. If provided, provide also `controlName` for each Checkbox children.
   */
  @Input() formGroup: FormGroup<FudisCheckboxGroupFormGroup<object>>;

  /**
   * Width size of the group.
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * If component is a child of Form component, Form's Error Summary is visible,this component's control has errors and when this component is loaded for the first time, it will by default call Error Summary to reload itself again and mark control as touched. This is because if component is lazy loaded to the DOM after the initial reload errors call was made, errors of this component might not appear on the list. To disable this feature, set this to false.
   */
  @Input() errorSummaryReloadOnInit: boolean = true;

  /**
   * Emit changed control's name and whole FormGroup when one Checkbox is clicked.
   */
  @Output() handleChange = new EventEmitter<{
    changedControlName: string;
    formGroup: FormGroup<FudisCheckboxGroupFormGroup<object>>;
  }>();

  /**
   * To determine if focus has been moved out from the whole checkbox group, so possible errors will not show before that.
   */
  private _groupBlurredOut = false;

  /**
   * Set requiredText based on this boolean value.
   */
  protected _required: boolean = false;

  protected _internalFormGroup: boolean = false;

  /**
   * Getter for _groupBlurredOut.
   */
  get groupBlurredOut(): boolean {
    return this._groupBlurredOut;
  }

  get internalFormGroup(): boolean {
    return this._internalFormGroup;
  }

  public ngOnInit() {
    this._setParentId('checkbox-group');

    if (!this.formGroup) {
      this._internalFormGroup = true;
      this.formGroup = new FormGroup<FudisCheckboxGroupFormGroup<object>>({});
    }
  }

  private _initialCheck(group: FormGroup): void {
    if (group.touched) {
      this._groupBlurredOut = true;
    } else {
      /**
       * Extend original markAllAsTouched function to change _groupBlurredOut value to 'true', so error messages are loaded when e.g. on Submit touched value is changed programatically.
       */
      const originalMarkAllAsTouched = group.markAllAsTouched;
      group.markAllAsTouched = () => {
        originalMarkAllAsTouched.apply(group);
        this._groupBlurredOut = true;
      };
    }

    if (this.errorSummaryReloadOnInit) {
      this._reloadErrorSummaryOnLazyLoad(this._parentForm?.errorSummaryVisible, group);
    }
  }

  public ngOnChanges(changes: FudisComponentChanges<CheckboxGroupComponent>): void {
    if (changes.formGroup?.currentValue) {
      this._required = hasAtLeastOneRequiredOrMinValidator(this.formGroup);
      this._initialCheck(this.formGroup);
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

  public triggerEmit(changedControl: string): void {
    this.handleChange.emit({
      changedControlName: changedControl,
      formGroup: this.formGroup,
    });
  }
}
