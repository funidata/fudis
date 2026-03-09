import { Directive, Host, HostListener, Inject, Input, OnInit, DOCUMENT } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';

import { isButtonDisabled } from '../../../utilities/dialog/dialog-utils';

// TODO: Write tests
/**
 * Marks an element as the primary form submission trigger.
 *
 * Use this directive on submit button which will trigger error summary on click.
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
  @HostListener('click', ['$event']) protected _onClick(event: MouseEvent) {
    const targetElement = event.target;

    // Type guard
    if (!(targetElement instanceof HTMLElement)) return;

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
