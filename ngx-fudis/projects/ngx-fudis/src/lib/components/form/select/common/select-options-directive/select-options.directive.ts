import { Directive, TemplateRef } from '@angular/core';

// TODO: Write tests
/**
 * Marks the container for select options.
 *
 * Use this directive to tag the template which wraps (multi)select options and enables lazy loading
 * of the options.
 */
@Directive({
  selector: '[fudisSelectOptions]',
  standalone: false,
})
export class SelectOptionsDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
