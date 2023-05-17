/* eslint-disable max-classes-per-file */
import { Directive, TemplateRef } from '@angular/core';

/**
 * A marker directive used to tag the template that will be rendered inside an `NotificationComponent. This will replace other Notification content.`.
 */
@Directive({ selector: '[fudisNotificationContent]' })
export class NotificationContentDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}
