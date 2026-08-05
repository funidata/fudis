import { Directive, HostBinding } from '@angular/core';

/**
 * Identifies the actions area of a section.
 *
 * Use this directive to add buttons that affect the section as a whole.
 *
 * @example
 *   ```html
 *   <fudis-section [title]="'Users'" [level]="2">
 *     <fudis-section-actions>
 *       <fudis-button [label]="'Add user'" (handleClick)="addUser()"></fudis-button>
 *     </fudis-section-actions>
 *     <fudis-section-content>
 *       <fudis-body-text>Section content goes here.</fudis-body-text>
 *     </fudis-section-content>
 *   </fudis-section>
 *   ```;
 */
@Directive({ selector: 'fudis-section-actions' })
export class SectionActionsDirective {
  @HostBinding('class') readonly _hostClass = 'fudis-section-actions';
}

/**
 * Identifies the main content area of a section.
 *
 * Use this directive to structure section content.
 *
 * @example
 *   ```html
 *   <fudis-section [title]="'Details'" [level]="2">
 *     <fudis-section-content>
 *       <fudis-body-text>Section content goes here.</fudis-body-text>
 *     </fudis-section-content>
 *   </fudis-section>
 *   ```;
 */
@Directive({ selector: 'fudis-section-content' })
export class SectionContentDirective {
  @HostBinding('class') readonly _hostClass = 'fudis-section-content';
}
