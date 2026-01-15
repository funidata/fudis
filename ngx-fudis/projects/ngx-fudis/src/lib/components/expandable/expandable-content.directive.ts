import { Directive, HostBinding, TemplateRef } from '@angular/core';

/**
 * Identifies the actions area of an expandable.
 *
 * Use this directive to position action buttons to a fixed place.
 */
@Directive({
  selector: 'fudis-expandable-actions',
  standalone: false,
})
export class ExpandableActionsDirective {
  @HostBinding('class') readonly _hostClass = 'fudis-expandable-actions';
}

/**
 * Identifies the main content area of an expandable.
 *
 * Use this directive for lazy loaded content.
 */
@Directive({
  selector: '[fudisExpandableContent]',
  standalone: false,
})
export class ExpandableContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
