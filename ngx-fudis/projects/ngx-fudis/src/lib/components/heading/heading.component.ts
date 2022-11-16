import { Component, Input } from '@angular/core';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

@Component({
	selector: 'fds-heading',
	templateUrl: './heading.component.html',
	styleUrls: ['./heading.component.scss'],
})
export class HeadingComponent {
	@Input() size: HeadingSize;

	@Input() text: string;

	@Input() tag: HeadingLevel;
}
