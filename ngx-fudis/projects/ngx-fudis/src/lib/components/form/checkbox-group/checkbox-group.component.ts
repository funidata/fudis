import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FudisCheckboxGroupChangeEvent,
  FudisCheckboxGroupFormGroup,
  FudisInputSize,
} from '../../../types/forms';
import { FudisValidatorUtilities } from '../../../utilities/form/validator-utilities';
import { FudisIdService } from '../../../services/id/id.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GroupComponentBaseDirective } from '../../../directives/form/group-component-base/group-component-base.directive';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { DOCUMENT } from '@angular/common';
import { GuidanceComponent } from '../guidance/guidance.component';

@Component({
  selector: 'fudis-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  standalone: false,
})
export class CheckboxGroupComponent<T extends FudisCheckboxGroupFormGroup<T>>
  extends GroupComponentBaseDirective
  implements OnInit, AfterViewInit
{
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    _idService: FudisIdService,
    _focusService: FudisFocusService
  ) {
    super(_idService, _focusService);

    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.formGroup) {
        this._required.next(FudisValidatorUtilities.oneRequiredOrMin(this.formGroup));
      }
    });
  }

  @ViewChild('checkboxGroupGuidance') private _guidance: GuidanceComponent;

  /**
   * FormGroup for Checkbox group. If provided, provide also `controlName` for each Checkbox
   * children.
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
   * To determine if focus has been moved out from the whole checkbox group, so possible errors will
   * not show before that.
   */
  private _groupBlurredOut = false;

  /**
   * Boolean to sync parent Checkbox Group and child Checkboxes if component uses internally created
   * FormGroup or one provided from the App.
   */
  protected _internalFormGroup: boolean = false;

  private _applyGroupMarkAsTouched(): void {
    if (this.formGroup.touched) {
      this._groupBlurredOut = true;
    } else {
      /**
       * Extend original markAllAsTouched function to change _groupBlurredOut value to 'true', so
       * error messages are loaded when e.g. on Submit touched value is changed programatically.
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
     * If there's no FormGroup provided when component is initialised, create one internally.
     */
    if (!this.formGroup) {
      this._internalFormGroup = true;

      this.formGroup = new FormGroup({}) as FormGroup;
    } else {
      /**
       * Validation check can be currently be done only for App provided formGroup
       */
      this._required.next(FudisValidatorUtilities.oneRequiredOrMin(this.formGroup));
    }

    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this._updateValueAndValidityTrigger.next());
    this._applyGroupMarkAsTouched();
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();

    /**
     * For Screen reader users bind guidance text to first checkbox child input
     */
    const checkboxIds = this._idService.getAllChildrenIds('checkbox-group', this.id);
    const firstCheckbox = this._getFirstEnabledCheckbox(checkboxIds);
    const guidanceId = this._guidance?.['_id'];

    if (firstCheckbox && guidanceId) {
      firstCheckbox.setAttribute('aria-describedby', guidanceId);
    }
  }

  /**
   * Return first checkbox child input when it is not disabled
   */
  private _getFirstEnabledCheckbox(ids: string[]): HTMLInputElement | null {
  for (const id of ids) {
    const checkbox = this._document.getElementById(id);
    if (checkbox instanceof HTMLInputElement && !checkbox.disabled) {
      return checkbox;
    }
  }

  return null;
  }

  /**
   * Used to display possible error messages only when focus has moved out from all the group's
   * checkboxes.
   */
  public setGroupBlurredOut(value: boolean): void {
    if (value) {
      this._groupBlurredOut = true;
    } else {
      this._groupBlurredOut = false;
    }
  }

  /**
   * When child Checkbox component is clicked, it calls this parent's function, which will then
   * trigger Output emit.
   *
   * @param changedControlName Name of the clicked control
   */
  public triggerEmit(changedControlName: string): void {
    this.handleChange.emit({
      changedControlName: changedControlName,
      formGroup: this.formGroup,
    });
  }
}
