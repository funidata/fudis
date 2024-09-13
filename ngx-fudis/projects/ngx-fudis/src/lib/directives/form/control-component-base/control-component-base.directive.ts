import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { FudisIdService } from '../../../services/id/id.service';
import { FormCommonApiDirective } from '../form-common-api/form-common-api.directive';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[fudisControlComponentBase]',
})
export class ControlComponentBaseDirective extends FormCommonApiDirective {
  constructor(
    _idService: FudisIdService,
    protected _changeDetectorRef: ChangeDetectorRef,
  ) {
    super(_idService);
  }

  /**
   * FormControl for the input
   */
  @Input({ required: true }) control: FormControl;

  /**
   * TODO: write test check cdr logic
   *
   * Tell Guidance, that this component has errors which were not loaded to Error Summary, if component was initialised after parent's Error Summary was set to visible.
   */
  protected _triggerErrorSummaryOnInitReload(
    parentFormErrorSummaryVisible: boolean | undefined,
  ): void {
    if (this.errorSummaryReloadOnInit && parentFormErrorSummaryVisible && this.control.invalid) {
      this._reloadErrorSummaryTrigger = true;
      this._changeDetectorRef.detectChanges();
    }
  }

  /**
   * Handle blur event
   */
  public onBlur(event: FocusEvent): void {
    this.handleBlur.emit(event);
  }

  /**
   * Set focust to the input element
   */
  public focusToInput(): void {
    if (this._inputRef?.nativeElement) {
      this._inputRef.nativeElement.focus();
    }
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
