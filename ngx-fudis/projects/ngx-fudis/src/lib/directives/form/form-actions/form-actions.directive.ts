import { Directive, Host, HostListener, Input, OnInit, Optional } from '@angular/core';
import { FormComponent } from '../../../components/form/form/form.component';
import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';
import { ButtonComponent } from '../../../components/button/button.component';

// TODO: Write tests
/**
 * A marker directive to set any element, mostly Button Component to work as submit button, which will trigger Error Summary on click
 */
@Directive({ selector: '[fudisFormSubmit]' })
export class FormSubmitDirective implements OnInit {
  constructor(
    @Host() @Optional() private _parentForm: FormComponent,
    @Host() private _button: ButtonComponent,
    private _errorSummaryService: FudisErrorSummaryService,
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
      this._errorSummaryService.reloadErrors();
    } else if (this._parentForm) {
      this._parentForm.errorSummaryVisible = false;
    }
  }
}
