import { Component, Input } from '@angular/core';
import { GridApiDirective } from '../../../directives/grid/grid-api/grid-api.directive';
import { IFudisDescriptionListItem } from '../../../types/lists';

@Component({
	selector: 'fudis-dl-item',
	templateUrl: './description-list-item.component.html',
})
export class DescriptionListItemComponent extends GridApiDirective {
	/**
	 * Item array to form description list data.
	 * Contains mandatory key and value, and optional subHeading.
	 */
	@Input() data: IFudisDescriptionListItem;

	/**
	 * Disable Fudis Grid behavior for Description List.
	 */
	@Input() disableGrid: boolean = false;
}
