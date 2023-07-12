import { Component, ViewEncapsulation, OnInit, Signal, effect, EventEmitter, Output, Input } from '@angular/core';
import { FudisLanguageAbbr, FudisTranslationConfig } from '../../types/miscellaneous';
import { FudisIdService } from '../../utilities/id-service.service';
import { FudisTranslationService } from '../../utilities/translation/translation.service';

@Component({
	selector: 'fudis-language-badge-group',
	templateUrl: './language-badge-group.component.html',
	styleUrls: ['./language-badge-group.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class LanguageBadgeGroupComponent implements OnInit {
	constructor(private _idService: FudisIdService, private _translationService: FudisTranslationService) {
		effect(() => {
			this._currentLanguage = _translationService.getLanguage();
			this._translations = _translationService.getTranslations();
			console.log(this._translations().LANGUAGE_BADGE);
		});
	}

	/**
	 * Internal id for Language Badge Group component
	 */
	protected _id: string;

	/**
	 * Id for Language Badge Group component
	 */
	id: string;

	protected _ariaLabel: string = '';

	protected _currentLanguage: FudisLanguageAbbr;

	protected _translations: Signal<FudisTranslationConfig>;

	protected _languageOptions: FudisLanguageAbbr[] = ['en', 'fi', 'sv'];

	/**
	 * Internal id for Language Badge Group component
	 */
	@Input() _missingTranslation: FudisLanguageAbbr[];

	@Output() handleClick = new EventEmitter<FudisLanguageAbbr>();

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('button');
		// this.getAriaLabel();
	}

	// private getAriaLabel(): string {
	// 	this._ariaLabel = this._ariaLabel ? `${this.label} ${this.ariaLabel}` : this.label;
	// 	return this._ariaLabel;
	// }

	updateLanguage(value: FudisLanguageAbbr) {
		this._currentLanguage = value;
		this.handleClick.emit(this._currentLanguage);
	}
}
