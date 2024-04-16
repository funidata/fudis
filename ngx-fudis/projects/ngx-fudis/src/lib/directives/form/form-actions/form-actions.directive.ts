import { Directive, Host, HostListener, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormComponent } from '../../../components/form/form/form.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { DOCUMENT } from '@angular/common';

// TODO: Write tests
/**
 * A marker directive to set any element, mostly Button Component to work as submit button, which will trigger Error Summary on click
 */
@Directive({ selector: '[fudisFormSubmit]' })
export class FormSubmitDirective implements OnInit {
  constructor(
    @Inject(DOCUMENT) private _document: Document,
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
    /**
     * Make sure that click event is from this submit Button and not any parent Form element
     */
    const submitButton = this._document.activeElement === this._button.buttonEl.nativeElement;

    if (submitButton) {
      if (this._parentForm && !this.formValid) {
        this._parentForm.errorSummaryVisible = true;
        this._errorSummaryService.reloadErrorsByFormId(this._parentForm.id, true);
      } else if (this._parentForm) {
        this._parentForm.errorSummaryVisible = false;
      }
    }
  }
}
