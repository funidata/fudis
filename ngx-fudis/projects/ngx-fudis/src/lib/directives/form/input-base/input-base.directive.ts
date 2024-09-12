import { Directive, Input, ChangeDetectorRef } from '@angular/core';
import { FudisIdComponent } from '../../../types/id';
import { FudisIdService } from '../../../services/id/id.service';
import { FormControl } from '@angular/forms';
import { InputApiDirective } from '../input-api/input-api.directive';

@Directive({
  selector: '[fudisInputBase]',
})
export class InputBaseDirective extends InputApiDirective {
  constructor(
    protected _idService: FudisIdService,
    protected _changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
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
    control: FormControl,
  ): void {
    if (this.errorSummaryReloadOnInit && parentFormErrorSummaryVisible && control.errors) {
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
   * Add given id to Id Service or generate unique id
   */
  protected _setInputId(componentType: FudisIdComponent): void {
    if (this.id) {
      this._idService.addNewId(componentType, this.id);
    } else {
      this.id = this._idService.getNewId(componentType);
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
