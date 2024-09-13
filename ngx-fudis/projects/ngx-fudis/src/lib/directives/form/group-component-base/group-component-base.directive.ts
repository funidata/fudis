import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { FormCommonApiDirective } from '../form-common-api/form-common-api.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[fudisGroupComponentBase]',
})
export class GroupComponentBaseDirective extends FormCommonApiDirective {
  constructor(
    _idService: FudisIdService,
    private _cdr: ChangeDetectorRef,
  ) {
    super(_idService);
  }

  /**
   * Angular FormGroup for the component
   */
  @Input() formGroup: FormGroup;

  /**
   * TODO: write test check cdr logic
   *
   * Tell Guidance, that this component has errors which were not loaded to Error Summary, if component was initialised after parent's Error Summary was set to visible.
   */

  protected _triggerErrorSummaryOnInitReload(
    parentFormErrorSummaryVisible: boolean | undefined,
  ): void {
    if (this.errorSummaryReloadOnInit && parentFormErrorSummaryVisible && this.formGroup.invalid) {
      this._reloadErrorSummaryTrigger = true;
      this._cdr.detectChanges();
    }
  }
}
