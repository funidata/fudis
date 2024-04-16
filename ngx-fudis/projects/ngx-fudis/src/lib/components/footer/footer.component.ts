import {
  Component,
  ContentChild,
  ViewEncapsulation,
  Signal,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FudisGridColumnsResponsive } from '../../types/grid';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { FudisTranslationConfig } from '../../types/miscellaneous';
import {
  FooterContentLeftDirective,
  FooterContentRightDirective,
} from '../../directives/content-projection/content/content.directive';

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
      this._translations = this._translationService.getTranslations();

      this._funidataLogoAltText = this._translations().IMAGE.FUNIDATA_LOGO;
      this._externalLinkHelpText = this._translations().LINK.EXTERNAL_LINK;
    });
  }

  /**
   * Content projection directive fudisFooterContentLeft is used for binding correct Footer content on the left side of the component.
   */
  @ContentChild(FooterContentLeftDirective) protected _footerContentLeft: FooterContentLeftDirective;

  /**
   * Content projection directive fudisFooterContentRight is used for binding correct Footer content on the right side of the component.
   */
  @ContentChild(FooterContentRightDirective) protected _footerContentRight: FooterContentRightDirective;

  /**
   * Used to apply grid columns breakpoint values for the Footer
   */
  protected _columns: FudisGridColumnsResponsive = { sm: 2 };

  /**
   * Alternative text for the Funidata logo
   */
  protected _funidataLogoAltText: string;

  /**
   * External link text for Funidata logo
   */
  protected _externalLinkHelpText: string;

  /**
   * Fudis translations
   */
  protected _translations: Signal<FudisTranslationConfig>;
}
