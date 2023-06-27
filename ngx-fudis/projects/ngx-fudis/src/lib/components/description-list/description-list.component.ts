import { Component, Input, OnInit, OnChanges, ViewEncapsulation } from '@angular/core';

import { GridApiDirective } from '../../directives/grid/grid-api/grid-api.directive';
import { FudisGridColumnsResponsive } from '../../types/grid';
import { FudisDescriptionListItem } from '../../types/miscellaneous';

@Component({
	selector: 'fudis-dl, fudis-description-list',
	templateUrl: './description-list.component.html',
	styleUrls: ['./description-list.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class DescriptionListComponent extends GridApiDirective implements OnInit, OnChanges {
	/**
	 * CSS class list
	 */
	_classList: string[] = [];

	/**
	 * Item array to form description list data.
	 * Contains mandatory key and value, and optional subHeading.
	 */
	@Input() data: FudisDescriptionListItem[] = [];

	/**
	 * Variant for description list structure and layout
	 */
	@Input() variant: 'regular' | 'compact' = 'regular';

	/**
	 * Disable Fudis Grid behavior for Description List.
	 */
	@Input() disableGrid: boolean = false;

	/**
	 * Setting of columns for the description list. Input will be converted to native CSS grid grid-template-columns values
	 * E. g. as native string: [columns]="'1fr 1fr'" or [columns]="'1fr 2fr'"
	 * E. g. as number [columns]="6", which converts to 'repeat(6, 1fr)'
	 *
	 * For responsive grid behavior, provide GridColumns object.
	 * E. g. [columns]="{md: 2, xl: 3}".
	 * Before md breakpoint Grid has default of '1fr' columns.
	 * After md breakpoint it will have two columns 'repeat(2, 1fr)'
	 * And after xl breakpoint 'repeat(3, 1fr)'
	 */
	@Input() columns: string | number | FudisGridColumnsResponsive = '1fr 1fr';

	private getClasses(): string[] {
		const cssClasses = [];

		if (this.variant === 'regular') {
			cssClasses.push('fudis-description-list');
			if (this.disableGrid) {
				cssClasses.push('fudis-description-list__disabled-grid');
			}
		}

		if (this.variant === 'compact') {
			cssClasses.push('fudis-description-list-compact');
			if (this.disableGrid) {
				cssClasses.push('fudis-description-list-compact__disabled-grid');
			}
		}

		return cssClasses;
	}

	ngOnInit(): void {
		this._classList = this.getClasses();
	}

	ngOnChanges(): void {
		this._classList = this.getClasses();
	}
}
