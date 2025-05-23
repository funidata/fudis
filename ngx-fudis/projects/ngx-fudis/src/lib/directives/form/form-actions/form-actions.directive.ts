import { Directive, Host, HostListener, Inject, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { DOCUMENT } from '@angular/common';
import { isButtonDisabled } from '../../../utilities/dialog/dialog-utils';

// TODO: Write tests
/**
 * A marker directive to set any element, mostly Button Component to work as submit button, which
 * will trigger Error Summary on click
 */
@Directive({
  selector: '[fudisFormSubmit]',
  standalone: false,
})
export class FormSubmitDirective implements OnInit {
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    @Host() private _button: ButtonComponent,
    private _errorSummaryService: FudisInternalErrorSummaryService,
  ) {}

  /**
   * If false, Button will set parent Form's 'errorSummaryVisible' to true and call reloadErrors()
   * from Error Summary Service If true, Button will set parent Form's 'errorSummaryVisible' to
   * false
   */
  @Input() formValid: boolean = false;

  ngOnInit(): void {
    this._button.type = 'submit';
  }

  /**
   * Set parent Form's Error Summary Visible true and reload errors
   */
  @HostListener('click', ['$event.target']) private _onClick(targetElement: HTMLElement) {
    /**
     * Make sure that click event is from this submit Button and not any parent Form element
     */
    const buttonElement = this._button.buttonEl.nativeElement;
    const submitButton =
      this._document.activeElement === buttonElement || targetElement === buttonElement;

    if (submitButton && !isButtonDisabled(buttonElement)) {
      this._errorSummaryService
        .getFormAncestorId(this._button.buttonEl.nativeElement)
        .then((parentFormId) => {
          if (parentFormId && !this.formValid) {
            this._errorSummaryService.setErrorSummaryVisibility(parentFormId, true);
            this._errorSummaryService.reloadFormErrors(parentFormId, true);
          } else if (parentFormId) {
            this._errorSummaryService.setErrorSummaryVisibility(parentFormId, false);
          }
        });
    }
  }
}
