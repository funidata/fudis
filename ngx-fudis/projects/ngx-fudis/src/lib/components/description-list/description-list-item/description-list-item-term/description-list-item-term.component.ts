import { Component, Input } from '@angular/core';
import { FudisDescriptionListItem } from '../../../../types/miscellaneous';

@Component({
	selector: 'fudis-dt, fudis-description-list-term',
	templateUrl: './description-list-item-term.component.html',
})
export class DescriptionListItemTermComponent {
	/**
	 * Item array to form description list data.
	 * Contains mandatory key and value, and optional subHeading.
	 */
	@Input() item: FudisDescriptionListItem;
}
