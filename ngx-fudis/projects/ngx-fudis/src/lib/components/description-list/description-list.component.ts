import { Component, Input } from '@angular/core';
import { IFudisDescriptionListItem } from '../../types/lists';
import { GridApiDirective } from '../grid/grid-api.directive';

@Component({
	selector: 'fudis-description-list',
	templateUrl: './description-list.component.html',
	styleUrls: ['./description-list.component.scss'],
})
export class DescriptionListComponent extends GridApiDirective {
	/**
	 * Item array to form description list data.
	 * Contains mandatory key and value, and optional subHeading.
	 */
	@Input() data: IFudisDescriptionListItem[] = [];

	/**
	 * Variant for description list structure and layout
	 */
	@Input() variant: 'regular' | 'compact' = 'regular';

	/**
	 * Disable Fudis Grid behavior for Description List.
	 */

	@Input() disableGrid: boolean = false;

	override columns = '1fr 1fr';
}
