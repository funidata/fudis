import { AfterViewInit, Component, ContentChildren, Host, QueryList, signal } from '@angular/core';
import { DescriptionListItemDetailsComponent } from './description-list-item-details/description-list-item-details.component';
import { FudisLanguageAbbr } from '../../../types/miscellaneous';

@Component({
	selector: 'fudis-dl-item, fudis-description-list-item',
	templateUrl: './description-list-item.component.html',
})
export class DescriptionListItemComponent implements AfterViewInit {
	@ContentChildren(DescriptionListItemDetailsComponent)
	contentChildren!: QueryList<DescriptionListItemDetailsComponent>;

	@Host() public existingLanguageOptions = signal<FudisLanguageAbbr[]>([]);

	ngAfterViewInit(): void {
		this.checkCurrentChildren();
	}

	/**
	 * Check for what languages are available as item's children
	 */
	checkCurrentChildren(): void {
		const temp: FudisLanguageAbbr[] = [];

		if (this.contentChildren) {
			this.contentChildren.forEach((item) => {
				temp.push(item.lang);
			});
		}

		this.existingLanguageOptions.set(temp);
	}
}
