import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FudisCheckboxGroupChangeEvent,
  FudisCheckboxGroupFormGroup,
  FudisInputSize,
} from '../../../types/forms';

import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { hasAtLeastOneRequiredOrMinValidator } from '../../../utilities/form/getValidators';
import { FormComponent } from '../form/form.component';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fudis-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
})
export class CheckboxGroupComponent extends FieldSetBaseDirective implements OnInit {
  constructor(
    @Host() @Optional() protected _parentForm: FormComponent | null,
    _idService: FudisIdService,
    _translationService: FudisTranslationService,
    _changeDetectorRef: ChangeDetectorRef,
  ) {
    super(_idService, _translationService, _changeDetectorRef);

    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.formGroup) {
        this._required = hasAtLeastOneRequiredOrMinValidator(this.formGroup);
      }
    });
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
   * Emit changed control's name and whole FormGroup when one Checkbox is clicked.
   */
  @Output() handleChange = new EventEmitter<FudisCheckboxGroupChangeEvent>();

  /**
   * To determine if focus has been moved out from the whole checkbox group, so possible errors will not show before that.
   */
  private _groupBlurredOut = false;

  /**
   * Set requiredText based on this boolean value.
   */
  protected _required: boolean = false;

  /**
   * Boolean to sync parent Checkbox Group and child Checkboxes if component uses internally created FormGroup or one provided from the App.
   */
  protected _internalFormGroup: boolean = false;

  /**
   * Getter for _groupBlurredOut boolean.
   */
  get groupBlurredOut(): boolean {
    return this._groupBlurredOut;
  }

  /**
   * Getter for _internalFormGroup boolean
   */
  get internalFormGroup(): boolean {
    return this._internalFormGroup;
  }

  public ngOnInit() {
    this._setParentId('checkbox-group');

    /**
     * If there's no formGroup provided when component is initialised, create one internally.
     */
    if (!this.formGroup) {
      this._internalFormGroup = true;
      this.formGroup = new FormGroup<FudisCheckboxGroupFormGroup<object>>({});
    } else {
      /**
       * Validation check can be currently be done only for App provided formGroup
       */
      this._required = hasAtLeastOneRequiredOrMinValidator(this.formGroup);
    }

    this._initialCheck(this.formGroup);
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

      /**
       * Extend original updateValueAndValidity function to update possible dynamic validator changes
       */
      const original = group.updateValueAndValidity;
      this.formGroup.updateValueAndValidity = () => {
        original.apply(group);
        this._updateValueAndValidityTrigger.next();
      };
    }

    if (this.errorSummaryReloadOnInit) {
      this._reloadErrorSummaryOnLazyLoad(this._parentForm?.errorSummaryVisible, group);
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
   * When child Checkbox component is clicked, it calls this parent's function, which will then trigger Output emit.
   * @param changedControlName name of the clicked control
   */
  public triggerEmit(changedControlName: string): void {
    this.handleChange.emit({
      changedControlName: changedControlName,
      formGroup: this.formGroup,
    });
  }
}
