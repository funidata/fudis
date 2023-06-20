import { Component, Input, HostBinding, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { BodyTextSize } from '../../../types/typography';
import { Spacing } from '../../../types/spacing';

@Component({
	selector: 'fudis-body-text',
	templateUrl: './body-text.component.html',
	styleUrls: ['./body-text.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
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
	@Input() marginBottom: Spacing = 'none';
}
