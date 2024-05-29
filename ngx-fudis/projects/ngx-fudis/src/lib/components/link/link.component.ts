import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  Optional,
  Output,
  Signal,
} from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { FudisComponentChanges, FudisTranslationConfig } from '../../types/miscellaneous';
import { LinkApiDirective } from '../../directives/link/link-api/link-api.directive';
import { NotificationComponent } from '../notification/notification.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'fudis-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent extends LinkApiDirective implements OnChanges {
  constructor(
    @Host() @Optional() private _parentNotification: NotificationComponent,
    protected _translationService: FudisTranslationService,
  ) {
    super();

    if (_parentNotification) {
      this.color = 'gray-dark';
    }
  }

  /**
   * External link URL
   */
  @Input() externalLink: string;

  /**
   * Link URL using Angular RouterLink
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() link: string | any[];

  /**
   * Title for the link, if not defined title will be the same as link URL
   */
  @Input() title: string;

  /**
   * Regular HTML href
   */
  @Input() href: string;

  /**
   * Fragment ID for Angular Router
   */
  @Input() fragmentId: string;

  /**
   * Focus event output
   */
  @Output() handleFocus = new EventEmitter<FocusEvent>();

  /**
   * Blur event output
   */
  @Output() handleBlur = new EventEmitter<FocusEvent>();

  // TODO: write test
  /**
   * Click event output
   */
  @Output() handleClick = new EventEmitter<Event>();

  /**
   * Fudis translations
   */
  protected _translations: Signal<FudisTranslationConfig>;

  /**
   * Store parsed values of external link's title
   */
  protected _externalLinkTitleParsed = new BehaviorSubject<string[]>([]);

  ngOnChanges(changes: FudisComponentChanges<LinkComponent>): void {
    if (
      changes.externalLink?.currentValue !== changes.externalLink?.previousValue ||
      changes.title?.currentValue !== changes.title?.previousValue
    ) {
      this._parseExternalLinkTitle();
    }
  }

  /**
   * For external links with a title. Used to split the last word of the title to be paired with the Icon, so that on line break, the icon sticks with the last word of the title.
   */
  private _parseExternalLinkTitle(): void {
    if (this.externalLink) {
      if (this.title) {
        const toArray = this.title.split(' ');

        if (toArray.length > 1) {
          const lastWord: string = toArray[toArray.length - 1];

          const titleStart: string = toArray.slice(0, -1).join(' ');

          this._externalLinkTitleParsed.next([titleStart, lastWord]);
        } else {
          this._externalLinkTitleParsed.next(toArray);
        }
      } else {
        this._externalLinkTitleParsed.next([this.externalLink]);
      }
    }
  }

  /**
   * Handle Link Component focus event
   */
  protected _handleFocus(event: FocusEvent): void {
    this.handleFocus.emit(event);
  }

  /**
   * Handle Link Component blur event
   */
  protected _handleBlur(event: FocusEvent): void {
    this.handleBlur.emit(event);
  }

  /**
   * Handle Link Component blur event
   */
  protected _handleClick(event: Event): void {
    this.handleClick.emit(event);
  }
}
