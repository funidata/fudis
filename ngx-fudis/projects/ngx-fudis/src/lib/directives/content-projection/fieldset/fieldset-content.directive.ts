import { Directive, HostBinding } from "@angular/core";

@Directive({
  selector: 'fudis-fieldset-actions',
})
export class FieldsetActionsDirective {

  /**
   * Binding fudis-fieldset__legend__actions CSS class to fieldset actions wrapper
   */
  @HostBinding('class') public hostClass = 'fudis-fieldset__legend__actions';
}

@Directive({
  selector: 'fudis-fieldset-content',
})
export class FieldsetContentDirective {
  
  /**
   * Binding fudis-fieldset CSS class to content wrapper
   */
  @HostBinding('class') public hostClass = 'fudis-fieldset';
}