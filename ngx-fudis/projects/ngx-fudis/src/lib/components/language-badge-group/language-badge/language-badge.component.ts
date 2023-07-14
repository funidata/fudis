import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { FudisLanguageAbbr } from '../../../types/miscellaneous';

@Component({
	selector: 'fudis-language-badge',
	styleUrls: ['./language-badge.component.scss'],
	templateUrl: './language-badge.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class LanguageBadgeComponent {
	@HostBinding('class') classes = 'fudis-language-badge-host';

	/*
	 * Id of single Language Badge
	 */
	@Input() id: string;

	@Input({ required: true }) language: FudisLanguageAbbr;

	@Input() selected: boolean;

	@Input() variant: 'standard' | 'missing' = 'standard';

	@Input({ required: true }) label: string;

	/**
	 * Optional click handler
	 */
	@Output() changeLanguage = new EventEmitter<FudisLanguageAbbr>();

	handleLanguageSelect(): void {
		this.changeLanguage.emit(this.language);
	}
}
