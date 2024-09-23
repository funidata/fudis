import { ChangeDetectionStrategy, Component, OnChanges, effect } from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { FudisComponentChanges } from '../../types/miscellaneous';
import { LinkApiDirective } from '../../directives/link/link-api/link-api.directive';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'fudis-link',
  templateUrl: './link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent extends LinkApiDirective implements OnChanges {
  constructor(private _translationService: FudisTranslationService) {
    super();

    effect(() => {
      this._externalLinkAriaLabel.next(
        this._translationService.getTranslations()().LINK.EXTERNAL_LINK,
      );
    });
  }

  /**
   * Aria-label for the external link
   */
  protected _externalLinkAriaLabel = new BehaviorSubject<string>('');

  /**
   * Store parsed values of external link's title
   */
  protected _externalLinkTitleParsed = new BehaviorSubject<string[]>([]);

  ngOnChanges(changes: FudisComponentChanges<LinkComponent>): void {
    if (
      changes.external?.currentValue !== changes.external?.previousValue ||
      changes.title?.currentValue !== changes.title?.previousValue
    ) {
      this._parseExternalLinkTitle();
    }
  }

  /**
   * For external links with a title. Used to split the last word of the title to be paired with the Icon, so that on line break, the icon sticks with the last word of the title.
   */
  private _parseExternalLinkTitle(): void {
    if (this.external) {
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
        this._externalLinkTitleParsed.next([this.title]);
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
   * Handle Link Component click event
   */
  protected _handleClick(event: Event): void {
    this.handleClick.emit(event);
  }
}
