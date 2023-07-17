import { Component, Input, HostBinding, ViewEncapsulation, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FudisHeadingSize, FudisHeadingTag } from '../../../types/typography';

import { FudisIdService } from '../../../utilities/id-service.service';
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

	@Input({ required: true }) tag: FudisHeadingTag;

	@Input() size: FudisHeadingSize = 'lg';

	@Input() marginBottom: FudisSpacing;

	@Input() id: string;

	protected _classList: string = '';

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
