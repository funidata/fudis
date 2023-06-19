import { Component, Input } from '@angular/core';
import { IFudisDescriptionListItem } from '../../../../types/lists';

@Component({
	selector: 'fudis-description-list-item-term',
	templateUrl: './description-list-item-term.component.html',
	styleUrls: ['./description-list-item-term.component.scss'],
})
export class DescriptionListItemTermComponent {
	/**
	 * Item array to form description list data.
	 * Contains mandatory key and value, and optional subHeading.
	 */
	@Input() item: IFudisDescriptionListItem;
}
