import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FudisBadgeVariant } from '../../types/miscellaneous';

@Component({
  selector: 'fudis-badge',
  templateUrl: './badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
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
