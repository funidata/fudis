import { Component, Input, OnInit, OnChanges, ViewEncapsulation } from '@angular/core';

import { GridApiDirective } from '../../directives/grid/grid-api/grid-api.directive';

import { FudisDescriptionListItem, FudisDescriptionListVariant } from '../../types/miscellaneous';
import { FudisDescriptionListService } from './description-list.service';

@Component({
	selector: 'fudis-dl, fudis-description-list',
	templateUrl: './description-list.component.html',
	styleUrls: ['./description-list.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class DescriptionListComponent extends GridApiDirective implements OnInit, OnChanges {
	constructor(private _variantService: FudisDescriptionListService) {
		super();
	}

	/**
	 * Item array to form description list data.
	 * Contains mandatory key and value, and optional subHeading.
	 */
	@Input() data: FudisDescriptionListItem[] | null = null;

	/**
	 * Disable Fudis Grid behavior for Description List.
	 */
	@Input() disableGrid: boolean = false;

	/**
	 * Variant for description list structure and layout
	 */
	@Input() variant: FudisDescriptionListVariant = 'regular';

	/**
	 * Add Fudis Language Badge Group in Fudis Description List Item Term element
	 */
	@Input() translation: boolean = false;

	/**
	 * CSS class list
	 */
	protected _classList: string[] = [];

	ngOnInit(): void {
		this._classList = this._getClasses();
	}

	ngOnChanges(): void {
		this._classList = this._getClasses();
	}

	private _getClasses(): string[] {
		const cssClasses = [];

		if (this.variant === 'regular') {
			this._variantService.setVariant(this.variant);
			cssClasses.push('fudis-dl');

			if (this.disableGrid) {
				cssClasses.push('fudis-dl__disabled-grid');
			}
		}

		if (this.variant === 'compact') {
			this._variantService.setVariant(this.variant);
			cssClasses.push('fudis-dl-compact');
			if (this.disableGrid) {
				cssClasses.push('fudis-dl-compact__disabled-grid');
			}
		}

		const combined = this.classes ? cssClasses.concat(this.classes) : cssClasses;

		return combined;
	}
}
