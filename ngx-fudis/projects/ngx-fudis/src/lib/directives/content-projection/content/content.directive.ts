/* eslint-disable max-classes-per-file */
import { Directive, TemplateRef } from '@angular/core';

/**
 * A marker directive used to tag the template that will be rendered inside of components. Used in e. g. `ExpandableComponent`.
 */
@Directive({ selector: '[fudisExpandableContent]' })
export class ExpandableContentDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({ selector: '[fudisFieldsetContent]' })
export class FieldsetContentDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({ selector: '[fudisFormContent]' })
export class FormContentDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({ selector: '[fudisNotificationContent]' })
export class NotificationContentDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}
