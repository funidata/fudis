import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { FormCommonApiDirective } from '../form-common-api/form-common-api.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[fudisGroupComponentBase]',
})
export class GroupComponentBaseDirective extends FormCommonApiDirective {
  constructor(_idService: FudisIdService, _cdr: ChangeDetectorRef) {
    super(_idService, _cdr);
  }

  /**
   * Angular FormGroup for the component
   */
  @Input() formGroup: FormGroup;

  /**
   * Update value and validity of FormGroup
   */
  protected _applyGroupUpdateCheck(): void {
    const original = this.formGroup.updateValueAndValidity;

    this.formGroup.updateValueAndValidity = () => {
      original.apply(this.formGroup);
      this._updateValueAndValidityTrigger.next();
    };
  }
}