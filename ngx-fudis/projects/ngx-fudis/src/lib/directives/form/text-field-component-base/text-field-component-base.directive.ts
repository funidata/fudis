import { Directive, Input } from '@angular/core';
import { ControlComponentBaseDirective } from '../control-component-base/control-component-base.directive';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { FudisIdService } from '../../../services/id/id.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FudisInputSize } from '../../../types/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[fudisTextFieldComponentBase]',
  standalone: false,
})
export class TextFieldComponentBaseDirective extends ControlComponentBaseDirective {
  constructor(_idService: FudisIdService, _focusService: FudisFocusService) {
    super(_idService, _focusService);
  }

  /**
   * Label for the Text Field
   */
  @Input({ required: true }) override label: string;

  /**
   * Width of the input field.
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * If user clears the input field, set FormControl value to null instead of empty string.
   */
  @Input() nullControlOnEmptyString: boolean = true;

  /**
   * Max length for HTML attribute and for character indicator in guidance.
   */
  protected _maxLength = new BehaviorSubject<number | null>(null);

  /**
   * Min length for HTML attribute.
   */
  protected _minLength = new BehaviorSubject<number | null>(null);

  /**
   * Subscription to listen to control's value changes
   */
  protected _baseSubscription: Subscription;

  /**
   * Depending on input prop 'nullControlOnEmptyString' either subscribe or unsubscribe to control's
   * value changes
   */
  protected _setControlValueSubscription(): void {
    if (this.nullControlOnEmptyString) {
      this._baseSubscription?.unsubscribe();
      this._baseSubscription = this.control.valueChanges
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((value) => {
          if (typeof value === 'string' && value.trim() === '') {
            this.control.setValue(null);
          }
        });
    }
  }
}
