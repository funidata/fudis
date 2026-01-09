import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FudisNotification } from '../../types/miscellaneous';
import { FudisTranslationService } from '../../services/translation/translation.service';

/**
 * Displays an information message.
 *
 * Use this component to inform users about events, updates, or system feedback.
 */
@Component({
  selector: 'fudis-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NotificationComponent {
  constructor(protected _translateService: FudisTranslationService) {}

  @ViewChild('articleElement') articleElement: ElementRef;

  /**
   * Notification variant
   */
  @Input() variant: FudisNotification = 'warning';

  /**
   * Additional description of the notification for screen readers. Internally used in ErrorSummary
   * for accessibility reasons.
   */
  @Input() ariaDescribedby: string;

  public focus(): void {
    if (this.articleElement?.nativeElement) {
      this.articleElement.nativeElement.focus();
    }
  }
}
