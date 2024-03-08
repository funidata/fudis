import { ChangeDetectionStrategy, Component, ElementRef, Input, effect } from '@angular/core';
import { LinkDirective } from '../../directives/link/link.directive';
import { FudisTranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'fudis-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent extends LinkDirective implements AfterViewInit, OnChanges {
  constructor(
    private _translationService: FudisTranslationService,
    _linkElement: ElementRef,
  ) {
    super(_linkElement);
    effect(() => {
      this._translations = this._translationService.getTranslations();

      this._externalLinkAriaLabel = this._translations().LINK.EXTERNAL_LINK;
    });
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
   * Title for the link, if not defined title will be the same as link URL
   */
  @Input() title: string;

  /*
   * External link URL
   */
  @Input() externalLink: string;

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

  ngOnChanges(changes: FudisComponentChanges<LinkComponent>): void {
    if (changes.externalLink || changes.title) {
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
