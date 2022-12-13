import { Component, Input, HostBinding } from '@angular/core';

type BodyTextSize = 'l-regular' | 'm-regular' | 's-regular' | 'l-light' | 'm-light';

@Component({
	selector: 'fudis-body-text',
	templateUrl: './body-text.component.html',
	styleUrls: ['./body-text.component.scss'],
})
export class BodyTextComponent {
	@HostBinding('class') classes = 'fudis-body-text';

	@Input() size: BodyTextSize = 'm-regular';
}
