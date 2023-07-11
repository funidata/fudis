import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FudisLanguageAbbr } from '../../../types/miscellaneous';

@Component({
	selector: 'fudis-language-badge',
	templateUrl: './language-badge.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class LanguageBadgeComponent {
	/*
	 * Id of single Language Badge
	 */
	@Input() id: string;

	@Input() language: FudisLanguageAbbr;

	/**
	 * Optional click handler
	 */
	@Output() changeLanguage = new EventEmitter<FudisLanguageAbbr>();

	handleLanguageSelect(): void {
		this.changeLanguage.emit(this.language);
	}
}
