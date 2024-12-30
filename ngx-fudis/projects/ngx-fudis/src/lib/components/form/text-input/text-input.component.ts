import { Component, Input, OnInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisInputType } from '../../../types/forms';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { FudisValidatorUtilities } from '../../../utilities/form/validator-utilities';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisComponentChanges } from '../../../types/miscellaneous';
import { TextFieldComponentBaseDirective } from '../../../directives/form/text-field-component-base/text-field-component-base.directive';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'fudis-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent
  extends TextFieldComponentBaseDirective
  implements OnInit, OnChanges
{
  constructor(_focusService: FudisFocusService, _idService: FudisIdService) {
    super(_idService, _focusService);
    this._updateValueAndValidityTrigger.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.control) {
        this._required.next(FudisValidatorUtilities.required(this.control));

        if (this.type === 'number') {
          this._maxLength.next(null);
          this._minLength.next(null);
          this._minNumber.next(FudisValidatorUtilities.min(this.control));
          this._maxNumber.next(FudisValidatorUtilities.max(this.control));
        } else {
          this._maxLength.next(FudisValidatorUtilities.maxLength(this.control));
          this._minLength.next(FudisValidatorUtilities.minLength(this.control));
          this._minNumber.next(null);
          this._maxNumber.next(null);
        }
      }
    });
  }

  /**
   * FormControl binded to the HTML input element
   */
  @Input({ required: true }) override control: FormControl<string | null | number>;

  /**
   * Type of the input - defaults to 'text'
   */
  @Input() type: FudisInputType = 'text';

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
    this._setControlValueSubscription();
  }

  ngOnChanges(changes: FudisComponentChanges<TextInputComponent>): void {
    if (changes.control?.currentValue !== changes.control?.previousValue) {
      this._applyControlUpdateCheck();
    }

    if (changes.type?.currentValue !== changes.type?.previousValue) {
      this._updateValueAndValidityTrigger.next();
    }

    if (changes.nullControlOnEmptyString?.currentValue !== changes.control?.previousValue) {
      this._setControlValueSubscription();
    }
  }
}
