import { Directive, HostBinding } from '@angular/core';

/**
 * Identifies the actions area of a form.
 *
 * Use this directive to group submit or secondary form actions consistently.
 *
 * @example
 *   ```html
 *   <fudis-form [title]="'Login'" [level]="1">
 *     <fudis-form-actions>
 *       <fudis-button fudisFormSubmit [label]="'Submit'" [formValid]="form.valid"></fudis-button>
 *     </fudis-form-actions>
 *   </fudis-form>
 *   ```;
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
 *
 * @example
 *   ```html
 *   <fudis-form [title]="'Registration'" [level]="1">
 *     <fudis-form-header>
 *       <fudis-body-text>Please fill in all required fields.</fudis-body-text>
 *     </fudis-form-header>
 *   </fudis-form>
 *   ```;
 */
@Directive({ selector: 'fudis-form-header' })
export class FormHeaderDirective {
  @HostBinding('class') readonly _hostClass = 'fudis-form-header';
}

/**
 * Identifies the main content area of a form.
 *
 * Use this directive for form fields.
 *
 * @example
 *   ```html
 *   <fudis-form [title]="'Profile'" [level]="1">
 *     <fudis-form-content>
 *       <fudis-text-input [label]="'Name'" [control]="nameControl"></fudis-text-input>
 *     </fudis-form-content>
 *   </fudis-form>
 *   ```;
 */
@Directive({ selector: 'fudis-form-content' })
export class FormContentDirective {
  @HostBinding('class') readonly _hostClass = 'fudis-form-content';
}
