import { Directive, Host, HostListener, Input, OnInit, Optional } from '@angular/core';
import { FormComponent } from '../../../components/form/form/form.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';

// TODO: Write tests
/**
 * A marker directive to set any element, mostly Button Component to work as submit button, which will trigger Error Summary on click
 */
@Directive({ selector: '[fudisFormSubmit]' })
export class FormSubmitDirective implements OnInit {
  constructor(
    @Host() @Optional() private _parentForm: FormComponent,
    @Host() private _button: ButtonComponent,
    private _errorSummaryService: FudisInternalErrorSummaryService,
  ) {}

  /**
   * If false, Button will set parent Form's 'errorSummaryVisible' to true and call reloadErrors() from Error Summary Service
   * If true, Button will set parent Form's 'errorSummaryVisible' to false
   */
  @Input() formValid: boolean = false;

  ngOnInit(): void {
    this._button.type = 'submit';
  }

  /**
   * Set parent Form's Error Summary Visible true and reload errors
   */
  @HostListener('click') private _onClick() {
    if (this._parentForm && !this.formValid) {
      this._parentForm.errorSummaryVisible = true;
      this._errorSummaryService.reloadErrorsByFormId(this._parentForm.id);
    } else if (this._parentForm) {
      this._parentForm.errorSummaryVisible = false;
    }
  }
}
