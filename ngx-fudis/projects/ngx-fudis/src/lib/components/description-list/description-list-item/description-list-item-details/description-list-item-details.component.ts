import { Component, Input } from '@angular/core';
import { IFudisDescriptionListItem } from '../../../../types/lists';

@Component({
	selector: 'fudis-dd',
	templateUrl: './description-list-item-details.component.html',
})
export class DescriptionListItemDetailsComponent {
	/**
	 * Item array to form description list data.
	 * Contains mandatory key and value, and optional subHeading.
	 */
	@Input() item: IFudisDescriptionListItem;
}
