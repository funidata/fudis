import { Directive, TemplateRef } from '@angular/core';

/**
 * A marker directive used to tag the template that will be rendered inside `ButtonComponent` as dropdown items.
 */
@Directive({ selector: '[fudisDropdownMenu]' })
export class DropdownMenuDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}
