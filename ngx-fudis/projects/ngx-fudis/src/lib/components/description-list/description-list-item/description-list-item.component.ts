import { Component, Input } from '@angular/core';
import { GridApiDirective } from '../../../directives/grid/grid-api/grid-api.directive';
import { FudisDescriptionListItem } from '../../../types/miscellaneous';

@Component({
	selector: 'fudis-dl-item, fudis-description-list-item',
	templateUrl: './description-list-item.component.html',
})
export class DescriptionListItemComponent extends GridApiDirective {
	/**
	 * Item array to form description list data.
	 * Contains mandatory key and value, and optional subHeading.
	 */
	@Input() data: FudisDescriptionListItem;
}
