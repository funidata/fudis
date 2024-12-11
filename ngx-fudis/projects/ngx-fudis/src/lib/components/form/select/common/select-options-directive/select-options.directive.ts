import { Directive, TemplateRef } from '@angular/core';

// TODO: Write tests for all Content Directives in this file
/**
 * A marker directive used to tag the template that will be rendered inside the Select options components
 */
@Directive({ selector: '[fudisSelectOptions]' })
export class SelectOptionsDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
