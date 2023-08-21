import { AfterViewInit, Component, ContentChildren, Host, QueryList, signal } from '@angular/core';
import { DescriptionListItemDetailsComponent } from './description-list-item-details/description-list-item-details.component';
import { FudisLanguageAbbr } from '../../../types/miscellaneous';

@Component({
	selector: 'fudis-dl-item, fudis-description-list-item',
	templateUrl: './description-list-item.component.html',
})
export class DescriptionListItemComponent implements AfterViewInit {
	@ContentChildren(DescriptionListItemDetailsComponent)
	ddChildrenElements!: QueryList<DescriptionListItemDetailsComponent>;

	/**
	 * Storing list of available languages in dd-elements
	 */
	@Host() public existingLanguageOptions = signal<FudisLanguageAbbr[]>([]);

	ngAfterViewInit(): void {
		this.checkCurrentChildren();
	}

	/**
	 * Check for what languages are available as item's children dd-elements
	 */
	checkCurrentChildren(): void {
		const temp: FudisLanguageAbbr[] = [];

		if (this.ddChildrenElements) {
			this.ddChildrenElements.forEach((item) => {
				temp.push(item.lang);
			});
		}

		this.existingLanguageOptions.set(temp);
	}
}
