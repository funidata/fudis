import { Component, Input, Signal } from '@angular/core';
import { FudisLanguageOption } from '../../types/miscellaneous';
import { FudisTranslationConfig } from '../../types/forms';

@Component({
	selector: 'fudis-language-badge-group',
	templateUrl: './language-badge-group.component.html',
	styleUrls: ['./language-badge-group.component.scss'],
})
export class LanguageBadgeGroupComponent {
	currentLanguage: FudisLanguageOption;

	protected _configs: Signal<FudisTranslationConfig>;

	@Input() languageOptions: FudisLanguageOption[] = [];

	updateLanguage(value: any) {
		this.currentLanguage = value;
		console.log('current language is', this.currentLanguage);
	}
}
