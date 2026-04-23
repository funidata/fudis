import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  DOCUMENT,
  ChangeDetectionStrategy,
  Signal,
  computed,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { GuidanceComponent } from '../guidance/guidance.component';
import { FieldSetComponent } from '../fieldset/fieldset.component';
import { FieldsetContentDirective } from '../fieldset/fieldset-content.directive';
import { AsyncPipe } from '@angular/common';

/**
 * Groups multiple related checkbox options.
 *
 * Use this component when user can select value(s) from a set. Each `fudis-checkbox-group-option`
 * child must have a `[controlName]` matching a key in the FormGroup. Use `FudisGroupValidators` for
 * group-level validation (e.g., `oneRequired`, `min`, `max`).
 *
 * @example
 *   ```html
 *   <fudis-checkbox-group [label]="'Colors'" [formGroup]="colorsGroup">
 *     <fudis-checkbox-group-option [controlName]="'red'" [label]="'Red'"></fudis-checkbox-group-option>
 *     <fudis-checkbox-group-option [controlName]="'blue'" [label]="'Blue'"></fudis-checkbox-group-option>
 *   </fudis-checkbox-group>
 *   ```;
 */
@Component({
  selector: 'fudis-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  imports: [
    FieldSetComponent,
    FieldsetContentDirective,
    GuidanceComponent,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupComponent<T extends FudisCheckboxGroupFormGroup<T>>
  extends GroupComponentBaseDirective
  implements OnInit, AfterViewInit
{
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    _idService: FudisIdService,
    _focusService: FudisFocusService,
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
   * FormGroup for Checkbox Group. Provide also `controlName` for each Checkbox child.
   */
  @Input({ required: true }) override formGroup: FormGroup<T>;

  /**
   * Width of Checkbox Group: 'sm' | 'md' | 'lg' | 'full-width'
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
  private _groupBlurredOut: WritableSignal<boolean> = signal(false);
  public readonly groupBlurredOut = this._groupBlurredOut.asReadonly();

  /**
   * Private signals for managing the touched, invalid, and disabled state of the form group.
   */
  private _touchedState = signal(false);
  private _invalidState = signal(false);
  private _disabledState = signal(false);

  /**
   * Publicly exposed readonly signals reflecting the current state of the form group. Used by child
   * checkbox options to track group state reactively without requiring markForCheck().
   */
  public readonly touchedState: Signal<boolean> = this._touchedState.asReadonly();
  public readonly invalidState: Signal<boolean> = this._invalidState.asReadonly();
  public readonly disabledState: Signal<boolean> = this._disabledState.asReadonly();

  /**
   * Computed signal that combines touched, invalid, and blurred-out state to determine if group
   * errors should be shown.
   */
  public readonly groupErrors = computed(
    () => this._touchedState() && this._invalidState() && this._groupBlurredOut(),
  );

  /**
   * Copy FormGroup states into local signals so child checkbox options can track group state
   * reactively without requiring markForCheck().
   */
  private _syncFormGroupState(): void {
    this._touchedState.set(this.formGroup.touched);
    this._invalidState.set(this.formGroup.invalid);
    this._disabledState.set(this.formGroup.disabled);
  }

  private _applyGroupMarkAsTouched(): void {
    if (this.formGroup.touched) {
      this._groupBlurredOut.set(true);
    } else {
      /**
       * Extend original markAllAsTouched function to change _groupBlurredOut value to 'true', so
       * error messages are loaded when e.g. on Submit touched value is changed programatically.
       */
      const originalMarkAllAsTouched = this.formGroup.markAllAsTouched;
      this.formGroup.markAllAsTouched = () => {
        originalMarkAllAsTouched.apply(this.formGroup);
        this._syncFormGroupState();
        this._groupBlurredOut.set(true);
      };
    }
  }

  ngOnInit(): void {
    this._setParentComponentId('checkbox-group');
    this._syncFormGroupState();
    this._required.next(FudisValidatorUtilities.oneRequiredOrMin(this.formGroup));

    this.formGroup.events.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this._syncFormGroupState();
      this._updateValueAndValidityTrigger.next();
    });
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
    this._groupBlurredOut.set(value);
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
