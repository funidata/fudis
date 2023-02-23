import { Component, Input, HostBinding, ViewEncapsulation } from '@angular/core';

type BodyTextSize = 'l-regular' | 'm-regular' | 's-regular' | 'l-light' | 'm-light';

type MarginBottomSize = 'm' | 'l' | 0 | '0';

@Component({
	selector: 'fudis-body-text',
	templateUrl: './body-text.component.html',
	styleUrls: ['./body-text.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class BodyTextComponent {
	@HostBinding('class') classes = 'fudis-body-text';

	@Input() size: BodyTextSize = 'm-regular';

	@Input() marginBottom: MarginBottomSize = 0;
}
