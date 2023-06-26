import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FudisBadgeVariant } from '../../types/miscellaneous';

@Component({
	selector: 'fudis-badge',
	templateUrl: './badge.component.html',
	styleUrls: ['./badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
	@Input() variant: FudisBadgeVariant = 'primary';

	@Input() content: string;
}
