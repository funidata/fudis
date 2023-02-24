import { Component, Input } from '@angular/core';
import { GridDirective } from '../grid/grid.directive';
import { IFudisDescriptionListItem } from '../../types/lists';

@Component({
	selector: 'fudis-description-list',
	templateUrl: './description-list.component.html',
	styleUrls: ['./description-list.component.scss'],
})
export class DescriptionListComponent extends GridDirective {
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
