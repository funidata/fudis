import { Component, Input, HostBinding, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { HeadingSize, HeadingLevel } from '../../../types/typography';
import { Spacing } from '../../../types/spacing';

@Component({
	selector: 'fudis-heading',
	templateUrl: './heading.component.html',
	styleUrls: ['./heading.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingComponent {
	@HostBinding('class') mainClass = 'fudis-heading-host';

	@Input() size: HeadingSize = 'l';

	@Input({ required: true }) tag: HeadingLevel;

	@Input() marginBottom: Spacing;

	@Input() id: string;

	protected _classList: string = '';

	_marginBottom = 'l';

	getHeadingMarginBottom(): string {
		switch (this.size) {
			case 'xxl':
				return 's';
			case 'xl':
				return 's';
			case 'l':
				return 'xs';
			case 'm':
				return 'xs';
			case 's':
				return 'xs';
			case 'xs':
				return 'xs';
			default:
				return 'xs';
		}
	}

	ngOnInit(): void {
		if (this.marginBottom) {
			this._classList = `fudis-heading fudis-heading__${this.size} fudis-mb-${this.marginBottom}`;
		} else {
			this._classList = `fudis-heading fudis-heading__${this.size} fudis-mb-${this.getHeadingMarginBottom()}`;
		}
	}
}
