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

	/*
	 * Language abbreviation for Language Badge
	 */
	@Input({ required: true }) language: FudisLanguageAbbr;

	/*
	 * Selected state of a Language Badge
	 */
	@Input() selected: boolean;

	/*
	 * Language Badge variant
	 */
	@Input() variant: 'standard' | 'missing' = 'standard';

	/*
	 * Mandatory Language Badge label
	 */
	@Input({ required: true }) label: string;

	/**
	 * Language badge group component id for binding aria attributes
	 */
	@Input() badgeGroupId: string;

	/**
	 * Optional click handler
	 */
	@Output() changeLanguage = new EventEmitter<FudisLanguageAbbr>();

	handleLanguageSelect(): void {
		this.changeLanguage.emit(this.language);
	}
}
