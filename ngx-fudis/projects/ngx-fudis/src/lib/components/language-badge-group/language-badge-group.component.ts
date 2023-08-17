import { Component, OnInit, EventEmitter, Output, Input, Signal, effect } from '@angular/core';
import {
	FudisLanguageAbbr,
	FudisTranslationConfig,
	FudisTranslationLanguageBadgeAriaLabel,
} from '../../types/miscellaneous';
import { FudisTranslationService } from '../../utilities/translation/translation.service';
import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';

@Component({
	selector: 'fudis-language-badge-group',
	templateUrl: './language-badge-group.component.html',
	styleUrls: ['./language-badge-group.component.scss'],
})
export class LanguageBadgeGroupComponent extends TooltipApiDirective implements OnInit {
	constructor(private _translationService: FudisTranslationService) {
		super();
		effect(() => {
			this._translations = _translationService.getTranslations();
			this._groupLabel = this._translations().LANGUAGE_BADGE.ARIA_LABEL.TRANSLATIONS;
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
	 * Output Language abbreviation of clicked Badge
	 */
	@Output() handleBadgeClick = new EventEmitter<FudisLanguageAbbr>();

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
	protected _groupLabel: string;

	/**
	 * Label of language badge
	 */
	protected _label: string;

	/**
	 * Internal variable for matching languages and label texts
	 */
	protected _languageLabels: any = [];

	ngOnInit(): void {
		this._languageOptions.forEach((language) => {
			const newItem = { key: language, label: this.getLabel(language) };
			this._languageLabels.push(newItem);
		});
	}

	updateLanguage(value: FudisLanguageAbbr) {
		this.handleBadgeClick.emit(value);
	}

	getLabel(language: FudisLanguageAbbr): string {
		const keyValue: string = language.toUpperCase();

		return this._translations().LANGUAGE_BADGE.ARIA_LABEL[keyValue as keyof FudisTranslationLanguageBadgeAriaLabel];
	}
}
