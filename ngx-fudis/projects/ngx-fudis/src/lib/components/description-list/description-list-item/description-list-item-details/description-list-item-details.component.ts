import { Component, Input } from '@angular/core';
import { FudisDescriptionListItem } from 'projects/ngx-fudis/src/lib/types/miscellaneous';

@Component({
	selector: 'fudis-dd, fudis-description-list-details',
	templateUrl: './description-list-item-details.component.html',
})
export class DescriptionListItemDetailsComponent {
	/**
	 * Item array to form description list data.
	 * Contains mandatory key and value, and optional subHeading.
	 */
	@Input() item: FudisDescriptionListItem;
}
