import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FudisLanguageOption } from '../../../types/miscellaneous';

@Component({
	selector: 'fudis-language-badge',
	templateUrl: './language-badge.component.html',
})
export class LanguageBadgeComponent {
	@Input() language: FudisLanguageOption;

	/**
	 * Optional click handler
	 */
	@Output() handleClick = new EventEmitter<FudisLanguageOption>();

	handleLanguageSelect(): void {
		this.handleClick.emit(this.language);
	}
}
