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
	@HostBinding('class') mainClass = 'fudis-heading-host';

	@Input() size: FudisHeadingSize = 'lg';

	@Input({ required: true }) tag: FudisHeadingTag;

	@Input() marginBottom: FudisSpacing;

	@Input() id: string;

	protected _classList: string = '';

	_marginBottom = 'lg';

	protected _id: string;

	constructor(private _idService: FudisIdService) {}

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
