import { Component, Input, HostBinding, ViewEncapsulation } from '@angular/core';

export type BodyTextSize = 'l-regular' | 'm-regular' | 's-regular' | 'l-light' | 'm-light';

export type MarginBottomSize = 'm' | 'l' | 0 | '0';

@Component({
	selector: 'fudis-body-text',
	templateUrl: './body-text.component.html',
	styleUrls: ['./body-text.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class BodyTextComponent {
	/**
	 * Class for the parent wrapper element
	 */
	@HostBinding('class') classes = 'fudis-body-text';

	/**
	 * Font size for the paragraph
	 */
	@Input() size: BodyTextSize = 'm-regular';

	/**
	 * Optional margin bottom
	 */
	@Input() marginBottom: MarginBottomSize = 0;
}
