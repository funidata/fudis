import { Directive, Input, TemplateRef } from '@angular/core';

/**
 * A marker directive used to tag notification component that will be rendered inside the allowed components.
 * Used in `Fieldset` and `Section`
 */
@Directive({ selector: '[fudisNotifications]' })
export class NotificationsDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}

  /**
   * Component type to protect wrong content projection to nested components
   */
  @Input({ required: true }) type: 'fieldset' | 'section';
}
