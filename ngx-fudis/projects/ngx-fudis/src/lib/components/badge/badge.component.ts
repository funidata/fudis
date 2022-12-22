import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

export type BadgeVariant = 'accent' | 'danger' | 'primary' | 'secondary' | 'success';

@Component({
	selector: 'fudis-badge',
	templateUrl: './badge.component.html',
	styleUrls: ['./badge.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class BadgeComponent {
	@HostBinding('class') classes = 'fudis-badge-host';

	@Input() variant: BadgeVariant;

	@Input() content?: string;
}
