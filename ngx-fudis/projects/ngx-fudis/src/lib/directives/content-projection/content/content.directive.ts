/* eslint-disable max-classes-per-file */
import { Directive, Input, TemplateRef } from '@angular/core';

/**
 * A marker directive used to tag the template that will be rendered inside of components. Used in e. g. `ExpandableComponent`.
 */

@Directive({ selector: '[fudisContent]' })
export class ContentDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}

	@Input({ required: true }) type: 'expandable' | 'notification' | 'form' | 'fieldset' | 'section';
}

@Directive({ selector: '[fudisFooterLeft]' })
export class FooterContentLeftDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({ selector: '[fudisFooterRight]' })
export class FooterContentRightDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}
