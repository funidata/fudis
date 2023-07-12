import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList } from '@angular/core';
import { DescriptionListItemDetailsComponent } from './description-list-item-details/description-list-item-details.component';
import { FudisLanguageAbbr } from '../../../types/miscellaneous';

@Component({
	selector: 'fudis-dl-item, fudis-description-list-item',
	templateUrl: './description-list-item.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionListItemComponent implements AfterViewInit {
	@ContentChildren(DescriptionListItemDetailsComponent)
	contentChildren!: QueryList<DescriptionListItemDetailsComponent>;

	_languageOptions: FudisLanguageAbbr[] = ['en', 'fi', 'sv'];

	_existingLanguageOptions: FudisLanguageAbbr[] = [];

	missingTranslations: FudisLanguageAbbr[];

	ngAfterViewInit(): void {
		this.contentChildren.forEach((item) => {
			this._existingLanguageOptions.push(item.lang);
		});

		this.missingTranslations = this._languageOptions.filter(
			(missing) => !this._existingLanguageOptions.includes(missing)
		);
		console.log('Nämä kielet puuttuu', this.missingTranslations);
	}
}
