import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'fudis-tooltip',
	templateUrl: './tooltip.component.html',
	styleUrls: ['./tooltip.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent {
	/**
	 * Text displayed in tooltip
	 */
	@Input() tooltipText: string;

	/**
	 * Text displayed in tooltip
	 */
	@Input() content: string;
}
