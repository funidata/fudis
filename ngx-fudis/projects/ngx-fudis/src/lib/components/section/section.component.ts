import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IdService } from '../../utilities/id-service.service';
import { HeadingLevel, HeadingSize } from '../../types/typography';
import { GridApiDirective } from '../../directives/grid/grid-api/grid-api.directive';
import { GridColumnsResponsive } from '../../types/grid';

@Component({
	selector: 'fudis-section',
	templateUrl: './section.component.html',
	styleUrls: ['./section.component.scss'],
})
export class SectionComponent extends GridApiDirective implements OnInit, OnChanges {
	@Input() id: string;

	@Input({ required: true }) title: string;

	@Input() titleTag: HeadingLevel = 'h2';

	@Input() titleSize: HeadingSize;

	@Input() disableGrid: boolean = false;

	/**
	 * Setting of columns for the section content. Input will be converted to native CSS grid grid-template-columns values
	 * E. g. as native string: [columns]="'1fr 1fr'" or [columns]="'1fr 2fr'"
	 * E. g. as number [columns]="6", which converts to 'repeat(6, 1fr)'
	 *
	 * For responsive grid behavior, provide GridColumns object.
	 * E. g. [columns]="{md: 2, xl: 3}".
	 * Before md breakpoint Grid has default of '1fr' columns.
	 * After md breakpoint it will have two columns 'repeat(2, 1fr)'
	 * And after xl breakpoint 'repeat(3, 1fr)'
	 */
	@Input() columns: string | number | GridColumnsResponsive = '1fr';

	constructor(private _idService: IdService) {
		super();
	}

	protected _headingId: string;

	protected _classList: string[];

	ngOnInit(): void {
		const id = this.id ?? this._idService.getNewId('section');

		this._headingId = `${id}_heading`;

		this._classList = this.getClasses();
	}

	private getClasses(): string[] {
		const cssClasses = this.classes ?? [];

		cssClasses.push('fudis-section');

		return cssClasses;
	}

	ngOnChanges(): void {
		this._classList = this.getClasses();
	}
}
