import { Component, Input } from '@angular/core';
import { IFudisDescriptionListItem } from '../../../../types/lists';

@Component({
	selector: 'fudis-dt',
	templateUrl: './description-list-item-term.component.html',
})
export class DescriptionListItemTermComponent {
	/**
	 * Item array to form description list data.
	 * Contains mandatory key and value, and optional subHeading.
	 */
	@Input() item: IFudisDescriptionListItem;
}
