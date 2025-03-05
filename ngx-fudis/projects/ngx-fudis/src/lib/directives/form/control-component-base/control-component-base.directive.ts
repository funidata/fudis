import { Directive, Input } from '@angular/core';
import { FudisIdService } from '../../../services/id/id.service';
import { FormCommonApiDirective } from '../form-common-api/form-common-api.directive';
import { FormControl } from '@angular/forms';
import { FudisFocusService } from '../../../services/focus/focus.service';

@Directive({
    selector: '[fudisControlComponentBase]',
    standalone: false
})
export class ControlComponentBaseDirective extends FormCommonApiDirective {
  constructor(_idService: FudisIdService, _focusService: FudisFocusService) {
    super(_idService, _focusService);
  }

  /**
   * FormControl for the input
   */
  @Input({ required: true }) control: FormControl;
}
