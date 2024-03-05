import { Directive, Host, HostListener, Optional } from '@angular/core';
import { FormComponent } from '../../components/form/form/form.component';
import { FudisErrorSummaryService } from '../../services/form/error-summary/error-summary.service';

// TODO: Write tests for Actions Directive
/**
 * A marker directive used to tag action buttons that will be rendered inside the allowed components.
 */
@Directive({ selector: '[fudisFormSubmit]' })
export class FormSubmitDirective {
  constructor(
    @Host() @Optional() private _parentForm: FormComponent,
    private _errorSummaryService: FudisErrorSummaryService,
  ) {}
  /**
   * Set parent Form's Error Summary Visible true and reload errors
   */
  @HostListener('click') private _onClick() {
    // TODO: write test for this
    if (this._parentForm) {
      this._parentForm.errorSummaryVisible = true;
      this._errorSummaryService.reloadErrors();
    }
  }
}
