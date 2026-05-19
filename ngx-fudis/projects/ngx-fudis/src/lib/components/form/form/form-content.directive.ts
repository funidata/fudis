import { Directive, HostBinding } from '@angular/core';

/**
 * Identifies the actions area of a form.
 *
 * Use this directive to group submit or secondary form actions consistently.
 */
@Directive({ selector: 'fudis-form-actions' })
export class FormActionsDirective {
  @HostBinding('class') readonly _hostClass = 'fudis-form-actions';
}

/**
 * Identifies the header area of a form.
 *
 * Use this directive for additional information like intsructions for the form that should be
 * grouped with the actual form heading.
 */
@Directive({ selector: 'fudis-form-header' })
export class FormHeaderDirective {
  @HostBinding('class') readonly _hostClass = 'fudis-form-header';
}

/**
 * Identifies the main content area of a form.
 *
 * Use this directive for form fields.
 */
@Directive({ selector: 'fudis-form-content' })
export class FormContentDirective {
  @HostBinding('class') readonly _hostClass = 'fudis-form-content';
}
