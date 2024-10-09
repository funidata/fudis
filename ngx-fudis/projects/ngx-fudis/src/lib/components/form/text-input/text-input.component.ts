import { Component, Input, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisInputSize, FudisInputType } from '../../../types/forms';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import {
  getMaxFromValidator,
  getMaxLengthFromValidator,
  getMinFromValidator,
  getMinLengthFromValidator,
  hasRequiredValidator,
} from '../../../utilities/form/getValidators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisComponentChanges } from '../../../types/miscellaneous';
import { BehaviorSubject } from 'rxjs';
import { ControlComponentBaseDirective } from '../../../directives/form/control-component-base/control-component-base.directive';

@Component({
  selector: 'fudis-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent extends ControlComponentBaseDirective implements OnInit, OnChanges {
  constructor(
    _focusService: FudisFocusService,
    _changeDetectorRef: ChangeDetectorRef,
    _idService: FudisIdService,
  ) {
    super(_idService, _focusService);
    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.control) {
        this._required.next(hasRequiredValidator(this.control));

        if (this.type === 'number') {
          this._maxLength.next(null);
          this._minLength.next(null);
          this._minNumber.next(getMinFromValidator(this.control));
          this._maxNumber.next(getMaxFromValidator(this.control));
        } else {
          this._maxLength.next(getMaxLengthFromValidator(this.control));
          this._minLength.next(getMinLengthFromValidator(this.control));
          this._minNumber.next(null);
          this._maxNumber.next(null);
        }
      }
    });
  }

  /**
   * FormControl for text-input
   */
  @Input({ required: true }) override control: FormControl<string | null | number>;

  /**
   * Available sizes for the input. Recommended size for number input is 'sm'.
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * Type of the input - defaults to 'text'
   */
  @Input() type: FudisInputType = 'text';

  /**
   * Max length for HTML attribute and for character indicator in guidance
   */
  protected _maxLength = new BehaviorSubject<number | null>(null);

  /**
   * Min length for HTML attribute
   */
  protected _minLength = new BehaviorSubject<number | null>(null);

  /**
   * Max number for number input HTML attribute
   */
  protected _maxNumber = new BehaviorSubject<number | null>(null);

  /**
   * Min number for number input HTML attribute
   */
  protected _minNumber = new BehaviorSubject<number | null>(null);

  ngOnInit(): void {
    this._setComponentId('text-input');
    this._updateValueAndValidityTrigger.next();

    /**
     * TODO: write test
     */
    this.control.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((value) => {
      if (typeof value === 'string' && value.trim() === '') {
        this.control.setValue(null);
      }
    });
  }

  ngOnChanges(changes: FudisComponentChanges<TextInputComponent>): void {
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      this._applyControlUpdateCheck();
    }

    if (changes.type?.currentValue !== changes.type?.previousValue) {
      this._updateValueAndValidityTrigger.next();
    }
  }
}
