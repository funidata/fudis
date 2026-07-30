import { Directive, HostBinding, TemplateRef } from '@angular/core';

/**
 * Identifies the actions area of an expandable.
 *
 * Use this directive to position action buttons to a fixed place.
 *
 * @example
 *   ```html
 *   <fudis-expandable [title]="'Details'" [level]="3">
 *     <fudis-expandable-actions>
 *       <fudis-button [label]="'Edit'" (handleClick)="edit()"></fudis-button>
 *     </fudis-expandable-actions>
 *   </fudis-expandable>
 *   ```;
 */
@Directive({ selector: 'fudis-expandable-actions' })
export class ExpandableActionsDirective {
  @HostBinding('class') readonly _hostClass = 'fudis-expandable-actions';
}

/**
 * Identifies the main content area of an expandable.
 *
 * Use this directive for lazy loaded content.
 *
 * @example
 *   ```html
 *   <fudis-expandable [title]="'Details'" [level]="3">
 *     <ng-template fudisExpandableContent>
 *       <fudis-body-text>Lazy-loaded content goes here.</fudis-body-text>
 *     </ng-template>
 *   </fudis-expandable>
 *   ```;
 */
@Directive({ selector: '[fudisExpandableContent]' })
export class ExpandableContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
