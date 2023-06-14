import { Component, Input, HostBinding, ViewEncapsulation } from '@angular/core';
import { BodyTextSize, MarginBottomSize } from '../../../types/typography';

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
	@HostBinding('class') classes = 'fudis-body-text-host';

	/**
	 * Font size for the paragraph
	 */
	@Input() size: BodyTextSize = 'm-regular';

	/**
	 * Optional margin bottom
	 */
	@Input() marginBottom: MarginBottomSize = 'none';
}
