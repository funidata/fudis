import { Component, Input, HostBinding, ViewEncapsulation, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HeadingSize, HeadingLevel } from '../../../types/typography';
import { Spacing } from '../../../types/spacing';
import { IdService } from '../../../utilities/id-service.service';

@Component({
	selector: 'fudis-heading',
	templateUrl: './heading.component.html',
	styleUrls: ['./heading.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingComponent implements OnInit {
	@HostBinding('class') mainClass = 'fudis-heading-host';

	@Input() size: HeadingSize = 'l';

	@Input({ required: true }) tag: HeadingLevel;

	@Input() marginBottom: Spacing;

	@Input() id: string;

	protected _classList: string = '';

	_marginBottom = 'l';

	protected _id: string;

	constructor(private _idService: IdService) {}

	getHeadingMarginBottom(): string {
		if (this.size === 'xxl' || this.size === 'xl') {
			return 's';
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
