import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: 'fudis-form-actions' })
export class FormActionsDirective {
  /**
   * Binding fudis-form-actions CSS class to form actions directive
   */
  @HostBinding('class') public hostClass = 'fudis-form-actions';
}

@Directive({ selector: 'fudis-form-header' })
export class FormHeaderDirective {}

@Directive({ selector: 'fudis-form-content' })
export class FormContentDirective {}
