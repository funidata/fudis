import { Component, Input, Signal, effect } from '@angular/core';
import { FudisLanguageAbbr } from '../../types/miscellaneous';
import { FudisTranslationConfig } from '../../types/forms';
import { FudisTranslationConfigService } from '../../utilities/config.service';

@Component({
	selector: 'fudis-language-badge-group',
	templateUrl: './language-badge-group.component.html',
	styleUrls: ['./language-badge-group.component.scss'],
})
export class LanguageBadgeGroupComponent {
	constructor(private readonly _configService: FudisTranslationConfigService) {
		effect(() => {
			this._configs = this._configService.getConfig();
		});
	}

	protected _currentLanguage: FudisLanguageAbbr = 'en';

	protected _configs: Signal<FudisTranslationConfig>;

	@Input() languageOptions: FudisLanguageAbbr[];

	updateLanguage(value: any) {
		this._currentLanguage = value;
		console.log('current language is', this._currentLanguage);
	}
}
