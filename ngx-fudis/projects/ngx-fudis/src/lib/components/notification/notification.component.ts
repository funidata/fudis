import { Component, ContentChild, Input, OnChanges, OnInit, effect } from '@angular/core';
import { FudisIcon } from '../../types/icons';
import { ContentDirective } from '../../directives/content-projection/content/content.directive';
import { FudisNotification } from '../../types/miscellaneous';
import { FudisTranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'fudis-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnChanges, OnInit {
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
   * Add Angular Router link
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() link: string | any[];

  /**
   * Add an external link as HTML href to point a target page on another domain.
   * External link contains new-tab icon and assistive aria-label.
   */
  @Input() externalLink: string;

  /**
   * Title for the link, if not defined title will be the same as link URL
   */
  @Input() linkTitle: string;

  /**
   * Icon for notification
   */
  protected _icon: FudisIcon;

  /**
   * Screen reader text for icon
   */
  protected _attentionText: string;

  /**
   * Getter for notification icon
   */
  get icon(): string {
    return this._icon;
  }

  ngOnInit(): void {
    this._setNotificationIcon();
  }

  ngOnChanges(): void {
    this._setNotificationIcon();
  }

  /**
   * Used to set correct icon for each notification variant
   */
  private _setNotificationIcon(): void {
    switch (this.variant) {
      case 'warning':
        this._icon = 'exclamation-mark-circle';
        break;
      case 'danger':
        this._icon = 'alert';
        break;
      case 'success':
        this._icon = 'checkmark-circle';
        break;
      case 'info':
        this._icon = 'info-circle';
        break;
      default:
        break;
    }
  }
}
