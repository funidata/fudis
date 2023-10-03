import { Component, Input, HostBinding, ViewEncapsulation, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FudisHeadingLevel, FudisHeadingSize } from '../../../types/typography';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisSpacing, FudisTextAlign } from '../../../types/miscellaneous';

@Component({
	selector: 'fudis-heading',
	templateUrl: './heading.component.html',
	styleUrls: ['./heading.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingComponent implements OnInit {
	constructor(private _idService: FudisIdService) {}

	@HostBinding('class') mainClass = 'fudis-heading-host';

	/**
	 * Semantic level of heading
	 */
	@Input({ required: true }) level: FudisHeadingLevel;

	/**
	 * Heading size
	 */
	@Input() size: FudisHeadingSize;

	/**
	 * Margin bottom for heading
	 */
	@Input() marginBottom: FudisSpacing;

	/**
	 * Heading id
	 */
	@Input() id: string;

	/**
 	* Align heading
 	*/
	@Input() align: FudisTextAlign = 'left';

	/**
	 * Heading CSS class list
	 */
	protected _classList: string = '';

	/**
	 * Internal id to generate unique id
	 */
	protected _id: string;

	getHeadingMarginBottom(): string {
		if (this.level === 1 || this.level === 2 ) {
			return 'sm';
		}
		return 'xs';
	}

	getHeadingSize(): string {
		switch (this.level) {
			case 1:
				return 'xxl';
			case 2:
				return 'xl';
			case 3:
				return 'lg';
			case 4:
				return 'md';
			case 5:
				return 'sm';
			case 6:
				return 'xs';
			default:
				return 'lg';
		}
	}

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('heading');

		if (!this.size) {
			this._classList = `fudis-heading fudis-heading__${this.getHeadingSize()}`;
		} else {
			this._classList = `fudis-heading fudis-heading__${this.size}`;
		}

		if (!this.marginBottom) {
			this._classList += ` fudis-mb-${this.getHeadingMarginBottom()}`;
		} else {
			this._classList += ` fudis-mb-${this.marginBottom}`;
		}

		this._classList += ` fudis-heading__${this.align}`;
	}
}
