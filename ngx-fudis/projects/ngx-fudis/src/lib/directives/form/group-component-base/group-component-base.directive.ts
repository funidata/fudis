import { Directive, Input } from '@angular/core';
import { FormCommonApiDirective } from '../form-common-api/form-common-api.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { FormGroup } from '@angular/forms';
import { FudisFocusService } from '../../../services/focus/focus.service';

@Directive({
    selector: '[fudisGroupComponentBase]',
    standalone: false
})
export class GroupComponentBaseDirective extends FormCommonApiDirective {
  constructor(_idService: FudisIdService, _focusService: FudisFocusService) {
    super(_idService, _focusService);
  }

  /**
   * Angular FormGroup for the component
   */
  @Input() formGroup: FormGroup;
}
