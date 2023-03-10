import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
	selector: '[fudisTooltip]',
	exportAs: 'tooltip',
	providers: [MatTooltip],
})
export class TooltipDirective implements OnInit {
	tooltip: MatTooltip;

	/**
	 * Text placed on tooltip
	 */
	@Input() fudisTooltip: string;

	/**
	 * tooltipToggle set on true makes tooltip appear when toggled. Default behavior is triggered on focus. TooltipToggle feature is prefered to be used with icons.
	 */
	@Input() tooltipToggle = false;

	constructor(tooltip: MatTooltip) {
		this.tooltip = tooltip;
	}

	ngOnInit() {
		// console.log('Status: ', this.tooltipToggle);
		if (this.fudisTooltip) {
			this.tooltip.message = this.fudisTooltip;
		}
		// this.ngOnDestroy();
	}

	// ngOnChanges() {
	// 	if (this.tooltipToggle === true) {
	// 		console.log('tooltip toggle is true!');
	// 		this.ngOnDestroy();
	// 	}
	// }

	toggleTooltip() {
		// console.log('I was pressed!');
		return this.tooltip.toggle();
	}

	showTooltip() {
		// console.log('Do you see me?');
		return this.tooltip.show();
	}

	hideTooltip() {
		return this.tooltip.hide();
	}

	@HostListener('mouseenter') mouseenter() {
		this.showTooltip();
	}

	@HostListener('mouseleave') onmouseleave() {
		this.hideTooltip();
	}

	@HostListener('focus') onFocus() {
		this.showTooltip();
	}

	@HostListener('blur') onBlur() {
		this.hideTooltip();
	}

	// private removeListeners() {
	// 	window.removeEventListener('mouseenter', this.mouseenter);
	// 	window.removeEventListener('mouseleave', this.onmouseleave);
	// }

	// ngOnDestroy() {
	// 	console.log('destroy me!!');

	// 	this.removeListeners();
	// 	window.removeEventListener('mouseenter', this.mouseenter, true);
	// 	window.removeEventListener('mouseleave', this.onmouseleave, true);
	// }
}
