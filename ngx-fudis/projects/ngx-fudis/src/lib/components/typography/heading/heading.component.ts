import { Component, Input, HostBinding, ViewEncapsulation, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FudisHeadingLevel, FudisHeadingSize } from '../../../types/typography';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisSpacing } from '../../../types/miscellaneous';

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
	@Input() size: FudisHeadingSize = 'lg';

	/**
	 * Margin bottom for heading
	 */
	@Input() marginBottom: FudisSpacing;

	/**
	 * Heading id
	 */
	@Input() id: string;

	/**
	 * Heading CSS class list
	 */
	protected _classList: string = '';

	/**
	 * Internal id to generate unique id
	 */
	protected _id: string;

	getHeadingMarginBottom(): string {
		if (this.size === 'xxl' || this.size === 'xl') {
			return 'sm';
		}
		return 'xs';
	}

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('heading');

		if (this.marginBottom) {
			this._classList = `fudis-heading fudis-heading__${this.size} fudis-mb-${this.marginBottom}`;
		} else {
			this._classList = `fudis-heading fudis-heading__${this.size} fudis-mb-${this.getHeadingMarginBottom()}`;
		}
	}
}
