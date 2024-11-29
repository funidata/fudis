import { Directive, HostBinding } from "@angular/core";

@Directive({ selector: 'fudis-form-content' })
export class FormContentDirective {
    /**
   * Binding fudis-form__content CSS class to content wrapper
   */
    @HostBinding('class') public hostClass = 'fudis-form__content';
}