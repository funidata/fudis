import { Component, Input, HostBinding, ViewEncapsulation } from '@angular/core';
import { HeadingSize, HeadingLevel } from '../../../types/typography';

@Component({
	selector: 'fudis-heading[tag]',
	templateUrl: './heading.component.html',
	styleUrls: ['./heading.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class HeadingComponent {
	@HostBinding('class') mainClass = 'fudis-heading-host';

	@Input() size: HeadingSize = 'l';

	@Input() text: string;

	@Input() tag: HeadingLevel;
}
