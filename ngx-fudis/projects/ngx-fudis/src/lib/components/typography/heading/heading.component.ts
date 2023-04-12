import { Component, Input, HostBinding } from '@angular/core';
import isRequired from '../../../utilities/errors/errors.utility';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

@Component({
	selector: 'fudis-heading',
	templateUrl: './heading.component.html',
	styleUrls: ['./heading.component.scss'],
})
export class HeadingComponent {
	@HostBinding('class') mainClass = 'fudis-heading-host';

	@Input() size: HeadingSize = 'l';

	@Input() text: string;

	@isRequired
	@Input()
	tag: HeadingLevel;
}
