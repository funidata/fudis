import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Signal,
  ViewChild,
  effect,
} from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';
import {
  FudisComponentChanges,
  FudisLinkColor,
  FudisTranslationConfig,
} from '../../types/miscellaneous';

@Component({
  selector: 'fudis-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent implements AfterViewInit, OnChanges {
  constructor(private _translationService: FudisTranslationService) {
    effect(() => {
      this._translations = this._translationService.getTranslations();

      this._externalLinkAriaLabel = this._translations().LINK.EXTERNAL_LINK;
    });
  }

  /**
   * Template reference for input. Used in e. g. initialFocus
   */
  @ViewChild('linkRef') private _linkRef: ElementRef;

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
   * Regular HTML href
   */
  @Input() href: string;

  /**
   * Fragment ID for Angular Router
   */
  @Input() fragmentId: string;

  /**
   * Title for the link, if not defined title will be the same as link URL
   */
  @Input() title: string;

  /**
   * Link size. By default link will inherit its parent's font-size. If link is not inside e.g. <fudis-heading> or <fudis-body-text> its size can be defined either 'md' (14px) or 'lg' (16px).
   */
  @Input() size: 'inherit' | 'md' | 'lg' = 'inherit';

  /**
   * Link color
   */
  @Input() color: FudisLinkColor = 'primary-dark';

  /**
   * Set browser focus to link on the first load.
   */
  @Input() initialFocus: boolean = false;

  /**
   * Focus event output
   */
  @Output() handleFocus = new EventEmitter<FocusEvent>();

  /**
   * Blur event output
   */
  @Output() handleBlur = new EventEmitter<FocusEvent>();

  /**
   * Aria-label for the external link
   */
  protected _externalLinkAriaLabel: string;

  /**
   * Fudis translations
   */
  protected _translations: Signal<FudisTranslationConfig>;

  /**
   * Store parsed values of external link's title
   */
  protected _externalLinkTitleParsed: string[];

  /**
   * Helper counter for setting link focus
   */
  private _focusTryCounter: number = 0;

  ngAfterViewInit(): void {
    if (this.initialFocus) {
      this._focusToLink();
    }
  }

  ngOnChanges(changes: FudisComponentChanges<LinkComponent>): void {
    if (changes.externalLink || changes.title) {
      this._parseExternalLinkTitle();
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
   * Set visible focus to the link
   */
  private _focusToLink(): void {
    if (this._linkRef?.nativeElement) {
      this._linkRef.nativeElement.focus();
      this._focusTryCounter = 0;
    } else if (this._focusTryCounter < 100) {
      setTimeout(() => {
        this._focusTryCounter += 1;
        this._focusToLink();
      }, 100);
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

          this._externalLinkTitleParsed = [titleStart, lastWord];
        } else {
          this._externalLinkTitleParsed = toArray;
        }
      } else {
        this._externalLinkTitleParsed = [this.externalLink];
      }
    }
  }
}
