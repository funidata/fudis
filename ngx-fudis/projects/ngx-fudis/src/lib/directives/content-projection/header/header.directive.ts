import { Directive, Input, TemplateRef } from '@angular/core';

// TODO: Write tests for Header Directive
/**
 * A marker directive used to tag additional header section that will be rendered inside of components.
 * Additional header section can contain e.g. compact version of Description List Component
 */
@Directive({ selector: '[fudisHeader]' })
export class HeaderDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}

/**
 * Component type to protect wrong content projection to nested components
 */
    @Input({ required: true }) type: 'form' |'fieldset' | 'section';
}
