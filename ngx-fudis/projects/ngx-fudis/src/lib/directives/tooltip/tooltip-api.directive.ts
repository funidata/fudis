import { Directive, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { FudisTooltipPosition } from '../../types/typography';

@Directive({
	selector: '[fudisTooltipApi]',
	providers: [MatTooltip],
})
export class TooltipApiDirective {
	/**
	 * Text placed on tooltip
	 */
	@Input() tooltip: string;

	/**
	 * tooltipToggle set on true makes tooltip appear when toggled. Default behavior is triggered on focus. TooltipToggle feature is prefered to be used with icons.
	 */
	@Input() tooltipToggle = false;

	/**
	 * Sets the position of the tooltip on the parent element. Position options are left, right, above and below the parent element.
	 */
	@Input() tooltipPosition: FudisTooltipPosition = 'below';
}
