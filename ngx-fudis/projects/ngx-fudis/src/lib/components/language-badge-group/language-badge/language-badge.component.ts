import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FudisLanguageAbbr } from '../../../types/miscellaneous';

@Component({
	selector: 'fudis-language-badge',
	templateUrl: './language-badge.component.html',
})
export class LanguageBadgeComponent {
	@Input() language: FudisLanguageAbbr;

	/**
	 * Optional click handler
	 */
	@Output() changeLanguage = new EventEmitter<FudisLanguageAbbr>();

	handleLanguageSelect(): void {
		this.changeLanguage.emit(this.language);
	}
}
