import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FudisBadgeVariant } from '../../types/miscellaneous';
import { CommonModule } from '@angular/common';

/**
 * Displays a small status or category label.
 *
 * Use this component to convey concise information, like state or classification that supplements
 * surrounding content.
 */
@Component({
  selector: 'fudis-badge',
  templateUrl: './badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
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
