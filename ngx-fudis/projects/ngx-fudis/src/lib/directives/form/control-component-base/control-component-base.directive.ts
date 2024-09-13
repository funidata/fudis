import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { FudisIdService } from '../../../services/id/id.service';
import { FormCommonApiDirective } from '../form-common-api/form-common-api.directive';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[fudisControlComponentBase]',
})
export class ControlComponentBaseDirective extends FormCommonApiDirective {
  constructor(_idService: FudisIdService, _cdr: ChangeDetectorRef) {
    super(_idService, _cdr);
  }

  /**
   * FormControl for the input
   */
  @Input({ required: true }) control: FormControl;

  /**
   * Handle blur event
   */
  public onBlur(event: FocusEvent): void {
    this.handleBlur.emit(event);
  }

  /**
   * Update value and validity of control
   */
  protected _applyControlUpdateCheck(): void {
    const original = this.control.updateValueAndValidity;

    this.control.updateValueAndValidity = () => {
      original.apply(this.control);
      this._updateValueAndValidityTrigger.next();
    };
  }
}
