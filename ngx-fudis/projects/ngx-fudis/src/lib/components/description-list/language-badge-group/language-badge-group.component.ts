import { Component } from '@angular/core';
import { FudisLanguageOptions } from '../../../types/miscellaneous';

@Component({
	selector: 'fudis-language-badge-group',
	templateUrl: './language-badge-group.component.html',
	styleUrls: ['./language-badge-group.component.scss'],
})
export class LanguageBadgeGroupComponent {
	languageOptions: FudisLanguageOptions[] = [];
}
