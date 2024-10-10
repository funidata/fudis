import { Directive, Input } from '@angular/core';
import { ControlComponentBaseDirective } from '../control-component-base/control-component-base.directive';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { FudisIdService } from '../../../services/id/id.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FudisInputSize } from '../../../types/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[fudisTextFieldComponentBase]',
})
export class TextFieldComponentBaseDirective extends ControlComponentBaseDirective {
  constructor(_idService: FudisIdService, _focusService: FudisFocusService) {
    super(_idService, _focusService);
  }

  /**
   * Available sizes for the input. Recommended size for number input is 'sm'.
   */
  @Input() size: FudisInputSize = 'lg';

  /**
   * If user clears the input field, set FormControl value to null instead of empty string
   */
  @Input() nullControlOnEmptyString: boolean = true;

  /**
   * Max length for HTML attribute and for character indicator in guidance
   */
  protected _maxLength = new BehaviorSubject<number | null>(null);

  /**
   * Min length for HTML attribute
   */
  protected _minLength = new BehaviorSubject<number | null>(null);

  protected _subscription: Subscription;

  protected _setControlValueSubscription(): void {
    if (this.nullControlOnEmptyString) {
      if (!this._subscription) {
        this._subscription = this.control.valueChanges
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe((value) => {
            if (typeof value === 'string' && value.trim() === '') {
              this.control.setValue(null);
            }
          });
      }
    } else {
      this._subscription?.unsubscribe();
    }
  }
}
