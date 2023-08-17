import { Component, OnInit, EventEmitter, Output, Input, Signal, effect } from '@angular/core';
import { FudisLanguageAbbr, FudisTranslationConfig } from '../../types/miscellaneous';
import { FudisIdService } from '../../utilities/id-service.service';
import { FudisTranslationService } from '../../utilities/translation/translation.service';
import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';

@Component({
	selector: 'fudis-language-badge-group',
	templateUrl: './language-badge-group.component.html',
	styleUrls: ['./language-badge-group.component.scss'],
})
export class LanguageBadgeGroupComponent extends TooltipApiDirective implements OnInit {
	constructor(
		private _idService: FudisIdService,
		private _translationService: FudisTranslationService
	) {
		super();
		effect(() => {
			this._translations = _translationService.getTranslations();
			this._ariaLabel = this._translations().LANGUAGE_BADGE.ARIA_LABEL.TRANSLATIONS;
			this._selectedLabel = this._translations().LANGUAGE_BADGE.ARIA_LABEL.SELECTED;
			this._missingTranslation = this._translations().LANGUAGE_BADGE.ARIA_LABEL.MISSING_TRANSLATION;
		});
	}

	/**
	 * Selected language
	 */
	@Input({ required: true }) selectedLanguage: FudisLanguageAbbr;

	/**
	 * Required language options for Language Badge Group
	 */
	@Input({ required: true }) languages: FudisLanguageAbbr[];

	/**
	 * Optional click handler
	 */
	@Output() handleClick = new EventEmitter<FudisLanguageAbbr>();

	/**
	 * Internal id for Language Badge Group component
	 */
	protected _id: string;

	/**
	 * Internal variable for languages that have existing translations
	 */
	protected _languageOptions: FudisLanguageAbbr[] = ['fi', 'sv', 'en'];

	/**
	 * Fudis translations
	 */
	protected _translations: Signal<FudisTranslationConfig>;

	/**
	 * Aria-label for Language Badge Group
	 */
	protected _ariaLabel: string;

	/**
	 * Internal variable for language badge label
	 */
	protected _label: string;

	/**
	 * Internal variable for selected translation aria-label
	 */
	protected _selectedLabel: string;

	/**
	 * Internal variable for missing translation aria-label
	 */
	protected _missingTranslation: string;

	/**
	 * Internal variable for matching languages and label texts
	 */
	protected _languageLabels: any = [];

	ngOnInit(): void {
		this._id = this._idService.getNewId('languageBadgeGroup');

		this._languageOptions.forEach((language) => {
			const newItem = { key: language, label: this.getLabel(language) };
			this._languageLabels.push(newItem);
		});
	}

	updateLanguage(value: FudisLanguageAbbr) {
		this.handleClick.emit(value);
	}

	getLabel(language: FudisLanguageAbbr): string {
		let missingText = '';
		if (!this.languages.includes(language)) {
			missingText = ` ${this._missingTranslation}`;
		}
		if (language === 'fi') {
			return `${this._translations().LANGUAGE_BADGE.ARIA_LABEL.FI}${missingText}`;
		}
		if (language === 'sv') {
			return `${this._translations().LANGUAGE_BADGE.ARIA_LABEL.SV}${missingText}`;
		}
		return `${this._translations().LANGUAGE_BADGE.ARIA_LABEL.EN}${missingText}`;
	}
}
