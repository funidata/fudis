import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type BadgeVariant = 'accent' | 'danger' | 'primary' | 'secondary' | 'success';

@Component({
	selector: 'fudis-badge',
	templateUrl: './badge.component.html',
	styleUrls: ['./badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
	@Input() variant: BadgeVariant = 'primary';

	@Input() content: string;
}
