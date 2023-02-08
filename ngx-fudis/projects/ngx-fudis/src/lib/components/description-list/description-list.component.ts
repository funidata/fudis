import { Component, Input } from '@angular/core';
import { IFudisDescriptionListItem } from '../../types/lists';

@Component({
	selector: 'fudis-description-list',
	templateUrl: './description-list.component.html',
	styleUrls: ['./description-list.component.scss'],
})
export class DescriptionListComponent {
	/**
	 * Item array to form description list data.
	 * Contains mandatory key and value, and optional subHeading.
	 */
	@Input() data: IFudisDescriptionListItem[] = [];

	/**
	 * Variant for description list structure and layout
	 */
	@Input() variant: 'regular' | 'compact' = 'regular';
}
