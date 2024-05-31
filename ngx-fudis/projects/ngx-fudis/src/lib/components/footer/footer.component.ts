import {
  Component,
  ContentChild,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Signal,
  effect,
} from '@angular/core';
import { FudisGridColumnsResponsive } from '../../types/grid';
import { FudisTranslationService } from '../../services/translation/translation.service';

import {
  FooterContentLeftDirective,
  FooterContentRightDirective,
} from '../../directives/content-projection/content/content.directive';
import { FudisTranslationConfig } from '../../types/miscellaneous';
import { Subject } from 'rxjs';

@Component({
  selector: 'fudis-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  constructor(private _translationService: FudisTranslationService) {
    effect(() => {
      const translations = this._translationService.getTranslations()();

      this._funidataLogoAltText.next(translations.IMAGE.FUNIDATA_LOGO);
      this._externalLinkHelpText.next(translations.LINK.EXTERNAL_LINK);
    });
  }

  /**
   * Content projection directive fudisFooterContentLeft is used for binding correct Footer content on the left side of the component.
   */
  @ContentChild(FooterContentLeftDirective)
  protected _footerContentLeft: FooterContentLeftDirective;

  /**
   * Content projection directive fudisFooterContentRight is used for binding correct Footer content on the right side of the component.
   */
  @ContentChild(FooterContentRightDirective)
  protected _footerContentRight: FooterContentRightDirective;

  /**
   * Fudis translations
   */
  protected _translations: Signal<FudisTranslationConfig>;

  /**
   * Used to apply grid columns breakpoint values for the Footer
   */
  protected _columns: FudisGridColumnsResponsive = { sm: 2 };

  /**
   * Alternative text for the Funidata logo
   */
  protected _funidataLogoAltText = new Subject<string>();

  /**
   * External link text for Funidata logo
   */
  protected _externalLinkHelpText = new Subject<string>();
}
