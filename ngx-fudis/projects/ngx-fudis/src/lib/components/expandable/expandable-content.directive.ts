import { Directive, HostBinding, TemplateRef } from '@angular/core';

// TODO: Write tests for Actions Directive
/**
 * A marker directive used to tag action buttons that will be rendered inside the allowed components.
 */
@Directive({ selector: 'fudis-expandable-actions' })
export class ExpandableActionsDirective {
  @HostBinding('class') private _classes = 'fudis-expandable-actions';
}

/**
 * A marker directive used to tag the template that will be rendered inside the Expandable
 */
@Directive({ selector: '[fudisExpandableContent]' })
export class ExpandableContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
