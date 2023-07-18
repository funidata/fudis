import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FudisBadgeVariant } from '../../types/miscellaneous';

@Component({
	selector: 'fudis-badge',
	templateUrl: './badge.component.html',
	styleUrls: ['./badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
	/**
	 * Badge variant
	 */
	@Input() variant: FudisBadgeVariant = 'primary';

	/**
	 * Text content for the badge
	 */
	@Input() content: string;
}
