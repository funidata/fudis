import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'fudis-fieldset-actions',
})
export class FieldsetActionsDirective {
  /**
   * Binding fudis-form__header__actions__dialog CSS class to form header wrapper
   */
  @HostBinding('class') public hostClass = 'fudis-fieldset__legend__actions';
}

@Directive({
  selector: 'fudis-fieldset-content',
})
export class FieldsetContentDirective {
  /**
   * Binding fudis-form__header__actions__dialog CSS class to form header wrapper
   */
  @HostBinding('class') public hostClass = 'fudis-fieldset';
}
