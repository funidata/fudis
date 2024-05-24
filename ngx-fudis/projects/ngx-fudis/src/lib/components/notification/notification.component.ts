import { ChangeDetectionStrategy, Component, ContentChild, Input, effect } from '@angular/core';
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
  constructor(private _translateService: FudisTranslationService) {
    effect(() => {
      this._attentionText = this._translateService.getTranslations()().ICON.ATTENTION;
    });
  }

  /**
   * Content projection directive fudisContent for internal use. Error Summary Component is Notification Component with content projection.
   */
  @ContentChild(ContentDirective) protected _content: ContentDirective | null;

  /**
   * Notification variant
   */
  @Input() variant: FudisNotification = 'warning';

  /**
   * Screen reader text for icon
   */
  protected _attentionText: string;
}
