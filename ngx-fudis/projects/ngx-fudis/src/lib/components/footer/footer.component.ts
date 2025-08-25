import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Signal,
  effect,
  Input,
} from '@angular/core';
import { FudisGridColumnsResponsive } from '../../types/grid';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { BehaviorSubject } from 'rxjs';
import { FudisTranslationConfig } from '../../services/translation/translationKeys';

@Component({
  selector: 'fudis-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
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
   * Used to apply grid columns breakpoint values for the Footer
   */
  @Input() columns: FudisGridColumnsResponsive = { sm: 2 };

  /**
   * Fudis translations
   */
  protected _translations: Signal<FudisTranslationConfig>;

  /**
   * Alternative text for the Funidata logo
   */
  protected _funidataLogoAltText = new BehaviorSubject<string>(
    this._translationService.getTranslations()().IMAGE.FUNIDATA_LOGO,
  );

  /**
   * External link text for Funidata logo
   */
  protected _externalLinkHelpText = new BehaviorSubject<string>(
    this._translationService.getTranslations()().LINK.EXTERNAL_LINK,
  );
}
