import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FudisNotification } from '../../types/miscellaneous';
import { FudisTranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'fudis-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  constructor(protected _translateService: FudisTranslationService) {}

  @ViewChild('articleElement') articleElement: ElementRef;

  /**
   * Notification variant
   */
  @Input() variant: FudisNotification = 'warning';

  public focus(): void {
    if (this.articleElement?.nativeElement) {
      this.articleElement.nativeElement.focus();
    }
  }
}
