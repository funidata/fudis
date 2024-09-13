import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { FormCommonApiDirective } from '../form-common-api/form-common-api.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisIdParent } from '../../../types/id';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Directive({
  selector: '[fudisGroupComponentBase]',
  standalone: true,
})
export class GroupComponentBaseDirective extends FormCommonApiDirective {
  constructor(
    protected _idService: FudisIdService,
    private _cdr: ChangeDetectorRef,
  ) {
    super();
  }

  /**
   * Angular FormGroup for the component
   */
  @Input() formGroup: FormGroup;

  /**
   * Fudis translation key for required text
   */
  protected _requiredText = new Subject<string>();

  /**
   * To prevent ngOnChanges running before initial ngOnInit
   */
  protected _initFinished: boolean = false;

  /**
   * Generate id for parent component
   */
  protected _setParentId(parentType: FudisIdParent): void {
    if (this.id) {
      this._idService.addNewParentId(parentType, this.id);
    } else {
      this.id = this._idService.getNewParentId(parentType);
    }
  }

  /**
   * TODO: write test check cdr logic
   *
   * Tell Guidance, that this component has errors which were not loaded to Error Summary, if component was initialised after parent's Error Summary was set to visible.
   */

  protected _triggerErrorSummaryOnInitReload(
    parentFormErrorSummaryVisible: boolean | undefined,
    group: FormGroup,
  ): void {
    if (this.errorSummaryReloadOnInit && parentFormErrorSummaryVisible && group.invalid) {
      this._reloadErrorSummaryTrigger = true;
      this._cdr.detectChanges();
    }
  }
}
