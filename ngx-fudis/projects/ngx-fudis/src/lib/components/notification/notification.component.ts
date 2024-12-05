import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ContentDirective } from '../../directives/content-projection/content/content.directive';
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

  /**
   * Content projection directive fudisContent for internal use. Error Summary Component is Notification Component with content projection.
   */
  @ContentChild(ContentDirective) protected _content: ContentDirective | null;

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
