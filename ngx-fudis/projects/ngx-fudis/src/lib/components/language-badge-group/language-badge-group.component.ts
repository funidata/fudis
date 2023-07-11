import { Component, Input, ViewEncapsulation, OnInit, Signal } from '@angular/core';
import { FudisLanguageAbbr } from '../../types/miscellaneous';
import { FudisIdService } from '../../utilities/id-service.service';
import { FudisTranslationService } from '../../utilities/translation/translation.service';

@Component({
	selector: 'fudis-language-badge-group',
	templateUrl: './language-badge-group.component.html',
	styleUrls: ['./language-badge-group.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class LanguageBadgeGroupComponent implements OnInit {
	constructor(private _idService: FudisIdService) {}

	/**
	 * Internal id for Language Badge Group component
	 */
	protected _id: string;

	/**
	 * Id for Language Badge Group component
	 */
	id: string;

	protected _ariaLabel: string = '';

	protected _currentLanguage: FudisLanguageAbbr = 'en';

	protected _configs: Signal<FudisTranslationService>;

	@Input() languageOptions: FudisLanguageAbbr[];

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('button');
		// this.getAriaLabel();
	}

	// private getAriaLabel(): string {
	// 	this._ariaLabel = this._ariaLabel ? `${this.label} ${this.ariaLabel}` : this.label;
	// 	return this._ariaLabel;
	// }

	updateLanguage(value: any) {
		this._currentLanguage = value;
		console.log('current language is', this._currentLanguage);
	}
}
