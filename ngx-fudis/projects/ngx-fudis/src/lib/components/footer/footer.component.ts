import { Component, ContentChild, ViewEncapsulation, Signal, effect } from '@angular/core';
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
})
export class FooterComponent {
	constructor(private _translationService: FudisTranslationService) {
		effect(() => {
			this._translations = this._translationService.getTranslations();

			this._funidataLogoAltText = this._translations().IMAGE.FUNIDATA_LOGO;
		});
	}

	@ContentChild(FooterContentLeftDirective) contentLeft: FooterContentLeftDirective;

	@ContentChild(FooterContentRightDirective) contentRight: FooterContentRightDirective;

	protected _columns: FudisGridColumnsResponsive = { sm: 2 };

	/**
	 * Alternative text for the Funidata logo
	 */
	protected _funidataLogoAltText: string;

	/**
	 * Fudis translations
	 */
	protected _translations: Signal<FudisTranslationConfig>;
}
