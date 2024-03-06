import { Directive, Host, HostListener, Optional } from '@angular/core';
import { FormComponent } from '../../components/form/form/form.component';
import { FudisErrorSummaryService } from '../../services/form/error-summary/error-summary.service';

// TODO: Write tests
/**
 * A marker directive to set any element, mostly Button Component to work as submit button, which will trigger Error Summary on click
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
    if (this._parentForm) {
      this._parentForm.errorSummaryVisible = true;
      this._errorSummaryService.reloadErrors();
    }
  }
}
