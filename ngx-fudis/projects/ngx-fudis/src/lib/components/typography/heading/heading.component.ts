import { Component, Input, HostBinding, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { HeadingSize, HeadingLevel } from '../../../types/typography';

@Component({
	selector: 'fudis-heading[tag]',
	templateUrl: './heading.component.html',
	styleUrls: ['./heading.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingComponent {
	@HostBinding('class') mainClass = 'fudis-heading-host';

	@Input() size: HeadingSize = 'l';

	@Input({ required: true }) tag: HeadingLevel;
}
