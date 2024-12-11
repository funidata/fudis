import { Directive, Input, TemplateRef } from '@angular/core';

// TODO: Write tests for Actions Directive
/**
 * A marker directive used to tag action buttons that will be rendered inside the allowed components.
 */
@Directive({ selector: '[fudisActions]' })
export class ActionsDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}

  /**
   * Component type to protect wrong content projection to nested components
   */
  @Input({ required: true }) type: 'expandable' | 'form';
}
