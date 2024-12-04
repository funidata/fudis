import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FudisCheckboxGroupChangeEvent,
  FudisCheckboxGroupFormGroup,
  FudisInputSize,
} from '../../../types/forms';
import { hasOneRequiredOrMinValidator } from '../../../utilities/form/getValidators';
import { FudisIdService } from '../../../services/id/id.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GroupComponentBaseDirective } from '../../../directives/form/group-component-base/group-component-base.directive';
import { FudisFocusService } from '../../../services/focus/focus.service';

@Component({
  selector: 'fudis-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
})
export class CheckboxGroupComponent<T extends FudisCheckboxGroupFormGroup>
  extends GroupComponentBaseDirective
  implements OnInit
{
  constructor(_idService: FudisIdService, _focusService: FudisFocusService) {
    super(_idService, _focusService);

    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.formGroup) {
        this._required.next(hasOneRequiredOrMinValidator(this.formGroup));
      }
    });
  }
  /**
   * FormGroup for Checkbox group. If provided, provide also `controlName` for each Checkbox children.
   */
  @Input() override formGroup: FormGroup<T>;

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
   * Boolean to sync parent Checkbox Group and child Checkboxes if component uses internally created FormGroup or one provided from the App.
   */
  protected _internalFormGroup: boolean = false;

  private _applyGroupMarkAsTouched(): void {
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
    this._setParentComponentId('checkbox-group');

    /**
     * If there's no formGroup provided when component is initialised, create one internally.
     */
    if (!this.formGroup) {
      this._internalFormGroup = true;
      this.formGroup = new FormGroup({}) as FormGroup;
    } else {
      /**
       * Validation check can be currently be done only for App provided formGroup
       */
      this._required.next(hasOneRequiredOrMinValidator(this.formGroup));
    }

    this._applyGroupMarkAsTouched();

    this._applyGroupUpdateCheck();
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
      formGroup: this.formGroup as FormGroup,
    });
  }
}
