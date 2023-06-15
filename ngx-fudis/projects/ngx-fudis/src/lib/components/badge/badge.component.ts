import { Component, Input } from '@angular/core';

type BadgeVariant = 'accent' | 'danger' | 'primary' | 'secondary' | 'success';

@Component({
	selector: 'fudis-badge',
	templateUrl: './badge.component.html',
	styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
	@Input() variant: BadgeVariant = 'primary';

	@Input() content: string;
}
