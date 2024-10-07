import { Directive, Input } from '@angular/core';
import { FudisIdService } from '../../../services/id/id.service';
import { FormCommonApiDirective } from '../form-common-api/form-common-api.directive';
import { FormControl } from '@angular/forms';
import { FudisFocusService } from '../../../services/focus/focus.service';

@Directive({
  selector: '[fudisControlComponentBase]',
})
export class ControlComponentBaseDirective extends FormCommonApiDirective {
  constructor(_idService: FudisIdService, _focusService: FudisFocusService) {
    super(_idService, _focusService);
  }

  /**
   * FormControl for the input
   */
  @Input({ required: true }) control: FormControl;

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
