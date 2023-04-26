import { Component, Input, HostBinding, ViewEncapsulation } from '@angular/core';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

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
