import { Component, OnInit, EventEmitter, Output, Input, Signal, effect } from '@angular/core';
import { FudisLanguageAbbr, FudisTranslationConfig } from '../../types/miscellaneous';
import { FudisIdService } from '../../utilities/id-service.service';
import { FudisTranslationService } from '../../utilities/translation/translation.service';

@Component({
	selector: 'fudis-language-badge-group',
	templateUrl: './language-badge-group.component.html',
	styleUrls: ['./language-badge-group.component.scss'],
})
export class LanguageBadgeGroupComponent implements OnInit {
	constructor(private _idService: FudisIdService, private _translationService: FudisTranslationService) {
		effect(() => {
			this._translations = _translationService.getTranslations();
		});
	}

	/**
	 * Internal id for Language Badge Group component
	 */
	protected _id: string;

	protected _languageOptions: FudisLanguageAbbr[] = ['en', 'fi', 'sv'];

	protected _translations: Signal<FudisTranslationConfig>;

	@Input({ required: true }) selectedLanguage: FudisLanguageAbbr;

	@Input({ required: true }) languages: FudisLanguageAbbr[];

	@Output() handleClick = new EventEmitter<FudisLanguageAbbr>();

	ngOnInit(): void {
		this._id = this._idService.getNewId('languageBadgeGroup');
	}

	updateLanguage(value: FudisLanguageAbbr) {
		this.handleClick.emit(value);
	}

	// eslint-disable-next-line class-methods-use-this
	asLabelkey(key: any): keyof FudisTranslationConfig {
		const transformed = key.toUpperCase();

		return transformed;
	}
}
